'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/store/authApi';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/admin/login');
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-admin-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin" />
          <span className="text-[11px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">
            Verifying session…
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
