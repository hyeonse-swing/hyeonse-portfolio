import HomePage from '../../components/HomePage';
import { getPortfolio } from '../../data/localized';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('en', '/', 'Hyeonse Im — Frontend Engineer', getPortfolio('en').profile.identity.headline);
export default function Page() { return <HomePage locale="en" />; }
