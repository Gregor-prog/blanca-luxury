"use client";
import React, { useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Topbar } from '@/components/admin/Topbar';
import { AuthGuard } from '@/components/admin/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-admin-bg relative">
        {/* Mobile Backdrop */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        <Sidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden md:ml-[240px]">
          <Topbar onToggleMenu={() => setIsMobileOpen(!isMobileOpen)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
