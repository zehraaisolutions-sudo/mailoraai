import { createFileRoute } from '@tanstack/react-router';
import { TemplatesPage } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard/templates')({
  head: () => ({ meta: [
    { title: 'Templates — Mailora AI' },
    { name: 'description', content: 'Templates in your Mailora AI workspace.' },
    { property: 'og:title', content: 'Templates — Mailora AI' },
    { property: 'og:description', content: 'Templates in your Mailora AI workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: TemplatesPage,
});
