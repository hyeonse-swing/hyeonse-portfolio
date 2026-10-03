import AboutPage from '../../../components/AboutPage';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('en', '/about/', 'My work and approach', 'My roles, technical decisions and collaboration across customer websites, WebViews and operations tools at SWING, SWAP and Yellow Bus.');
export default function Page() { return <AboutPage locale="en" />; }
