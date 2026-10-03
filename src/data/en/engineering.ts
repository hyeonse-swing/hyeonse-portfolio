import type { EngineeringStory } from '../engineering';

export const caseEngineeringEn: Record<string, EngineeringStory> = {
  'bike-operations': {
    lead: 'In Admin, I developed screens separately from APIs that were still undefined. Later, in the business portal, I opened data lookups in the order of authentication, access check, and store selection. I handled changes in user type and response shape explicitly.',
    stack: ['React', 'TypeScript', 'TanStack Query · Admin', 'SWR · Portal', 'Zustand', 'Playwright'],
    flow: [
      { title: 'Authentication ready', detail: 'Restore saved auth state and complete initialization' },
      { title: 'Access check', detail: 'Fetch store access summary and list' },
      { title: 'Store selection', detail: 'Fetch details and subscriptions with an ID from the list' },
      { title: 'Refresh after change', detail: 'Apply payment results and refetch billing' },
    ],
    flowCaption: 'A condensed view of the business portal’s actual data-fetch sequence.',
    details: [
      { label: 'API CONTRACT', title: 'Started with fixtures and corrected differences in real responses', body: 'Before the APIs were defined, I checked return, handover, and insurance-change screens with nonproduction fixtures. In the real integration, I incorporated the discriminator in the shared user model. In particular, I found B2C responses where the business-information object itself was absent, and worked with the backend to correct the response contract while updating UI conditions and test cases.' },
      { label: 'DEPENDENT FETCHING', title: 'Held downstream requests until access was checked', body: 'After restoring auth state from Zustand and completing initialization, the portal checked the access summary, then fetched the store list and selected store details in sequence. Null SWR keys deferred requests until their conditions were met. Sign-in required, access denied, and lookup error appeared as separate entry states.' },
      { label: 'STATE & CACHE', title: 'Aligned selection state and payment results with real data', body: 'The store was chosen from the URL, saved selection, then single-store default, in that order; only IDs present in the list were used for detail lookups. After payment, only successful items were applied to the SWR cache and the billing list was refetched. Partial failure, complete failure, and request exceptions each received separate guidance.' },
      { label: 'RETURN FLOW', title: 'Consumed the return location from external authentication once', body: 'When payment-method registration began, the portal saved the return location in sessionStorage and opened authentication through the app bridge. The result screen read and deleted the saved value, then navigated only if it was a same-origin portal path. Without a valid return location, the flow continued to the existing payment-method screen.' },
    ],
  },
  'swing-home-performance': {
    lead: 'I examined rendering, browser resources, and per-request server work separately. I prepared what the first screen needed early, leaving interaction and external content where they were needed.',
    stack: ['Next.js App Router', 'Server Components', 'IntersectionObserver', 'sharp', 'next/image', 'WOFF2'],
    flow: [
      { title: 'Build', detail: 'Generate pages by language and image variants' },
      { title: 'First response', detail: 'Serve prepared HTML and video poster' },
      { title: 'Interaction', detail: 'Load client code for menu and carousel' },
      { title: 'Scroll', detail: 'Load external content near the viewport' },
    ],
    flowCaption: 'The work needed for initial display and later interaction, shown separately.',
    details: [
      { label: 'RENDERING', title: 'Narrowed the client boundary to interactive parts', body: 'I generated language routes with generateStaticParams and read translation dictionaries on the server. Pages and layouts used Server Components; parts requiring state and events, such as the menu, became separate Client Components.' },
      { label: 'LOADING', title: 'Mounted the iframe when it approached the viewport', body: 'IntersectionObserver created the iframe when the news section came within 300px of the viewport, then stopped observing. Space of the same height was reserved before loading. A fallback load path kept the content available when the browser did not support the observation API.' },
      { label: 'ASSET PIPELINE', title: 'Removed conversion work from image requests', body: 'At build time, sharp corrected rotation, resized images to target widths, and generated WebP files. The custom next/image loader chose a variant at least as wide as requested and returned a static file URL. Unregistered images used their original path, and generated files were separated by versioned paths.' },
      { label: 'FONT', title: 'Preserved font weights while adjusting initial request priority', body: 'One variable WOFF2 subset covered the weights in use and was connected through next/font/local. To account for the hero poster’s initial priority, I disabled font preload and used display: swap. I checked the effect of this choice in a separate font comparison.' },
    ],
  },
  'yellow-bus': {
    lead: 'The operations screen needed academy, date, time, and dispatch selections to stay consistent between the list and map. I separated fetch state from selection state and connected successful changes to a refetch of the relevant trip data.',
    stack: ['React', 'TypeScript', 'React Context', 'TanStack Query', 'Kakao Map', 'Drag & Drop'],
    flow: [
      { title: 'Choose conditions', detail: 'Look up dispatches by academy, date, and time' },
      { title: 'Inspect map', detail: 'Show multiple routes for the selected dispatch' },
      { title: 'Edit trip', detail: 'Change boarding status and pickup or drop-off stops' },
      { title: 'Refresh data', detail: 'Invalidate related query caches' },
    ],
    flowCaption: 'The lookup, selection, and edit flow in the trip information tab.',
    details: [
      { label: 'STATE MODEL', title: 'Cleared downstream selections when an upstream condition changed', body: 'React Context managed selected academy, date, time, dispatch, and map focus. Changing academy reset prior selections; changing date cleared time and route selections. This kept dispatches from prior conditions out of the new selection.' },
      { label: 'QUERY & MAP', title: 'Separated automatic from user-triggered lookups', body: 'The time list used useQuery; dispatches and routes were requested explicitly through useMutation. Route requests were blocked without a selected dispatch or while another lookup was in progress. With one route the map focused on that dispatch; with multiple, it centered on the academy and highlighted the selected route with a Polyline.' },
      { label: 'INVALIDATION', title: 'Refetched data related to the changed dispatch', body: 'After boarding status or stop changes succeeded, I invalidated the query keys for that dispatch’s details, student schedules, and stop list. Related lookups then refreshed from the server result instead of only changing local display values.' },
      { label: 'INTERACTION RULES', title: 'Constrained moves even when dragging was available', body: 'When a student’s pickup or drop-off stop was dragged, I checked for the same stop, route direction and departure or arrival constraints, and whether boarding and drop-off order would reverse. Only valid moves reached the change-confirmation dialog.' },
    ],
  },
  'swap-admin-v2': {
    lead: 'V2 involved more than renaming screens. We connected navigation to the data version and integrated new API responses while also handling detail and contract workflows that still used legacy APIs.',
    stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'Suspense', 'ErrorBoundary'],
    flow: [
      { title: 'Open details', detail: 'Fetch task data from the legacy URL' },
      { title: 'Check version', detail: 'Use the task version in the response' },
      { title: 'Move to V2', detail: 'Navigate to the new detail route with replace' },
      { title: 'Continue operations', detail: 'Keep new and legacy API workflows available' },
    ],
    flowCaption: 'Version-aware navigation in screens migrated with the team.',
    details: [
      { label: 'ROUTING', title: 'Navigated by the actual data version, not the URL', body: 'The legacy task detail checked the version in the response and sent V2 data to the new detail screen. Navigation used replace so the transitional entry URL did not add another browser-history entry.' },
      { label: 'LIST CONTRACT', title: 'Aligned filters, pages, and API responses in one flow', body: 'The factoring list managed filter and page state together and omitted empty filter values from lookups. A filter change returned to the first page; the Fleet API’s total count and page were connected to table pagination.' },
      { label: 'MIGRATION BOUNDARY', title: 'Split API migration within the screen as well', body: 'New lists used Fleet API page responses, while related detail, contract, and attachment workflows still had legacy API paths. I contributed to the team release connecting new entry screens for subscriptions, tasks, and factoring, with loading and error boundaries for the factoring V2 list built using Suspense and ErrorBoundary.' },
    ],
  },
};

