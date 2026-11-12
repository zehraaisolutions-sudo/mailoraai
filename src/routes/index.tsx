import { createFileRoute } from '@tanstack/react-router';
import { MarketingPage } from '@/components/mailora/workspace';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Mailora AI — Thoughtful AI email marketing' },
    { name: 'description', content: 'Write, plan and learn from email campaigns with an AI-assisted workspace.' },
    { property: 'og:title', content: 'Mailora AI — Thoughtful AI email marketing' },
    { property: 'og:description', content: 'Write, plan and learn from email campaigns with an AI-assisted workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: MarketingPage,
});
