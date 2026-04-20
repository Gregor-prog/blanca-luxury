'use client';

import React, { useState } from 'react';

interface AddShowroomPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddShowroomPanel({ isOpen, onClose }: AddShowroomPanelProps) {
  const [phones, setPhones] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);

  const addPhoneField = () => setPhones([...phones, '']);
  const updatePhone = (index: number, val: string) => {
    const newPhones = [...phones];
    newPhones[index] = val;
    setPhones(newPhones);
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-[#0F0E0C]/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <aside 
        className={`fixed right-0 top-0 w-full max-w-[480px] h-screen bg-admin-surface border-l-2 border-admin-gold z-[70] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <header className="px-8 py-6 border-b border-admin-border/50 flex justify-between items-center sticky top-0 bg-admin-surface/90 backdrop-blur z-10">
          <h2 className="text-[18px] font-bold text-admin-text-primary tracking-tight">Add New Showroom</h2>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text-primary transition-colors p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">
          {/* General Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="admin-label">Showroom Name</label>
              <input className="admin-input" placeholder="e.g. Lagos Flagship Atelier" type="text" />
            </div>

            <div className="space-y-2">
              <label className="admin-label">City</label>
              <select className="admin-input appearance-none bg-[#1D1B19]">
                <option value="" disabled selected>Select city...</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Port Harcourt">Port Harcourt</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="admin-label">Full Address</label>
              <textarea className="admin-input h-auto min-h-[100px] py-3 resize-none" placeholder="Enter physical location..." rows={3} />
            </div>
          </div>

          {/* Contact Info */}
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
                <input className="admin-input" placeholder="+234..." type="text" />
              </div>
              <div className="space-y-2">
                <label className="admin-label">Email Address</label>
                <input className="admin-input" placeholder="location@blanca.luxury" type="email" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="admin-label">Instagram Handle</label>
              <input className="admin-input" placeholder="@blanca.luxury.location" type="text" />
            </div>
          </div>

          {/* Coordinates */}
          <div className="space-y-6 border-t border-admin-border/20 pt-8">
            <div className="flex justify-between items-center">
              <label className="admin-label !mb-0">Geotag Coordinates</label>
              <button className="text-[10px] font-bold text-admin-gold hover:underline uppercase">Auto-detect from address</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="admin-label">Latitude</label>
                <input className="admin-input font-mono" placeholder="6.4542" type="text" />
              </div>
              <div className="space-y-2">
                <label className="admin-label">Longitude</label>
                <input className="admin-input font-mono" placeholder="3.3958" type="text" />
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-4 border-t border-admin-border/20 pt-8">
            <label className="admin-label">Cover Image</label>
            <div className="border-2 border-dashed border-admin-border/40 rounded-[8px] p-10 bg-admin-surface-elevated/20 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-admin-gold/50 transition-all">
              <span className="material-symbols-outlined text-[36px] text-admin-text-muted group-hover:text-admin-gold transition-colors mb-2">add_a_photo</span>
              <p className="text-[13px] font-medium text-admin-text-primary mb-1">Drop image or click to upload</p>
              <p className="text-[11px] text-admin-text-muted">High resolution JPG/PNG (Max 5MB)</p>
            </div>
          </div>

          {/* Initial Status */}
          <div className="flex items-center justify-between border-t border-admin-border/20 pt-8">
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-admin-text-primary">Set as Active</span>
              <span className="text-[11px] text-admin-text-muted">Showroom will be immediately visible on main site.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-admin-border/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-admin-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-gold"></div>
            </label>
          </div>
        </div>

        {/* Footer */}
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
