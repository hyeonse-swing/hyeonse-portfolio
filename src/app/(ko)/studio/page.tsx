import StudioPage from '../../../components/StudioPage';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('ko', '/studio/', '이 사이트의 작업실', '포트폴리오의 색, 간격, 모서리와 움직임을 직접 바꿔 보세요. 이 사이트의 디자인과 구현 방식도 소개합니다.');
export default function Page() { return <StudioPage locale="ko" />; }
