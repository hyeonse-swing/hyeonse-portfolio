import type { ProjectDetail } from '../career';

export const projectDetailsEn: Record<string, ProjectDetail> = {
  'swing-webview': {
    id: 'swing-webview',
    lead: 'I have worked for years on the screens customers see inside the app, checking how each feature connects the app and WebView, from product entry to membership, points, login, and payment.',
    contributions: [
      { title: 'Entry across products', detail: 'I built a WebView hub leading from an external service into other products in the app, with guidance tailored to each destination.' },
      { title: 'Points and membership', detail: 'I organized the membership purchase list and descriptions. When redesigning the points screen, I also handled existing history routes and Korean and English display.' },
      { title: 'Login and payment', detail: 'I contributed to changes in login and identity verification screens, then worked on the WebView flow for point top-ups, including the payment widget and return screen.' },
    ],
    tags: ['WebView', 'React', 'TypeScript', 'App bridge'],
  },
  'swing-admin': {
    id: 'swing-admin',
    lead: 'In tools operators use every day, I considered how a change in one menu affects other tasks.',
    contributions: [
      { title: 'Session and menu state', detail: 'I fixed UI issues around the order in which user details and menus update after login, expired sessions, and returning to an earlier screen.' },
      { title: 'Partner settlement lookup', detail: 'I built screens for finding and viewing partner settlement summaries and trip records by statement.' },
      { title: 'Organizing operations tools', detail: 'I migrated existing JavaScript and MUI features to TypeScript and Ant Design, and contributed to domain-specific Admin separation and monorepo integration.' },
    ],
    tags: ['Operations Admin', 'React', 'TypeScript', 'State management'],
  },
  'swap-customer': {
    id: 'swap-customer',
    lead: 'At SWAP, I worked across customer touchpoints, from the initial web, WebView, and Admin builds to product discovery, first orders, payment details, and the business portal.',
    contributions: [
      { title: 'Orders and payment display', detail: 'I separated accessory purchases from subscription inputs in first orders, connected receipt screens to server lookup results, and adjusted price display paths.' },
      { title: 'Login contract transition', detail: 'With the team, I migrated bicycle customer login to a new OAuth2 contract and addressed token-state races just after login along with signup and consent flows.' },
      { title: 'Product discovery and business portal', detail: 'I connected English product details and a quick-order path. For screens where businesses manage subscriptions, payment status, and payment methods, I handled access checks and post-payment return paths.' },
      { title: 'Bridge calls', detail: 'I added Flutter callHandler and JavaScriptChannel.postMessage paths alongside the existing Android and iOS calls. Depending on the channel, I passed objects or serialized JSON, and tried the next method if a call threw synchronously. A successful call was kept distinct from completed native processing.' },
    ],
    tags: ['React', 'TypeScript', 'SWR', 'Zustand', 'Flutter WebView'],
  },
  vox: {
    id: 'vox',
    lead: 'To connect voice AI with customer touchpoints, I reviewed vendors, product flows, and CX scenarios together.',
    contributions: [
      { title: 'Reviewing the introduction scope', detail: 'I compared PoC scope, cost, and integration requirements for overdue-payment reminders and follow-up calls, and coordinated guidance scenarios with the CX team.' },
      { title: 'Entry point in the product', detail: 'I connected the path into contract guidance from the returnable subscription completion screen and the return flow from the phone app.' },
      { title: 'Operational tracking', detail: 'I tracked usage and costs after integration. I do not interpret call count as completed consultations or resolved issues.' },
    ],
    tags: ['Product integration', 'CX collaboration', 'WebView'],
  },
  'ai-development': {
    id: 'ai-development',
    lead: 'I documented how to use AI-assisted development according to each project structure and verification criteria, then shared the approach with the FE team.',
    contributions: [
      { title: 'Repository-specific rules', detail: 'I created and improved development skills reflecting each project code structure and workflow.' },
      { title: 'Verification practices', detail: 'I explained dependency boundary checks in the SWAP monorepo, checks appropriate to the changed scope, and configuration backup and recovery.' },
      { title: 'Reviewing generated code', detail: 'I shared how I review AI-generated code for structure and complexity and choose only the changes that are needed.' },
    ],
    tags: ['Development practices', 'Code review', 'Team sharing'],
  },
  'webview-qa-shell': {
    id: 'webview-qa-shell',
    lead: 'A public QA tool for checking local or staging web services inside iOS and Android WebViews.',
    contributions: [
      { title: 'Real WebView environments', detail: 'I built a shell that opens screens in iOS WKWebView and Android WebView to check safe areas and navigation behavior.' },
      { title: 'Inspection panel', detail: 'I brought viewport, storage, and log checks together in a web console.' },
    ],
    tags: ['React Native', 'WebView', 'QA tool'],
    publicLink: { label: 'View public repository', href: 'https://github.com/hyeonse-swing/webview-qa-shell' },
  },
  deer: {
    id: 'deer',
    lead: 'I contributed to the handover and maintenance of an acquired shared-mobility service.',
    contributions: [
      { title: 'Maintaining an acquired service', detail: 'I learned the operations context of the existing service and contributed to frontend maintenance.' },
    ],
    tags: ['Acquired service', 'Maintenance'],
  },
  'swing-japan': {
    id: 'swing-japan',
    lead: 'On the Japan TF, I developed the website, back office, and WebViews and worked on screens and app connections for the Japanese service.',
    contributions: [
      { title: 'Japanese-language screens', detail: 'I localized UI text in WebViews for the Japanese service.' },
      { title: 'App bridge', detail: 'I contributed to the WebKit bridge that calls native functions from WebViews.' },
    ],
    tags: ['International service', 'WebView', 'App bridge'],
  },
  'swing-air': {
    id: 'swing-air',
    lead: 'I contributed to redevelopment of the website and back office for an acquired airport van service.',
    contributions: [
      { title: 'Customer and operations screens', detail: 'After the acquisition, I contributed to frontend redevelopment of the customer website and operations back office.' },
    ],
    tags: ['Acquired service', 'Customer web', 'Back office'],
  },
  opensource: {
    id: 'opensource',
    lead: 'I fixed a synchronization bug caused by changing options in a public library.',
    contributions: [
      { title: 'Dynamic option changes', detail: 'I fixed the selected position in react-wheel-picker when options change dynamically with a one-line change. The contribution PR was merged on June 30, 2025.' },
    ],
    tags: ['Open source', 'React', 'Bug fix'],
    publicLink: { label: 'View merged contribution', href: 'https://github.com/ncdai/react-wheel-picker/pull/54' },
  },
};

