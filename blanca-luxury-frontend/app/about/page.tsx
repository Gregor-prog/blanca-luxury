"use client";
import React, { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Metadata } from "next";

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Philosophy Pillar ────────────────────────────────────────────────────────
function PhilosophyPillar({
  num, title, body, delay,
}: { num: string; title: string; body: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className="border-t-2 border-[#C9A96E] pt-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <span className="font-sans font-bold text-[#C9A96E] text-sm tracking-widest block mb-4">
        {num}
      </span>
      <h3 className="font-serif text-white text-3xl mb-6 uppercase tracking-wider">
        {title}
      </h3>
      <p className="font-sans text-[15px] leading-relaxed text-[#b8aba5]">
        {body}
      </p>
    </div>
  );
}

// ─── Sector Card ──────────────────────────────────────────────────────────────
function SectorCard({
  icon, title, description, delay,
}: { icon: string; title: string; description: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className="bg-[#fbf2e7] p-10 rounded-lg hover:bg-[#f5ede2] transition-colors duration-500 group cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div className="mb-8">
        <span className="material-symbols-outlined text-[#745a27] text-4xl group-hover:text-[#C9A96E] transition-colors duration-300">
          {icon}
        </span>
      </div>
      <h4 className="font-serif text-xl mb-4 text-[#1e1b15] group-hover:text-[#745a27] transition-colors duration-300">
        {title}
      </h4>
      <p className="font-sans text-sm text-[#695c52] leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Timeline Milestone ───────────────────────────────────────────────────────
function Milestone({
  year, label, above, delay,
}: { year: string; label: string; above: boolean; delay: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center w-56 shrink-0"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${above ? -30 : 30}px)`,
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {above ? (
        <>
          <span className="font-sans text-xs text-[#C9A96E] mb-4 font-bold tracking-[0.2em]">{year}</span>
          <div className="w-3 h-3 rounded-full bg-[#C9A96E] mb-6 shadow-[0_0_20px_rgba(201,169,110,0.6)]" />
          <p className="font-sans text-[11px] text-stone-400 uppercase tracking-widest text-center px-2">{label}</p>
        </>
      ) : (
        <>
          <p className="font-sans text-[11px] text-stone-400 uppercase tracking-widest text-center px-2 mb-6">{label}</p>
          <div className="w-3 h-3 rounded-full bg-[#C9A96E] mb-4 shadow-[0_0_20px_rgba(201,169,110,0.6)]" />
          <span className="font-sans text-xs text-[#C9A96E] font-bold tracking-[0.2em]">{year}</span>
        </>
      )}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function AboutPage() {
  // Drag-to-scroll for timeline
  const timelineRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    startX.current = e.pageX - (timelineRef.current?.offsetLeft ?? 0);
    scrollLeft.current = timelineRef.current?.scrollLeft ?? 0;
  }
  function onMouseLeave() { isDragging.current = false; }
  function onMouseUp() { isDragging.current = false; }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - (timelineRef.current.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    timelineRef.current.scrollLeft = scrollLeft.current - walk;
  }

  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — OPENING STATEMENT
      ══════════════════════════════════════════════════════════ */}
      <section className="h-screen w-full flex flex-col items-center justify-center bg-[#fff8f1] px-6 text-center relative">
        <ScrollReveal delay={200} y={24}>
          <div className="mb-8 font-sans font-medium text-[10px] uppercase tracking-[0.35em] text-[#745a27]">
            OUR STORY
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400} y={32} duration={1100}>
          <h1 className="font-serif italic text-4xl md:text-[52px] leading-[1.15] text-[#1e1b15] max-w-[720px] mx-auto">
            &ldquo;We don&rsquo;t furnish rooms. We bring your distinct vision to life.&rdquo;
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={700} y={16} duration={900}>
          <div className="mt-14 h-[1px] w-[60px] bg-[#C9A96E] mx-auto" />
        </ScrollReveal>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-3">
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#695c52]">Scroll</span>
          <span className="material-symbols-outlined animate-bounce text-[#745a27]">expand_more</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — CEO STORY
      ══════════════════════════════════════════════════════════ */}
      <section className="flex flex-col md:flex-row min-h-screen bg-[#fbf2e7] overflow-hidden">
        {/* Portrait */}
        <div className="w-full md:w-[45%] h-[500px] md:h-auto overflow-hidden relative">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj2mXs2QKGmwE1824TQQpDf9w2kXKFn4YqR4mLnxricA_l_hUHevBb3yxf-ajts2Av2w59SPqiEDsJY3I7UB6rNs9VhTRccbvkvSI-jy99N56Zgb0LKqZgomTlMcLoO03WluvkrWQWNrrrgKOU9cNavB1Pr-zzDW0ZrjkBi0M5Q8D-0OU9DAHA8AFXfCoFPPauSY-WisOsfuqLLEBMOZyPn7SjgmP0g0ukFod61HCfSq7msUo2iZaEAwASdCY46wnLRo0r3_bzPmho"
            alt="Stella Michael Ofori — Founder & Creative Director, Blanca Luxury"
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#fbf2e7]/30 pointer-events-none" />
        </div>

        {/* Text */}
        <div className="w-full md:w-[55%] flex flex-col justify-center px-8 md:px-24 py-20 bg-[#fff8f1]">
          <ScrollReveal delay={100} y={32}>
            <h2 className="font-serif italic text-4xl md:text-[40px] text-[#1e1b15] mb-10">
              Meet Stella
            </h2>
          </ScrollReveal>

          <div className="space-y-6 max-w-xl">
            <ScrollReveal delay={250} y={24}>
              <p className="font-sans text-[15px] leading-relaxed text-[#695c52]">
                Stella Michael Ofori founded Atelier Blanca with a singular purpose: to redefine luxury through the lens of architectural soul and personal narrative. Her journey began with a deep appreciation for the way space influences the human psyche, leading her to create environments that are as functional as they are poetic.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400} y={24}>
              <p className="font-sans text-[15px] leading-relaxed text-[#695c52]">
                Under her stewardship, the studio has grown from a boutique practice into a globally recognised authority in bespoke interior curation—bridging the gap between historical craftsmanship and contemporary living, with projects spanning Lagos, Port Harcourt, and international commissions.
              </p>
            </ScrollReveal>
          </div>

          {/* Credentials */}
          <ScrollReveal delay={600} y={20}>
            <div className="flex items-center gap-8 mt-14">
              {[
                { icon: "architecture", label: "RIBA Certified" },
                { icon: "award_star", label: "Award Winning" },
                { icon: "verified", label: "Gov. Accredited" },
                { icon: "design_services", label: "Bespoke Studio" },
              ].map(({ icon, label }) => (
                <div key={icon} className="flex flex-col items-center gap-2 group cursor-default">
                  <span className="material-symbols-outlined text-[#1e1b15]/30 group-hover:text-[#C9A96E] transition-colors duration-300 text-2xl">
                    {icon}
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-[#695c52]/50 group-hover:text-[#745a27] transition-colors duration-300 hidden md:block">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — BRAND PHILOSOPHY
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#343029] py-32 px-8 md:px-12">
        <ScrollReveal y={24} delay={0}>
          <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-[#C9A96E] text-center mb-4">
            Our Pillars
          </p>
          <h2 className="font-serif italic text-4xl text-white text-center mb-20">
            What We Stand For
          </h2>
        </ScrollReveal>

        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <PhilosophyPillar
            num="01"
            title="Timeless Design"
            body="We transcend fleeting trends to create enduring spaces that grow more beautiful with time, focusing on classic proportions and material integrity."
            delay={0}
          />
          <PhilosophyPillar
            num="02"
            title="Unmatched Craft"
            body="Every piece is a testament to human skill. We partner with master artisans whose techniques have been passed down through generations."
            delay={150}
          />
          <PhilosophyPillar
            num="03"
            title="Bespoke Service"
            body="Your vision is the architect. Our process is highly collaborative, ensuring every detail reflects the unique narrative of our clients."
            delay={300}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — SECTORS WE SERVE
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#fff8f1] py-32 px-8 md:px-12 text-center">
        <ScrollReveal y={24} delay={0}>
          <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-[#745a27] mb-4">
            Our Expertise
          </p>
          <h2 className="font-serif italic text-5xl text-[#1e1b15] mb-20">
            Where We Work
          </h2>
        </ScrollReveal>

        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <SectorCard icon="home_work"       title="Residential"  description="Curating intimate sanctuaries that balance private luxury with welcoming warmth." delay={0} />
          <SectorCard icon="corporate_fare"  title="Commercial"   description="Elevating workplace culture through architectural precision and functional elegance." delay={100} />
          <SectorCard icon="hotel"           title="Hospitality"  description="Defining guest experiences through sensory design and sophisticated atmosphere." delay={200} />
          <SectorCard icon="medical_services" title="Medical"      description="Integrating wellness and clinical excellence with serene, high-end environments." delay={300} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — TIMELINE
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1A1410] py-32 overflow-hidden">
        <div className="px-8 md:px-12 mb-16">
          <ScrollReveal y={24}>
            <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-[#C9A96E] mb-3">
              Our Journey
            </p>
            <h2 className="font-serif text-3xl text-white tracking-widest uppercase">
              The Legacy
            </h2>
          </ScrollReveal>
        </div>

        {/* Scrollable timeline track */}
        <div
          ref={timelineRef}
          className="relative w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none px-8 md:px-12"
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          <div className="relative flex items-center min-w-[1200px] h-72">
            {/* Gold horizontal rule */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#C9A96E]/25 z-0" />

            <div className="flex justify-between w-full z-10 py-8">
              <Milestone year="2012" label="Studio Founding in Paris"        above={true}  delay={0}   />
              <Milestone year="2015" label="First Government Commission"      above={false} delay={100} />
              <Milestone year="2018" label="Lagos HQ Expansion"               above={true}  delay={200} />
              <Milestone year="2021" label="Julius Berger Partnership"         above={false} delay={300} />
              <Milestone year="2025" label="Bespoke Digital Ecosystem Launch"  above={true}  delay={400} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — SOURCING STORY
      ══════════════════════════════════════════════════════════ */}
      <section className="flex flex-col md:flex-row w-full" style={{ minHeight: "540px" }}>
        {/* Italy */}
        <div className="w-full md:w-1/2 relative group overflow-hidden" style={{ minHeight: "440px" }}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7WKIP5Fxq6xi1qA6PxmZI6VhQQYKoupczEZ663m6MoIztZm6ODQFPt1lNUUEtN26Ruvv3sMxWKzHh03JijYsVVCnIRr32DndpnfZiVJ264abVcY07DnZh-xLBx_KhthDiNjxM7_aqr4zLd3bWP7dD_cmr_xL9hvPDiikbbFR4V0p0r6AwKV5w3kpj_KqAFJN7oZYzez_yEn_HngV3IepZNjgo9F4QRozuTfe_hMtulwOP3Y_5de-6_KPuhYaNx2dT5oqAJShPn-tj"
            alt="Carrara marble workshop — Italy"
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out scale-105 group-hover:scale-100"
            style={{ minHeight: "440px" }}
          />
          <div className="absolute inset-0 bg-stone-900/40 flex items-end pb-16 justify-center">
            <div className="text-center px-12">
              <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-white/60 mb-4 block">
                Origin I
              </span>
              <h3 className="font-serif italic text-3xl text-white">The Stone of Italy</h3>
            </div>
          </div>
        </div>

        {/* Centre overlay quote (large screen only) */}
        <div className="hidden lg:flex absolute left-1/2 top-auto -translate-x-1/2 z-20 pointer-events-none items-center" 
             style={{ position: "absolute" }}>
        </div>

        {/* Turkey */}
        <div className="w-full md:w-1/2 relative group overflow-hidden" style={{ minHeight: "440px" }}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfFD56JuMccDq3MNpEHRLQHMsXUfvLctNGvsIdpH68vfT3IwoLF5jfuF-cERhkx1H4ldJzVI4dSe8dX5GMozARM_kmMQt3EB4_dIcSj32DJBU_-JN4QelQlp7YqKyjkOk4avLmQj2iPsQllztDDvvnzk2wWcpe6pG-yW7K1bkOoypJupG1GllWSdNELCyYU2Zb4O8-3I_6Kfvydd1zJDg0_x3HGOP8wj6a5tqcArt6_2uTHr6ek-Zv8vIHlDC-9dqWBMKO-QqfnOsn"
            alt="Turkish textile atelier — handwoven luxury fabrics"
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out scale-105 group-hover:scale-100"
            style={{ minHeight: "440px" }}
          />
          <div className="absolute inset-0 bg-stone-900/40 flex items-end pb-16 justify-center">
            <div className="text-center px-12">
              <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-white/60 mb-4 block">
                Origin II
              </span>
              <h3 className="font-serif italic text-3xl text-white">Ateliers of Turkey</h3>
            </div>
          </div>
        </div>

        {/* Centered overlay quote — positioned relative to the section */}
      </section>

      {/* ── Sourcing Quote Banner ──────────────────────────────── */}
      <div className="bg-[#1A1410] py-16 px-8 text-center">
        <ScrollReveal y={24} delay={100}>
          <h2 className="font-serif italic text-3xl md:text-[38px] text-white leading-tight max-w-2xl mx-auto">
            &ldquo;Sourced from the World&rsquo;s Finest Artisans&rdquo;
          </h2>
          <div className="mt-6 h-[1px] w-[60px] bg-[#C9A96E] mx-auto" />
        </ScrollReveal>
      </div>

    </main>
  );
}
