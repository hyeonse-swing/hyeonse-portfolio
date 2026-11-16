'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { blogComments } from '../data/blog-comments';
import type { Locale } from '../lib/locale';
import styles from './BlogComments.module.css';

const Giscus = dynamic(() => import('@giscus/react'), { ssr: false });
const origin = 'https://giscus.app';
function clearLoginReturn() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('giscus')) return;
  url.searchParams.delete('giscus');
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
}

export default function BlogComments({ locale, term }: { locale: Locale; term: string }) {
  const en = locale === 'en';
  const container = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [theme, setTheme] = useState('light');
  const githubUrl = `https://github.com/${blogComments.repo}/discussions?discussions_q=${encodeURIComponent(term)}`;

  useEffect(() => {
    // Complete the provider's OAuth return without requiring a second button click.
    if (new URLSearchParams(window.location.search).has('giscus')) setRequested(true);
    const updateTheme = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!requested) return;
    setStatus('loading');
    // The provider needs storage for its login session. A blocked store must not break the article.
    try {
      const loginReturn = new URLSearchParams(window.location.search).get('giscus');
      if (loginReturn) window.localStorage.setItem('giscus-session', JSON.stringify(loginReturn));
      window.localStorage.getItem('giscus-session');
      const probe = `portfolio:comments:probe:${crypto.randomUUID()}`;
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
    } catch {
      setStatus('error');
      return;
    } finally {
      // Clear the credential-bearing return URL before loading any provider code, even if storage fails.
      clearLoginReturn();
    }
    if (!blogComments.categoryId) {
      setStatus('error');
      return;
    }
    const timeout = window.setTimeout(() => { clearLoginReturn(); setStatus('error'); }, 20000);
    const receive = (event: MessageEvent) => {
      const frame = container.current?.querySelector('giscus-widget')?.shadowRoot?.querySelector('iframe');
      if (event.origin !== origin || event.source !== frame?.contentWindow) return;
      if (!event.data || typeof event.data !== 'object' || !event.data.giscus || typeof event.data.giscus !== 'object') return;
      const message = event.data.giscus;
      const error = typeof message.error === 'string' ? message.error : '';
      if (error && !error.includes('Discussion not found')) {
        window.clearTimeout(timeout);
        clearLoginReturn();
        setStatus('error');
      } else if ((typeof message.resizeHeight === 'number' && message.resizeHeight > 0) || message.discussion || error.includes('Discussion not found')) {
        window.clearTimeout(timeout);
        setStatus('ready');
      }
    };
    window.addEventListener('message', receive);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('message', receive);
    };
  }, [requested, attempt, locale, term]);

  return <section className={styles.comments} aria-labelledby="comments-title">
    <div className={styles.heading}>
      <div><span className="eyebrow">CONVERSATION</span><h2 id="comments-title">{en ? 'Comments' : '댓글'}</h2></div>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">{en ? 'Open on GitHub' : 'GitHub에서 보기'} ↗</a>
    </div>
    <p className={styles.intro}>{en ? 'Questions and ideas are welcome. Sign in with GitHub to comment; replies are public and shared between the Korean and English versions.' : '질문이나 의견을 남겨 주세요. GitHub 로그인 후 작성할 수 있고, 댓글은 공개되며 한국어·영어 글에서 함께 보여요.'}</p>
    {!requested && <button className={styles.button} type="button" onClick={() => setRequested(true)}>{en ? 'Load comments' : '댓글 불러오기'}</button>}
    <p className={styles.status} role="status">{status === 'loading' ? (en ? 'Loading comments…' : '댓글을 불러오고 있어요…') : status === 'error' ? (en ? 'Comments could not be loaded. Try again or continue on GitHub.' : '댓글을 불러오지 못했어요. 다시 시도하거나 GitHub에서 확인해 주세요.') : ''}</p>
    {status === 'error' && <button className={styles.button} type="button" onClick={() => setAttempt(value => value + 1)}>{en ? 'Try again' : '다시 시도'}</button>}
    <div ref={container} className={styles.widget}>
      {requested && status !== 'idle' && status !== 'error' && blogComments.categoryId && <Giscus key={`${locale}:${term}:${attempt}`} repo={blogComments.repo} repoId={blogComments.repoId} category={blogComments.category} categoryId={blogComments.categoryId} mapping="specific" term={term} strict="1" reactionsEnabled="1" emitMetadata="1" inputPosition="top" theme={theme} lang={locale} loading="eager" />}
    </div>
    <noscript><p>{en ? 'Enable JavaScript to load comments, or open the discussion on GitHub.' : '댓글을 불러오려면 JavaScript를 켜거나 GitHub에서 확인해 주세요.'}</p></noscript>
  </section>;
}
