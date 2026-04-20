"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <>
      {/* Footer: Luxury Blanca */}
      <footer className="bg-[#1A1410] text-[#fff8f1] font-sans pt-16 pb-8 px-8 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* TOP ROW */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="BLANCA LUXURY"
                width={160}
                height={50}
                className="h-10 md:h-12 w-auto object-contain brightness-110"
              />
            </div>
            <div className="flex space-x-8">
              <a
                className="text-[11px] text-[#8B7D72] font-medium uppercase tracking-widest hover:text-[#C9A96E] transition-colors duration-300"
                href="#"
              >
                Instagram
              </a>
              <a
                className="text-[11px] text-[#8B7D72] font-medium uppercase tracking-widest hover:text-[#C9A96E] transition-colors duration-300"
                href="#"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-[1px] w-full bg-[#2E2820] mb-16"></div>

          {/* MIDDLE ROW (Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-20">
            {/* Col 1: COMPANY */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold text-[#C9A96E] tracking-[0.25em] uppercase">
                COMPANY
              </h4>
              <nav className="flex flex-col space-y-4">
                <Link
                  className="text-[13px] text-[#8B7D72] hover:text-[#C9A96E] transition-colors duration-300"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="text-[13px] text-[#8B7D72] hover:text-[#C9A96E] transition-colors duration-300"
                  href="/collections"
                >
                  Collections
                </Link>
                <Link
                  className="text-[13px] text-[#8B7D72] hover:text-[#C9A96E] transition-colors duration-300"
                  href="/about"
                >
                  About Us
                </Link>
                <Link
                  className="text-[13px] text-[#8B7D72] hover:text-[#C9A96E] transition-colors duration-300"
                  href="/contact"
                >
                  Contact
                </Link>
              </nav>
            </div>
            {/* Col 2: SERVICES */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold text-[#C9A96E] tracking-[0.25em] uppercase">
                SERVICES
              </h4>
               <nav className="flex flex-col space-y-4">
                <Link
                  className="text-[13px] text-[#8B7D72] hover:text-[#C9A96E] transition-colors duration-300"
                  href="/collections"
                >
                  Home Furniture
                </Link>
                <Link
                  className="text-[13px] text-[#8B7D72] hover:text-[#C9A96E] transition-colors duration-300"
                  href="/collections"
                >
                  Office Furniture
                </Link>
                <Link
                  className="text-[13px] text-[#8B7D72] hover:text-[#C9A96E] transition-colors duration-300"
                  href="/collections"
                >
                  Decor
                </Link>
                <Link
                  className="text-[13px] text-[#8B7D72] hover:text-[#C9A96E] transition-colors duration-300"
                  href="/services/interior-design"
                >
                  Interior Design
                </Link>
              </nav>
            </div>
            {/* Col 3: SHOWROOMS */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold text-[#C9A96E] tracking-[0.25em] uppercase">
                SHOWROOMS
              </h4>
              <div className="flex flex-col space-y-5">
                <div>
                  <p className="text-[11px] text-[#C9A96E] uppercase tracking-widest mb-1">Port Harcourt</p>
                  <p className="text-[12px] text-[#8B7D72]">Garden City Mall, Rumuomasi</p>
                  <p className="text-[12px] text-[#8B7D72]">J&apos;s Signature Hotel, GRA</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#C9A96E] uppercase tracking-widest mb-1">Lagos</p>
                  <p className="text-[12px] text-[#8B7D72]">11A Bishop Abayode Cole VI</p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    className="text-[12px] text-[#8B7D72] hover:text-[#C9A96E] transition-colors duration-300"
                    href="tel:+2348139910974"
                  >
                    +234 813 991 0974
                  </a>
                  <a
                    className="text-[12px] text-[#8B7D72] hover:text-[#C9A96E] transition-colors duration-300"
                    href="mailto:blancaluxurydecor@gmail.com"
                  >
                    blancaluxurydecor@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="pt-8 border-t border-[#2E2820] text-center">
            <p className="text-[11px] text-[#8B7D72] tracking-widest font-light">
              © 2025 Blanca Luxury Limited · Port Harcourt · Lagos · Crafted
              with care.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING ELEMENT: WhatsApp */}
      <div className="fixed bottom-10 right-10 z-[70]">
        <a
          className="w-[52px] h-[52px] bg-black rounded-full flex items-center justify-center border border-[#C9A96E]/40 whatsapp-pulse transition-transform hover:scale-110 group"
          href="https://wa.me/2348139910974"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            className="w-6 h-6 text-[#25D366] fill-current group-hover:text-[#C9A96E] transition-colors duration-300"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
          </svg>
        </a>
      </div>
    </>
  );
}
