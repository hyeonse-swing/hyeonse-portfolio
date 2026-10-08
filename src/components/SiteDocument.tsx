import type { ReactNode } from 'react';
import { getPortfolio } from '../data/localized';
import '../styles/fonts.css';
import '../styles/global.css';
import '@hyeonse/design-system/tokens.css';
import '@hyeonse/design-system/components.css';
import { PreferencesProvider, ThemeToggle } from './SitePreferences';
import { preferenceScript } from '@hyeonse/design-system/preferences';
import { localizedPath, type Locale } from '../lib/locale';
import LanguageSwitcher from './LanguageSwitcher';

export default function SiteDocument({ children, locale }: { children: ReactNode; locale: Locale }) {
  const { profile, siteCopy } = getPortfolio(locale);
  const en = locale === 'en';
  return <html lang={locale} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: preferenceScript }} /><link rel="preload" href="/fonts/dm-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/noto-kr-subset.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><PreferencesProvider>
    <a className="skip-link" href="#main" tabIndex={0}>{en ? 'Skip to content' : '본문으로 건너뛰기'}</a>
    <header className="site-header">
      <a className="wordmark" href={localizedPath(locale, '/')} aria-label={en ? 'im. — Hyeonse Im home' : 'im. — 임현세 홈'} tabIndex={0}>im<span aria-hidden="true">.</span></a>
      <nav aria-label={en ? 'Main navigation' : '주요 메뉴'}><a href={localizedPath(locale, '/#work')} tabIndex={0}>Work<span>04</span></a><a href={localizedPath(locale, '/about/')} tabIndex={0}>About</a><a href={localizedPath(locale, '/studio/')} tabIndex={0}>Studio</a><ThemeToggle locale={locale} /><LanguageSwitcher locale={locale} /></nav>
    </header>
    <main id="main">{children}</main>
    <footer id="contact" className="contact">
      <div className="contact-top"><span className="eyebrow">{siteCopy.contact.eyebrow}</span><span className="eyebrow">{siteCopy.contact.lead}</span></div>
      <a className="contact-title" href={`mailto:${profile.identity.email}`} tabIndex={0}>{siteCopy.contact.title}<span aria-hidden="true">↗</span></a>
      <div className="contact-links"><a href={`mailto:${profile.identity.email}`} tabIndex={0}>{profile.identity.email} <span aria-hidden="true">↗</span></a><div><a href={profile.identity.github} target="_blank" rel="noopener noreferrer" tabIndex={0}>GitHub ↗</a><a href={profile.identity.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={0}>LinkedIn ↗</a></div></div>
      <div className="footer-baseline"><span>© 2026 HYEONSE IM</span><span><a href={localizedPath(locale, '/studio/')}>{en ? 'Inside this site' : '이 사이트의 작업실'} ↗</a></span><a href="#top" tabIndex={0}>BACK TO TOP ↑</a></div>
    </footer>
  </PreferencesProvider></body></html>;
}
