"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useGetProjectsQuery } from "@/lib/store";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Transformation {
  id: string;
  name: string;
  location: string;
  scope: string;
  image: string;
  alt: string;
}

// ─── Mock transformation data (simulates API fetch) ───────────────────────────
const mockTransformations: Transformation[] = [
  {
    id: "t1",
    name: "The Aspen Residence",
    location: "Ikoyi, Lagos",
    scope: "FULL RENOVATION",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVoaY3HrgC-noT0Cqbiu9UM8m_ZNWGzoQN-1WVZwyTfQ4bo0E6wv2acAXAuxMmV4CqC2yPO8R789KnmqtrvQXJhpsaGJjFq-lUJJOrKlq145q_yMT_anTLj6J4owqGtHiXN6KAV6Xb_cy3glaZz0-Vh8FPHI3ES1hbJ7XinfnJNCkw0rUK5Pyg0kAjXAgLfOFaoxuSoLQejVXhCQ3KPjFIzqUof6aU9TN69btyGaXIxGTsLyADgmzJ2hdDu5WBguCx02DmgkwOEn84",
    alt: "Modern living room full renovation with warm lighting",
  },
  {
    id: "t2",
    name: "Mayfair Penthouse",
    location: "Victoria Island, Lagos",
    scope: "KITCHEN ARCHITECTURE",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAp3WXq-t-WlUHUMD5FvEnMsNo1nS-SHE7X5pb-nxwQSVW58LC1F0Kxx5kXAYPdUH-A2yeyRv-QsT4Y3IgsB_sC7t_CsIThbh31YJ9nHZIqN7Lrcv85-JXjRFFjYl8uzkq1cuXdWl-FjCAWpkS-UrMQznMzd0VUECKnIpizti4OrJJ-wYemB5f5wiEunYSKzQG2G-Jv0HgIdd168jqvE2QwvhtN-Nn1AA1wGx4CtybEEUCbAp0yfNrLlBnfrMzWQUJ9DzFfYYiSig6a",
    alt: "High-end kitchen transformation, marble countertops and brass fixtures",
  },
  {
    id: "t3",
    name: "Villa Serenity",
    location: "GRA Phase 2, Port Harcourt",
    scope: "INTERIOR STYLING",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8HY005KAy1A67BZM2UKDdYZLyZazdHKE2aG05HfGpm4TuHbNSwwOqR9mGft3YpS54J2D8-MbsCleQnm8g2FTp_hzP_OoWEiSTiha3DWNDuzJXhDOKH-zjmujJkakl1nbGSV0z4zlu4IcEf3e13EVc5tLJQgI4dvR0jAsRbvOhlbdYoOAiJl04FTyQJnTWqowPyPflS3deRhsFylBVgghODp3RVtT7zd6sQvXukCWuB0KALqa3vtSiGEkUb9JLZ2Skf_iHJzufFg_V",
    alt: "Elegant master suite with soft textiles and expansive natural light",
  },
];

async function fetchTransformations(): Promise<Transformation[]> {
  await new Promise((r) => setTimeout(r, 1200));
  return mockTransformations;
}

// ─── Skeleton shimmer card ────────────────────────────────────────────────────
function TransformationSkeleton() {
  return (
    <div className="space-y-6">
      <div
        className="aspect-[4/5] rounded-lg overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg,#f5ede2 25%,#efe7dc 50%,#f5ede2 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.6s ease-in-out infinite",
        }}
      />
      <div className="space-y-2">
        <div
          className="h-5 w-3/4 rounded"
          style={{
            background:
              "linear-gradient(90deg,#f5ede2 25%,#efe7dc 50%,#f5ede2 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.6s ease-in-out infinite 0.1s",
          }}
        />
        <div
          className="h-3 w-1/2 rounded"
          style={{
            background:
              "linear-gradient(90deg,#f5ede2 25%,#efe7dc 50%,#f5ede2 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.6s ease-in-out infinite 0.2s",
          }}
        />
      </div>
    </div>
  );
}

