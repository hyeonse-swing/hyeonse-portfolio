import StudioPage from '../../../components/StudioPage';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata('en', '/studio/', 'Inside this site', 'Try different colors, spacing, corners and motion settings. Explore the design and implementation behind this portfolio.');
export default function Page() { return <StudioPage locale="en" />; }
