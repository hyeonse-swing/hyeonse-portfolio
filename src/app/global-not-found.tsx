import type { Metadata } from 'next';
import '../styles/fonts.css';
import '../styles/global.css';
import '@hyeonse/design-system/tokens.css';
import '@hyeonse/design-system/components.css';
import { preferenceDefaults, preferenceScript } from '../lib/site-preferences';

export const metadata: Metadata = { title: 'Page not found | Hyeonse Im', robots: { index: false, follow: true } };

export default function GlobalNotFound() {
  return <html lang="ko" data-corners={preferenceDefaults.corners} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: preferenceScript }} /></head><body><main id="main"><section className="not-found" id="top"><span className="eyebrow">PAGE NOT FOUND</span><h1 lang="en">Page not found<span className="blue">.</span></h1><p>페이지를 찾을 수 없어요. 아래 링크에서 작업을 살펴보세요.</p><p lang="en">This page could not be found. Use the links below to explore my work.</p><div className="not-found-links"><a className="text-link" href="/#work" lang="ko">한국어 · 작업 보기 ↗</a><a className="text-link" href="/en/#work" lang="en">English · View work ↗</a></div></section></main></body></html>;
}
