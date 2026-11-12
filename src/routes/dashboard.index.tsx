import { createFileRoute } from '@tanstack/react-router';
import { DashboardHome } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard/')({
  head: () => ({ meta: [
    { title: 'Overview — Mailora AI' },
    { name: 'description', content: 'Your email marketing overview at a glance.' },
    { property: 'og:title', content: 'Overview — Mailora AI' },
    { property: 'og:description', content: 'Your email marketing overview at a glance.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: DashboardHome,
});
