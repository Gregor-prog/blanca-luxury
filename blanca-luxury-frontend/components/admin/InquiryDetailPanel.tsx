'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { InquiryProps } from './InquiryRow';

interface InquiryDetailPanelProps {
  inquiry: InquiryProps | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryDetailPanel({ inquiry, isOpen, onClose }: InquiryDetailPanelProps) {
  const [note, setNote] = useState('');

  if (!inquiry) return null;

  const mockNotes = [
    { author: 'Sarah Admin', initials: 'SA', text: 'Checked inventory. We have sample size 38 in London.', time: 'Today, 14:35' },
    { author: 'James Manager', initials: 'JM', text: 'Follow-up call scheduled for tomorrow.', time: 'Yesterday, 09:20' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-[#0F0E0C]/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <aside 
        className={`fixed right-0 top-0 w-full max-w-[480px] h-screen bg-admin-surface border-l-2 border-admin-gold z-[70] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <header className="px-8 py-6 border-b border-admin-border/50 bg-[#1A1916] flex justify-between items-start sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-[18px] font-bold text-admin-text-primary tracking-tight">{inquiry.name}</h3>
              <span className={`px-2 py-0.5 rounded-sm text-[9px] uppercase font-bold tracking-widest ${
                inquiry.status === 'New' ? 'bg-admin-gold text-admin-bg' : 'bg-admin-surface-elevated text-admin-text-muted'
              }`}>
                {inquiry.status}
              </span>
            </div>
            <p className="text-[11px] text-admin-text-muted font-mono uppercase tracking-widest">Inquiry #INQ-{inquiry.id.slice(-4).toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="text-admin-text-muted hover:text-admin-success transition-colors">
               <span className="material-symbols-outlined text-[20px]">check_circle</span>
             </button>
             <button className="text-admin-text-muted hover:text-admin-danger transition-colors">
               <span className="material-symbols-outlined text-[20px]">block</span>
             </button>
             <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text-primary ml-2 transition-colors">
               <span className="material-symbols-outlined text-[24px]">close</span>
             </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 custom-scrollbar">
          
          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Call', icon: 'call', action: `tel:${inquiry.phone}` },
              { label: 'Reply', icon: 'mail', action: `mailto:${inquiry.email}` },
              { label: 'WhatsApp', icon: 'chat', action: `https://wa.me/${inquiry.phone.replace(/\D/g, '')}`, primary: true }
            ].map((btn) => (
              <a 
                key={btn.label}
                href={btn.action}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-[6px] border transition-all ${
                  btn.primary 
                  ? 'bg-admin-gold border-admin-gold text-admin-bg hover:opacity-90' 
                  : 'bg-admin-surface-elevated border-admin-border/50 text-admin-text-primary hover:border-admin-gold/30 hover:bg-admin-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{btn.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">{btn.label}</span>
              </a>
            ))}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-8 gap-x-6 border-b border-admin-border/20 pb-10">
            {[
              { label: 'Interest', value: inquiry.interest },
              { label: 'Showroom', value: inquiry.showroom },
              { label: 'Source', value: inquiry.source, isSource: true },
              { label: 'Received', value: 'Oct 24, 2023 - 14:30' },
            ].map((item) => (
              <div key={item.label}>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-admin-text-muted block mb-2">{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.isSource && <span className="material-symbols-outlined text-[16px] text-admin-gold">language</span>}
                  <span className="text-[13px] text-admin-text-primary font-medium">{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Referenced Product */}
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-admin-text-muted">Referenced Product</span>
            <div className="flex items-center gap-4 bg-admin-surface-elevated border border-admin-border/40 rounded-[8px] p-4 group cursor-pointer hover:border-admin-gold/30 transition-all">
              <div className="w-14 h-14 rounded-[4px] bg-admin-bg relative overflow-hidden flex-shrink-0">
                <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?q=80&w=200&auto=format&fit=crop" alt="Product" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-admin-text-primary group-hover:text-admin-gold transition-colors">Obsidian Silk Gown</span>
                <span className="text-[11px] text-admin-text-muted uppercase tracking-wider">Collection: Noir 23</span>
              </div>
              <span className="material-symbols-outlined ml-auto text-admin-text-muted text-[18px]">open_in_new</span>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-admin-text-muted">Full Inquiry Message</span>
            <div className="bg-[#0F0E0C] border border-admin-border/50 rounded-[8px] p-5 text-[13px] text-admin-text-secondary leading-relaxed italic">
              &ldquo;Hello, I&apos;m interested in booking a bridal consultation at your London showroom for late next month. I saw the Obsidian Silk Gown on your Instagram and would love to know if it&apos;s available to try on. Thank you.&rdquo;
            </div>
          </div>

          {/* Assignment & Notes */}
          <div className="space-y-10 pt-10 border-t border-admin-border/20">
             {/* Assigned To */}
             <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-admin-text-muted">Currently Assigned</span>
                   <div className="flex items-center gap-3 px-3 py-1.5 bg-admin-surface-elevated rounded-[4px] border border-admin-border/30">
                      <div className="w-5 h-5 rounded-full bg-admin-gold/20 flex items-center justify-center text-[9px] font-bold text-admin-gold">SA</div>
                      <span className="text-[12px] text-admin-text-primary font-medium">{inquiry.assignedTo || 'Unassigned'}</span>
                   </div>
                </div>
                <button className="text-[10px] font-bold text-admin-gold uppercase tracking-widest hover:underline">Change Assignment</button>
             </div>

             {/* Internal Notes Section */}
             <div className="space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-admin-text-muted">Internal Team Notes</span>
                
                {/* Notes Input */}
                <div className="space-y-3">
                  <textarea 
                    className="admin-input h-auto min-h-[100px] text-[12px] py-3 placeholder:italic"
                    placeholder="Add a private note for the team..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-admin-surface-elevated border border-admin-border/50 text-[10px] font-bold uppercase tracking-widest text-admin-text-primary hover:border-admin-gold/50 rounded-[4px] transition-all">Save Note</button>
                  </div>
                </div>

                {/* Notes Timeline */}
                <div className="space-y-6 pt-4">
                  {mockNotes.map((n, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-admin-surface-elevated border border-admin-border/40 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-admin-text-muted group-hover:text-admin-gold group-hover:border-admin-gold/30 transition-all">
                        {n.initials}
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold text-admin-text-primary">{n.author}</span>
                          <span className="text-[10px] text-admin-text-muted uppercase tracking-tighter">{n.time}</span>
                        </div>
                        <p className="text-[12px] text-admin-text-secondary pr-4 leading-normal">{n.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Footer Quick Reply */}
        <div className="p-8 border-t border-admin-border/50 bg-admin-surface-elevated/30 sticky bottom-0 z-10 flex gap-4">
          <button className="flex-1 bg-admin-gold text-admin-bg font-bold uppercase tracking-widest text-[11px] py-3 rounded-[6px] hover:opacity-90 flex items-center justify-center gap-2">
            Send WhatsApp Reply
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </button>
        </div>
      </aside>
    </>
  );
}
