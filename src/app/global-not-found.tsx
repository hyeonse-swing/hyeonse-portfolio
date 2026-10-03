import type { Metadata } from 'next';
import '../styles/fonts.css';
import '../styles/global.css';
import '../styles/tokens.css';
import { preferenceScript } from '../lib/preferences';

export const metadata: Metadata = { title: 'Page not found | Hyeonse Im', robots: { index: false, follow: true } };

export default function GlobalNotFound() {
  return <html lang="ko" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: preferenceScript }} /></head><body><main id="main"><section className="not-found" id="top"><span className="eyebrow">PAGE NOT FOUND</span><h1 lang="en">Wrong turn<span className="blue">.</span></h1><p>이 페이지는 찾을 수 없지만, 작업은 여기 있습니다.</p><p lang="en">This page is missing, but the work is still here.</p><div className="not-found-links"><a className="text-link" href="/#work" lang="ko">한국어 · 작업 보기 ↗</a><a className="text-link" href="/en/#work" lang="en">English · View work ↗</a></div></section></main></body></html>;
}
