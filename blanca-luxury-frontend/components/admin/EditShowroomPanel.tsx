'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  useGetShowroomByIdQuery,
  useUpdateShowroomMutation,
  useUploadShowroomCoverMutation,
  useAddShowroomImagesMutation,
  useRemoveShowroomImageMutation,
} from '@/lib/store';
import type { Showroom } from '@/lib/types';

interface EditShowroomPanelProps {
  showroomId: string | null;
  onClose: () => void;
}

interface PendingImage {
  file: File;
  preview: string;
}

export function EditShowroomPanel({ showroomId, onClose }: EditShowroomPanelProps) {
  const isOpen = !!showroomId;

  const { data: showroom, isLoading: isFetching } = useGetShowroomByIdQuery(
    showroomId ?? '',
    { skip: !showroomId },
  );

  const [updateShowroom, { isLoading: isUpdating }] = useUpdateShowroomMutation();
  const [uploadCover, { isLoading: isUploadingCover }] = useUploadShowroomCoverMutation();
  const [addImages, { isLoading: isAddingImages }] = useAddShowroomImagesMutation();
  const [removeImage, { isLoading: isRemoving }] = useRemoveShowroomImageMutation();

  // ── Form state ───────────────────────────────────────────────────────────────
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phones, setPhones] = useState(['']);
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [isActive, setIsActive] = useState(true);

  // ── Cover state ──────────────────────────────────────────────────────────────
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // ── Gallery state ────────────────────────────────────────────────────────────
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // ── Seed form when showroom data arrives ─────────────────────────────────────
  useEffect(() => {
    if (!showroom) return;
    setName(showroom.name);
    setCity(showroom.city);
    setAddress(showroom.address);
    setPhones(showroom.phoneNumbers.length ? showroom.phoneNumbers : ['']);
    setWhatsapp(showroom.whatsappNumber ?? '');
    setEmail(showroom.email ?? '');
    setInstagram(showroom.instagramHandle ?? '');
    setLat(showroom.latitude != null ? String(showroom.latitude) : '');
    setLng(showroom.longitude != null ? String(showroom.longitude) : '');
    setIsActive(showroom.isActive);
    setCoverFile(null);
    setCoverPreview(null);
    setPendingImages([]);
    setError('');
  }, [showroom]);

  const handleClose = () => {
    pendingImages.forEach((p) => URL.revokeObjectURL(p.preview));
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    onClose();
  };

  // ── Cover ────────────────────────────────────────────────────────────────────
  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  // ── Gallery – add ────────────────────────────────────────────────────────────
  const addGalleryFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const added = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setPendingImages((prev) => [...prev, ...added]);
  }, []);

  const removePending = (idx: number) => {
    setPendingImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  // ── Gallery – delete existing ─────────────────────────────────────────────────
  const handleDeleteExisting = async (imageId: string) => {
    if (!showroomId) return;
    setRemovingId(imageId);
    try {
      await removeImage({ showroomId, imageId }).unwrap();
    } catch {
      setError('Failed to remove image.');
    } finally {
      setRemovingId(null);
    }
  };

  // ── Drag & drop ───────────────────────────────────────────────────────────────
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addGalleryFiles(e.dataTransfer.files);
  };

  // ── Phone helpers ─────────────────────────────────────────────────────────────
  const addPhoneField = () => setPhones([...phones, '']);
  const updatePhone = (i: number, val: string) => {
    const updated = [...phones];
    updated[i] = val;
    setPhones(updated);
  };
  const removePhone = (i: number) => setPhones(phones.filter((_, idx) => idx !== i));

  // ── Save ──────────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!showroomId) return;
    if (!name.trim() || !city.trim() || !address.trim()) {
      setError('Name, city, and address are required.');
      return;
    }
    setError('');
    try {
      await updateShowroom({
        id: showroomId,
        body: {
          name: name.trim(),
          city: city.trim(),
          address: address.trim(),
          phoneNumbers: phones.filter(Boolean),
          whatsappNumber: whatsapp.trim() || undefined,
          email: email.trim() || undefined,
          instagramHandle: instagram.trim() || undefined,
          latitude: lat ? parseFloat(lat) : undefined,
          longitude: lng ? parseFloat(lng) : undefined,
          isActive,
        },
      }).unwrap();

      if (coverFile) {
        await uploadCover({ id: showroomId, file: coverFile }).unwrap();
      }

      if (pendingImages.length > 0) {
        await addImages({ id: showroomId, files: pendingImages.map((p) => p.file) }).unwrap();
        pendingImages.forEach((p) => URL.revokeObjectURL(p.preview));
        setPendingImages([]);
      }

      handleClose();
    } catch {
      setError('Failed to save changes. Please try again.');
    }
  };

  const isSaving = isUpdating || isUploadingCover || isAddingImages;
  const existingImages = (showroom as Showroom & { showroomImages?: { id: string; url: string; caption?: string | null; displayOrder: number }[] })?.showroomImages ?? [];

  return (
    <>
      <div
        className={`fixed inset-0 bg-[#0F0E0C]/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />

      <aside
        className={`fixed right-0 top-0 w-full max-w-[520px] h-screen bg-admin-surface border-l-2 border-admin-gold z-[70] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}
      >
        <header className="px-8 py-6 border-b border-admin-border/50 flex justify-between items-center sticky top-0 bg-admin-surface/90 backdrop-blur z-10">
          <div>
            <h2 className="text-[18px] font-bold text-admin-text-primary tracking-tight">Edit Showroom</h2>
            {showroom && (
              <p className="text-[11px] text-admin-text-muted mt-0.5">{showroom.name} · {showroom.city}</p>
            )}
          </div>
          <button onClick={handleClose} className="text-admin-text-muted hover:text-admin-text-primary transition-colors p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {isFetching ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-admin-gold/30 border-t-admin-gold rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">
            {error && (
              <div className="bg-admin-danger/10 border border-admin-danger/30 rounded-[4px] px-4 py-3">
                <p className="text-admin-danger text-[12px] font-medium">{error}</p>
              </div>
            )}

            {/* Cover Image */}
            <div className="space-y-3">
              <label className="admin-label">Cover Image</label>
              <div
                onClick={() => coverInputRef.current?.click()}
                className="relative w-full h-[160px] rounded-[6px] border-2 border-dashed border-admin-border/40 hover:border-admin-gold/50 transition-colors cursor-pointer overflow-hidden group"
              >
                {coverPreview || showroom?.coverImageUrl ? (
                  <>
                    <Image
                      src={coverPreview ?? showroom!.coverImageUrl!}
                      alt="Cover"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-[11px] font-bold uppercase tracking-widest">
                        {coverPreview ? 'Change Again' : 'Change Cover'}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-admin-text-muted group-hover:text-admin-gold transition-colors">
                    <span className="material-symbols-outlined text-[32px]">add_photo_alternate</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest">Upload Cover Photo</span>
                    <span className="text-[10px] text-admin-text-muted">JPG, PNG or WEBP · Max 20MB</span>
                  </div>
                )}
                {coverFile && (
                  <span className="absolute top-2 right-2 bg-admin-gold text-admin-bg text-[9px] font-bold px-2 py-0.5 rounded-[3px] uppercase tracking-wide">New</span>
                )}
              </div>
              <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverSelect} />
            </div>

            {/* Basic Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="admin-label">Showroom Name</label>
                <input className="admin-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Lagos Flagship Atelier" />
              </div>
              <div className="space-y-2">
                <label className="admin-label">City</label>
                <input className="admin-input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Lagos" />
              </div>
              <div className="space-y-2">
                <label className="admin-label">Full Address</label>
                <textarea
                  className="admin-input h-auto min-h-[90px] py-3 resize-none"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter physical location..."
                />
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-6 border-t border-admin-border/20 pt-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="admin-label !mb-0">Phone Numbers</label>
                  <button onClick={addPhoneField} className="text-[10px] font-bold text-admin-gold hover:underline uppercase tracking-widest">
                    + Add number
                  </button>
                </div>
                {phones.map((phone, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      className="admin-input flex-1"
                      placeholder="+234..."
                      value={phone}
                      onChange={(e) => updatePhone(idx, e.target.value)}
                    />
                    {phones.length > 1 && (
                      <button onClick={() => removePhone(idx)} className="text-admin-text-muted hover:text-admin-danger transition-colors px-2">
                        <span className="material-symbols-outlined text-[18px]">remove_circle</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="admin-label">WhatsApp</label>
                  <input className="admin-input" placeholder="+234..." value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="admin-label">Email</label>
                  <input className="admin-input" type="email" placeholder="location@blanca.luxury" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="admin-label">Instagram Handle</label>
                <input className="admin-input" placeholder="@blanca.luxury.location" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
              </div>
            </div>

            {/* Geotag */}
            <div className="space-y-4 border-t border-admin-border/20 pt-8">
              <label className="admin-label !mb-0">Geotag Coordinates</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="admin-label">Latitude</label>
                  <input className="admin-input font-mono" placeholder="6.4542" value={lat} onChange={(e) => setLat(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="admin-label">Longitude</label>
                  <input className="admin-input font-mono" placeholder="3.3958" value={lng} onChange={(e) => setLng(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between border-t border-admin-border/20 pt-8">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-admin-text-primary">Active Status</span>
                <span className="text-[11px] text-admin-text-muted">Visible on the main site when active.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <div className="w-11 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold" />
              </label>
            </div>

            {/* Gallery Images */}
            <div className="space-y-4 border-t border-admin-border/20 pt-8">
              <div className="flex justify-between items-center">
                <label className="admin-label !mb-0">Gallery Images</label>
                <span className="text-[10px] text-admin-text-muted">
                  {existingImages.length} saved · {pendingImages.length} pending
                </span>
              </div>

              {/* Existing images */}
              {existingImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {existingImages.map((img) => (
                    <div key={img.id} className="relative aspect-square group rounded-[4px] overflow-hidden border border-admin-border/30">
                      <Image src={img.url} alt={img.caption ?? 'Gallery image'} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleDeleteExisting(img.id)}
                          disabled={removingId === img.id || isRemoving}
                          className="w-8 h-8 rounded-full bg-admin-danger/90 flex items-center justify-center hover:bg-admin-danger transition-colors disabled:opacity-50"
                        >
                          {removingId === img.id ? (
                            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <span className="material-symbols-outlined text-[16px] text-white">delete</span>
                          )}
                        </button>
                      </div>
                      {img.displayOrder === 0 && (
                        <span className="absolute top-1 left-1 bg-admin-gold/90 text-admin-bg text-[8px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase tracking-wide">First</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Pending new images */}
              {pendingImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {pendingImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square group rounded-[4px] overflow-hidden border border-admin-gold/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.preview} alt={`New ${idx + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute top-1 left-1 bg-admin-gold text-admin-bg text-[8px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase tracking-wide">New</span>
                      <button
                        onClick={() => removePending(idx)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-admin-bg/80 text-admin-danger flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => galleryInputRef.current?.click()}
                className={`border-2 border-dashed rounded-[6px] h-[100px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                  isDragging
                    ? 'border-admin-gold bg-admin-gold/5'
                    : 'border-admin-border/40 bg-admin-surface-elevated/10 hover:border-admin-gold/50 hover:bg-admin-surface-elevated/20'
                }`}
              >
                <span className="material-symbols-outlined text-[24px] text-admin-gold">add_a_photo</span>
                <p className="text-[11px] text-admin-text-muted">
                  {isDragging ? 'Drop to add' : 'Drag & drop or click to add gallery images'}
                </p>
              </div>
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addGalleryFiles(e.target.files)}
              />
            </div>
          </div>
        )}

        <div className="p-8 border-t border-admin-border/50 bg-admin-surface-elevated/30 sticky bottom-0 z-10">
          <button
            onClick={handleSave}
            disabled={isSaving || isFetching}
            className="admin-button-gold uppercase tracking-[0.1em] font-bold flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-admin-bg border-t-transparent rounded-full animate-spin" />
                {isUpdating ? 'Saving…' : isUploadingCover ? 'Uploading cover…' : 'Uploading images…'}
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </aside>
    </>
  );
}
