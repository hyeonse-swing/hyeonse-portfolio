import AboutPage from '../../../components/AboutPage';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('ko', '/about/', '맡아온 일과 일하는 방식', 'SWING·SWAP·Yellow Bus의 고객 웹·웹뷰와 운영 도구에서 맡은 일, 기술적 판단과 협업 경험을 소개합니다.');
export default function Page() { return <AboutPage locale="ko" />; }
