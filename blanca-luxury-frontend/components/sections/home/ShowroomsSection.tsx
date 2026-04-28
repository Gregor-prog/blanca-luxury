"use client";

import Link from "next/link";
import { useGetActiveShowroomsQuery } from "@/lib/store";
import type { Showroom } from "@/lib/types";

function mapsUrl(showroom: Showroom) {
  const q = encodeURIComponent(`${showroom.name}, ${showroom.address}, ${showroom.city}, Nigeria`);
  return `https://maps.google.com/?q=${q}`;
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((n) => (
        <div key={n} className="animate-pulse rounded-sm bg-[#EDE7DF]">
          <div className="aspect-[4/3] bg-[#e0d9d0]" />
          <div className="p-6 space-y-3">
            <div className="h-3 w-16 bg-[#e0d9d0] rounded" />
            <div className="h-5 w-32 bg-[#e0d9d0] rounded" />
            <div className="h-3 w-full bg-[#e0d9d0] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ShowroomsSection() {
  const { data, isLoading } = useGetActiveShowroomsQuery();
  const showrooms = data?.items ?? [];

  return (
    <section className="bg-[#FAF8F5] py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="font-sans text-[10px] text-[#745a27] tracking-[0.35em] uppercase mb-4">
            VISIT US
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-[#1e1b15] leading-tight">
            Our Showrooms
          </h2>
        </div>
        <Link
          href="/contact"
          className="font-sans text-[11px] text-[#745a27] tracking-widest uppercase border-b border-[#745a27]/50 pb-1 hover:opacity-70 transition-opacity whitespace-nowrap self-end"
        >
          Book a Visit →
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <Skeleton />
        ) : showrooms.length === 0 ? (
          <FallbackShowrooms />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {showrooms.map((s) => (
              <ShowroomCard key={s.id} showroom={s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ShowroomCard({ showroom }: { showroom: Showroom }) {
  const whatsapp = showroom.whatsappNumber
    ? `https://wa.me/${showroom.whatsappNumber.replace(/\D/g, "")}`
    : null;

  return (
    <div className="group bg-white rounded-sm overflow-hidden border border-[#E8E0D5] hover:border-[#C9A96E]/40 transition-colors duration-300">
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE7DF]">
        {showroom.coverImageUrl ? (
          <img
            src={showroom.coverImageUrl}
            alt={showroom.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#EDE7DF] to-[#E0D9D0] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#C9A96E] text-5xl">store</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410]/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="font-sans text-[9px] text-white/70 tracking-[0.25em] uppercase">
            {showroom.city}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-serif italic text-xl text-[#1e1b15] mb-2 group-hover:text-[#745a27] transition-colors">
          {showroom.name}
        </h3>
        <p className="font-sans text-[12px] text-[#8B7D72] leading-relaxed mb-5">
          {showroom.address}
        </p>

        {showroom.phoneNumbers.length > 0 && (
          <a
            href={`tel:${showroom.phoneNumbers[0]}`}
            className="flex items-center gap-2 font-sans text-[11px] text-[#2C2420] hover:text-[#745a27] transition-colors mb-4"
          >
            <span className="material-symbols-outlined text-[14px] text-[#C9A96E]">call</span>
            {showroom.phoneNumbers[0]}
          </a>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-[#E8E0D5]">
          <a
            href={mapsUrl(showroom)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-sans text-[10px] text-[#745a27] tracking-widest uppercase border border-[#745a27]/30 hover:border-[#745a27] py-2 transition-colors"
          >
            Get Directions
          </a>
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-sans text-[10px] text-white tracking-widest uppercase bg-[#C9A96E] hover:bg-[#b8955c] py-2 transition-colors"
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function FallbackShowrooms() {
  const fallback = [
    { city: "Port Harcourt", name: "Garden City Mall", address: "Garden City Mall, Rumuomasi, Port Harcourt", maps: "https://maps.app.goo.gl/PYdbwmzd5M3tso1b9" },
    { city: "Port Harcourt", name: "J's Signature Hotel", address: "J's Signature Hotel, GRA, Port Harcourt", maps: "https://maps.app.goo.gl/HTktm8CqeY968fDs8" },
    { city: "Lagos", name: "Lagos Showroom", address: "Victoria Island, Lagos", maps: "https://maps.app.goo.gl/CvM6djcerwz46hXt5" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {fallback.map((s) => (
        <div key={s.name} className="bg-white rounded-sm overflow-hidden border border-[#E8E0D5]">
          <div className="aspect-[4/3] bg-gradient-to-br from-[#EDE7DF] to-[#E0D9D0] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#C9A96E] text-5xl">store</span>
          </div>
          <div className="p-6">
            <span className="font-sans text-[9px] text-[#C9A96E] tracking-widest uppercase">{s.city}</span>
            <h3 className="font-serif italic text-xl text-[#1e1b15] mt-1 mb-2">{s.name}</h3>
            <p className="font-sans text-[12px] text-[#8B7D72] mb-5">{s.address}</p>
            <a href={s.maps} target="_blank" rel="noopener noreferrer"
              className="block text-center font-sans text-[10px] text-[#745a27] tracking-widest uppercase border border-[#745a27]/30 hover:border-[#745a27] py-2 transition-colors">
              Get Directions
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
