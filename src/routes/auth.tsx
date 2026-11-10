import { useEffect, useState, type FormEvent } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, UserRound, WandSparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Brand } from '@/components/mailora/brand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';

export const Route = createFileRoute('/auth')({
  head: () => ({ meta: [
    { title: 'Sign in to Mailora AI' },
    { name: 'description', content: 'Sign in or create your Mailora AI account to manage thoughtful email marketing.' },
    { property: 'og:title', content: 'Sign in to Mailora AI' },
    { property: 'og:description', content: 'Your email marketing workspace, ready when you are.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  useEffect(() => {
    let alive = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (alive && data.user) void navigate({ to: '/dashboard' });
    });
    return () => { alive = false; };
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode === 'signup' && password !== confirm) { toast.error('Those passwords don’t match.'); return; }
    if (password.length < 8 && mode !== 'reset') { toast.error('Use at least 8 characters for your password.'); return; }
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(), password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard`, data: { full_name: fullName.trim() } },
        });
        if (error) throw error;
        if (!data.session) { setConfirmationSent(true); return; }
        if (data.user) await supabase.from('profiles').upsert({ user_id: data.user.id, full_name: fullName.trim() });
        toast.success('Your workspace is ready.');
        await navigate({ to: '/dashboard' });
      } else if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        if (data.user) await supabase.from('profiles').upsert({ user_id: data.user.id, full_name: String(data.user.user_metadata.full_name ?? '') });
        toast.success('Welcome back.');
        await navigate({ to: '/dashboard' });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        toast.success('If that address has an account, a reset link is on its way.');
        setMode('login');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'We couldn’t complete that request.');
    } finally { setBusy(false); }
  };

  const handleGoogle = async () => {
    const { error } = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin });
    if (error) toast.error(error.message);
  };
  const handleLovable = async () => {
    const { error } = await lovable.auth.signInWithOAuth('lovable', { redirect_uri: window.location.origin });
    if (error) toast.error(error.message);
  };

  const heading = mode === 'signup' ? 'A better kind of inbox starts here.' : mode === 'reset' ? 'Let’s get you back in.' : 'Good to see you again.';
  const subheading = mode === 'signup' ? 'Create your free account and make room for more meaningful email.' : mode === 'reset' ? 'Enter your email and we’ll send a reset link.' : 'Your next great campaign is only a few thoughtful words away.';

  return <main className="grid min-h-screen lg:grid-cols-[1.02fr_.98fr]">
    <section className="relative hidden min-h-screen overflow-hidden bg-brand-dark px-12 py-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:px-20">
      <div className="absolute inset-0 ink-grid opacity-15" />
      <div className="relative"><Brand to="/" /><div className="mt-[17vh] max-w-xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-3 py-1.5 text-xs font-semibold"><WandSparkles className="size-3.5" /> The thoughtful way to grow</span>
        <h1 className="mt-7 font-display text-5xl font-extrabold leading-[1.08] xl:text-6xl">Good emails build <span className="text-lime">good things.</span></h1>
        <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/75">Give your audience a little more of what they came for. Plan, write and grow — all in one calm workspace.</p>
        <div className="mt-11 flex items-center gap-4"><div className="flex -space-x-2"><span className="grid size-9 place-items-center rounded-full border-2 border-brand-dark bg-coral text-xs font-bold">M</span><span className="grid size-9 place-items-center rounded-full border-2 border-brand-dark bg-teal text-xs font-bold">J</span><span className="grid size-9 place-items-center rounded-full border-2 border-brand-dark bg-lime text-xs font-bold text-brand-dark">A</span></div><p className="text-sm text-primary-foreground/70">Made for people with something to say.</p></div>
      </div></div>
      <p className="relative text-xs text-primary-foreground/60">Thoughtful emails. Measurable growth.</p>
    </section>
    <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-14">
      <div className="flex items-center justify-between"><Brand to="/" /><Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="size-4" /> Back to home</Link></div>
      <div className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center py-12">
        {confirmationSent ? <div className="space-y-5 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-soft text-brand"><Mail className="size-6" /></span><h2 className="font-display text-3xl font-bold">Check your inbox.</h2><p className="text-sm leading-6 text-muted-foreground">We’ve sent a confirmation link to <strong className="text-foreground">{email}</strong>. Confirm your email to open your workspace.</p><Button className="w-full" onClick={() => { setConfirmationSent(false); setMode('login'); }}>Back to sign in</Button></div> : <>
          <div className="mb-8"><p className="eyebrow">{mode === 'signup' ? 'Your next chapter' : mode === 'reset' ? 'Account recovery' : 'Welcome back'}</p><h2 className="mt-2 font-display text-[2rem] font-extrabold leading-tight">{heading}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{subheading}</p></div>
          {mode !== 'reset' && <div className="grid gap-3 sm:grid-cols-2"><Button type="button" variant="outline" className="h-11" onClick={() => void handleGoogle()}><GoogleMark /> Continue with Google</Button><Button type="button" variant="outline" className="h-11" onClick={() => void handleLovable()}><span className="grid size-[18px] place-items-center rounded bg-foreground text-[10px] font-bold text-background">L</span> Continue with Lovable</Button></div>}
          {mode !== 'reset' && <div className="my-6 flex items-center gap-4 text-[11px] font-semibold uppercase text-muted-foreground"><span className="h-px flex-1 bg-border" />or with email<span className="h-px flex-1 bg-border" /></div>}
          <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
            {mode === 'signup' && <label className="block space-y-1.5 text-sm font-semibold">Full name<div className="relative"><UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input autoComplete="name" className="h-11 pl-10" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your name" required /></div></label>}
            <label className="block space-y-1.5 text-sm font-semibold">Email address<div className="relative"><Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input type="email" autoComplete="email" className="h-11 pl-10" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></div></label>
            {mode !== 'reset' && <label className="block space-y-1.5 text-sm font-semibold">Password<div className="relative"><LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input type={showPassword ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} className="h-11 pl-10 pr-11" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" minLength={8} required /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></label>}
            {mode === 'signup' && <label className="block space-y-1.5 text-sm font-semibold">Confirm password<div className="relative"><LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input type={showPassword ? 'text' : 'password'} autoComplete="new-password" className="h-11 pl-10" value={confirm} onChange={(event) => setConfirm(event.target.value)} placeholder="Enter your password again" minLength={8} required /></div></label>}
            {mode === 'login' && <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="size-4 accent-primary" /> Remember me</label><button type="button" className="font-semibold text-brand hover:underline" onClick={() => setMode('reset')}>Forgot password?</button></div>}
            {mode === 'signup' && <label className="flex items-start gap-2.5 text-xs leading-5 text-muted-foreground"><input type="checkbox" className="mt-0.5 size-4 shrink-0 accent-primary" required /><span>I agree to the <a href="#terms" className="font-semibold text-brand">Terms of Service</a> and <a href="#privacy" className="font-semibold text-brand">Privacy Policy</a>.</span></label>}
            <Button type="submit" className="h-11 w-full" disabled={busy}>{busy ? 'One moment…' : mode === 'signup' ? 'Create free account' : mode === 'reset' ? 'Send reset link' : 'Sign in'}</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">{mode === 'signup' ? 'Already have an account?' : mode === 'reset' ? 'Remember your password?' : 'New to Mailora?'} <button className="font-semibold text-brand hover:underline" onClick={() => setMode(mode === 'signup' || mode === 'reset' ? 'login' : 'signup')}>{mode === 'signup' || mode === 'reset' ? 'Sign in' : 'Create an account'}</button></p>
          <p className="mt-6 text-center text-xs text-muted-foreground">Secure sign-in · Email confirmation protects your account</p>
        </>}
      </div>
      <footer className="pb-3 text-center text-xs text-muted-foreground">© 2026 Mailora AI · Built for meaningful connections</footer>
    </section>
  </main>;
}

function GoogleMark() { return <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>; }
