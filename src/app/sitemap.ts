import type { MetadataRoute } from 'next';
import { workIds } from '../data/localized';
import { localizedPath } from '../lib/locale';
import { siteUrl } from '../lib/metadata';
import { getAllNotes, getNoteListPages } from '../lib/notes';

export const dynamic = 'force-static';

const paths = ['/', '/about/', '/work/archive/', '/studio/', ...workIds.map(id => `/work/${id}/`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = paths.flatMap(path => {
    const ko = new URL(path, siteUrl).href;
    const en = new URL(localizedPath('en', path), siteUrl).href;
    const alternates = { languages: { ko, en, 'x-default': ko } };

    return [{ url: ko, alternates }, { url: en, alternates }];
  });
  const notes = getAllNotes();
  const listings = getNoteListPages(notes);
  const listingPages = listings.map(entry => {
    const languages = Object.fromEntries(listings.filter(other => other.page === entry.page)
      .map(other => [other.locale, new URL(localizedPath(other.locale, other.path), siteUrl).href]));
    return { url: new URL(localizedPath(entry.locale, entry.path), siteUrl).href, alternates: { languages: { ...languages, 'x-default': languages.ko ?? languages.en } } };
  });
  return [...pages, ...listingPages, ...notes.map(note => {
    const path = `/notes/${note.slug}/`;
    const languages = Object.fromEntries(notes.filter(other => other.slug === note.slug).map(other => [other.locale, new URL(localizedPath(other.locale, path), siteUrl).href]));
    return { url: new URL(localizedPath(note.locale, path), siteUrl).href, lastModified: note.updated ?? note.date, alternates: { languages: { ...languages, 'x-default': languages.ko ?? languages.en } } };
  })];
}