export const technicalFocusEn: typeof import('../engineering').technicalFocus = [
  { title: 'React · TypeScript', subtitle: 'Screens and data contracts', detail: 'I built customer-facing and operations Admin screens, aligning response types, user types, form inputs, and error states. I kept fixtures used before an API was defined separate, then integrated the real responses.', href: '/work/bike-operations/#engineering', label: 'Data flow in the bike screens' },
  { title: 'TanStack Query · SWR', subtitle: 'Lookup conditions and refresh after changes', detail: 'I handled when a lookup could run, which conditions distinguished its data, and what to refetch after edits alongside each screen’s workflow.', href: '/work/yellow-bus/#engineering', label: 'Trip lookups and refresh' },
  { title: 'Next.js · Web performance', subtitle: 'Rendering and asset processing', detail: 'I separated server and client boundaries and prerendered pages. I changed when images were generated, when iframes loaded, and how fonts were requested, then compared results with local Lighthouse runs.', href: '/work/swing-home-performance/#engineering', label: 'Initial load path and build processing' },
  { title: 'WebView · QA', subtitle: 'App boundary and runtime environment', detail: 'I connected native bridges with web screens and handled return flows after payment. I paired Playwright automation with direct screen checks and built a public WebView QA shell.', href: '/#archive', label: 'WebView and public QA tool' },
];
