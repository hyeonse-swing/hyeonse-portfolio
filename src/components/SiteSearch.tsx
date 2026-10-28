'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Locale } from '../lib/locale';
import { isSearchIndex, searchDocuments, type SearchIndex } from '../lib/site-search-engine';
import styles from './SiteSearch.module.css';

const copy = {
  ko: {
    open: '검색', title: '사이트 검색', close: '검색 닫기', label: '검색어',
    placeholder: '프로젝트, 경력, 기술 검색', loading: '검색 자료를 불러오는 중…',
    error: '검색 자료를 불러오지 못했습니다.', retry: '다시 시도',
    featured: '바로 가기', empty: '검색 결과가 없습니다.',
    count: (n: number) => `검색 결과 ${n}개`,
    categories: { page: '페이지', project: '프로젝트', experience: '경력', skill: '기술', tool: '도구' },
  },
  en: {
    open: 'Search', title: 'Search this site', close: 'Close search', label: 'Search terms',
    placeholder: 'Search projects, experience, skills', loading: 'Loading search index…',
    error: 'Could not load the search index.', retry: 'Try again',
    featured: 'Quick links', empty: 'No results found.',
    count: (n: number) => `${n} ${n === 1 ? 'result' : 'results'}`,
    categories: { page: 'Page', project: 'Project', experience: 'Experience', skill: 'Skill', tool: 'Tool' },
  },
};

