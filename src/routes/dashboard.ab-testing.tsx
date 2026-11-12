import { createFileRoute } from '@tanstack/react-router';
import { ABTestingPage } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard/ab-testing')({
  head: () => ({ meta: [
    { title: 'A/B testing — Mailora AI' },
    { name: 'description', content: 'A/B testing in your Mailora AI workspace.' },
    { property: 'og:title', content: 'A/B testing — Mailora AI' },
    { property: 'og:description', content: 'A/B testing in your Mailora AI workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: ABTestingPage,
});
