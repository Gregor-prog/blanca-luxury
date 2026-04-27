'use client';

import React, { useState } from 'react';
import { useCreateShowroomMutation } from '@/lib/store';

interface AddShowroomPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddShowroomPanel({ isOpen, onClose }: AddShowroomPanelProps) {
  const [createShowroom, { isLoading }] = useCreateShowroomMutation();
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
  const [error, setError] = useState('');

  const addPhoneField = () => setPhones([...phones, '']);
  const updatePhone = (index: number, val: string) => {
    const updated = [...phones];
    updated[index] = val;
    setPhones(updated);
  };

  const reset = () => {
    setName(''); setCity(''); setAddress(''); setPhones(['']);
    setWhatsapp(''); setEmail(''); setInstagram('');
    setLat(''); setLng(''); setIsActive(true); setError('');
  };

  const handleSave = async () => {
    if (!name.trim() || !city.trim() || !address.trim()) {
      setError('Name, city, and address are required.');
      return;
    }
    setError('');
    try {
      await createShowroom({
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
      }).unwrap();
      reset();
      onClose();
    } catch {
      setError('Failed to save showroom. Please try again.');
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
          <h2 className="text-[18px] font-bold text-admin-text-primary tracking-tight">Add New Showroom</h2>
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
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-admin-bg border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : 'Save Showroom'}
          </button>
        </div>
      </aside>
    </>
  );
}
