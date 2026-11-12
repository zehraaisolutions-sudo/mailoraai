import { createFileRoute } from '@tanstack/react-router';
import { AutomationPage } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard/automation')({
  head: () => ({ meta: [
    { title: 'Automation — Mailora AI' },
    { name: 'description', content: 'Automation in your Mailora AI workspace.' },
    { property: 'og:title', content: 'Automation — Mailora AI' },
    { property: 'og:description', content: 'Automation in your Mailora AI workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: AutomationPage,
});
