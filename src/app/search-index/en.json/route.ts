import { buildSearchIndex } from '../../../lib/site-search-index';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(buildSearchIndex('en'));
}
