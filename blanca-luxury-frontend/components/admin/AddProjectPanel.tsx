'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  useCreateProjectMutation, 
  useUpdateProjectMutation 
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
}

interface ImageFile {
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
  'GOVERNMENT'
];

export function AddProjectPanel({ isOpen, onClose, initialData }: AddProjectPanelProps) {
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const [title, setTitle] = useState('');
  const [sector, setSector] = useState<ProjectSector>('RESIDENTIAL');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  
  const [images, setImages] = useState<ImageFile[]>([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoading = isCreating || isUpdating;
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
    } else {
      setTitle('');
      setSector('RESIDENTIAL');
      setLocation('');
      setYear(new Date().getFullYear());
      setDescription('');
      setClientName('');
      setIsFeatured(false);
      setIsActive(true);
    }
    setImages([]);
    setError('');
  }, [initialData, isOpen]);

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeImage = (idx: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Project title is required.');
      return;
    }
    setError('');

    try {
      if (isEdit && initialData?.id) {
        // For updates, we might still want to use standard DTO if no images are added,
        // but it's safer to check how the backend handles PATCH with multipart.
        // For now, let's keep PATCH as standard JSON unless the user asks to upload images on edit.
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
            isActive
          },
        }).unwrap();
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
        
        images.forEach((img) => {
          fd.append('images', img.file);
        });

        await createProject(fd).unwrap();
      }
      onClose();
    } catch (err: unknown) {
      setError('Failed to save project. Please try again.');
    }
  };

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

          {!isEdit && (
            <div className="space-y-4 border-t border-admin-border/20 pt-6">
              <label className="admin-label">Project Media (Optional)</label>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-admin-border/40 rounded-[8px] p-8 bg-admin-surface-elevated/20 flex flex-col items-center justify-center text-center group hover:border-admin-gold/50 transition-all cursor-pointer"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
                <span className="material-symbols-outlined text-[36px] text-admin-text-muted group-hover:text-admin-gold transition-colors mb-2">add_a_photo</span>
                <p className="text-[13px] font-medium text-admin-text-primary mb-1">Add project pictures</p>
                <p className="text-[11px] text-admin-text-muted">High resolution images (Max 50MB each)</p>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square group rounded-[4px] overflow-hidden border border-admin-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-admin-bg/80 text-admin-danger rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="space-y-4 border-t border-admin-border/20 pt-6">
            <div className="flex items-center justify-between">
              <label className="admin-label !mb-0">Featured Project</label>
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
            <div className="flex items-center justify-between">
              <label className="admin-label !mb-0">Active / Visible</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
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
                Processing...
              </>
            ) : isEdit ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </aside>
    </>
  );
}
