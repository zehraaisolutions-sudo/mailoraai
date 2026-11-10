import { Link } from '@tanstack/react-router';
import { Mail } from 'lucide-react';

export function Brand({ compact = false, to = '/' }: { compact?: boolean; to?: '/' | '/dashboard' }) {
  return <Link to={to} className="group inline-flex items-center gap-2.5" aria-label="Mailora AI home">
    <span className="grid size-9 place-items-center rounded-[10px] bg-brand text-primary-foreground shadow-sm transition-transform group-hover:-rotate-3"><Mail className="size-[18px]" strokeWidth={2.3} /></span>
    {!compact && <span className="font-display text-[1.18rem] font-extrabold text-foreground">mailora<span className="text-brand">.</span></span>}
  </Link>;
}
