import NotesPage from '../../../components/NotesPage';
import { getNotes } from '../../../lib/notes';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('ko', '/notes/', '프로젝트 기록', '직접 만들고 운영하는 프로젝트의 문제와 선택을 기록합니다.');
export default function Page() { return <NotesPage locale="ko" notes={getNotes('ko')} />; }