// ─── Transformation card ──────────────────────────────────────────────────────
function TransformationCard({ item }: { item: Transformation }) {
  return (
    <div className="space-y-6 group">
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#f5ede2]">
        <img
          src={item.image}
          alt={item.alt}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Scope badge */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] tracking-widest uppercase font-bold text-[#745a27]">
          {item.scope}
        </div>
      </div>
      <div>
        <h4 className="font-serif italic text-xl text-[#1e1b15]">{item.name}</h4>
        <p className="font-sans text-xs tracking-widest uppercase text-[#695c52] mt-1">
          {item.location}
        </p>
      </div>
    </div>
  );
}

// ─── Process Step ─────────────────────────────────────────────────────────────
function ProcessStep({
  num,
  title,
  desc,
  delay,
}: {
  num: string;
  title: string;
  desc: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-[#fff8f1] p-8 rounded-lg border border-[#d0c5b5]/20 text-center flex flex-col items-center hover:-translate-y-1 transition-transform duration-500 cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <span className="font-serif italic text-4xl text-[#745a27] mb-6 leading-none">
        {num}
      </span>
      <h3 className="font-sans text-xs tracking-widest uppercase font-bold text-[#1e1b15] mb-4">
        {title}
      </h3>
      <p className="font-sans text-sm leading-relaxed text-[#695c52] max-w-[200px]">
        {desc}
      </p>
    </div>
  );
}

// ─── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({
  title,
  features,
  highlighted = false,
  delay,
}: {
  title: string;
  features: string[];
  highlighted?: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col p-12 rounded-lg h-full transition-all duration-700 ${
        highlighted
          ? "bg-[#2C241C] border-t-2 border-[#C9A96E] shadow-2xl md:-translate-y-8 z-10"
          : "bg-[#231A12] border border-white/5"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? highlighted
            ? "translateY(-2rem)"
            : "translateY(0)"
          : "translateY(48px)",
        transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C9A96E] text-white text-[10px] tracking-[0.2em] px-6 py-1 rounded-full uppercase font-sans whitespace-nowrap">
          Most Requested
        </div>
      )}

      <h3 className="font-serif italic text-3xl text-[#fff8f1] mb-8 leading-tight">
        {title}
      </h3>

      <ul className="flex-grow space-y-5 mb-12">
        {features.map((f) => (
          <li
            key={f}
            className={`flex items-start gap-3 text-[13px] tracking-wide uppercase font-sans ${
              highlighted ? "text-[#e9e1d6]" : "text-[#8B7D72]"
            }`}
          >
            <span className="material-symbols-outlined text-[#745a27] text-[16px] shrink-0 mt-[2px]">
              check
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`w-full py-4 rounded-full font-sans text-xs tracking-widest uppercase text-center block transition-all duration-300 active:scale-95 ${
          highlighted
            ? "bg-[#745a27] text-white hover:bg-[#C9A96E]"
            : "border border-[#745a27]/30 text-[#C9A96E] hover:bg-[#745a27] hover:text-white"
        }`}
      >
        Inquire
      </Link>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function InteriorDesignPage() {
  // Transformations state
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [loadingTransformations, setLoadingTransformations] = useState(true);

  // Slider state (active portfolio index)
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    fetchTransformations().then((data) => {
      setTransformations(data);
      setLoadingTransformations(false);
    });
  }, []);

  const { data: projectsData } = useGetProjectsQuery({ limit: 3 });
  const portfolioImages = projectsData?.items ?? [];

  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative h-screen w-full flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzluBKdOVxh-FpWjKnWnxosCJwgEWsxrFu_cY7JTvrxZIV5Ko2Jo1nr_h_baCxSiWgVwuofOzLR6zZJ--VIdcyF_suwcPjZN-0hH9_p2NENrbZVL4wvdOlJ0LQZqUfI0tfatjpi6AtahzOzP5SAB2vW_jYOoIaB1m55SZxgpBIb6oNeX8yY0xJ4tm3SEvT7EZri5vlv5wliqtMvOSTp7YldzpYszOSIE0iBRQv9xXcUBO0l8qTLxDdiHlq46irZ2TeZ-_MEeow9fNU')",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1A1410]/65" />

        {/* Bottom-left text */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-12 pb-20 md:pb-28">
          <div className="max-w-2xl">
            <ScrollReveal delay={200} y={24}>
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#C9A96E] mb-6">
                BLANCA LUXURY · SERVICES
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400} y={36} duration={1100}>
              <h1 className="font-serif italic text-6xl md:text-[76px] text-white leading-tight mb-6">
                Interior Architecture
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={700} y={20}>
              <p className="font-sans text-[14px] tracking-[0.15em] text-[#b8aba5] uppercase">
                From concept to completion — fully personalized, entirely yours.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 right-12 z-10 flex flex-col items-center gap-3">
          <div className="w-[1px] h-12 bg-[#C9A96E]/30 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-full bg-[#C9A96E]"
              style={{ animation: "scrollLine 2s ease-in-out infinite" }}
            />
          </div>
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#C9A96E]/60 [writing-mode:vertical-rl]">
            EXPLORE
          </span>
        </div>
      </section>

      {/* Shimmer keyframes live here (inlined) */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          50%  { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          PROCESS SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#fbf2e7] py-32 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <ScrollReveal y={24} delay={0}>
            <div className="text-center mb-24">
              <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-[#745a27] mb-4">
                Our Approach
              </p>
              <h2 className="font-serif italic text-5xl text-[#1e1b15] mb-6">
                How We Work
              </h2>
              <div className="w-16 h-[1px] bg-[#C9A96E]/40 mx-auto" />
            </div>
          </ScrollReveal>

          {/* Steps grid */}
          <div className="relative">
            {/* Dotted connective line — desktop only */}
            <div className="absolute top-[4.5rem] left-0 w-full h-[1px] border-t border-dashed border-[#C9A96E]/30 hidden md:block pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <ProcessStep
                num="01"
                title="Discovery"
                desc="We define your vision through immersive dialogue and aesthetic exploration."
                delay={0}
              />
              <ProcessStep
                num="02"
                title="Concept"
                desc="Architectural layouts and mood boards materialize into a cohesive design language."
                delay={120}
              />
              <ProcessStep
                num="03"
                title="Execution"
                desc="Precision management of contractors and artisans to bring plans to life."
                delay={240}
              />
              <ProcessStep
                num="04"
                title="Handover"
                desc="A final curated reveal of your bespoke sanctuary, ready for living."
                delay={360}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BEFORE/AFTER SHOWCASE
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#fff8f1] py-32 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header + controls */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <ScrollReveal y={24} delay={0}>
              <div className="max-w-xl">
                <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-[#745a27] mb-4 block">
                  Refining Space
                </span>
                <h2 className="font-serif italic text-5xl text-[#1e1b15] leading-tight">
                  Transformation Portfolio
                </h2>
              </div>
            </ScrollReveal>

            {/* Prev / Next buttons */}
            <ScrollReveal y={16} delay={150}>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    setActiveIdx((i) =>
                      i === 0 ? transformations.length - 1 : i - 1
                    )
                  }
                  aria-label="Previous"
                  className="w-12 h-12 rounded-full border border-[#d0c5b5]/30 flex items-center justify-center text-[#4d463a] hover:border-[#745a27] hover:text-[#745a27] transition-colors duration-300"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_back_ios_new
                  </span>
                </button>
                <button
                  onClick={() =>
                    setActiveIdx((i) =>
                      i === transformations.length - 1 ? 0 : i + 1
                    )
                  }
                  aria-label="Next"
                  className="w-12 h-12 rounded-full border border-[#d0c5b5]/30 flex items-center justify-center text-[#4d463a] hover:border-[#745a27] hover:text-[#745a27] transition-colors duration-300"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward_ios
                  </span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingTransformations
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TransformationSkeleton key={i} />
                ))
              : transformations.map((item, i) => (
                  <div
                    key={item.id}
                    style={{
                      opacity: 1,
                      transition: `opacity 600ms ease ${i * 100}ms`,
                    }}
                  >
                    <TransformationCard item={item} />
                  </div>
                ))}
          </div>

          {/* Dot indicators */}
          {!loadingTransformations && (
            <div className="flex justify-center gap-3 mt-12">
              {transformations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Go to transformation ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    activeIdx === i
                      ? "w-6 h-2 bg-[#C9A96E]"
                      : "w-2 h-2 bg-[#d0c5b5]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SERVICE PACKAGES
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1A1410] py-32 px-8 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <ScrollReveal y={24} delay={0}>
            <div className="text-center mb-24">
              <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#C9A96E] mb-4 block">
                Curated Investment
              </span>
              <h2 className="font-serif italic text-5xl text-[#fff8f1] leading-tight">
                Design Engagement Levels
              </h2>
            </div>
          </ScrollReveal>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            <PackageCard
              title="Consultation Only"
              features={[
                "2-Hour In-Home Strategy Session",
                "Spatial Planning Recommendations",
                "Colour Palette & Material Guidance",
              ]}
              delay={0}
            />
            <PackageCard
              title="Full Design"
              features={[
                "End-to-End Architectural Planning",
                "Photorealistic 3D Visualizations",
                "Custom Furniture & Cabinetry Design",
                "Weekly Site Visits & Project Management",
              ]}
              highlighted
              delay={120}
            />
            <PackageCard
              title="Design + Procurement"
              features={[
                "Full Design & Architectural Plans",
                "White-Glove FF&E Procurement",
                "Artwork & Decor Curation",
                "Post-Handover Styling Service",
              ]}
              delay={240}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PORTFOLIO TEASER — MASONRY
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#fff8f1] py-32 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal y={24} delay={0}>
            <h2 className="font-serif italic text-4xl md:text-[44px] text-[#1e1b15] mb-16 text-center">
              Spaces We&apos;ve Transformed
            </h2>
          </ScrollReveal>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
            {/* Large left */}
            <ScrollReveal
              className="md:col-span-7"
              delay={0}
              y={32}
              duration={900}
            >
              <div className="aspect-[16/9] rounded-lg overflow-hidden">
                <img
                  src={portfolioImages[0]?.coverImageUrl ?? portfolioImages[0]?.media[0]?.url}
                  alt={portfolioImages[0]?.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </ScrollReveal>

            {/* Top-right (offset down) */}
            <ScrollReveal
              className="md:col-span-5 md:mt-12"
              delay={120}
              y={32}
              duration={900}
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={portfolioImages[1]?.coverImageUrl ?? portfolioImages[1]?.media[0]?.url}
                  alt={portfolioImages[1]?.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </ScrollReveal>

            {/* Bottom-left (offset up on md) */}
            <ScrollReveal
              className="md:col-span-5 md:-mt-12"
              delay={240}
              y={32}
              duration={900}
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={portfolioImages[2]?.coverImageUrl ?? portfolioImages[2]?.media[0]?.url}
                  alt={portfolioImages[2]?.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </ScrollReveal>

            {/* CTA cell */}
            <ScrollReveal
              className="md:col-span-7 flex items-center justify-center"
              delay={320}
              y={20}
            >
              <Link
                href="/portfolio"
                className="group font-sans text-[#745a27] tracking-[0.2em] uppercase text-sm font-bold flex items-center gap-4 transition-all hover:gap-6"
              >
                View Full Portfolio
                <span className="material-symbols-outlined text-[#C9A96E] group-hover:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CONSULTATION BOOKING CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1e1b15] py-32 px-8 relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#745a27]/8 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A96E]/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal y={28} delay={0}>
            <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-[#C9A96E] mb-5">
              Begin Your Journey
            </p>
            <h2 className="font-serif italic text-5xl md:text-[60px] text-[#fbf2e7] mb-6 leading-tight">
              Ready to Transform Your Space?
            </h2>
            <p className="font-sans text-[13px] text-[#b8aba5] tracking-wide mb-14 max-w-md mx-auto">
              Our design concierge is available six days a week. Every project begins with a complimentary discovery call.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a
                href="https://wa.me/2348139910974?text=Hi%20Blanca%20Luxury%2C%20I%27d%20like%20to%20book%20a%20free%20interior%20design%20consultation."
                target="_blank"
                rel="noreferrer"
                className="bg-[#745a27] text-white px-12 py-5 rounded-full font-sans text-[12px] tracking-widest uppercase hover:bg-[#C9A96E] active:scale-95 transition-all duration-300 shadow-xl hover:shadow-[#C9A96E]/20 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Book a Free Consultation
              </a>

              <Link
                href="/contact"
                className="bg-transparent border border-[#d0c5b5]/20 text-[#e9e1d6] px-12 py-5 rounded-full font-sans text-[12px] tracking-widest uppercase hover:bg-white/5 active:scale-95 transition-all duration-300"
              >
                Send an Enquiry →
              </Link>
            </div>

            {/* Social proof micro-line */}
            <p className="mt-12 font-sans text-[10px] text-[#695c52] tracking-widest uppercase">
              Trusted by clients across Lagos · Port Harcourt · Abuja
            </p>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
