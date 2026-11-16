import NotesPage from '../../../components/NotesPage';
import { getNotes } from '../../../lib/notes';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('en', '/notes/', 'Notes', 'Things I have built, problems I have worked through, and notes along the way.');
export default function Page() { return <NotesPage locale="en" notes={getNotes('en')} />; }
