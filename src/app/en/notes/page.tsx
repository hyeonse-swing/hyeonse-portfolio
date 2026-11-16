import NotesPage from '../../../components/NotesPage';
import { getNotes } from '../../../lib/notes';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('en', '/notes/', 'Project notes', 'Problems, decisions, and verification from my work and personal projects.');
export default function Page() { return <NotesPage locale="en" notes={getNotes('en')} />; }
