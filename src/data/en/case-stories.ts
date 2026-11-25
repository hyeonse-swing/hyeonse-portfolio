import type { CaseStory } from '../case-stories';

export const caseStoriesEn: Record<string, CaseStory> = {
  'bike-operations': {
    role: 'I built the frontend for staff Admin and the business portal, aligning API contracts with the backend team, which handled legacy data migration.',
    overview: 'Bike orders, contracts, and handovers involved both staff and business customers. Legacy tools and manual work remained in use while the new system was built.',
    decisions: [
      {
        title: 'Separate staff work from customer lookup',
        detail: 'Staff could create first orders and send contracts in Admin. Business customers could use the portal to view contracts, subscription plans, and unpaid and paid amounts.',
      },
      {
        title: 'Check workflows before APIs were finalized',
        detail: 'I checked return, handover, and insurance-change screens with nonproduction fixtures first. After the API contracts were available, I connected the vehicle, store, and insurance screens and adjusted legacy field representations.',
      },
      {
        title: 'Handle user types and response shapes',
        detail: 'Business customers shared a user model with regular users, so I kept ordinary SWAP use available while separating business-only menus, pages, and APIs. When a B2C response lacked the business-information object, I coordinated a backend response fix and updated the frontend conditions.',
      },
    ],
    verification: [
      { title: 'B2B and B2C screen checks', detail: 'I checked both user types with Playwright E2E and direct screen inspection, then repeated both after the response and UI fixes.' },
      { title: 'Portal flow', detail: 'By July 2026, I had connected the flow for business customers to view subscription and payment status and return after payment-method handling.' },
    ],
  },
  'swing-home-performance': {
    role: 'I improved the SWING homepage frontend across rendering, media, fonts, and image loading.',
    overview: 'The first screen appeared slowly and initial transfer was large. I examined how rendering, media, fonts, and external content affected loading.',
    decisions: [
      {
        title: 'Render and load the first screen',
        detail: 'I moved from Pages Router to a server-first App Router structure and prerendered Korean and English routes. I replaced the hero GIF with an MP4 and WebP poster and loaded external content near the viewport.',
      },
      {
        title: 'Preserve font weights while reducing requests',
        detail: 'A regular-only font could lose the original design’s weight distinctions. After a separate comparison, I chose a variable WOFF2 subset that kept them while reducing requests.',
      },
      {
        title: 'Move image conversion to the build',
        detail: 'After the initial improvements, I observed a first-image-conversion delay in production. I changed on-request conversion to build-time generation of 106 responsive WebP assets from 34 originals.',
      },
    ],
    verification: [
      { title: 'Image follow-up', detail: 'Local production checks after the image change recorded 0 image conversion requests and 0 broken images across 10 Korean and English routes.' },
    ],
  },
  'yellow-bus': {
    role: 'I built operations screens and API integrations in the new React and TypeScript Admin, coordinating data exceptions with the backend team.',
    overview: 'At acquisition, student, dispatch, and route work was spread across generations of tools. Internal staff and academies also needed different features and permissions.',
    decisions: [
      {
        title: 'Connect APIs feature by feature',
        detail: 'After preparing login and basic UI, I defined the endpoints and data shapes needed for each feature and requested them from the backend team. I connected screens as the APIs became available.',
      },
      {
        title: 'Handle real student data exceptions',
        detail: 'Some student records had no guardian information or multiple guardians. I aligned the response shape with the backend against the legacy operations screen and defined the UI conditions.',
      },
      {
        title: 'Bring trip operations together',
        detail: 'I connected date-based dispatch, a map of multiple routes, boarding status, pickup and drop-off stop changes, and access restrictions in the new operations screen. Monitoring used polling; route and stop management used Kakao Map.',
      },
    ],
    verification: [
      { title: 'Merge and follow-up', detail: 'The operations screen changes were merged, and I later connected bulk registration of student boarding schedules and locations.' },
    ],
  },
  'swap-admin-v2': {
    role: 'As SWAP FE Part Lead, I developed major screens, reviewed technical choices and code, and contributed to the team’s Admin V2 release.',
    overview: 'The V2 screens and Fleet API were introduced while legacy task data still needed a lookup path. Screens and data could not change all at once.',
    decisions: [
      {
        title: 'Keep new and legacy task lookups available',
        detail: 'At release time, task details tried the Fleet API V2 lookup first and used a V1 path if the request failed.',
      },
      {
        title: 'Navigate by data version',
        detail: 'The transition included checking task versions on the legacy detail screen and routing V2 tasks to their matching detail screen.',
      },
      {
        title: 'Align related operations paths',
        detail: 'I contributed to the transition of subscription, task, and factoring screens alongside permissions, the sidebar, payment lookup, and bulk-work flows.',
      },
    ],
    verification: [],
  },
};
