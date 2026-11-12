import { createFileRoute } from '@tanstack/react-router';
import { AssistantPage } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard/assistant')({
  head: () => ({ meta: [
    { title: 'AI assistant — Mailora AI' },
    { name: 'description', content: 'AI assistant in your Mailora AI workspace.' },
    { property: 'og:title', content: 'AI assistant — Mailora AI' },
    { property: 'og:description', content: 'AI assistant in your Mailora AI workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: AssistantPage,
});
