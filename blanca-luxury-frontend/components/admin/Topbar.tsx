'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getStoredAdmin } from '@/lib/store/authApi';
import type { Admin } from '@/lib/types';

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/products/add': 'Add Product',
  '/admin/showrooms': 'Showrooms',
  '/admin/collections': 'Collections',
  '/admin/inquiries': 'Inquiries',
  '/admin/team': 'Team & Admins',
  '/admin/projects': 'Projects',
  '/admin/audit': 'Audit Log',
};

export function Topbar() {
  const pathname = usePathname();
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    setAdmin(getStoredAdmin());
  }, []);

  const pageTitle = PAGE_TITLES[pathname] ?? 'Dashboard';
  const greeting = admin ? `Welcome back, ${admin.email.split('@')[0]}` : '';

  return (
    <header className="h-[56px] bg-[#0F0E0C] border-b border-[#2E2C28] flex justify-between items-center px-8 z-40 sticky top-0">
      <div className="flex items-center gap-3">
        <h2 className="text-[16px] font-medium text-admin-text-primary">{pageTitle}</h2>
        {greeting && (
          <>
            <span className="text-admin-border">·</span>
            <span className="text-[12px] text-admin-text-muted">{greeting}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications placeholder */}
        <button className="text-admin-text-secondary hover:text-admin-gold transition-colors relative">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
        </button>

        <div className="h-4 w-px bg-admin-border" />

        <Link
          href="/admin/products/add"
          className="bg-admin-gold text-admin-bg px-4 py-1.5 rounded-full text-[12px] font-bold tracking-tight hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          New Product
        </Link>
      </div>
    </header>
  );
}
