"use client";
import React, { useState, useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import Link from "next/link";

// ─── Service Pill ─────────────────────────────────────────────────────────────
function ServicePill({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="cursor-pointer select-none">
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <span
        className={`px-4 py-2 rounded-full border text-[11px] font-sans uppercase tracking-widest block transition-all duration-300 ${
          checked
            ? "bg-[#745a27] text-white border-[#745a27]"
            : "border-[#d0c5b5]/60 text-[#695c52] hover:border-[#C9A96E] hover:text-[#745a27]"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

// ─── Showroom Card ─────────────────────────────────────────────────────────────
function ShowroomCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E8E0D5] p-10 flex flex-col gap-6">
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [services, setServices] = useState({
    Furniture: false,
    Decor: false,
    "Interior Design": true,
    Drapery: false,
    Consultation: false,
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function toggleService(key: string) {
    setServices((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <main>
      {/* ══════════════════════════════════════════════════════════
          PAGE HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[360px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfFKK7-6gKUa3CeP-jzolWcg955hIncszwzUPIbqK1vvs-ZtYdmCwDszOHaKLchU2uhYBcvGJ-KE9-QlpWWiM9fy2wyBiOGbCLShaa-YiTZ_E8CkYXc6oY8fhlobT4Yqr8vI1wzhlZw4O7U9EWYjsnZAa6OG2fKUD4VRqXKNirS2eEhuot9JB_w-UrnoaYjo7eT0y7F7lmfccGlT8MlaCvmcKfQPy9lR7_ZEDik49W7nH7kT-I8cck5uBmwtPqbgdIlUeHCoZ9DhWY"
          alt="Luxurious dark designer showroom interior with warm atmospheric lighting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#2C2420]/65 z-10" />

        {/* Hero content */}
        <div className="relative z-20 text-center px-4 pt-20">
          <ScrollReveal delay={200} y={24}>
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#C9A96E] mb-5">
              ATELIER BLANCA · CONTACT
            </p>
          </ScrollReveal>
          <ScrollReveal delay={400} y={32} duration={1100}>
            <h1 className="font-serif italic text-5xl md:text-[56px] text-white leading-tight mb-4">
              Begin Your Journey
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={650} y={20}>
            <p className="font-sans text-[13px] tracking-widest text-[#b8aba5] uppercase">
              Our concierge team responds within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MAIN — SPLIT LAYOUT
      ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row w-full min-h-screen">

        {/* ── LEFT: ENQUIRY FORM ─────────────────────────────────── */}
        <section className="w-full md:w-1/2 bg-[#FAF8F5] px-8 md:px-16 lg:px-24 py-20 md:py-28">
          <div className="max-w-md mx-auto md:mx-0">
            <ScrollReveal delay={0} y={20}>
              <span className="font-sans text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase block mb-12">
                Send an Enquiry
              </span>
            </ScrollReveal>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">

              {/* Full Name */}
              <ScrollReveal delay={80} y={24}>
                <div className="border-b border-[#d0c5b5]/40 focus-within:border-[#745a27] transition-colors duration-300 pb-2">
                  <label className="block font-sans text-[10px] tracking-widest text-[#695c52] uppercase mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Evelyn Grace"
                    required
                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-body text-[#1e1b15] placeholder:text-[#7f7668]/40 outline-none text-[15px]"
                  />
                </div>
              </ScrollReveal>

              {/* Phone */}
              <ScrollReveal delay={140} y={24}>
                <div className="border-b border-[#d0c5b5]/40 focus-within:border-[#745a27] transition-colors duration-300 pb-2">
                  <label className="block font-sans text-[10px] tracking-widest text-[#695c52] uppercase mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 ..."
                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-body text-[#1e1b15] placeholder:text-[#7f7668]/40 outline-none text-[15px]"
                  />
                </div>
              </ScrollReveal>

              {/* Email */}
              <ScrollReveal delay={200} y={24}>
                <div className="border-b border-[#d0c5b5]/40 focus-within:border-[#745a27] transition-colors duration-300 pb-2">
                  <label className="block font-sans text-[10px] tracking-widest text-[#695c52] uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="evelyn@luxury.com"
                    required
                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-body text-[#1e1b15] placeholder:text-[#7f7668]/40 outline-none text-[15px]"
                  />
                </div>
              </ScrollReveal>

              {/* Location dropdowns */}
              <ScrollReveal delay={260} y={24}>
                <div>
                  <label className="block font-sans text-[10px] tracking-widest text-[#695c52] uppercase mb-4">
                    Location Interest
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Lagos */}
                    <div className="relative border-b border-[#d0c5b5]/40 focus-within:border-[#745a27] transition-colors duration-300 pb-2">
                      <select className="w-full bg-transparent border-none p-0 focus:ring-0 font-sans text-[13px] text-[#1e1b15] appearance-none cursor-pointer outline-none pr-6">
                        <option>Lagos</option>
                        <option>Ikoyi</option>
                        <option>Victoria Island</option>
                        <option>Lekki</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-0 bottom-2 text-[16px] text-[#7f7668] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                    {/* Port Harcourt */}
                    <div className="relative border-b border-[#d0c5b5]/40 focus-within:border-[#745a27] transition-colors duration-300 pb-2">
                      <select className="w-full bg-transparent border-none p-0 focus:ring-0 font-sans text-[13px] text-[#1e1b15] appearance-none cursor-pointer outline-none pr-6">
                        <option>Port Harcourt</option>
                        <option>GRA Phase 1</option>
                        <option>GRA Phase 2</option>
                        <option>Airport Road</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-0 bottom-2 text-[16px] text-[#7f7668] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Service Interest Pills */}
              <ScrollReveal delay={320} y={24}>
                <div>
                  <label className="block font-sans text-[10px] tracking-widest text-[#695c52] uppercase mb-4">
                    Service Interest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(services).map((key) => (
                      <ServicePill
                        key={key}
                        label={key}
                        checked={services[key as keyof typeof services]}
                        onChange={() => toggleService(key)}
                      />
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Message */}
              <ScrollReveal delay={380} y={24}>
                <div className="border-b border-[#d0c5b5]/40 focus-within:border-[#745a27] transition-colors duration-300 pb-2">
                  <textarea
                    rows={4}
                    placeholder="Tell us about your vision..."
                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-serif italic text-[17px] text-[#1e1b15] placeholder:text-[#7f7668]/40 outline-none resize-none leading-relaxed"
                  />
                </div>
              </ScrollReveal>

              {/* Submit Button */}
              <ScrollReveal delay={440} y={20}>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#1A1410] text-[#C9A96E] py-5 rounded-full font-sans text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#2C2420] active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      {/* Gold spinner */}
                      <svg
                        className="w-4 h-4 animate-spin text-[#C9A96E]"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : sent ? (
                    <>
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Enquiry Sent!
                    </>
                  ) : (
                    <>
                      Send Enquiry
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </ScrollReveal>

              {/* WhatsApp Link */}
              <ScrollReveal delay={500} y={16}>
                <a
                  href="https://wa.me/2348139910974?text=Hi%20Blanca%20Luxury%2C%20I%27d%20like%20to%20inquire%20about%20your%20services."
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center font-sans text-[11px] tracking-widest text-[#745a27] uppercase underline underline-offset-8 decoration-[#C9A96E]/30 hover:decoration-[#C9A96E] transition-all duration-300"
                >
                  Or reach us directly on WhatsApp →
                </a>
              </ScrollReveal>

            </form>
          </div>
        </section>

        {/* ── RIGHT: SHOWROOM CARDS ──────────────────────────────── */}
        <section className="w-full md:w-1/2 bg-[#F0EBE3] px-8 md:px-16 lg:px-24 py-20 md:py-28 flex flex-col gap-8">

          {/* Port Harcourt Card */}
          <ScrollReveal delay={100} y={32}>
            <ShowroomCard>
              <span className="font-sans text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase">
                Port Harcourt Showrooms
              </span>

              <div className="space-y-5">
                {/* Location 1 */}
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-lg text-[#2C2420]">1. Garden City Mall</p>
                  <p className="font-sans text-[13px] text-[#8B7D72]">Rumuomasi, Port Harcourt, Rivers State.</p>
                </div>
                <div className="h-px bg-[#E8E0D5] w-full" />

                {/* Location 2 */}
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-lg text-[#2C2420]">2. J&apos;s Signature Hotel</p>
                  <p className="font-sans text-[13px] text-[#8B7D72]">GRA, Port Harcourt, Rivers State.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-1">
                <p className="font-sans text-[13px] text-[#8B7D72]">+234 813 991 0974</p>
                <p className="font-sans text-[13px] text-[#8B7D72]">blancaluxurydecor@gmail.com</p>
              </div>

              <a
                href="https://maps.google.com/?q=Garden+City+Mall+Rumuomasi+Port+Harcourt"
                target="_blank"
                rel="noreferrer"
                className="font-sans text-[11px] tracking-widest text-[#C9A96E] uppercase flex items-center gap-1 hover:opacity-70 transition-opacity w-fit"
              >
                Get Directions
                <span className="material-symbols-outlined text-[14px]">north_east</span>
              </a>
            </ShowroomCard>
          </ScrollReveal>

          {/* Lagos Card */}
          <ScrollReveal delay={250} y={32}>
            <ShowroomCard>
              <span className="font-sans text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase">
                Lagos Showroom
              </span>
              <p className="font-serif text-xl text-[#2C2420] leading-snug">
                11A Bishop Abayode Cole VI, Lagos.
              </p>
              <div className="flex flex-col gap-1">
                <p className="font-sans text-[13px] text-[#8B7D72]">+234 813 991 0974</p>
                <p className="font-sans text-[13px] text-[#8B7D72]">blancaluxurydecor@gmail.com</p>
              </div>
              <a
                href="https://maps.google.com/?q=Bishop+Abayode+Cole+VI+Lagos"
                target="_blank"
                rel="noreferrer"
                className="font-sans text-[11px] tracking-widest text-[#C9A96E] uppercase flex items-center gap-1 hover:opacity-70 transition-opacity w-fit"
              >
                Get Directions
                <span className="material-symbols-outlined text-[14px]">north_east</span>
              </a>
            </ShowroomCard>
          </ScrollReveal>

          {/* Trust badge row */}
          <ScrollReveal delay={400} y={16}>
            <div className="flex items-center gap-6 pt-2 opacity-50">
              <span className="material-symbols-outlined text-[#745a27] text-xl">verified</span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#695c52]">
                Certified Luxury Interior Studio
              </span>
              <span className="material-symbols-outlined text-[#745a27] text-xl">workspace_premium</span>
            </div>
          </ScrollReveal>

        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BOTTOM — WHATSAPP CTA STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#1A1410] py-24 px-8 flex flex-col items-center justify-center text-center">
        <ScrollReveal delay={0} y={24}>
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#C9A96E] mb-4">
            Direct Access
          </p>
          <h2 className="font-serif italic text-3xl md:text-4xl text-white mb-10">
            Prefer to speak directly?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348139910974?text=Hi%20Blanca%20Luxury%2C%20I%27d%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="bg-[#C9A96E] text-white px-10 py-4 rounded-full font-sans text-[12px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>

            <a
              href="tel:+2348139910974"
              className="bg-transparent border border-[#d0c5b5]/25 text-white px-10 py-4 rounded-full font-sans text-[12px] uppercase tracking-widest hover:bg-white/5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              Call Now
            </a>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
