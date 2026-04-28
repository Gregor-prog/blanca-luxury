"use client";

import { useState, FormEvent } from "react";
import { useCreateInquiryMutation } from "@/lib/store";

const SERVICE_OPTIONS: { label: string; value: string }[] = [
  { label: "Furniture",         value: "FURNITURE" },
  { label: "Décor & Accessories", value: "DECOR" },
  { label: "Interior Design",   value: "INTERIOR_DESIGN" },
  { label: "Drapery & Blinds",  value: "DRAPERY" },
  { label: "Consultation",      value: "CONSULTATION" },
];

export function EnquirySection() {
  const [createInquiry, { isLoading }] = useCreateInquiryMutation();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", serviceInterest: "", message: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await createInquiry({
        fullName: form.fullName,
        email: form.email || undefined,
        phone: form.phone || undefined,
        serviceInterest: form.serviceInterest || undefined,
        message: form.message || undefined,
        source: "WEBSITE",
      }).unwrap();
      setSent(true);
    } catch {
      // Keep form visible — server errors are silent for now
    }
  }

  return (
    <section className="bg-[#1A1410] py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] text-[#C9A96E] tracking-[0.35em] uppercase mb-4">
            GET IN TOUCH
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-white leading-tight mb-4">
            Make an Enquiry
          </h2>
          <p className="font-sans text-[13px] text-[#8B7D72] max-w-md mx-auto leading-relaxed">
            Tell us about your space and vision. Our concierge team will respond within 24 hours.
          </p>
          <div className="mt-8 w-12 h-px bg-[#C9A96E]/40 mx-auto" />
        </div>

        {sent ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full border border-[#C9A96E]/40 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#C9A96E] text-3xl">check</span>
            </div>
            <h3 className="font-serif italic text-2xl text-white mb-3">Thank you, {form.fullName.split(" ")[0]}</h3>
            <p className="font-sans text-[13px] text-[#8B7D72]">
              Your enquiry has been received. We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Full Name *" required>
                <input
                  required
                  type="text"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Email Address">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Phone Number">
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Service Interest">
                <select
                  value={form.serviceInterest}
                  onChange={(e) => set("serviceInterest", e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">Select a service…</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Message">
              <textarea
                rows={5}
                placeholder="Describe your space, vision, or requirements…"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </Field>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-12 py-4 bg-[#C9A96E] hover:bg-[#b8955c] text-[#1A1410] font-sans font-bold text-[11px] tracking-widest uppercase transition-colors duration-300 disabled:opacity-60"
              >
                {isLoading ? "Sending…" : "Send Enquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

const inputClass =
  "w-full bg-transparent border border-[#C9A96E]/20 hover:border-[#C9A96E]/50 focus:border-[#C9A96E] text-white placeholder-[#8B7D72] font-sans text-[13px] px-4 py-3 outline-none transition-colors duration-200";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-sans text-[9px] text-[#8B7D72] uppercase tracking-widest mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
