'use client';

import React, { useState } from 'react';
import { InquiryRow, InquiryProps } from '@/components/admin/InquiryRow';
import { InquiryDetailPanel } from '@/components/admin/InquiryDetailPanel';
import { useGetInquiriesQuery } from '@/lib/store';
import type { Inquiry, InquiryStatus, InquirySource } from '@/lib/types';

type RowStatus = InquiryProps['status'];
type RowSource = InquiryProps['source'];

const STATUS_MAP: Record<InquiryStatus, RowStatus> = {
  NEW: 'New',
  IN_PROGRESS: 'In Progress',
  QUOTED: 'Quoted',
  CONVERTED: 'Converted',
  CLOSED: 'Closed',
};

const SOURCE_MAP: Record<InquirySource, RowSource> = {
  WEBSITE: 'Web Form',
  WHATSAPP: 'WhatsApp',
  INSTAGRAM: 'Web Form',
  REFERRAL: 'Web Form',
  WALK_IN: 'Web Form',
};

function formatDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

function toRowProps(i: Inquiry): InquiryProps {
  return {
    id: i.id,
    name: i.fullName,
    phone: i.phone ?? '—',
    email: i.email ?? '—',
    interest: i.serviceInterest ?? '—',
    showroom: i.showroom?.name ?? '—',
    source: SOURCE_MAP[i.source] ?? 'Web Form',
    status: STATUS_MAP[i.status] ?? 'New',
    date: formatDate(i.createdAt),
  };
}

type StatusFilter = 'All' | RowStatus;

const STATUS_TO_API: Record<Exclude<StatusFilter, 'All'>, InquiryStatus> = {
  'New': 'NEW',
  'In Progress': 'IN_PROGRESS',
  'Quoted': 'QUOTED',
  'Converted': 'CONVERTED',
  'Closed': 'CLOSED',
};

export default function InquiriesPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryProps | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const apiStatus = statusFilter === 'All' ? undefined : STATUS_TO_API[statusFilter];

  const { data, isLoading, isError } = useGetInquiriesQuery(
    apiStatus ? { status: apiStatus } : {}
  );

  const inquiries = (data?.items ?? []).map(toRowProps);
  const total = data?.total ?? 0;
  const newCount = inquiries.filter((i) => i.status === 'New').length;
  const inProgressCount = inquiries.filter((i) => i.status === 'In Progress').length;

  const handleViewDetail = (inquiry: InquiryProps) => {
    setSelectedInquiry(inquiry);
    setIsPanelOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end mb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-[28px] font-bold tracking-tight text-[#F0EDE8]">Inquiries</h2>
          <div className="flex items-center gap-4">
            <p className="text-[12px] text-admin-text-muted uppercase tracking-wider font-semibold">
              All leads from web forms and WhatsApp triggers.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-bold bg-[#1D1B19] px-3 py-1.5 rounded-[4px] border border-admin-border/30">
              <span className="text-admin-gold">{newCount} NEW</span>
              <span className="text-admin-text-muted">·</span>
              <span className="text-orange-400">{inProgressCount} IN PROGRESS</span>
              <span className="text-admin-text-muted">·</span>
              <span className="text-[#F0EDE8]">{total} TOTAL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-[#1A1916] border border-admin-border/50 rounded-[8px] p-4 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex bg-admin-bg p-1 rounded-[6px] border border-admin-border/30">
            {(['All', 'New', 'In Progress', 'Quoted', 'Converted', 'Closed'] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-[4px] transition-all ${
                  statusFilter === s
                    ? 'bg-admin-surface-elevated text-admin-gold'
                    : 'text-admin-text-muted hover:text-admin-text-primary'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="h-[38px] px-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-admin-text-primary border border-admin-border hover:border-admin-gold/50 transition-all rounded-[6px]">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1A1916] rounded-[8px] border border-admin-border/50 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-admin-border/50 bg-admin-bg/30">
              <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em] w-1/5">Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em] w-1/5">Contact</th>
              <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Interest</th>
              <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Showroom</th>
              <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Source</th>
              <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Assigned</th>
              <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-admin-text-muted uppercase tracking-[0.2em]">Date</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin" />
                    <p className="text-[13px] text-admin-text-muted">Loading inquiries...</p>
                  </div>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={9} className="py-20 text-center">
                  <span className="text-[13px] text-admin-danger">Failed to load inquiries.</span>
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-[48px] text-admin-border">mail</span>
                    <p className="text-[13px] text-admin-text-muted font-medium">No inquiries found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <InquiryRow key={inquiry.id} inquiry={inquiry} onView={handleViewDetail} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <InquiryDetailPanel
        inquiry={selectedInquiry}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
}
