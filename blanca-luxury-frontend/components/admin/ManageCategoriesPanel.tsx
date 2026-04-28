'use client';

import React, { useState, useEffect } from 'react';
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/lib/store';
import type { Category } from '@/lib/types';

interface ManageCategoriesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Mode = 'list' | 'create' | 'edit';

export function ManageCategoriesPanel({ isOpen, onClose }: ManageCategoriesPanelProps) {
  const { data, isLoading } = useGetAllCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [mode, setMode] = useState<Mode>('list');
  const [editing, setEditing] = useState<Category | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const isSaving = isCreating || isUpdating;
  const categories = data?.items ?? [];

  // Reset form when mode changes
  useEffect(() => {
    if (mode === 'create') {
      setName(''); setDescription(''); setIcon(''); setIsActive(true); setError('');
    } else if (mode === 'edit' && editing) {
      setName(editing.name);
      setDescription(editing.description ?? '');
      setIcon(editing.icon ?? '');
      setIsActive(editing.isActive);
      setError('');
    }
  }, [mode, editing]);

  // Reset entirely when panel closes
  useEffect(() => {
    if (!isOpen) {
      setMode('list');
      setEditing(null);
      setDeleteConfirm(null);
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!name.trim()) { setError('Category name is required.'); return; }
    setError('');
    try {
      if (mode === 'edit' && editing) {
        await updateCategory({
          id: editing.id,
          body: { name: name.trim(), description: description.trim() || undefined, icon: icon.trim() || undefined, isActive },
        }).unwrap();
      } else {
        await createCategory({
          name: name.trim(),
          description: description.trim() || undefined,
          icon: icon.trim() || undefined,
          isActive,
        }).unwrap();
      }
      setMode('list');
    } catch {
      setError('Failed to save category. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      setDeleteConfirm(null);
    } catch {
      setError('Cannot delete category — it may have products assigned.');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#0F0E0C]/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 w-full max-w-[480px] h-screen bg-admin-surface border-l-2 border-admin-gold z-[70] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <header className="px-8 py-6 border-b border-admin-border/50 flex justify-between items-center sticky top-0 bg-admin-surface/90 backdrop-blur z-10">
          <div>
            {mode !== 'list' && (
              <button
                onClick={() => setMode('list')}
                className="text-admin-text-muted hover:text-admin-gold transition-colors flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider mb-2"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back
              </button>
            )}
            <h2 className="text-[18px] font-bold text-admin-text-primary tracking-tight">
              {mode === 'list' ? 'Manage Categories' : mode === 'create' ? 'New Category' : 'Edit Category'}
            </h2>
            <p className="text-[11px] text-admin-text-muted mt-0.5">
              Permanent taxonomy labels — Furniture, Decor, Drapery…
            </p>
          </div>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text-primary transition-colors p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* ── LIST MODE ─────────────────────────────────────────────────── */}
          {mode === 'list' && (
            <div className="px-8 py-6 space-y-4">
              {/* Explainer */}
              <div className="bg-admin-gold/5 border border-admin-gold/20 rounded-[6px] px-4 py-3">
                <p className="text-[11px] text-admin-gold font-medium leading-relaxed">
                  Categories are permanent shelf labels. A sofa always lives in <strong>Furniture</strong> — that never changes. Use Collections for editorial stories instead.
                </p>
              </div>

              {error && (
                <div className="bg-admin-danger/10 border border-admin-danger/30 rounded-[4px] px-4 py-3">
                  <p className="text-admin-danger text-[12px] font-medium">{error}</p>
                </div>
              )}

              {/* Create button */}
              <button
                onClick={() => setMode('create')}
                className="w-full h-[44px] border-2 border-dashed border-admin-gold/30 rounded-[6px] text-admin-gold text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:border-admin-gold hover:bg-admin-gold/5 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                New Category
              </button>

              {/* Category list */}
              {isLoading ? (
                <div className="py-12 flex justify-center">
                  <div className="w-6 h-6 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin" />
                </div>
              ) : categories.length === 0 ? (
                <div className="py-12 text-center">
                  <span className="material-symbols-outlined text-[40px] text-admin-gold/20 mb-2 block">category</span>
                  <p className="text-[13px] text-admin-text-muted">No categories yet.</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li
                      key={cat.id}
                      className="bg-admin-surface-elevated/30 border border-admin-border/30 rounded-[6px] px-4 py-3 flex items-center justify-between group hover:border-admin-gold/20 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {cat.icon && <span className="text-[20px] shrink-0">{cat.icon}</span>}
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-admin-text-primary truncate">{cat.name}</p>
                          <p className="text-[11px] text-admin-text-muted">
                            {cat._count?.products ?? 0} products ·{' '}
                            <span className={cat.isActive ? 'text-admin-success' : 'text-admin-warning'}>
                              {cat.isActive ? 'Live' : 'Draft'}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => { setEditing(cat); setMode('edit'); }}
                          className="w-8 h-8 flex items-center justify-center text-admin-text-muted hover:text-admin-gold transition-colors rounded-[4px] hover:bg-admin-gold/10"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>

                        {deleteConfirm === cat.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(cat.id)}
                              className="text-[10px] font-bold text-admin-danger uppercase tracking-wide px-2 py-1 border border-admin-danger/30 rounded-[3px] hover:bg-admin-danger/10"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-[10px] font-bold text-admin-text-muted uppercase tracking-wide px-2 py-1"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(cat.id)}
                            className="w-8 h-8 flex items-center justify-center text-admin-text-muted hover:text-admin-danger transition-colors rounded-[4px] hover:bg-admin-danger/10"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* ── CREATE / EDIT MODE ──────────────────────────────────────────── */}
          {(mode === 'create' || mode === 'edit') && (
            <div className="px-8 py-8 space-y-6">
              {error && (
                <div className="bg-admin-danger/10 border border-admin-danger/30 rounded-[4px] px-4 py-3">
                  <p className="text-admin-danger text-[12px] font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="admin-label">Category Name *</label>
                <input
                  className="admin-input"
                  placeholder="e.g. Furniture, Decor, Drapery"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="admin-label">Icon / Emoji</label>
                <input
                  className="admin-input font-mono"
                  placeholder="e.g. 🛋️ or icon-furniture"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                />
                <p className="text-[11px] text-admin-text-muted">
                  Used in the category filter bar on the public collections page.
                </p>
              </div>

              <div className="space-y-2">
                <label className="admin-label">Description</label>
                <textarea
                  className="admin-input h-auto min-h-[80px] py-3 resize-none"
                  placeholder="Short category description..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-4 border-t border-admin-border/20 pt-6">
                <label className="admin-label">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Live', 'Draft'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setIsActive(s === 'Live')}
                      className={`py-2 text-[10px] font-bold uppercase tracking-widest rounded-[4px] border transition-all ${
                        isActive === (s === 'Live')
                          ? 'bg-admin-gold border-admin-gold text-admin-bg'
                          : 'border-admin-border/50 text-admin-text-muted hover:border-admin-gold/50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="admin-button-gold uppercase tracking-[0.1em] font-bold flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-admin-bg border-t-transparent rounded-full animate-spin" />
                    Saving…
                  </>
                ) : mode === 'edit' ? 'Update Category' : 'Create Category'}
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
