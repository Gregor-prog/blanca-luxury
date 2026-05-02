'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useUploadProjectCoverMutation,
  useAddProjectMediaMutation,
  useDeleteProjectMediaMutation,
} from '@/lib/store';
import type { ProjectSector } from '@/lib/types';

export interface ProjectFormData {
  id?: string;
  title: string;
  sector: ProjectSector;
  location?: string;
  year?: number;
  description?: string;
  clientName?: string;
  isFeatured: boolean;
  isActive: boolean;
  coverImageUrl?: string | null;
  existingMedia?: { id: string; url: string; mediaType: string; displayOrder: number }[];
}

interface NewImageFile {
  file: File;
  preview: string;
}

interface AddProjectPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ProjectFormData;
}

const SECTOR_OPTIONS: ProjectSector[] = [
  'RESIDENTIAL',
  'COMMERCIAL',
  'HOSPITALITY',
  'MEDICAL',
  'GOVERNMENT',
];

export function AddProjectPanel({ isOpen, onClose, initialData }: AddProjectPanelProps) {
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [uploadCover, { isLoading: isUploadingCover }] = useUploadProjectCoverMutation();
  const [addMedia, { isLoading: isAddingMedia }] = useAddProjectMediaMutation();
  const [deleteMedia] = useDeleteProjectMediaMutation();

  const [title, setTitle] = useState('');
  const [sector, setSector] = useState<ProjectSector>('RESIDENTIAL');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [newImages, setNewImages] = useState<NewImageFile[]>([]);
  const [existingMedia, setExistingMedia] = useState<ProjectFormData['existingMedia']>([]);
  const [removedMediaIds, setRemovedMediaIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoading = isCreating || isUpdating || isUploadingCover || isAddingMedia;
  const isEdit = !!initialData?.id;

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title ?? '');
      setSector(initialData.sector ?? 'RESIDENTIAL');
      setLocation(initialData.location ?? '');
      setYear(initialData.year ?? new Date().getFullYear());
      setDescription(initialData.description ?? '');
      setClientName(initialData.clientName ?? '');
      setIsFeatured(initialData.isFeatured ?? false);
      setIsActive(initialData.isActive ?? true);
      setExistingMedia(initialData.existingMedia ?? []);
    } else {
      setTitle('');
      setSector('RESIDENTIAL');
      setLocation('');
      setYear(new Date().getFullYear());
      setDescription('');
      setClientName('');
      setIsFeatured(false);
      setIsActive(true);
      setExistingMedia([]);
    }
    setNewImages([]);
    setRemovedMediaIds([]);
    setError('');
  }, [initialData, isOpen]);

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const added = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setNewImages((prev) => [...prev, ...added]);
  }, []);

  const removeNewImage = (idx: number) => {
    setNewImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const markExistingRemoved = (id: string) => {
    setRemovedMediaIds((prev) => [...prev, id]);
    setExistingMedia((prev) => prev?.filter((m) => m.id !== id));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Project title is required.');
      return;
    }
    setError('');

    try {
      if (isEdit && initialData?.id) {
        // 1. Update metadata
        await updateProject({
          id: initialData.id,
          body: {
            title: title.trim(),
            sector,
            location: location.trim() || undefined,
            year: year ? Number(year) : undefined,
            description: description.trim() || undefined,
            clientName: clientName.trim() || undefined,
            isFeatured,
            isActive,
          },
        }).unwrap();

        // 2. Delete removed media
        await Promise.all(
          removedMediaIds.map((mediaId) =>
            deleteMedia({ projectId: initialData.id!, mediaId }).unwrap()
          )
        );

        // 3. Upload new images
        if (newImages.length > 0) {
          await addMedia({ id: initialData.id, files: newImages.map((i) => i.file) }).unwrap();
        }
      } else {
        const fd = new FormData();
        fd.append('title', title.trim());
        fd.append('sector', sector);
        if (location) fd.append('location', location.trim());
        if (year) fd.append('year', String(year));
        if (description) fd.append('description', description.trim());
        if (clientName) fd.append('clientName', clientName.trim());
        fd.append('isFeatured', String(isFeatured));
        fd.append('isActive', String(isActive));
        newImages.forEach((img) => fd.append('files', img.file));
        await createProject(fd).unwrap();
      }
      onClose();
    } catch {
      setError('Failed to save project. Please try again.');
    }
  };

  const visibleExisting = existingMedia ?? [];
  const totalMediaCount = visibleExisting.length + newImages.length;

  return (
    <>
      <div
        className={`fixed inset-0 bg-[#0F0E0C]/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 w-full max-w-[520px] h-screen bg-admin-surface border-l-2 border-admin-gold z-[70] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}
      >
        <header className="px-8 py-6 border-b border-admin-border/50 flex justify-between items-center sticky top-0 bg-admin-surface/90 backdrop-blur z-10">
          <h2 className="text-[18px] font-bold text-admin-text-primary tracking-tight">
            {isEdit ? 'Edit Project' : 'Add New Project'}
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

          {/* Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="admin-label">Project Title *</label>
              <input
                className="admin-input"
                placeholder="e.g. Luxury Penthouse VI"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">Sector</label>
              <select
                className="admin-input appearance-none bg-[#1A1916]"
                value={sector}
                onChange={(e) => setSector(e.target.value as ProjectSector)}
              >
                {SECTOR_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
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
                <label className="admin-label">Location</label>
                <input
                  className="admin-input"
                  placeholder="e.g. Lagos, Nigeria"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="admin-label">Client Name (Optional)</label>
              <input
                className="admin-input"
                placeholder="e.g. Private Client"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-input h-auto min-h-[100px] py-3 resize-none"
                placeholder="Project details..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Media Section — shown for both create and edit */}
          <div className="space-y-4 border-t border-admin-border/20 pt-6">
            <div className="flex items-center justify-between">
              <label className="admin-label !mb-0">
                Project Media
                {totalMediaCount > 0 && (
                  <span className="ml-2 text-admin-gold font-bold">{totalMediaCount}</span>
                )}
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[10px] font-bold text-admin-gold uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                Add Images
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />

            {totalMediaCount === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-admin-border/40 rounded-[8px] p-8 bg-admin-surface-elevated/20 flex flex-col items-center justify-center text-center group hover:border-admin-gold/50 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[36px] text-admin-text-muted group-hover:text-admin-gold transition-colors mb-2">add_a_photo</span>
                <p className="text-[13px] font-medium text-admin-text-primary mb-1">Add project pictures</p>
                <p className="text-[11px] text-admin-text-muted">High resolution images (Max 50MB each)</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {/* Existing images */}
                {visibleExisting.map((m) => (
                  <div key={m.id} className="relative aspect-square group rounded-[4px] overflow-hidden border border-admin-border">
                    <Image src={m.url} alt="" fill className="object-cover" sizes="160px" />
                    <button
                      onClick={() => markExistingRemoved(m.id)}
                      className="absolute top-1 right-1 bg-admin-bg/80 text-admin-danger rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                    </button>
                  </div>
                ))}

                {/* New images (not yet uploaded) */}
                {newImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-square group rounded-[4px] overflow-hidden border border-admin-gold/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.preview} alt="New" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-admin-gold/80 py-0.5 text-center">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-admin-bg">New</span>
                    </div>
                    <button
                      onClick={() => removeNewImage(idx)}
                      className="absolute top-1 right-1 bg-admin-bg/80 text-admin-danger rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                ))}

                {/* Add more button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-[4px] border-2 border-dashed border-admin-border/40 hover:border-admin-gold/50 transition-colors flex flex-col items-center justify-center gap-1 group"
                >
                  <span className="material-symbols-outlined text-[24px] text-admin-text-muted group-hover:text-admin-gold transition-colors">add_photo_alternate</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-admin-text-muted group-hover:text-admin-gold transition-colors">Add</span>
                </button>
              </div>
            )}
          </div>

          {/* Featured toggle */}
          <div className="space-y-4 border-t border-admin-border/20 pt-6">
            <div className="flex items-center justify-between">
              <label className="admin-label !mb-0">Featured Project</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                <div className="w-10 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-bg after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold" />
              </label>
            </div>
          </div>

          {/* Active toggle */}
          <div className="space-y-4 border-t border-admin-border/20 pt-6">
            <div className="flex items-center justify-between">
              <label className="admin-label !mb-0">Active / Visible</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <div className="w-10 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-bg after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold" />
              </label>
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
                {isAddingMedia ? 'Uploading media...' : isUploadingCover ? 'Uploading cover...' : 'Processing...'}
              </>
            ) : isEdit ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </aside>
    </>
  );
}
