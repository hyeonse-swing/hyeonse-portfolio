import type { MetadataRoute } from 'next';
import { workIds } from '../data/localized';
import { localizedPath } from '../lib/locale';
import { siteUrl } from '../lib/metadata';

export const dynamic = 'force-static';

const paths = ['/', '/about/', '/studio/', ...workIds.map(id => `/work/${id}/`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap(path => {
    const ko = new URL(path, siteUrl).href;
    const en = new URL(localizedPath('en', path), siteUrl).href;
    const alternates = { languages: { ko, en, 'x-default': ko } };

    return [{ url: ko, alternates }, { url: en, alternates }];
  });
}
