'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStoredAdmin } from '@/lib/store/authApi';
import type { AdminRole } from '@/lib/types';

interface RoleGuardProps {
  allowed: AdminRole[];
  children: React.ReactNode;
}

export function RoleGuard({ allowed, children }: RoleGuardProps) {
  const [role, setRole] = useState<AdminRole | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const admin = getStoredAdmin();
    setRole((admin?.role as AdminRole) ?? null);
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!role || !allowed.includes(role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-16 h-16 rounded-full bg-admin-surface border border-admin-border flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-admin-danger text-3xl">lock</span>
        </div>
        <h2 className="text-[22px] font-bold text-admin-text-primary mb-2 tracking-tight">
          Insufficient Permissions
        </h2>
        <p className="text-[13px] text-admin-text-muted max-w-sm leading-relaxed mb-8">
          Your role does not have access to this section. Contact a Super Admin if you believe this is an error.
        </p>
        <Link
          href="/admin"
          className="px-6 py-2.5 bg-admin-gold text-admin-bg text-[11px] font-bold uppercase tracking-widest rounded-[4px] hover:opacity-90 transition-opacity"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
