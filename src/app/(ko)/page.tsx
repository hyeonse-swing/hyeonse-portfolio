import HomePage from '../../components/HomePage';
import { getPortfolio } from '../../data/localized';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('ko', '/', '임현세 — Frontend Engineer', getPortfolio('ko').profile.identity.headline);
export default function Page() { return <HomePage locale="ko" />; }
