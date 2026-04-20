'use client';

import React, { useState } from 'react';
import { InquiryRow, InquiryProps } from '@/components/admin/InquiryRow';
import { InquiryDetailPanel } from '@/components/admin/InquiryDetailPanel';

const mockInquiries: InquiryProps[] = [
  {
    id: '8492',
    name: 'Eleanor Vance',
    phone: '+44 7700 900077',
    email: 'eleanor.v@example.com',
    interest: 'Bridal',
    showroom: 'London',
    source: 'Web Form',
    status: 'New',
    date: '10 min ago',
    assignedTo: 'Sarah Admin'
  },
  {
    id: '8493',
    name: 'Julian Thorne',
    phone: '+33 6 12 34 56 78',
    email: 'j.thorne@atelier.com',
    interest: 'Styling',
    showroom: 'Paris',
    source: 'WhatsApp',
    status: 'In Progress',
    date: '2 hours ago'
  },
  {
    id: '8494',
    name: 'Clara Bow',
    phone: '+1 212 555 0199',
    email: 'clara@example.com',
    interest: 'General',
    showroom: 'New York',
    source: 'Email',
    status: 'Resolved',
    date: 'Yesterday',
    assignedTo: 'James Manager'
  },
  {
    id: '8495',
    name: 'Arthur Blackwood',
    phone: '+234 803 123 4567',
    email: 'a.blackwood@vogue.ng',
    interest: 'Curation',
    showroom: 'Lagos',
    source: 'Phone',
    status: 'New',
    date: '3 hours ago'
  }
];

export default function InquiriesPage() {
  const [inquiries] = useState(mockInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryProps | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleViewDetail = (inquiry: InquiryProps) => {
    setSelectedInquiry(inquiry);
    setIsPanelOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <header className="flex justify-between items-end mb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-[28px] font-bold tracking-tight text-[#F0EDE8]">Inquiries</h2>
          <div className="flex items-center gap-4">
            <p className="text-[12px] text-admin-text-muted uppercase tracking-wider font-semibold">All leads from web forms and WhatsApp triggers.</p>
            {/* Inline Stats */}
            <div className="flex items-center gap-3 text-[10px] font-bold bg-[#1D1B19] px-3 py-1.5 rounded-[4px] border border-admin-border/30">
              <span className="text-admin-gold">12 NEW</span>
              <span className="text-admin-text-muted">·</span>
              <span className="text-orange-400">5 IN PROGRESS</span>
              <span className="text-admin-text-muted">·</span>
              <span className="text-[#F0EDE8]">128 TOTAL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-[#1A1916] border border-admin-border/50 rounded-[8px] p-4 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex bg-admin-bg p-1 rounded-[6px] border border-admin-border/30">
            {['All', 'New', 'In Progress', 'Resolved', 'Spam'].map((s, i) => (
              <button key={s} className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-[4px] transition-all ${i === 0 ? 'bg-admin-surface-elevated text-admin-gold' : 'text-admin-text-muted hover:text-admin-text-primary'}`}>{s}</button>
            ))}
          </div>
          
          <select className="bg-admin-bg text-[12px] text-admin-text-primary font-bold border border-admin-border/50 rounded-[6px] px-4 py-2 outline-none focus:border-admin-gold transition-colors min-w-[160px]">
            <option>All Showrooms</option>
            <option>Lagos</option>
            <option>London</option>
            <option>Paris</option>
          </select>

          <select className="bg-admin-bg text-[12px] text-admin-text-primary font-bold border border-admin-border/50 rounded-[6px] px-4 py-2 outline-none focus:border-admin-gold transition-colors min-w-[160px]">
            <option>All Services</option>
            <option>Interior Design</option>
            <option>Bridal</option>
            <option>Furniture</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button className="h-[38px] px-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-admin-text-primary border border-admin-border hover:border-admin-gold/50 transition-all rounded-[6px]">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* Inquiries Table */}
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
            {inquiries.map((inquiry) => (
              <InquiryRow key={inquiry.id} inquiry={inquiry} onView={handleViewDetail} />
            ))}
          </tbody>
        </table>

        {/* Empty State Mock */}
        {inquiries.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <span className="material-symbols-outlined text-[48px] text-admin-border">mail</span>
            <p className="text-[13px] text-admin-text-muted font-medium">No inquiries found matching your filters.</p>
          </div>
        )}
      </div>

      <InquiryDetailPanel 
        inquiry={selectedInquiry}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
}
