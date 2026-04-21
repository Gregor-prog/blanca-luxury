'use client';

import React, { useState } from 'react';

interface InviteAdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteAdminPanel({ isOpen, onClose }: InviteAdminPanelProps) {
  const [role, setRole] = useState<'Admin' | 'Content' | 'Superadmin'>('Admin');

  return (
    <>
      <div 
        className={`fixed inset-0 bg-[#0F0E0C]/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <aside 
        className={`fixed right-0 top-0 w-full max-w-[480px] h-screen bg-admin-surface border-l-2 border-admin-gold z-[70] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}
      >
        <header className="px-8 py-6 border-b border-admin-border/50 bg-[#1A1916] flex justify-between items-center sticky top-0 z-10">
          <div>
            <h3 className="text-[18px] font-bold text-admin-text-primary tracking-tight">Invite New Admin</h3>
            <p className="text-[11px] text-admin-text-muted font-medium uppercase tracking-[0.1em] mt-1">Superadmin Privileges Required</p>
          </div>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-10 custom-scrollbar">
          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-admin-text-muted uppercase tracking-widest">Full Name</label>
              <input type="text" className="admin-input" placeholder="e.g. Arthur Blackwood" />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-admin-text-muted uppercase tracking-widest">Email Address</label>
              <input type="email" className="admin-input" placeholder="admin@blancaluxury.com" />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-admin-text-muted uppercase tracking-widest">Assign Role</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'Superadmin', desc: 'Full access to all systems, settings, and team management.' },
                  { id: 'Admin', desc: 'Can manage products and inquiries for their assigned showroom.' },
                  { id: 'Content', desc: 'Can manage posts, lookbook, and collections only.' },
                ].map((r) => (
                  <button 
                    key={r.id}
                    onClick={() => setRole(r.id as 'Admin' | 'Content' | 'Superadmin')}
                    className={`text-left p-4 rounded-[6px] border transition-all ${
                      role === r.id 
                      ? 'bg-admin-gold/5 border-admin-gold border-2' 
                      : 'bg-admin-surface-elevated border-admin-border/30 hover:border-admin-gold/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[12px] font-bold uppercase tracking-widest ${role === r.id ? 'text-admin-gold' : 'text-admin-text-primary'}`}>{r.id}</span>
                      {role === r.id && <span className="material-symbols-outlined text-admin-gold text-[18px]">check_circle</span>}
                    </div>
                    <p className="text-[11px] text-admin-text-muted leading-relaxed">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Showroom Assignment */}
            {role === 'Admin' && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <label className="text-[11px] font-bold text-admin-text-muted uppercase tracking-widest">Primary Showroom</label>
                <select className="admin-input appearance-none">
                  <option>London Flagship</option>
                  <option>Paris Atelier</option>
                  <option>Lagos Showroom</option>
                  <option>New York Studio</option>
                </select>
              </div>
            )}
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-[8px] flex gap-4">
            <span className="material-symbols-outlined text-amber-500 text-[20px] shrink-0">info</span>
            <p className="text-[11px] text-amber-500/80 leading-normal font-medium">
              An invitation email will be sent to this address. The link expires in 24 hours. The user&apos;s status will remain &apos;Pending&apos; until they accept.
            </p>
          </div>
        </div>

        <div className="p-8 border-t border-admin-border/50 bg-[#1A1916] flex gap-4">
          <button className="flex-1 bg-admin-gold text-admin-bg font-bold uppercase tracking-widest text-[11px] py-3 rounded-[6px] hover:opacity-90 flex items-center justify-center gap-2">
            Send Invitation Email
            <span className="material-symbols-outlined text-[18px]">alternate_email</span>
          </button>
        </div>
      </aside>
    </>
  );
}
