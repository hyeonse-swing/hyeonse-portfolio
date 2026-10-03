import { notFound } from 'next/navigation';
import WorkPage from '../../../../components/WorkPage';
import { getPortfolio, workIds } from '../../../../data/localized';
import { pageMetadata } from '../../../../lib/metadata';

type Props = { params: Promise<{ id: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return workIds.map(id => ({ id })); }
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const work = getPortfolio('ko').works.find(item => item.id === id);
  if (!work) notFound();
  return pageMetadata('ko', `/work/${id}/`, `${work.brand} — ${work.short}`, `${work.subtitle} ${work.context}`);
}
export default async function Page({ params }: Props) {
  return <WorkPage id={(await params).id} locale="ko" />;
}
