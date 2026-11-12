import { createFileRoute } from '@tanstack/react-router';
import { ContactsPage } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard/contacts')({
  head: () => ({ meta: [
    { title: 'Contacts — Mailora AI' },
    { name: 'description', content: 'Contacts in your Mailora AI workspace.' },
    { property: 'og:title', content: 'Contacts — Mailora AI' },
    { property: 'og:description', content: 'Contacts in your Mailora AI workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: ContactsPage,
});
