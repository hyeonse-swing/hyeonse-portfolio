import ArchivePage from '../../../../components/ArchivePage';
import { pageMetadata } from '../../../../lib/metadata';

export const metadata = pageMetadata('ko', '/work/archive/', '작업 아카이브', '프론트엔드 엔지니어 임현세가 참여한 다른 작업과 기여를 모았어요.');
export default function Page() { return <ArchivePage locale="ko" />; }
