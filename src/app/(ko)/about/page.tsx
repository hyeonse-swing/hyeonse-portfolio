import AboutPage from '../../../components/AboutPage';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('ko', '/about/', '소개', '프론트엔드 엔지니어 임현세의 대표 사례, 직접 만든 도구와 경력을 소개해요.');
export default function Page() { return <AboutPage locale="ko" />; }
