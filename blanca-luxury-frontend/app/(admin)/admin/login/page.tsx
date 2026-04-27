'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLoginMutation } from '@/lib/store';
import { isAuthenticated } from '@/lib/store/authApi';
import './../admin.css';

// useSearchParams must be inside a Suspense boundary
function LoginForm({ currentDate, currentTime }: { currentDate: string; currentTime: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      const from = searchParams.get('from') ?? '/admin';
      // Validate `from` stays within /admin to prevent open-redirect
      const destination = from.startsWith('/admin') ? from : '/admin';
      router.push(destination);
    } catch {}
  };

  const errorMessage = error
    ? 'status' in error && (error as { status: number }).status === 401
      ? 'Invalid email or password.'
      : 'Something went wrong. Please try again.'
    : null;

  return (
    <main className="flex h-screen w-full relative bg-admin-bg admin-body overflow-hidden">
      {/* LEFT PANEL */}
      <section className="hidden lg:block w-[55%] relative h-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Interior"
          fill
          className="object-cover grayscale-[20%]"
          priority
        />
        <div className="absolute inset-0 editorial-overlay" />

        <div className="absolute bottom-12 left-12 flex flex-col gap-1">
          <span className="text-white text-[11px] font-bold tracking-[0.3em] uppercase">BLANCA LUXURY</span>
          <span className="text-admin-text-secondary text-[11px] font-medium tracking-wider">Admin Portal</span>
        </div>

        <div className="absolute bottom-12 right-12">
          <div className="flex items-baseline gap-4 text-white/50 text-[11px] font-medium tracking-widest uppercase">
            <span>{currentDate}</span>
            <span className="w-px h-3 bg-admin-border/30" />
            <span>{currentTime}</span>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="w-full lg:w-[45%] bg-admin-bg flex flex-col items-center justify-center px-8 relative overflow-hidden">
        <div className="absolute lg:hidden opacity-[0.05] select-none pointer-events-none z-0">
          <span className="text-[200px] font-black tracking-tighter text-admin-text-primary">BL</span>
        </div>

        <div className="w-full max-w-[320px] z-10">
          {/* Monogram */}
          <div className="mb-10 w-10 h-10 border border-admin-gold/40 flex items-center justify-center rounded-xs transition-transform active:scale-95 duration-300">
            <span className="text-admin-gold text-xs font-bold tracking-tight">BL</span>
          </div>

          <header className="mb-10 space-y-2">
            <h1 className="text-admin-text-primary text-2xl font-medium tracking-tight">Welcome back.</h1>
            <p className="text-admin-text-secondary text-[12px] font-medium leading-relaxed">
              Sign in to manage Blanca Luxury.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="bg-admin-danger/10 border border-admin-danger/30 rounded-[4px] px-4 py-3" role="alert">
                <p className="text-admin-danger text-[12px] font-medium">{errorMessage}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="admin-label" htmlFor="email">Email Address</label>
              <input
                className="admin-input"
                id="email"
                type="email"
                placeholder="admin@blanca.luxury"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label" htmlFor="password">Password</label>
              <input
                className="admin-input"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
              <div className="pt-1 text-right">
                <Link href="#" className="text-admin-gold text-[11px] font-medium hover:opacity-80 transition-opacity">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="admin-button-gold flex items-center justify-center relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-admin-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating…</span>
                </div>
              ) : (
                <span className="uppercase tracking-[0.05em]">Sign In</span>
              )}
            </button>
          </form>

          <footer className="mt-24 text-center">
            <p className="text-admin-text-muted text-[11px] font-medium tracking-wide">
              Blanca Luxury Admin · Authorized Personnel Only
            </p>
          </footer>
        </div>

        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
        />
      </section>
    </main>
  );
}

export default function AdminLoginPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' GMT'
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Suspense>
      <LoginForm currentDate={currentDate} currentTime={currentTime} />
    </Suspense>
  );
}
