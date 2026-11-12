import { createFileRoute } from '@tanstack/react-router';
import { AnalyticsPage } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard/analytics')({
  head: () => ({ meta: [
    { title: 'Analytics — Mailora AI' },
    { name: 'description', content: 'Analytics in your Mailora AI workspace.' },
    { property: 'og:title', content: 'Analytics — Mailora AI' },
    { property: 'og:description', content: 'Analytics in your Mailora AI workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: AnalyticsPage,
});
