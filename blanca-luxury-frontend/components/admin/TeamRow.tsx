'use client';

import React from 'react';

export interface TeamMemberProps {
  id: string;
  name: string;
  email: string;
  role: 'Superadmin' | 'Admin' | 'Content';
  showroom: string;
  lastLogin: string;
  status: 'Active' | 'Suspended' | 'Pending';
  avatar?: string;
}

interface TeamRowProps {
  member: TeamMemberProps;
  onEdit: (member: TeamMemberProps) => void;
}

export function TeamRow({ member, onEdit }: TeamRowProps) {
  const getRoleStyles = (role: string) => {
    switch (role) {
      case 'Superadmin': return 'border-admin-gold text-admin-gold bg-admin-gold/5';
      case 'Admin': return 'border-sky-500/40 text-sky-400 bg-sky-500/5';
      case 'Content': return 'border-purple-500/40 text-purple-400 bg-purple-500/5';
      default: return 'border-admin-border text-admin-text-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500';
      case 'Suspended': return 'bg-admin-danger';
      case 'Pending': return 'bg-amber-500';
      default: return 'bg-admin-border';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <tr className="hover:bg-admin-surface/70 transition-colors group border-b border-admin-border/30 h-[72px]">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-[6px] border border-admin-border/50 flex items-center justify-center text-[11px] font-bold overflow-hidden ${
            member.role === 'Superadmin' ? 'text-admin-gold' : 'text-admin-text-muted'
          }`}>
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              getInitials(member.name)
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#F0EDE8]">{member.name}</span>
            <span className="text-[11px] text-admin-text-muted">{member.email}</span>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-[2px] text-[10px] font-bold tracking-widest uppercase border ${getRoleStyles(member.role)}`}>
          {member.role}
        </span>
      </td>

      <td className="px-6 py-4">
        {member.role === 'Superadmin' ? (
          <span className="text-[12px] text-admin-gold font-bold tracking-tight">All Locations</span>
        ) : (
          <span className="px-2 py-1 rounded-sm border border-admin-border/30 text-admin-text-muted text-[10px] uppercase font-bold tracking-wider bg-admin-bg/50">
            {member.showroom}
          </span>
        )}
      </td>

      <td className="px-6 py-4">
        <span className={`text-[12px] font-medium ${member.status === 'Pending' ? 'text-amber-500' : 'text-admin-text-muted'}`}>
          {member.status === 'Pending' ? 'Invite Sent' : member.lastLogin}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)} shadow-[0_0_8px_rgba(0,0,0,0.3)]`}></div>
          <span className="text-[12px] font-medium text-admin-text-muted">{member.status}</span>
        </div>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(member)} className="p-2 text-admin-text-muted hover:text-admin-gold transition-colors">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button className="p-2 text-admin-text-muted hover:text-admin-danger transition-colors">
            <span className="material-symbols-outlined text-[20px]">block</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
