import ArchivePage from '../../../../components/ArchivePage';
import { pageMetadata } from '../../../../lib/metadata';

export const metadata = pageMetadata('en', '/work/archive/', 'Work archive', 'More projects and contributions from Hyeonse Im\'s frontend work.');
export default function Page() { return <ArchivePage locale="en" />; }
