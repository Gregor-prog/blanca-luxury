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

export function Topbar({ onToggleMenu }: { onToggleMenu?: () => void }) {
  const pathname = usePathname();
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    setAdmin(getStoredAdmin());
  }, []);

  const pageTitle = PAGE_TITLES[pathname] ?? 'Dashboard';
  const greeting = admin ? `Welcome back, ${admin.email.split('@')[0]}` : '';

  return (
    <header className="h-[56px] bg-[#0F0E0C] border-b border-[#2E2C28] flex justify-between items-center px-4 md:px-8 z-40 sticky top-0">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu (Mobile Only) */}
        <button 
          onClick={onToggleMenu}
          className="md:hidden text-admin-text-secondary hover:text-admin-gold transition-colors mr-2"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <h2 className="text-[14px] md:text-[16px] font-medium text-admin-text-primary whitespace-nowrap">{pageTitle}</h2>
        {greeting && (
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-admin-border">·</span>
            <span className="text-[12px] text-admin-text-muted">{greeting}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Notifications placeholder */}
        <button className="text-admin-text-secondary hover:text-admin-gold transition-colors relative">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
        </button>

        <div className="hidden sm:block h-4 w-px bg-admin-border" />

        <Link
          href="/admin/products/add"
          className="bg-admin-gold text-admin-bg px-3 md:px-4 py-1.5 rounded-full text-[11px] md:text-[12px] font-bold tracking-tight hover:opacity-90 transition-opacity flex items-center gap-1 md:gap-2 shadow-lg shadow-admin-gold/10"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span className="hidden xs:inline">New Product</span>
          <span className="xs:hidden">New</span>
        </Link>
      </div>
    </header>
  );
}
