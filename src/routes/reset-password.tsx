import { useEffect, useState, type FormEvent } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Brand } from '@/components/mailora/brand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/reset-password')({
  head: () => ({ meta: [
    { title: 'Reset your password · Mailora AI' },
    { name: 'description', content: 'Choose a new password for your Mailora AI account.' },
    { property: 'og:title', content: 'Reset your Mailora AI password' },
    { property: 'og:description', content: 'Choose a new password for your Mailora AI account.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    setReady(hash.get('type') === 'recovery');
  }, []);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) toast.error(error.message);
    else { toast.success('Your password has been updated.'); await navigate({ to: '/dashboard' }); }
  };
  return <main className="grid min-h-screen place-items-center px-5 py-12"><section className="w-full max-w-md"><Brand to="/" /><div className="panel mt-10 p-7 sm:p-9"><p className="eyebrow">Account recovery</p><h1 className="mt-2 font-display text-3xl font-extrabold">Choose a new password</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Set a new password to get back to your Mailora workspace.</p>{ready ? <form onSubmit={(event) => void handleSubmit(event)} className="mt-7 space-y-4"><label className="block space-y-1.5 text-sm font-semibold">New password<Input type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /></label><Button className="w-full" disabled={busy}>{busy ? 'Saving…' : 'Save new password'}</Button></form> : <p className="mt-7 rounded-md bg-muted p-4 text-sm text-muted-foreground">This reset link is missing or expired. <Link to="/auth" className="font-semibold text-brand">Request another one</Link>.</p>}</div></section></main>;
}
