'use client';

import React, { useState, useEffect } from 'react';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '@/lib/store';

export interface CollectionData {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
}

interface AddCollectionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CollectionData;
}

export function AddCollectionPanel({ isOpen, onClose, initialData }: AddCollectionPanelProps) {
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const [name, setName] = useState(initialData?.name ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [status, setStatus] = useState<'Live' | 'Draft'>(initialData?.isActive ? 'Live' : 'Draft');
  const [error, setError] = useState('');

  const isLoading = isCreating || isUpdating;
  const isEdit = !!initialData?.id;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? '');
      setSlug(initialData.slug ?? '');
      setDescription(initialData.description ?? '');
      setStatus(initialData.isActive ? 'Live' : 'Draft');
    } else {
      setName(''); setSlug(''); setDescription(''); setStatus('Draft');
    }
    setError('');
  }, [initialData, isOpen]);

  // Auto-generate slug from name in create mode
  useEffect(() => {
    if (!isEdit) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  }, [name, isEdit]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Collection name is required.');
      return;
    }
    setError('');
    const isActive = status === 'Live';
    try {
      if (isEdit && initialData?.id) {
        await updateCategory({
          id: initialData.id,
          body: { name: name.trim(), description: description.trim() || undefined, isActive },
        }).unwrap();
      } else {
        await createCategory({
          name: name.trim(),
          description: description.trim() || undefined,
          isActive,
        }).unwrap();
      }
      onClose();
    } catch {
      setError('Failed to save collection. Please try again.');
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
        <header className="px-8 py-6 border-b border-admin-border/50 flex justify-between items-center sticky top-0 bg-admin-surface/90 backdrop-blur z-10">
          <h2 className="text-[18px] font-bold text-admin-text-primary tracking-tight">
            {isEdit ? 'Edit Collection' : 'Add New Collection'}
          </h2>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text-primary transition-colors p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">
          {error && (
            <div className="bg-admin-danger/10 border border-admin-danger/30 rounded-[4px] px-4 py-3">
              <p className="text-admin-danger text-[12px] font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="admin-label">Collection Name</label>
              <input
                className="admin-input"
                placeholder="e.g. The Obsidian Line"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">Slug</label>
              <input
                className="admin-input !bg-admin-surface-elevated/20 font-mono text-[13px]"
                readOnly
                value={slug}
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-input h-auto min-h-[100px] py-3 resize-none"
                placeholder="Editorial summary..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 border-t border-admin-border/20 pt-8">
            <label className="admin-label">Cover Image</label>
            <div className="border-2 border-dashed border-admin-border/40 rounded-[8px] p-10 bg-admin-surface-elevated/20 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-admin-gold/50 transition-all">
              <span className="material-symbols-outlined text-[36px] text-admin-text-muted group-hover:text-admin-gold transition-colors mb-2">add_a_photo</span>
              <p className="text-[13px] font-medium text-admin-text-primary mb-1">Upload editorial cover</p>
              <p className="text-[11px] text-admin-text-muted">High resolution (Max 5MB)</p>
            </div>
          </div>

          <div className="space-y-4 border-t border-admin-border/20 pt-8">
            <label className="admin-label">Status</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Live', 'Draft'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`py-2 text-[10px] font-bold uppercase tracking-widest rounded-[4px] border transition-all ${
                    status === s
                      ? 'bg-admin-gold border-admin-gold text-admin-bg'
                      : 'border-admin-border/50 text-admin-text-muted hover:border-admin-gold/50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-admin-border/50 bg-admin-surface-elevated/30 sticky bottom-0 z-10">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="admin-button-gold uppercase tracking-[0.1em] font-bold flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-admin-bg border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : isEdit ? 'Update Collection' : 'Create Collection'}
          </button>
        </div>
      </aside>
    </>
  );
}
