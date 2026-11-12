import { createFileRoute } from '@tanstack/react-router';
import { CampaignsPage } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard/campaigns')({
  head: () => ({ meta: [
    { title: 'Campaigns — Mailora AI' },
    { name: 'description', content: 'Campaigns in your Mailora AI workspace.' },
    { property: 'og:title', content: 'Campaigns — Mailora AI' },
    { property: 'og:description', content: 'Campaigns in your Mailora AI workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: CampaignsPage,
});
