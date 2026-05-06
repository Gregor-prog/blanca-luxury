'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useCreateShowroomMutation, useUpdateShowroomMutation, useUploadShowroomCoverMutation } from '@/lib/store';
import type { Showroom } from '@/lib/types';

interface AddShowroomPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Showroom | null;
}

export function AddShowroomPanel({ isOpen, onClose, initialData }: AddShowroomPanelProps) {
  const [createShowroom, { isLoading: isCreating }] = useCreateShowroomMutation();
  const [updateShowroom, { isLoading: isUpdating }] = useUpdateShowroomMutation();
  const [uploadCover, { isLoading: isUploading }] = useUploadShowroomCoverMutation();

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
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Sync initial data when opened
  React.useEffect(() => {
    if (isOpen && initialData) {
      setName(initialData.name);
      setCity(initialData.city);
      setAddress(initialData.address);
      setPhones(initialData.phoneNumbers.length ? initialData.phoneNumbers : ['']);
      setWhatsapp(initialData.whatsappNumber || '');
      setEmail(initialData.email || '');
      setInstagram(initialData.instagramHandle || '');
      setLat(initialData.latitude != null ? String(initialData.latitude) : '');
      setLng(initialData.longitude != null ? String(initialData.longitude) : '');
      setIsActive(initialData.isActive);
      setCoverPreview(initialData.coverImageUrl || null);
    } else if (isOpen && !initialData) {
      reset();
    }
  }, [isOpen, initialData]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addPhoneField = () => setPhones([...phones, '']);
  const updatePhone = (index: number, val: string) => {
    const updated = [...phones];
    updated[index] = val;
    setPhones(updated);
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const reset = () => {
    setName(''); setCity(''); setAddress(''); setPhones(['']);
    setWhatsapp(''); setEmail(''); setInstagram('');
    setLat(''); setLng(''); setIsActive(true);
    setCoverFile(null);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(null);
    setError('');
  };

  const handleSave = async () => {
    if (!name.trim() || !city.trim() || !address.trim()) {
      setError('Name, city, and address are required.');
      return;
    }
    setError('');
    try {
      const dto = {
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
      };

      let showroomId = initialData?.id;

      if (initialData) {
        await updateShowroom({ id: initialData.id, body: dto }).unwrap();
      } else {
        const showroom = await createShowroom(dto).unwrap();
        showroomId = showroom.id;
      }

      if (coverFile && showroomId) {
        await uploadCover({ id: showroomId, file: coverFile }).unwrap();
      }

      onClose();
    } catch {
      setError(`Failed to ${initialData ? 'update' : 'save'} showroom. Please try again.`);
    }
  };

  const isLoading = isCreating || isUpdating || isUploading;

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
            {initialData ? 'Edit Showroom' : 'Add New Showroom'}
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

          {/* Cover Image */}
          <div className="space-y-3">
            <label className="admin-label">Cover Image</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full h-[160px] rounded-[6px] border-2 border-dashed border-admin-border/40 hover:border-admin-gold/50 transition-colors cursor-pointer overflow-hidden group"
            >
              {coverPreview ? (
                <>
                  <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[11px] font-bold uppercase tracking-widest">Change Image</span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-admin-text-muted group-hover:text-admin-gold transition-colors">
                  <span className="material-symbols-outlined text-[32px]">add_photo_alternate</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest">Upload Cover Photo</span>
                  <span className="text-[10px] text-admin-text-muted">JPG, PNG or WEBP · Max 20MB</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverSelect}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="admin-label">Showroom Name</label>
              <input
                className="admin-input"
                placeholder="e.g. Lagos Flagship Atelier"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">City</label>
              <input
                className="admin-input"
                placeholder="e.g. Lagos"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="admin-label">Full Address</label>
              <textarea
                className="admin-input h-auto min-h-[100px] py-3 resize-none"
                placeholder="Enter physical location..."
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6 border-t border-admin-border/20 pt-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="admin-label !mb-0">Phone Numbers</label>
                <button
                  onClick={addPhoneField}
                  className="text-[10px] font-bold text-admin-gold hover:underline uppercase tracking-widest"
                >
                  Add another number +
                </button>
              </div>
              {phones.map((phone, idx) => (
                <input
                  key={idx}
                  className="admin-input"
                  placeholder="+234..."
                  value={phone}
                  onChange={(e) => updatePhone(idx, e.target.value)}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="admin-label">WhatsApp Number</label>
                <input
                  className="admin-input"
                  placeholder="+234..."
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="admin-label">Email Address</label>
                <input
                  className="admin-input"
                  placeholder="location@blanca.luxury"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="admin-label">Instagram Handle</label>
              <input
                className="admin-input"
                placeholder="@blanca.luxury.location"
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6 border-t border-admin-border/20 pt-8">
            <label className="admin-label !mb-0">Geotag Coordinates</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="admin-label">Latitude</label>
                <input
                  className="admin-input font-mono"
                  placeholder="6.4542"
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="admin-label">Longitude</label>
                <input
                  className="admin-input font-mono"
                  placeholder="3.3958"
                  type="text"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-admin-border/20 pt-8">
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-admin-text-primary">Set as Active</span>
              <span className="text-[11px] text-admin-text-muted">Showroom will be immediately visible on main site.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <div className="w-11 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold"></div>
            </label>
          </div>
        </div>

        <div className="p-8 border-t border-admin-border/50 bg-admin-surface-elevated/30 sticky bottom-0 z-10">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="admin-button-gold uppercase tracking-[0.1em] font-bold flex items-center justify-center gap-2"
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-admin-bg border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : isUpdating ? (
              <>
                <div className="w-4 h-4 border-2 border-admin-bg border-t-transparent rounded-full animate-spin" />
                Updating...
              </>
            ) : isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-admin-bg border-t-transparent rounded-full animate-spin" />
                Uploading image...
              </>
            ) : initialData ? 'Update Showroom' : 'Save Showroom'}
          </button>
        </div>
      </aside>
    </>
  );
}
