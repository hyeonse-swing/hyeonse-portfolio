import { notFound } from 'next/navigation';
import NotesPage from '../../../../../components/NotesPage';
import { getNoteListPages, getNotesPage } from '../../../../../lib/notes';
import { noteListMetadata } from '../../../../../lib/note-list-metadata';

type Props = { params: Promise<{ page: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return getNoteListPages().filter(entry => entry.locale === 'ko' && entry.page > 1).map(entry => ({ page: String(entry.page) }));
}

function listing(page: string) {
  const pagination = getNotesPage('ko', Number(page));
  if (!pagination || pagination.page === 1 || String(pagination.page) !== page) notFound();
  return pagination;
}

export async function generateMetadata({ params }: Props) {
  return noteListMetadata('ko', listing((await params).page).page);
}

export default async function Page({ params }: Props) {
  return <NotesPage locale="ko" pagination={listing((await params).page)} />;
}
