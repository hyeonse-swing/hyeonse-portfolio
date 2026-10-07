import type { Metadata } from 'next';
import { localizedPath, type Locale } from './locale';
import { getPortfolio } from '../data/localized';

// Keep preview metadata on its own host unless NEXT_PUBLIC_SITE_URL overrides it.
const deploymentHost = (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL)
  || process.env.VERCEL_PROJECT_PRODUCTION_URL
  || process.env.VERCEL_URL;
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || (deploymentHost ? `https://${deploymentHost}` : 'http://127.0.0.1:4322'));

export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: localizedPath(locale, path), languages: { ko: path, en: localizedPath('en', path), 'x-default': path } },
    openGraph: { title, description, url: localizedPath(locale, path), type: 'website', locale: locale === 'ko' ? 'ko_KR' : 'en_US', alternateLocale: locale === 'ko' ? 'en_US' : 'ko_KR', images: [{ url: '/social.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function rootMetadata(locale: Locale): Metadata {
  const { profile } = getPortfolio(locale);
  return {
    metadataBase: siteUrl,
    title: { default: locale === 'ko' ? '임현세 — Frontend Engineer' : 'Hyeonse Im — Frontend Engineer', template: locale === 'ko' ? '%s | 임현세' : '%s | Hyeonse Im' },
    description: profile.identity.headline,
    icons: { icon: '/favicon.svg' },
  };
}
