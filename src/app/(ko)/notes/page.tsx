import NotesPage from '../../../components/NotesPage';
import { getNotes } from '../../../lib/notes';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('ko', '/notes/', '기록', '만들어 본 것, 막혔던 문제, 그 과정에서 배운 것을 적어요.');
export default function Page() { return <NotesPage locale="ko" notes={getNotes('ko')} />; }
