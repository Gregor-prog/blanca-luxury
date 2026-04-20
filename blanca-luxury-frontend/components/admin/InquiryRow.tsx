'use client';

import React from 'react';

export interface InquiryProps {
  id: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  showroom: string;
  source: 'WhatsApp' | 'Web Form' | 'Email' | 'Phone';
  status: 'New' | 'In Progress' | 'Resolved' | 'Spam';
  date: string;
  assignedTo?: string;
}

interface InquiryRowProps {
  inquiry: InquiryProps;
  onView: (inquiry: InquiryProps) => void;
}

export function InquiryRow({ inquiry, onView }: InquiryRowProps) {
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'WhatsApp': return 'chat';
      case 'Web Form': return 'language';
      case 'Email': return 'mail';
      case 'Phone': return 'call';
      default: return 'help';
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'New': return 'bg-admin-gold/15 text-admin-gold';
      case 'In Progress': return 'bg-orange-500/15 text-orange-400';
      case 'Resolved': return 'bg-admin-success/15 text-admin-success';
      case 'Spam': return 'bg-admin-danger/15 text-admin-danger';
      default: return '';
    }
  };

  return (
    <tr 
      onClick={() => onView(inquiry)}
      className="group border-b border-admin-border/50 hover:bg-admin-surface transition-colors cursor-pointer relative h-[64px]"
    >
      {/* New Lead Indicator */}
      {inquiry.status === 'New' && (
        <td className="absolute left-0 top-0 bottom-0 w-[2px] bg-admin-gold"></td>
      )}
      
      <td className="px-6 py-4">
        <span className="text-[13px] font-medium text-[#F0EDE8]">{inquiry.name}</span>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-[11px] text-admin-text-primary font-bold tracking-tight">{inquiry.phone}</span>
          <span className="text-[10px] text-admin-text-muted mt-0.5">{inquiry.email}</span>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <span className="bg-[#2E2C28] text-admin-text-secondary text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
          {inquiry.interest}
        </span>
      </td>
      
      <td className="px-6 py-4 text-[12px] text-admin-text-muted">
        {inquiry.showroom}
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-admin-text-muted">
          <span className={`material-symbols-outlined text-[16px] ${inquiry.source === 'WhatsApp' ? 'text-green-500' : ''}`}>
            {getSourceIcon(inquiry.source)}
          </span>
          <span className="text-[11px] font-medium">{inquiry.source}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        {inquiry.assignedTo ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-admin-surface-elevated border border-admin-border flex items-center justify-center text-[9px] font-bold text-admin-gold">
              {inquiry.assignedTo.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-[11px] text-admin-text-muted">{inquiry.assignedTo}</span>
          </div>
        ) : (
          <button className="text-[10px] font-bold text-admin-gold uppercase tracking-tighter hover:underline">
            — Assign
          </button>
        )}
      </td>
      
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest ${getStatusStyles(inquiry.status)}`}>
          {inquiry.status}
        </span>
      </td>
      
      <td className="px-6 py-4 text-[11px] text-admin-text-muted">
        {inquiry.date}
      </td>
      
      <td className="px-6 py-4 text-right">
        <button className="opacity-0 group-hover:opacity-100 text-admin-gold text-[11px] font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-1 ml-auto">
          View Detail
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </td>
    </tr>
  );
}
