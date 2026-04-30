'use client';

import React, { useState } from 'react';
import { TeamRow, TeamMemberProps } from '@/components/admin/TeamRow';
import { InviteAdminPanel } from '@/components/admin/InviteAdminPanel';
import { RoleGuard } from '@/components/admin/RoleGuard';
import { useGetAdminsQuery } from '@/lib/store';
import type { Admin, AdminRole } from '@/lib/types';

const ROLE_MAP: Record<AdminRole, TeamMemberProps['role']> = {
  SUPER_ADMIN: 'Superadmin',
  SHOWROOM_MANAGER: 'Admin',
};

function toRowProps(a: Admin): TeamMemberProps {
  return {
    id: a.id,
    name: a.email.split('@')[0],
    email: a.email,
    role: ROLE_MAP[a.role] ?? 'Admin',
    showroom: a.showroom?.name ?? '—',
    lastLogin: a.lastLogin ? new Date(a.lastLogin).toLocaleDateString() : 'Never',
    status: 'Active',
  };
}

const mockActivity = [
  { admin: 'System', action: 'Admin portal connected to live API', meta: 'All endpoints active', time: 'Now', icon: 'check_circle' },
];

export default function TeamPage() {
  return <RoleGuard allowed={['SUPER_ADMIN']}><TeamContent /></RoleGuard>;
}

function TeamContent() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { data: admins, isLoading, isError } = useGetAdminsQuery();

  const team = (admins ?? []).map(toRowProps);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
        <div>
          <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight text-[#F0EDE8]">Team & Admins</h1>
          <p className="text-[11px] md:text-[12px] text-admin-text-muted uppercase tracking-wider font-semibold mt-1">
            Manage who has access to the Blanca Luxury portal.
          </p>
        </div>
        <button
          onClick={() => setIsPanelOpen(true)}
          className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[6px] text-[11px] md:text-[12px] font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-admin-gold/10"
        >
          Invite Admin
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </header>

      <div className="bg-[#1A1916] border border-admin-border/50 rounded-[8px] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
          <span className="text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Role Key</span>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="px-3 py-1 rounded-[2px] text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-admin-gold text-admin-gold bg-admin-gold/5">Superadmin</span>
            <span className="px-3 py-1 rounded-[2px] text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-sky-500/40 text-sky-400 bg-sky-500/5">Admin</span>
            <span className="px-3 py-1 rounded-[2px] text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-purple-500/40 text-purple-400 bg-purple-500/5">Content</span>
          </div>
        </div>
        <div className="text-[11px] font-bold text-admin-text-muted uppercase tracking-widest">
          <strong className="text-admin-gold">{isLoading ? '…' : team.length}</strong> ACTIVE SEATS
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 xl:col-span-8 space-y-8">
          <div className="bg-[#1A1916] rounded-[8px] border border-admin-border/50 overflow-hidden shadow-2xl overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-admin-border/50 bg-admin-bg/30">
                  <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Admin</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Role</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Access</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Activity</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Status</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin" />
                        <p className="text-[13px] text-admin-text-muted">Loading team...</p>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <span className="text-[13px] text-admin-danger">Failed to load team members.</span>
                    </td>
                  </tr>
                ) : (
                  team.map((member) => (
                    <TeamRow key={member.id} member={member} onEdit={() => {}} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <div className="bg-[#1A1916] rounded-[8px] border border-admin-border/30 p-8 flex flex-col gap-8 h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-[#F0EDE8] uppercase tracking-[0.15em]">Recent Activity</h3>
              <span className="material-symbols-outlined text-admin-text-muted text-[20px]">history</span>
            </div>
            <div className="space-y-8">
              {mockActivity.map((act, i) => (
                <div key={i} className="flex gap-4 relative group">
                  <div className="w-8 h-8 rounded-full bg-admin-surface border border-admin-border/40 flex items-center justify-center shrink-0 z-10 transition-colors group-hover:border-admin-gold/30">
                    <span className="material-symbols-outlined text-[14px] text-admin-text-muted group-hover:text-admin-gold transition-colors">{act.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1 pr-4">
                    <p className="text-[12px] text-admin-text-primary leading-tight">
                      <strong className="font-bold">{act.admin}</strong> {act.action}
                    </p>
                    <p className="text-[10px] text-admin-text-muted uppercase tracking-wider font-semibold">{act.meta}</p>
                    <p className="text-[9px] text-admin-text-muted mt-1 uppercase font-bold tracking-widest">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <InviteAdminPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </div>
  );
}
