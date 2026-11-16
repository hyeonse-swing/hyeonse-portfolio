import NotesPage from '../../../components/NotesPage';
import { getNotesPage } from '../../../lib/notes';
import { noteListMetadata } from '../../../lib/note-list-metadata';

export const metadata = noteListMetadata('ko');
export default function Page() { return <NotesPage locale="ko" pagination={getNotesPage('ko')!} />; }
