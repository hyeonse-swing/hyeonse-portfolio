import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NotePage from '../../../../components/NotePage';
import { getNote, getNoteLocales, getNotes, getRelatedNotes } from '../../../../lib/notes';
import { localizedPath } from '../../../../lib/locale';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getNotes('en').map(note => ({ slug: note.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote('en', slug);
  if (!note) notFound();
  const locales = getNoteLocales(slug);
  const path = `/notes/${slug}/`;
  const canonical = localizedPath('en', path);
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = localizedPath(locale, path);
  languages['x-default'] = localizedPath(locales.includes('ko') ? 'ko' : 'en', path);
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical, languages },
    openGraph: { title: note.title, description: note.description, url: canonical, type: 'article', publishedTime: note.date, modifiedTime: note.updated, locale: 'en_US', images: [{ url: '/social.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: note.title, description: note.description },
  };
}

export default async function Page({ params }: Props) {
  const note = getNote('en', (await params).slug);
  if (!note) notFound();
  return <NotePage note={note} relatedNotes={getRelatedNotes(getNotes('en'), note)} />;
}
