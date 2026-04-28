import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Hero } from "@/components/sections/Hero";
import { CollectionsTeaser } from "@/components/sections/home/CollectionsTeaser";
import { ProductsTeaser } from "@/components/sections/home/ProductsTeaser";
import { ProjectsTeaser } from "@/components/sections/home/ProjectsTeaser";
import { ShowroomsSection } from "@/components/sections/home/ShowroomsSection";
import { EnquirySection } from "@/components/sections/home/EnquirySection";

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero />

      {/* ── Marquee Ticker ── */}
      <div className="w-full h-[48px] bg-[#1A1410] overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2].map((set) => (
            <div key={set} className="flex items-center space-x-8 px-4">
              {["FURNITURE", "DECOR", "DRAPERY", "FRAGRANCES", "SPACE MANAGEMENT", "WORLDWIDE DELIVERY", "HANDCRAFTED CUSTOMIZATION"].map((label) => (
                <React.Fragment key={label}>
                  <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">{label}</span>
                  <span className="text-white/40 text-[11px]">·</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Manifesto Quote ── */}
      <section className="bg-[#FAF8F5] py-14 px-6 border-b border-[#E8E0D5]">
        <ScrollReveal y={16} delay={0}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="block font-sans text-[9px] text-[#C9A96E] tracking-[0.4em] uppercase mb-5">
              Our Philosophy
            </span>
            <p className="font-serif italic text-[22px] md:text-[30px] text-[#1e1b15] leading-[1.45]">
              &ldquo;We don&rsquo;t furnish rooms &mdash; we give them a soul.
              Every piece is chosen with intention, every space composed like a poem.&rdquo;
            </p>
            <div className="mt-6 w-10 h-px bg-[#C9A96E]/50 mx-auto" />
          </div>
        </ScrollReveal>
      </section>

      {/* ── Collections teaser (dark) ── */}
      <CollectionsTeaser />

      {/* ── Sourcing Strip: Italy · Turkey ── */}
      <section className="flex flex-col sm:flex-row w-full" style={{ minHeight: 280 }}>
        <div
          className="relative flex-1 flex items-end justify-start p-8 md:p-12 overflow-hidden group"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7WKIP5Fxq6xi1qA6PxmZI6VhQQYKoupczEZ663m6MoIztZm6ODQFPt1lNUUEtN26Ruvv3sMxWKzHh03JijYsVVCnIRr32DndpnfZiVJ264abVcY07DnZh-xLBx_KhthDiNjxM7_aqr4zLd3bWP7dD_cmr_xL9hvPDiikbbFR4V0p0r6AwKV5w3kpj_KqAFJN7oZYzez_yEn_HngV3IepZNjgo9F4QRozuTfe_hMtulwOP3Y_5de-6_KPuhYaNx2dT5oqAJShPn-tj')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1A1410]/55 group-hover:bg-[#1A1410]/40 transition-all duration-700" />
          <div className="relative z-10">
            <span className="block font-sans text-[9px] text-[#C9A96E] tracking-[0.35em] uppercase mb-2">Origin I</span>
            <h3 className="font-serif italic text-white text-2xl md:text-3xl">The Stone of Italy</h3>
          </div>
        </div>
        <div className="w-px bg-[#C9A96E]/20 hidden sm:block" />
        <div
          className="relative flex-1 flex items-end justify-start p-8 md:p-12 overflow-hidden group"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfFD56JuMccDq3MNpEHRLQHMsXUfvLctNGvsIdpH68vfT3IwoLF5jfuF-cERhkx1H4ldJzVI4dSe8dX5GMozARM_kmMQt3EB4_dIcSj32DJBU_-JN4QelQlp7YqKyjkOk4avLmQj2iPsQllztDDvvnzk2wWcpe6pG-yW7K1bkOoypJupG1GllWSdNELCyYU2Zb4O8-3I_6Kfvydd1zJDg0_x3HGOP8wj6a5tqcArt6_2uTHr6ek-Zv8vIHlDC-9dqWBMKO-QqfnOsn')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1A1410]/55 group-hover:bg-[#1A1410]/40 transition-all duration-700" />
          <div className="relative z-10">
            <span className="block font-sans text-[9px] text-[#C9A96E] tracking-[0.35em] uppercase mb-2">Origin II</span>
            <h3 className="font-serif italic text-white text-2xl md:text-3xl">Ateliers of Turkey</h3>
          </div>
        </div>
      </section>

      {/* ── Products teaser (light) ── */}
      <ProductsTeaser />

      {/* ── Process Bar ── */}
      <section className="bg-[#1A1410] border-y border-[#C9A96E]/10 py-10 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {[
            { n: "01", label: "Consult",  desc: "We listen to your vision" },
            { n: "02", label: "Design",   desc: "Tailored mood boards & layouts" },
            { n: "03", label: "Source",   desc: "Curated from Italy & Turkey" },
            { n: "04", label: "Install",  desc: "White-glove delivery & setup" },
          ].map((step, i) => (
            <div key={step.n} className="relative flex flex-col items-center text-center px-4">
              <span className="font-sans text-[10px] text-[#C9A96E] tracking-[0.3em] mb-2">{step.n}</span>
              <h4 className="font-serif italic text-white text-[18px] mb-1">{step.label}</h4>
              <p className="font-sans text-[10px] text-[#8B7D72] leading-relaxed">{step.desc}</p>
              {i < 3 && (
                <span className="hidden md:block absolute right-0 top-1 text-[#C9A96E]/25 text-xl select-none">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects teaser (dark) ── */}
      <ProjectsTeaser />

      {/* ── Stats bar ── */}
      <section className="bg-[#F0EBE3] py-16 md:py-20 border-y border-[#E8E0D5]">
        <div className="max-w-5xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
            {[
              { value: "8+",            label: "Government Commissions" },
              { value: "3",             label: "Cities — PH · Lagos · Abuja" },
              { value: "Italy & Turkey", label: "Sourcing Origins", small: true },
              { value: "15+",           label: "Years of Excellence" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 80} className="w-full">
                <div className="flex flex-col items-center lg:items-start lg:px-8 text-center lg:text-left relative">
                  <div className={`font-serif leading-none text-[#C9A96E] mb-3 ${stat.small ? "text-[24px] md:text-[30px]" : "text-[44px]"}`}>
                    {stat.value}
                  </div>
                  <div className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#8B7D72] uppercase">
                    {stat.label}
                  </div>
                  {i < 3 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#E8E0D5]" />}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showrooms (from API) ── */}
      <ShowroomsSection />

      {/* ── Trusted By ── */}
      <section className="bg-[#1A1410] py-14 border-y border-[#C9A96E]/10 overflow-hidden">
        <ScrollReveal delay={0} y={10}>
          <p className="text-center font-sans text-[10px] uppercase tracking-[0.35em] text-[#C9A96E]/60 mb-10">
            Trusted by Nigeria&apos;s Most Distinguished Addresses
          </p>
        </ScrollReveal>
        <div className="relative flex overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee gap-0">
            {[
              "Rivers State Government", "Julius Berger Nigeria",
              "Gov. Seyi Makinde", "Dr. Peter Odili",
              "19 Residence Quarters — Abuja",
              "Rivers State Government", "Julius Berger Nigeria",
              "Gov. Seyi Makinde", "Dr. Peter Odili",
              "19 Residence Quarters — Abuja",
            ].map((name, i) => (
              <div key={i} className="flex items-center px-10 shrink-0">
                <span className="font-serif italic text-[18px] md:text-[22px] text-white/50 hover:text-[#C9A96E] transition-colors duration-500 cursor-default">
                  {name}
                </span>
                <span className="ml-10 text-[#C9A96E]/30 text-[10px]">✦</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#1A1410] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#1A1410] to-transparent z-10" />
        </div>
      </section>

      {/* ── Enquiry form ── */}
      <EnquirySection />
    </>
  );
}
