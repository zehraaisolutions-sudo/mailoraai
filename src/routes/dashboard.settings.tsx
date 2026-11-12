import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard/settings')({
  head: () => ({ meta: [
    { title: 'Settings — Mailora AI' },
    { name: 'description', content: 'Settings in your Mailora AI workspace.' },
    { property: 'og:title', content: 'Settings — Mailora AI' },
    { property: 'og:description', content: 'Settings in your Mailora AI workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: SettingsPage,
});
