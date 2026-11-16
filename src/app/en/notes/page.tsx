import NotesPage from '../../../components/NotesPage';
import { getNotes } from '../../../lib/notes';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('en', '/notes/', 'Project notes', 'Decisions, experiments, and fixes from personal projects.');
export default function Page() { return <NotesPage locale="en" notes={getNotes('en')} />; }
