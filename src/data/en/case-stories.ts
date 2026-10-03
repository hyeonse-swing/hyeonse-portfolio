import type { CaseStory } from '../case-stories';

export const caseStoriesEn: Record<string, CaseStory> = {
  'bike-operations': {
    overview: [
      'Orders, contracts, and vehicle handovers in the bike business involved both staff operations and business customers checking their information. The legacy system and manual processes remained in use while the new system was built.',
      'I handled frontend development across this project, building the staff Admin and then a portal where business customers could check their subscriptions and payments. I prepared screens for the new data model and aligned API contracts with the backend team.',
    ],
    scope: ['Staff order and contract Admin', 'Business portal and payment return flow', 'API contract coordination', 'Playwright E2E and manual checks'],
    collaboration: 'I turned the planner’s wireframes into screens following existing Admin patterns and coordinated user-type values and response fields with the backend team. The backend team handled legacy data migration and consistency fixes.',
    decisions: [
      {
        title: 'Separated where orders and contracts begin',
        context: 'Staff handled the first order and contract delivery after a sale; business customers needed to check their contracts and payment status.',
        choice: 'I split the screens so staff could create orders and send contracts in Admin, while business customers could sign in to My Page to check contracts, unpaid and paid amounts, and their current plan.',
      },
      {
        title: 'Checked the workflow before the API was finalized',
        context: 'Return, handover, and insurance-change screens had to move forward before their APIs were finalized.',
        choice: 'I used fixtures for a nonproduction environment to validate the screens and workflow first, documenting the APIs, fields, and areas to replace during real integration.',
        check: 'Once the actual request and response contracts were available, I connected the vehicle, store, and insurance screens to them and adjusted the UI to remain compatible with existing field representations.',
      },
      {
        title: 'Distinguished different workflows within one user model',
        context: 'We expected a separate model for business customers, but they and regular users shared a model and were distinguished by a type value. Business customers could also use regular SWAP services.',
        choice: 'I aligned the type value with the backend team, kept regular-service flows available, and separated business-only menus, pages, and APIs. The frontend handled guidance and navigation after access was denied.',
      },
      {
        title: 'Found a response shape that automation had missed',
        context: 'Automation based on B2B responses passed, but in B2C responses the business-information object itself was absent, leaving necessary information invisible on the screen.',
        choice: 'I requested a backend response fix and updated the UI conditions by user type. I redefined the case and repeated both automated and direct screen checks.',
      },
    ],
    verification: [
      { title: 'Workflow', detail: 'I first checked return, handover, and insurance changes with nonproduction fixtures, then integrated them against the actual API contracts.' },
      { title: 'User types', detail: 'I checked B2B and B2C edge cases with Playwright E2E and direct screen inspection, repeating both after the fix.' },
      { title: 'Usage scope', detail: 'I developed the staff flow for first orders and sending contracts. By July 2026, I had also connected the portal flow for business customers to view subscription, unpaid, and payment status and return after payment-method handling. Actual adoption and reductions in manual work were not measured separately.' },
    ],
    takeaway: 'I kept areas with undefined APIs separate while checking the workflow early. When actual data differed from our assumptions, I revised the UI and realigned the contract and user experience.',
  },
  'swing-home-performance': {
    overview: [
      'The SWING homepage was slow to show its first screen and transferred a large amount of data initially. Its rendering structure, media, fonts, and external content all contributed to initial load time.',
      'While migrating the Next.js structure, I reduced initial costs by resource type. I compared before and after results with local mobile Lighthouse runs under the same conditions, then addressed a first-image-conversion delay observed in production.',
    ],
    scope: ['Next.js rendering structure', 'Media and font optimization', 'Lighthouse measurement', 'Follow-up production image improvement'],
    collaboration: 'The work aimed to improve initial rendering while preserving the customer-facing design. I compared font transfer cost alongside the original weight styling instead of choosing by score alone.',
    decisions: [
      {
        title: 'Shortened the path to the first visible screen',
        context: 'The previous page combined a wait for client rendering with large initial resources.',
        choice: 'I moved from Pages Router to a server-first App Router structure and prerendered the Korean and English routes.',
        check: 'I checked Korean and English routes and responsive layouts in a local production build.',
      },
      {
        title: 'Loaded initial resources when needed',
        context: 'The hero GIF, external content, and multiple font files increased initial transfer size.',
        choice: 'I replaced the GIF with an MP4 and WebP poster and loaded external content as it approached the viewport.',
      },
      {
        title: 'Balanced a lighter font against the intended design',
        context: 'Using only a regular font sometimes scored better, but could lose the original design’s weight distinctions.',
        choice: 'After comparing options, I chose a variable WOFF2 subset that preserved weight styling while reducing requests.',
        check: 'In a separate local font comparison, requests fell from 4 to 1.',
      },
      {
        title: 'Moved conversion cost seen in production to build time',
        context: 'After the initial improvement, a delay appeared when images were converted for the first time in production.',
        choice: 'Instead of converting on request, I generated 106 responsive WebP assets from 34 originals at build time and served them as static assets.',
        check: 'In follow-up local checks, I inspected image conversion requests and broken images across Korean and English routes.',
      },
    ],
    verification: [
      { title: 'Before and after under the same conditions', detail: 'For a local production build with Lighthouse mobile simulation, I compared the medians of 3 runs before and 5 after. Performance rose from 54 to 95 points, and initial transfer fell from 19.805 to 0.488 MB.' },
      { title: 'Font choice', detail: 'In a separate font comparison measured 5 times under the same local conditions, requests fell from 4 and 186.9 KB to 1 and 109.6 KB. This was separate from the full-homepage measurement.' },
      { title: 'Image follow-up', detail: 'After moving image generation to build time, local production checks recorded 0 image conversion requests and 0 broken images across 10 Korean and English routes.' },
    ],
    takeaway: 'I followed local measurements with observations from production, moved the newly identified image cost to build time, and checked the result again.',
  },
  'yellow-bus': {
    overview: [
      'When Yellow Bus was acquired, student, dispatch, and route work was split across generations of operations tools. Internal staff and academies also used different features and permissions.',
      'I helped assess the early technical debt and migration approach. Starting with login and basic UI, I moved existing features into an operations flow in a React and TypeScript Admin, aligning data contracts and access scope as well as screens.',
    ],
    scope: ['Legacy operations migration', 'Staff and academy permissions', 'Dispatch, boarding, and monitoring', 'Maps and schedule printing'],
    collaboration: 'After preparing login and basic UI, I requested APIs from the backend by feature. I reconciled legacy data shapes with new responses while organizing features used by internal staff and academies.',
    decisions: [
      {
        title: 'Connected features as their APIs became ready',
        context: 'Not all operations APIs were ready when authentication and basic UI for the new Admin were in place.',
        choice: 'I proposed defining the required endpoints and data shapes feature by feature, then connecting screens in order as APIs became available.',
      },
      {
        title: 'Carried legacy data exceptions into the new response',
        context: 'The student list had to handle real records with no guardian information or with multiple guardians.',
        choice: 'I coordinated the response shape with the backend against the legacy operations screen and defined missing and multiple guardian cases as UI exceptions.',
        check: 'The backend shared a revised response proposal, and I continued the list screen against that contract.',
      },
      {
        title: 'Brought changing trip information into one screen',
        context: 'Academy staff needed to inspect and change dispatches and routes by date alongside student boarding status and pickup and drop-off locations.',
        choice: 'I connected dispatch lookup, a map of multiple routes, boarding-status and stop changes, and access restrictions in the new operations screen. Monitoring used data polling; route and stop management used Kakao Map.',
      },
      {
        title: 'Proposed search for unknown stop names',
        context: 'If an operator did not know a stop’s exact name, name search alone made it hard to find.',
        choice: 'I proposed searching by address or selecting from stops associated with the academy.',
      },
    ],
    verification: [
      { title: 'API collaboration', detail: 'After login and basic UI, I requested APIs by feature and coordinated a response proposal with the backend for exception data in the student list.' },
      { title: 'Operations screen', detail: 'I implemented an operations screen with academy dispatch lookup, multiple routes, boarding-status and pickup and drop-off stop changes, and access restrictions. The related changes were merged.' },
      { title: 'Follow-up operations features', detail: 'Bulk registration of student boarding schedules and locations followed. The functions needed for operations in the new Admin were connected in stages.' },
    ],
    takeaway: 'I first clarified who operated each step and the order of the trip workflow. I carried data exceptions and staff-versus-academy permission differences into the new flow.',
  },
  'swap-admin-v2': {
    overview: [
      'When V2 screens and the Fleet API were introduced to the SWAP operations Admin, legacy task lookup paths remained. The data and screens did not change at one instant.',
      'As SWAP FE Part Lead, I contributed to the Admin V2 release through major feature development, technical review, and code review. I worked on connecting subscription, task, and factoring screens, version-aware navigation, permissions, and operations menus with the new paths.',
    ],
    scope: ['Subscription, task, and factoring V2', 'Fleet API integration', 'Version-aware navigation', 'Permissions and sidebar transition'],
    collaboration: 'Since September 2025, I have handled technical decisions, development, and review for SWAP FE. V2 was a team release; I helped coordinate how screens, APIs, and operations paths fit together.',
    decisions: [
      {
        title: 'Accounted for new screens and legacy lookup paths',
        context: 'Legacy task data still needed a lookup path while V2 task screens were introduced.',
        choice: 'Within the Admin V2 transition, I worked on the coexistence of new Fleet API screens and legacy paths. At release time, task details attempted V2 first and queried V1 if the request failed.',
      },
      {
        title: 'Navigated according to the data version',
        context: 'The entry point for a task could differ from the version of its actual data.',
        choice: 'The transition included checking the version on the legacy detail screen and routing V2 tasks to their corresponding detail screen.',
      },
      {
        title: 'Moved adjacent operations paths as well',
        context: 'Changing only subscription and task screens could break staff menus, access permissions, payment lookup, and bulk-work flows.',
        choice: 'I contributed to the transition of operations features including permissions, the sidebar, payment lookup, and bulk work.',
      },
    ],
    verification: [
      { title: 'Admin V2 release', detail: 'The Admin release including subscription, task, and factoring V2 screens and Fleet API integration was merged in December 2025.' },
      { title: 'Coexisting task details', detail: 'At release time, task details queried V2 first and had a V1 lookup path when the request failed. The production error rate for this path was not measured separately.' },
    ],
    takeaway: 'Navigation and lookup while legacy data remained mattered as much as connecting the new API and screens. This experience covers the SWAP operations Admin transition.',
  },
};
