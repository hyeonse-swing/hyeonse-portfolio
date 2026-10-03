import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import SiteDocument from '../../components/SiteDocument';
import { rootMetadata } from '../../lib/metadata';

export const metadata = rootMetadata('en');
export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }, { media: '(prefers-color-scheme: dark)', color: '#111318' }] };

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