export default function SiteSearch({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef('');
  const restoreFocusRef = useRef(true);
  const lockedRef = useRef(false);
  const mountedRef = useRef(false);
  const requestRef = useRef<{ locale: Locale; controller: AbortController; id: number } | null>(null);
  const requestIdRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const documents = index?.locale === locale ? index.documents : null;

  useEffect(() => {
    mountedRef.current = true;
    setMounted(true);
    return () => {
      mountedRef.current = false;
      requestRef.current?.controller.abort();
      requestIdRef.current++;
    };
  }, []);

  useEffect(() => {
    requestRef.current?.controller.abort();
    requestRef.current = null;
    requestIdRef.current++;
    setIndex(null);
    setQuery('');
    setStatus('idle');
  }, [locale]);

  useEffect(() => {
    if (!mounted) return;
    const viewport = window.visualViewport;
    const syncViewport = () => {
      dialogRef.current?.style.setProperty('--search-viewport-height', `${viewport?.height ?? window.innerHeight}px`);
      dialogRef.current?.style.setProperty('--search-viewport-top', `${viewport?.offsetTop ?? 0}px`);
    };
    syncViewport();
    viewport?.addEventListener('resize', syncViewport);
    viewport?.addEventListener('scroll', syncViewport);
    window.addEventListener('resize', syncViewport);
    return () => {
      viewport?.removeEventListener('resize', syncViewport);
      viewport?.removeEventListener('scroll', syncViewport);
      window.removeEventListener('resize', syncViewport);
    };
  }, [mounted]);

  const load = useCallback(async () => {
    if (documents) return;
    if (requestRef.current?.locale === locale) return;
    const controller = new AbortController();
    const id = ++requestIdRef.current;
    requestRef.current = { locale, controller, id };
    setStatus('loading');
    try {
      const response = await fetch(`/search-index/${locale}.json`, { signal: controller.signal });
      if (!response.ok) throw new Error('Search index request failed');
      const data: unknown = await response.json();
      if (!isSearchIndex(data, locale)) throw new Error('Invalid search index');
      if (mountedRef.current && requestIdRef.current === id && !controller.signal.aborted) {
        setIndex(data);
        setStatus('idle');
      }
    } catch {
      if (mountedRef.current && requestIdRef.current === id && !controller.signal.aborted) setStatus('error');
    } finally {
      if (requestRef.current?.id === id) requestRef.current = null;
    }
  }, [documents, locale]);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open || document.querySelector('dialog[open]')) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : triggerRef.current;
    restoreFocusRef.current = true;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lockedRef.current = true;
    dialog.showModal();
    inputRef.current?.focus();
    void load();
  }, [load]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.shiftKey || !(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      if (dialogRef.current?.open) {
        event.preventDefault();
        inputRef.current?.focus();
        return;
      }
      const target = event.target;
      if (target instanceof Element && (target.closest('input, textarea, select, [contenteditable="true"]') || target.closest('[role="dialog"]'))) return;
      if (document.querySelector('dialog[open]') && !dialogRef.current?.open) return;
      event.preventDefault();
      open();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mounted, open]);

  useEffect(() => () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    if (lockedRef.current) document.body.style.overflow = previousOverflow.current;
  }, []);

  const results = documents ? searchDocuments(documents, query) : [];
  useEffect(() => {
    if (resultsRef.current) resultsRef.current.scrollTop = 0;
  }, [query]);
  const resultLinks = () => Array.from(resultsRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? []);

  return <>
    <button ref={triggerRef} type="button" className={styles.trigger} onClick={open} aria-label={t.open} aria-haspopup="dialog" title={t.open}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10.8" cy="10.8" r="6.5"/><path d="m15.7 15.7 5 5"/></svg>
      <span className={styles.triggerText}>{t.open}</span><kbd className={styles.shortcut}>⌘ / Ctrl K</kbd>
    </button>
    {mounted && createPortal(<dialog ref={dialogRef} className={styles.dialog} aria-labelledby="site-search-title" onClose={() => {
      if (lockedRef.current) {
        document.body.style.overflow = previousOverflow.current;
        lockedRef.current = false;
      }
      if (restoreFocusRef.current && previousFocus.current?.isConnected) previousFocus.current.focus();
    }} onKeyDown={(event) => {
      if (event.key === 'Escape' && !event.nativeEvent.isComposing && event.keyCode !== 229) {
        event.preventDefault();
        close();
      }
    }} onClick={(event) => { if (event.target === dialogRef.current) close(); }}>
      <div className={styles.panel}>
        <div className={styles.heading}><h2 id="site-search-title">{t.title}</h2><button type="button" className={styles.close} onClick={close} aria-label={t.close}>×</button></div>
        <label className={styles.label} htmlFor="site-search-input">{t.label}</label>
        <input ref={inputRef} id="site-search-input" className={styles.input} type="search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => {
          if (event.nativeEvent.isComposing || event.keyCode === 229) return;
          const links = resultLinks();
          if (event.key === 'ArrowDown' && links.length) { event.preventDefault(); links[0].focus(); }
          if (event.key === 'ArrowUp' && links.length) { event.preventDefault(); links[links.length - 1].focus(); }
          if (event.key === 'Enter' && links.length) { event.preventDefault(); links[0].click(); }
        }} placeholder={t.placeholder} autoComplete="off" />
        <div className={styles.resultsHead} aria-live="polite" aria-atomic="true">{status === 'loading' ? t.loading : status === 'error' ? t.error : documents ? query.trim() ? t.count(results.length) : t.featured : ''}</div>
        {status === 'error' && <button type="button" className={styles.retry} onClick={() => void load()}>{t.retry}</button>}
        {documents && status !== 'error' && <div ref={resultsRef} className={styles.results} onKeyDown={(event) => {
          if (event.nativeEvent.isComposing || event.keyCode === 229 || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return;
          const links = resultLinks();
          const current = links.indexOf(event.target as HTMLAnchorElement);
          if (current < 0) return;
          event.preventDefault();
          links[(current + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length].focus();
        }}>
          {results.length === 0 ? <p className={styles.empty}>{t.empty}</p> : <ul>{results.map((result) => <li key={result.id}>
            <a href={result.href} onClick={(event) => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              restoreFocusRef.current = false;
              close();
              const destination = new URL(result.href, window.location.href);
              if (destination.pathname === window.location.pathname && destination.hash === window.location.hash) {
                window.dispatchEvent(new Event('portfolio:reveal-search-target'));
              }
            }}>
              <span className={styles.category}>{t.categories[result.category]}</span>
              <strong>{result.title}</strong>
              <span className={styles.summary}>{result.summary}</span>
            </a>
          </li>)}</ul>}
        </div>}
      </div>
    </dialog>, document.body)}
  </>;
}
