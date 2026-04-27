import React from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Topbar } from '@/components/admin/Topbar';
import { AuthGuard } from '@/components/admin/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-admin-bg">
        <Sidebar />
        <div className="flex-1 ml-[240px] flex flex-col h-screen overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
