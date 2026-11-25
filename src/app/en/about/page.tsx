import AboutPage from '../../../components/AboutPage';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('en', '/about/', 'About', 'Selected case studies, personal tools, and experience from Hyeonse Im, a frontend engineer.');
export default function Page() { return <AboutPage locale="en" />; }