export const careerIntroductionEn: string[] = [
  'Since March 2022, I have built customer websites, WebViews, and operations tools at The SWING. Across SWING, SWAP, and Yellow Bus, my work has included early service builds, feature development, technical reviews, and service transitions.',
  'Since September 2025, I have served as SWAP FE Part Lead, working on technical decisions, major features, and code reviews. Alongside hands-on development, I align API changes, shared structures, and release decisions with colleagues.',
  'Much of my work involves learning the order in which operators do their jobs, aligning data contracts with backend colleagues, and checking how screens connect with app and CX colleagues.',
];

export const workAreasEn: { number: string; title: string; description: string; examples: string[] }[] = [
  { number: '01', title: 'Customer-facing screens', description: 'I build flows for finding and ordering products and for continuing login and payment inside an app.', examples: ['SWING customer WebViews', 'SWAP product discovery and first orders', 'Business portal'] },
  { number: '02', title: 'Operations tools', description: 'I work on screens where task order and permissions matter, such as contracts, dispatch, and settlement.', examples: ['Bike operations Admin', 'Yellow Bus operations', 'SWING partner settlement'] },
  { number: '03', title: 'Engineering and integration', description: 'I look at old and new systems working together, app bridges, screen performance, and verification practices.', examples: ['SWAP Admin V2', 'SWING website performance', 'WebView QA Shell'] },
];

export const workingNotesEn: { title: string; detail: string; example: string; href?: string }[] = [
  { title: 'I ask about the workflow first', detail: 'I check why a screen is needed and what the user does next, then identify API fields and exceptional states.', example: 'For the Yellow Bus student list, I discussed how the new response contract should handle missing or multiple guardians.', href: '/work/yellow-bus/' },
  { title: 'I check paths during transitions', detail: 'When adding a new screen, I check whether old data and navigation paths remain and plan how to connect them.', example: 'In SWAP Admin V2, I contributed to screen and API changes while old and new task data coexisted.', href: '/work/swap-admin-v2/' },
  { title: 'I check screens and results', detail: 'Even after automation passes, I inspect empty states and differences in real responses on screen.', example: 'On Bike screens, I found a response object missing for one user type, then repeated E2E and manual checks after the fix.', href: '/work/bike-operations/' },
  { title: 'I compare the reasons for a choice', detail: 'I consider rendering and transferred assets together, then measure before and after under the same conditions.', example: 'On the SWING website, I adjusted video, images, fonts, and rendering paths, then compared medians from local Lighthouse mobile simulations.', href: '/work/swing-home-performance/' },
];

export const publicWorkEn: { title: string; description: string; href: string; label: string }[] = [
  { title: 'WebView QA Shell', description: 'A public tool for inspecting screens and logs from local or staging web services inside iOS and Android WebViews.', href: 'https://github.com/hyeonse-swing/webview-qa-shell', label: 'View repository' },
  { title: 'react-wheel-picker contribution', description: 'A merged PR fixing a selected-position mismatch when options change dynamically.', href: 'https://github.com/ncdai/react-wheel-picker/pull/54', label: 'View contribution' },
];
