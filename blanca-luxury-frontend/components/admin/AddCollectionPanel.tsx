'use client';

import React, { useState, useEffect } from 'react';
import { 
  useCreateCollectionMutation, 
  useUpdateCollectionMutation, 
  useGetAllShowroomsQuery 
} from '@/lib/store';
import type { Collection } from '@/lib/types';

export interface CollectionData {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  badgeText?: string;
  year?: number;
  showroomId?: string;
  isFeatured?: boolean;
  isActive?: boolean;
}

interface AddCollectionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CollectionData;
}

export function AddCollectionPanel({ isOpen, onClose, initialData }: AddCollectionPanelProps) {
  const [createCollection, { isLoading: isCreating }] = useCreateCollectionMutation();
  const [updateCollection, { isLoading: isUpdating }] = useUpdateCollectionMutation();
  const { data: showroomsData } = useGetAllShowroomsQuery();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [badgeText, setBadgeText] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [showroomId, setShowroomId] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<'Live' | 'Draft'>('Draft');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState('');

  const isLoading = isCreating || isUpdating;
  const isEdit = !!initialData?.id;
  const showrooms = showroomsData?.items ?? [];

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? '');
      setSlug(initialData.slug ?? '');
      setDescription(initialData.description ?? '');
      setBadgeText(initialData.badgeText ?? '');
      setYear(initialData.year ?? new Date().getFullYear());
      setShowroomId(initialData.showroomId ?? '');
      setIsFeatured(initialData.isFeatured ?? false);
      setStatus(initialData.isActive ? 'Live' : 'Draft');
    } else {
      setName(''); setSlug(''); setDescription(''); setBadgeText('');
      setYear(new Date().getFullYear()); setShowroomId('');
      setIsFeatured(false); setStatus('Draft');
    }
    setImageFile(null);
    setImagePreview('');
    setError('');
  }, [initialData, isOpen]);

  // Auto-generate slug from name in create mode
  useEffect(() => {
    if (!isEdit) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  }, [name, isEdit]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Collection name is required.');
      return;
    }
    setError('');
    const isActive = status === 'Live';

    try {
      if (isEdit && initialData?.id) {
        await updateCollection({
          id: initialData.id,
          body: { 
            name: name.trim(), 
            description: description.trim() || undefined, 
            badgeText: badgeText.trim() || undefined,
            year: year ? Number(year) : undefined,
            showroomId: showroomId || undefined,
            isFeatured,
            isActive 
          },
        }).unwrap();
      } else {
        const fd = new FormData();
        fd.append('name', name.trim());
        fd.append('slug', slug.trim());
        if (description.trim()) fd.append('description', description.trim());
        if (badgeText.trim()) fd.append('badgeText', badgeText.trim());
        if (year) fd.append('year', String(year));
        if (showroomId) fd.append('showroomId', showroomId);
        fd.append('isFeatured', String(isFeatured));
        fd.append('isActive', String(isActive));
        if (imageFile) fd.append('image', imageFile);

        await createCollection(fd).unwrap();
      }
      onClose();
    } catch (err: unknown) {
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

        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6 custom-scrollbar">
          {error && (
            <div className="bg-admin-danger/10 border border-admin-danger/30 rounded-[4px] px-4 py-3">
              <p className="text-admin-danger text-[12px] font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="admin-label">Collection Name *</label>
              <input
                className="admin-input"
                placeholder="e.g. The Lagos Edit 2025"
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
              <label className="admin-label">Badge Text (Optional)</label>
              <input
                className="admin-input"
                placeholder="e.g. Limited Drop, New Season"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="admin-label">Year</label>
                <input
                  type="number"
                  className="admin-input"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <label className="admin-label">Showroom</label>
                <select
                  className="admin-input appearance-none bg-[#1A1916]"
                  value={showroomId}
                  onChange={(e) => setShowroomId(e.target.value)}
                >
                  <option value="">— None —</option>
                  {showrooms.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} · {s.city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-input h-auto min-h-[80px] py-3 resize-none"
                placeholder="Editorial summary..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {!isEdit && (
            <div className="space-y-4 border-t border-admin-border/20 pt-6">
              <label className="admin-label">Cover Image</label>
              <div className="relative border-2 border-dashed border-admin-border/40 rounded-[8px] p-6 bg-admin-surface-elevated/20 flex flex-col items-center justify-center text-center group hover:border-admin-gold/50 transition-all cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="Preview" className="max-h-[120px] object-cover rounded-[4px] border border-admin-border" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[36px] text-admin-text-muted group-hover:text-admin-gold transition-colors mb-2">add_a_photo</span>
                    <p className="text-[13px] font-medium text-admin-text-primary mb-1">Upload editorial cover</p>
                    <p className="text-[11px] text-admin-text-muted">High resolution (Max 5MB)</p>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4 border-t border-admin-border/20 pt-6">
            <div className="flex items-center justify-between">
              <label className="admin-label !mb-0">Featured Collection</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
                <div className="w-10 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-bg after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold" />
              </label>
            </div>
          </div>

          <div className="space-y-4 border-t border-admin-border/20 pt-6">
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

