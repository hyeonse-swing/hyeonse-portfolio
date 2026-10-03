import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import SiteDocument from '../../components/SiteDocument';
import { rootMetadata } from '../../lib/metadata';

export const metadata = rootMetadata('ko');
export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }, { media: '(prefers-color-scheme: dark)', color: '#111318' }] };

export default function KoreanLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="ko">{children}</SiteDocument>;
}
