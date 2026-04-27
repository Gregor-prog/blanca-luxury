'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInviteAdminMutation } from '@/lib/store';
import { isAuthenticated } from '@/lib/store/authApi';
import type { AdminRole } from '@/lib/types';
import './../admin.css';

function RegisterForm({ currentDate, currentTime }: { currentDate: string; currentTime: string }) {
  const router = useRouter();
  const [inviteAdmin, { isLoading, error }] = useInviteAdminMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AdminRole>('SHOWROOM_MANAGER');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inviteAdmin({ email, password, role }).unwrap();
      setSuccess(true);
      // Brief pause then redirect to login
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch {}
  };

  const errorMessage = error
    ? 'status' in error && (error as { status: number }).status === 409
      ? 'An account with this email already exists.'
      : 'status' in error && (error as { status: number }).status === 403
      ? 'You do not have permission to create admin accounts.'
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
          <span className="text-admin-text-secondary text-[11px] font-medium tracking-wider">Admin Setup</span>
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

          <header className="mb-8 space-y-2">
            <h1 className="text-admin-text-primary text-2xl font-medium tracking-tight">Create account.</h1>
            <p className="text-admin-text-secondary text-[12px] font-medium leading-relaxed">
              Register a new Blanca Luxury admin.
            </p>
          </header>

          {success ? (
            <div className="bg-admin-success/10 border border-admin-success/30 rounded-[4px] px-4 py-5 text-center">
              <p className="text-admin-success text-[13px] font-medium">Account created successfully.</p>
              <p className="text-admin-text-secondary text-[11px] mt-1">Redirecting to login…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="bg-admin-danger/10 border border-admin-danger/30 rounded-[4px] px-4 py-3" role="alert">
                  <p className="text-admin-danger text-[12px] font-medium">{errorMessage}</p>
                </div>
              )}

              {/* Email */}
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

              {/* Password */}
              <div className="space-y-2">
                <label className="admin-label" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    className="admin-input pr-10"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-muted hover:text-admin-text-secondary transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="admin-label" htmlFor="role">Role</label>
                <select
                  className="admin-input appearance-none cursor-pointer"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                  disabled={isLoading}
                >
                  <option value="SHOWROOM_MANAGER">Showroom Manager</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="admin-button-gold flex items-center justify-center mt-2 relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-admin-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creating account…</span>
                  </div>
                ) : (
                  <span className="uppercase tracking-[0.05em]">Create Account</span>
                )}
              </button>
            </form>
          )}

          <footer className="mt-10 text-center">
            <Link
              href="/admin/login"
              className="text-admin-text-muted text-[11px] font-medium hover:text-admin-gold transition-colors tracking-wide"
            >
              Already have an account? Sign in
            </Link>
          </footer>
        </div>
      </section>
    </main>
  );
}

export default function AdminRegisterPage() {
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
      <RegisterForm currentDate={currentDate} currentTime={currentTime} />
    </Suspense>
  );
}
