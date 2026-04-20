'use client';

import React, { useState } from 'react';
import { TeamRow, TeamMemberProps } from '@/components/admin/TeamRow';
import { InviteAdminPanel } from '@/components/admin/InviteAdminPanel';

const mockTeam: TeamMemberProps[] = [
  {
    id: '1',
    name: 'Elias Thompson',
    email: 'e.thompson@blancaluxury.com',
    role: 'Superadmin',
    showroom: 'London',
    lastLogin: '2 hours ago',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Mercer',
    email: 'sarah.m@blancaluxury.com',
    role: 'Admin',
    showroom: 'Paris Flagship',
    lastLogin: 'Yesterday',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Julian Thorne',
    email: 'j.thorne@atelier.com',
    role: 'Content',
    showroom: 'Lagos',
    lastLogin: '3 days ago',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Arthur Blackwood',
    email: 'a.blackwood@vogue.ng',
    role: 'Admin',
    showroom: 'New York Studio',
    lastLogin: 'Never',
    status: 'Pending'
  }
];

const mockActivity = [
  { admin: 'Elias Thompson', action: 'Invited James Chen', meta: 'Role: Admin • Paris', time: '10 mins ago', icon: 'person_add' },
  { admin: 'Sarah Mercer', action: 'Updated Permissions', meta: 'Entity: London Showroom', time: '2 hours ago', icon: 'edit' },
  { admin: 'Elias Thompson', action: 'Suspended Account', meta: 'User: Marcus V.', time: 'Yesterday', icon: 'block' }
];

export default function TeamPage() {
  const [team] = useState(mockTeam);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#F0EDE8]">Team & Admins</h1>
          <p className="text-[12px] text-admin-text-muted uppercase tracking-wider font-semibold mt-1">Manage who has access to the Blanca Luxury portal.</p>
        </div>
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="bg-admin-gold text-admin-bg px-6 py-2.5 rounded-[6px] text-[12px] font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          Invite Admin
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </header>

      {/* Role Legend & Stats */}
      <div className="bg-[#1A1916] border border-admin-border/50 rounded-[8px] p-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Role Key</span>
          <div className="flex gap-3">
            <span className="px-3 py-1 rounded-[2px] text-[10px] font-bold uppercase tracking-widest border border-admin-gold text-admin-gold bg-admin-gold/5">Superadmin</span>
            <span className="px-3 py-1 rounded-[2px] text-[10px] font-bold uppercase tracking-widest border border-sky-500/40 text-sky-400 bg-sky-500/5">Admin</span>
            <span className="px-3 py-1 rounded-[2px] text-[10px] font-bold uppercase tracking-widest border border-purple-500/40 text-purple-400 bg-purple-500/5">Content</span>
          </div>
        </div>
        <div className="text-[11px] font-bold text-admin-text-muted">
          <strong className="text-admin-gold">{team.length}</strong> ACTIVE SEATS
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Table Column */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          <div className="bg-[#1A1916] rounded-[8px] border border-admin-border/50 overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-admin-border/50 bg-admin-bg/30">
                  <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em] w-1/3">Admin</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Role</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Access</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Activity</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Status</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {team.map((member) => (
                  <TeamRow key={member.id} member={member} onEdit={() => {}} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Side Column */}
        <div className="col-span-12 xl:col-span-4">
          <div className="bg-[#1A1916] rounded-[8px] border border-admin-border/30 p-8 flex flex-col gap-8 h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-[#F0EDE8] uppercase tracking-[0.15em]">Recent Activity</h3>
              <span className="material-symbols-outlined text-admin-text-muted text-[20px]">history</span>
            </div>
            
            <div className="space-y-8">
              {mockActivity.map((act, i) => (
                <div key={i} className="flex gap-4 relative group">
                  {i !== mockActivity.length - 1 && (
                    <div className="absolute left-[15px] top-8 w-[1px] h-[calc(100%+8px)] bg-admin-border/30" />
                  )}
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

            <button className="mt-8 text-admin-gold text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all">
              View Full Audit Log
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <InviteAdminPanel 
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
}
