import { createFileRoute } from '@tanstack/react-router';
import { GeneratorPage } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard/generator')({
  head: () => ({ meta: [
    { title: 'AI email generator — Mailora AI' },
    { name: 'description', content: 'AI email generator in your Mailora AI workspace.' },
    { property: 'og:title', content: 'AI email generator — Mailora AI' },
    { property: 'og:description', content: 'AI email generator in your Mailora AI workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: GeneratorPage,
});
