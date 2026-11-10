export type Campaign = { id: string; name: string; subject: string; audience: string; status: string; content: string; created_at: string; scheduled_at: string | null };
export type Contact = { id: string; full_name: string; email: string; status: string; tags: string[]; subscribed_at: string };

export const navItems = [
  { label: 'Overview', path: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Campaigns', path: '/dashboard/campaigns', icon: 'Send' },
  { label: 'AI email generator', path: '/dashboard/generator', icon: 'Sparkles' },
  { label: 'Templates', path: '/dashboard/templates', icon: 'PanelsTopLeft' },
  { label: 'Contacts', path: '/dashboard/contacts', icon: 'UsersRound' },
  { label: 'Analytics', path: '/dashboard/analytics', icon: 'ChartNoAxesCombined' },
  { label: 'Automation', path: '/dashboard/automation', icon: 'Workflow' },
  { label: 'A/B testing', path: '/dashboard/ab-testing', icon: 'Split' },
  { label: 'AI assistant', path: '/dashboard/assistant', icon: 'MessageCircleMore' },
  { label: 'Settings', path: '/dashboard/settings', icon: 'Settings2' },
] as const;

export const templates = [
  { title: 'A warm welcome', category: 'Welcome', description: 'Make a thoughtful first impression.', subject: 'You’re in — welcome aboard', body: 'Hi {{first_name}},\n\nWe’re so glad you’re here. You’ll hear from us with ideas, updates, and a little inspiration along the way.\n\nTalk soon,\nThe team' },
  { title: 'The Sunday edit', category: 'Newsletter', description: 'A considered round-up for your readers.', subject: 'A few good things for your week', body: 'Hello {{first_name}},\n\nA few things worth sharing this week, thoughtfully picked just for you.\n\nRead the latest on our journal and tell us what you think.\n\nUntil next week,\nThe editorial team' },
  { title: 'A little something', category: 'Promotional', description: 'A clear, friendly product introduction.', subject: 'Meet something made for you', body: 'Hi {{first_name}},\n\nWe made something we think you’ll love. Thoughtful details, a simpler experience, and a little more joy in your day.\n\nTake a look when you have a moment.\n\nWith care,\nThe team' },
  { title: 'Something new is here', category: 'Product Launch', description: 'Introduce your newest idea with clarity.', subject: 'It’s here: a fresh way to get things done', body: 'Hi {{first_name}},\n\nWe’ve been working on something special, and today it’s finally yours to explore.\n\nDiscover what’s new and let us know what you think.\n\nAll the best,\nThe team' },
  { title: 'Save the date', category: 'Event', description: 'Invite your community to join you.', subject: 'You’re invited — let’s get together', body: 'Hi {{first_name}},\n\nWe’d love to see you. Join us for an afternoon of conversation, ideas, and good company.\n\nSave your spot today. We hope to see you there!\n\nWarmly,\nThe team' },
  { title: 'Picking up where we left off', category: 'Follow-up', description: 'A personal, low-pressure follow-up.', subject: 'Just checking in', body: 'Hi {{first_name}},\n\nI wanted to follow up and see if there’s anything I can help with. No rush — reply whenever the time feels right.\n\nHere if you need us,\nThe team' },
];

export const demoCampaigns: Campaign[] = [
  { id: 'demo-1', name: 'The April edit', subject: 'A few good things for your week', audience: 'All subscribers', status: 'sent', content: '', created_at: '2026-04-08T10:00:00.000Z', scheduled_at: null },
  { id: 'demo-2', name: 'A warm welcome', subject: 'You’re in — welcome aboard', audience: 'New subscribers', status: 'scheduled', content: '', created_at: '2026-04-06T10:00:00.000Z', scheduled_at: null },
  { id: 'demo-3', name: 'Spring launch', subject: 'Something new is here', audience: 'Product updates', status: 'draft', content: '', created_at: '2026-04-04T10:00:00.000Z', scheduled_at: null },
  { id: 'demo-4', name: 'A little something', subject: 'A thank-you, just for you', audience: 'Active subscribers', status: 'sent', content: '', created_at: '2026-04-01T10:00:00.000Z', scheduled_at: null },
];

export const demoContacts: Contact[] = [
  { id: 'contact-1', full_name: 'Alex Morgan', email: 'alex@example.com', status: 'subscribed', tags: ['Newsletter'], subscribed_at: '2026-03-14T10:00:00.000Z' },
  { id: 'contact-2', full_name: 'Jamie Chen', email: 'jamie@example.com', status: 'subscribed', tags: ['Early access'], subscribed_at: '2026-03-12T10:00:00.000Z' },
  { id: 'contact-3', full_name: 'Sam Taylor', email: 'sam@example.com', status: 'pending', tags: ['Event'], subscribed_at: '2026-03-09T10:00:00.000Z' },
  { id: 'contact-4', full_name: 'Casey Rivera', email: 'casey@example.com', status: 'unsubscribed', tags: [], subscribed_at: '2026-02-27T10:00:00.000Z' },
];

export const starterEmail = 'Hi {{first_name}},\n\nWe’re glad you’re here. Here’s something useful to help you get started.\n\nTake a look whenever you have a moment.\n\nWarmly,\nThe team';
