import { createFileRoute } from '@tanstack/react-router';
import { AuthGate, WorkspaceLayout } from '@/components/mailora/workspace';

export const Route = createFileRoute('/dashboard')({
  component: DashboardShell,
});

function DashboardShell() {
  return <><AuthGate /><WorkspaceLayout /></>;
}
