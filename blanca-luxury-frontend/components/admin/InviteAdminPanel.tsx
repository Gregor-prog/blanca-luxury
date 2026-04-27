'use client';

import React, { useState } from 'react';
import { useInviteAdminMutation, useGetAllShowroomsQuery } from '@/lib/store';
import type { AdminRole } from '@/lib/types';

type UIRole = 'Super Admin' | 'Showroom Manager';

const ROLE_MAP: Record<UIRole, AdminRole> = {
  'Super Admin': 'SUPER_ADMIN',
  'Showroom Manager': 'SHOWROOM_MANAGER',
};

interface InviteAdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteAdminPanel({ isOpen, onClose }: InviteAdminPanelProps) {
  const [inviteAdmin, { isLoading }] = useInviteAdminMutation();
  const { data: showroomsData } = useGetAllShowroomsQuery();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UIRole>('Showroom Manager');
  const [showroomId, setShowroomId] = useState('');
  const [error, setError] = useState('');

  const showrooms = showroomsData?.items ?? [];

  const reset = () => {
    setEmail(''); setPassword(''); setRole('Showroom Manager');
    setShowroomId(''); setError('');
  };

  const handleInvite = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setError('');
    try {
      await inviteAdmin({
        email: email.trim(),
        password: password.trim(),
        role: ROLE_MAP[role],
        showroomId: showroomId || undefined,
      }).unwrap();
      reset();
      onClose();
    } catch {
      setError('Failed to create admin. Email may already be in use.');
    }
  };

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
            <h3 className="text-[18px] font-bold text-admin-text-primary tracking-tight">Add New Admin</h3>
            <p className="text-[11px] text-admin-text-muted font-medium uppercase tracking-[0.1em] mt-1">Super Admin Privileges Required</p>
          </div>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-10 custom-scrollbar">
          {error && (
            <div className="bg-admin-danger/10 border border-admin-danger/30 rounded-[4px] px-4 py-3">
              <p className="text-admin-danger text-[12px] font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-admin-text-muted uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                className="admin-input"
                placeholder="admin@blancaluxury.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-admin-text-muted uppercase tracking-widest">Password</label>
              <input
                type="password"
                className="admin-input"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-admin-text-muted uppercase tracking-widest">Assign Role</label>
              <div className="grid grid-cols-1 gap-2">
                {([
                  { id: 'Super Admin' as UIRole, desc: 'Full access to all systems, settings, and team management.' },
                  { id: 'Showroom Manager' as UIRole, desc: 'Can manage products and inquiries for their assigned showroom.' },
                ]).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
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

            {role === 'Showroom Manager' && showrooms.length > 0 && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <label className="text-[11px] font-bold text-admin-text-muted uppercase tracking-widest">Assign Showroom</label>
                <select
                  className="admin-input appearance-none bg-[#1A1916]"
                  value={showroomId}
                  onChange={(e) => setShowroomId(e.target.value)}
                >
                  <option value="">No showroom assigned</option>
                  {showrooms.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} — {s.city}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-[8px] flex gap-4">
            <span className="material-symbols-outlined text-amber-500 text-[20px] shrink-0">info</span>
            <p className="text-[11px] text-amber-500/80 leading-normal font-medium">
              The admin account will be created immediately. Share these credentials securely and ask them to change their password on first login.
            </p>
          </div>
        </div>

        <div className="p-8 border-t border-admin-border/50 bg-[#1A1916] flex gap-4">
          <button
            onClick={handleInvite}
            disabled={isLoading}
            className="flex-1 bg-admin-gold text-admin-bg font-bold uppercase tracking-widest text-[11px] py-3 rounded-[6px] hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-admin-bg border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Admin Account
                <span className="material-symbols-outlined text-[18px]">person_add</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
