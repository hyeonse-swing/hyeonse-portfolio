import NotesPage from '../../../components/NotesPage';
import { getNotes } from '../../../lib/notes';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('ko', '/notes/', '프로젝트 기록', '프로젝트와 업무에서 마주한 문제, 선택, 검증 과정을 기록해요.');
export default function Page() { return <NotesPage locale="ko" notes={getNotes('ko')} />; }
