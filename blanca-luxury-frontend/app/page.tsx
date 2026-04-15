import React from "react";
import { ScrollReveal } from "../components/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* Full-Screen Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-stone-900">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            alt="Luxury Living Room"
            className="w-full h-full object-cover object-center"
            data-alt="warmly lit luxury living room featuring a cognac leather sofa, walnut wood panels, and soft afternoon light filtering through large windows"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7xW9KRFeOpaeo8dsrz9VTYjRcz7HQsyAbBCCVIfzJN_xsoPkYqBUeRu_nht7QHTgV0eMGPadV37OaucI9s_jda856Urp-Or7thTKxPxkTne5xtBn-JfbbxI2Zh4OFTaWcfvCrd3TJcJHq34YuUl827SzVJFB5lLvbP1e4dh2fExJMQyoJClWNMaY_wqLy6rb08zNiFgXlKBJ7JvmWDHix4L0O4N9ljvwwkBXTu42k7TqNE_Gp59hgYq8Wfzf40yGeRnzpAtbd5lz8"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        {/* Content Container */}
        <div className="relative h-full w-full max-w-screen-2xl mx-auto px-8 md:px-12 flex flex-col justify-end pb-24 md:pb-32">
          <ScrollReveal y={30} delay={0}>
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <p className="font-sans text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-primary-container mb-4 text-glow-premium">
                PORT HARCOURT · LAGOS · ABUJA
              </p>
              {/* Headline */}
              <h1 className="font-serif text-5xl md:text-[72px] italic text-white leading-[1.05] mb-6 tracking-tight">
                Spaces That Tell Your Story
              </h1>
              {/* Subheadline */}
              <p className="font-sans text-[15px] text-white/60 max-w-lg mb-10 leading-relaxed">
                From private residences and corporate offices to hotels,
                hospitals, and government estates. We transform every space into
                a curated sanctuary, sourced from Italy and Turkey.
              </p>
              {/* Buttons */}
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  className="px-8 py-4 rounded-full border border-white text-white font-sans text-xs uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all duration-500 active:scale-95"
                  href="#"
                >
                  Explore Collections
                </a>
                <a
                  className="px-8 py-4 rounded-full bg-[#1A1410] text-primary-container font-sans text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all duration-500 shadow-xl active:scale-95"
                  href="#"
                >
                  Book Consultation
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </ScrollReveal>
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 right-8 md:right-12 flex flex-col items-center gap-4">
            <span className="text-vertical font-sans text-[10px] uppercase tracking-widest text-white/40">
              SCROLL
            </span>
            <div className="custom-underline"></div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker Strip */}
      <div className="w-full h-[48px] bg-[#1A1410] overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Set 1 */}
          <div className="flex items-center space-x-8 px-4">
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              FURNITURE
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              DECOR
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              DRAPERY
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              FRAGRANCES
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              SPACE MANAGEMENT
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              WORLDWIDE DELIVERY
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              HANDCRAFTED CUSTOMIZATION
            </span>
            <span className="text-white/40 text-[11px]">·</span>
          </div>
          {/* Set 2 (Duplicate for seamless loop) */}
          <div className="flex items-center space-x-8 px-4">
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              FURNITURE
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              DECOR
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              DRAPERY
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              FRAGRANCES
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              SPACE MANAGEMENT
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              WORLDWIDE DELIVERY
            </span>
            <span className="text-white/40 text-[11px]">·</span>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C9A96E] font-medium uppercase">
              HANDCRAFTED CUSTOMIZATION
            </span>
            <span className="text-white/40 text-[11px]">·</span>
          </div>
        </div>
      </div>

      <main className="relative min-h-screen">
        {/* Showcase Section */}
        <section className="py-20 px-6 md:px-12 bg-[#FAF8F5]">
          {/* Section Header */}
          <ScrollReveal delay={0} y={20}>
            <div className="text-center mb-16 space-y-4">
              <p className="font-sans text-[10px] text-[#C9A96E] tracking-[0.3em] uppercase">
                WHAT WE OFFER
              </p>
              <h2 className="font-serif italic text-5xl md:text-6xl text-[#2C2420] font-light">
                Our World
              </h2>
            </div>
          </ScrollReveal>
          {/* 2x2 Bento Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Furniture */}
            <div className="category-card relative aspect-[3/4] overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center category-image transition-transform duration-700 ease-out"
                data-alt="luxury modern minimalist living room with warm sunlight hitting a velvet curved sofa and architectural marble coffee table"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDhXgXdK1l--i5ibdECqps4d1531Mesv3aakyLdbx6eVCDJ0EiytnNMzFQza0fm0jUH07d7Ix3KSVGFcZbkQ0DQwkJydH7L2W32qdx34saBmk52z5vWcDz_8qZHy4TJqct9DPhrEIJHPbHxDE7neau12Wot_YWR5b5v31vGNaqbopQhXLPhsUMEa7TuiiTvXprsBDn-AbIbSRettucX2oTtCJiytw9_otJgVZKlNP8upJ2o_R70ML31dxIPwq_2Uy1L08Agw89B-YAK')",
                }}
              ></div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
                <h3 className="font-serif italic text-3xl text-white">
                  Furniture
                </h3>
                <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center text-white arrow-icon transition-transform duration-300">
                  <span
                    className="material-symbols-outlined text-xl"
                    data-icon="north_east"
                  >
                    north_east
                  </span>
                </div>
              </div>
            </div>
            {/* Card 2: Decor & Accessories */}
            <div className="category-card relative aspect-[3/4] overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center category-image transition-transform duration-700 ease-out"
                data-alt="styled aesthetic shelf with minimalist ceramic vases and bronze sculptural objects in soft natural light"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMsvil9C-tHV87AuYvb7Np_NTeKhObwigOd-4Pd1IARACO8EsSjfLNEIgFnyMOFSDRm7aayvKtjyj0bly06IkHdNPhveChUIzWNCuUdwtpdBdLazE2rR-E5Ek97hmnDHpJtb9j0kWwCnXAjQw67Px7mL38Qa0v3KPE3C95ovZC4Ac6MlZPCy-JlacdRkRiOTJYmf-0DqLCkoMI-sRZ36AqpXjpZ3KpAzfeMbX19zwliImOqiAypSaCUjnnxib2sdCIzj7D8CEKLxbp')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
                <h3 className="font-serif italic text-3xl text-white">
                  Decor & Accessories
                </h3>
                <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center text-white arrow-icon transition-transform duration-300">
                  <span
                    className="material-symbols-outlined text-xl"
                    data-icon="north_east"
                  >
                    north_east
                  </span>
                </div>
              </div>
            </div>
            {/* Card 3: Drapery & Curtains */}
            <div className="category-card relative aspect-[3/4] overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center category-image transition-transform duration-700 ease-out"
                data-alt="ethereal sheer white linen curtains billowing in soft breeze with golden hour light pouring through a window"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDONyMOr0NSMSQuc8vZiV7UK4sYRqK2z8YNwEM_h_mfu2k4hr2lfFqkNj1nakYZJBNvNVgnGw0hd2mHD34Yu6gOXbkrpm4HRajpON5DInRQRas0W4bsFhBcWUaae3_6qjUy5mzdUpQtI6SF_ha6ZNYTaQd5gzyJikpyXG5z_78nxXQQ3hBsKSUndQ3KDuGuYzhiZ2okf0YPLDgSGEcQvS7C0Rt4N9yq7ghyPTqe95abduLF7lfL960VLrDpe4ufk-I-2fPL-EV_SmjL')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
                <h3 className="font-serif italic text-3xl text-white">
                  Drapery & Curtains
                </h3>
                <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center text-white arrow-icon transition-transform duration-300">
                  <span
                    className="material-symbols-outlined text-xl"
                    data-icon="north_east"
                  >
                    north_east
                  </span>
                </div>
              </div>
            </div>
            {/* Card 4: Fragrances & Candles */}
            <div className="category-card relative aspect-[3/4] overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center category-image transition-transform duration-700 ease-out"
                data-alt="moody dark close-up of luxury scented candles in black glass and amber perfume bottles on dark stone surface"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCf9YXdAd0x7zC2a6HWP9wb5DeK77PWX20104RMPSMjRLdNgQjYOy3Dh77GYDMFu42Mdy0TNT74OF3Vwxt36_M4mYCUg2sXSL04PmWGK47BoCdaIKzh7Maik0bx8j_-ezMFonjhIad3s89MztV7YnWixOn55e7QQzWYkOiYYevz60silGCpx7vnJCAoXqhfn1mqSe32nTI6SSfbqBTkL2wwJBB4g1ta1YUbNqhWXaDP6iXakmyYCTPZWZxK6vhgk1te_OO3lzTjBAM-')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
                <h3 className="font-serif italic text-3xl text-white">
                  Fragrances & Candles
                </h3>
                <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center text-white arrow-icon transition-transform duration-300">
                  <span
                    className="material-symbols-outlined text-xl"
                    data-icon="north_east"
                  >
                    north_east
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics / Trust Signal Bar */}
        <section className="bg-[#F0EBE3] py-16 md:py-24 border-y border-outline-variant/10">
          <div className="max-w-screen-2xl mx-auto px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-y-0">
              {/* Stat 1 */}
              <ScrollReveal delay={0} className="w-full">
                <div className="flex flex-col items-center lg:items-start lg:px-4 text-center lg:text-left relative group">
                  <div className="font-serif text-[52px] leading-none text-[#C9A96E] mb-4">
                    8+
                  </div>
                  <div className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#8B7D72] uppercase">
                    Notable Government Commissions
                  </div>
                  {/* Desktop Divider */}
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[#E8E0D5]"></div>
                </div>
              </ScrollReveal>
              {/* Stat 2 */}
              <ScrollReveal delay={100} className="w-full">
                <div className="flex flex-col items-center lg:items-start lg:px-12 text-center lg:text-left relative">
                  <div className="font-serif text-[52px] leading-none text-[#C9A96E] mb-4">
                    3
                  </div>
                  <div className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#8B7D72] uppercase">
                    Cities — PH · Lagos · Abuja
                  </div>
                  {/* Desktop Divider */}
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[#E8E0D5]"></div>
                </div>
              </ScrollReveal>
              {/* Stat 3 */}
              <ScrollReveal delay={200} className="w-full overflow-hidden">
                <div className="flex flex-col items-center lg:items-start lg:px-8 text-center lg:text-left relative overflow-hidden">
                  <div className="font-serif text-[30px] md:text-[34px] leading-tight text-[#C9A96E] mb-4">
                    Italy &amp; Turkey
                  </div>
                  <div className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#8B7D72] uppercase">
                    2 Countries Sourced
                  </div>
                  {/* Desktop Divider */}
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[#E8E0D5]"></div>
                </div>
              </ScrollReveal>
              {/* Stat 4 */}
              <ScrollReveal delay={300} className="w-full">
                <div className="flex flex-col items-center lg:items-start lg:px-12 text-center lg:text-left">
                  <div className="font-serif text-[52px] leading-none text-[#C9A96E] mb-4">
                    15+
                  </div>
                  <div className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#8B7D72] uppercase">
                    Years of Excellence
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Trusted By — Prestige Logos Strip */}
        <section className="bg-[#1A1410] py-14 border-y border-[#C9A96E]/10 overflow-hidden">
          <ScrollReveal delay={0} y={10}>
            <p className="text-center font-sans text-[10px] uppercase tracking-[0.35em] text-[#C9A96E]/60 mb-10">
              Trusted by Nigeria&apos;s Most Distinguished Addresses
            </p>
          </ScrollReveal>
          {/* Scrolling marquee of client names */}
          <div className="relative flex overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee gap-0">
              {/* Set 1 */}
              {[
                "Rivers State Government",
                "Julius Berger Nigeria",
                "Gov. Seyi Makinde",
                "Dr. Peter Odili",
                "19 Residence Quarters — Abuja",
                "Rivers State Government",
                "Julius Berger Nigeria",
                "Gov. Seyi Makinde",
                "Dr. Peter Odili",
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
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#1A1410] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#1A1410] to-transparent z-10" />
          </div>
        </section>

        {/* Featured Collection Section */}
        <section className="flex flex-col">
          {/* ROW 1: Lagos Edit */}
          <ScrollReveal delay={0}>
            <div className="flex flex-col md:flex-row w-full min-h-[870px] overflow-hidden">
              {/* Left 55%: Image */}
              <div className="w-full md:w-[55%] relative group">
                <img
                  alt="Lagos Interior"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                  data-alt="luxury high-end apartment interior in Lagos with warm sunset light hitting artisanal wooden furniture and textured neutral walls"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMTOw9NPa_wiwAm-9O5znGmR4WOkEN1n1wL_qgsVVOhg8IVQZ-kGJfDrGDPLIizMoyPjoaVK7PKtRfqc8rHaDQ0FkLYU0DZXUXE8G1fAIu9ur7tUV39EcF7zGweHRScYV2kqX9Vqy280oluoqf-2SIj1rPqr7wnvMXTdJjgO4mmqh5DY7OaJU9yKrpSSWNO4ITwSAjYnixA_grTvDP18yiT0uoDGRa4qh7f1pTRsHSaChf6H2UOz1E-yGc9p0kIPSUU-zIwT6m2xzC"
                />
              </div>
              {/* Right 45%: Content */}
              <div className="w-full md:w-[45%] bg-[#FAF8F5] flex flex-col justify-center px-12 md:px-24 py-20 relative">
                <div className="max-w-md">
                  <span className="inline-block border border-[#C9A96E] text-[#C9A96E] px-4 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-8">
                    NEW ARRIVAL
                  </span>
                  <h2 className="font-serif italic text-5xl md:text-[52px] leading-tight text-[#2C2420] mb-2">
                    The Lagos Edit
                  </h2>
                  <span className="block font-sans text-[13px] text-[#8B7D72] tracking-widest mb-10">
                    2025
                  </span>
                  <p className="font-sans text-base leading-relaxed text-[#2C2420] opacity-90 mb-12 max-w-sm">
                    Curated for the Victoria Island home — where modern elegance
                    meets West African warmth. Sourced from Milano, crafted for
                    Lagos.
                  </p>
                  <a
                    className="inline-flex items-center group font-sans text-sm font-medium text-[#C9A96E] border-b border-[#C9A96E] pb-1 hover:opacity-70 transition-opacity"
                    href="https://wa.me/aurelian"
                  >
                    Inquire on WhatsApp{" "}
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
          {/* Row Divider */}
          <div className="h-[2px] w-full bg-[#C9A96E]"></div>
          {/* ROW 2: PH Collection — FLIPPED */}
          <ScrollReveal delay={100}>
            <div className="flex flex-col-reverse md:flex-row w-full min-h-[870px] overflow-hidden">
              {/* Left 45%: Content */}
              <div className="w-full md:w-[45%] bg-[#FAF8F5] flex flex-col justify-center px-12 md:px-24 py-20 relative">
                <div className="max-w-md">
                  <span className="inline-block border border-[#C9A96E] text-[#C9A96E] px-4 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-8">
                    COLLECTION
                  </span>
                  <h2 className="font-serif italic text-5xl md:text-[52px] leading-tight text-[#2C2420] mb-2">
                    The Garden City Suite
                  </h2>
                  <span className="block font-sans text-[13px] text-[#8B7D72] tracking-widest mb-10">
                    2025
                  </span>
                  <p className="font-sans text-base leading-relaxed text-[#2C2420] opacity-90 mb-12 max-w-sm">
                    An homage to Port Harcourt&apos;s refined heritage.
                    Sculptural forms meet artisanal woodcraft, bringing a
                    timeless serenity to the urban sanctuary.
                  </p>
                  <a
                    className="inline-flex items-center group font-sans text-sm font-medium text-[#C9A96E] border-b border-[#C9A96E] pb-1 hover:opacity-70 transition-opacity"
                    href="https://wa.me/aurelian"
                  >
                    Inquire on WhatsApp{" "}
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>
              {/* Right 55%: Image */}
              <div className="w-full md:w-[55%] relative group">
                <img
                  alt="Port Harcourt Showroom"
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000"
                  data-alt="Modern architectural furniture showroom in Port Harcourt with natural stone elements sculptural wood pieces and soft diffused lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKOgyaqVOC3C3KHCUOdjVdKdTNU2boSBhA8JizrchP3jAPaEXTiDogMMAKUM5HWs5UdOxfQHw1YmunNwvYBjsQK6Q6k71O-J84FaVMN859tYZ6AH0kEt6SOLr8t8RMED75u94ZowR1QQx94WDrw1vXxsSJw1eIAQWEfFYszwkJVmonw-WDiJOsvpyeGQFqVy4aka6IzIQyxEBBB8Yh0-Qt10kyAtPAIzBBqCiO3n-d7h7ay5jMuxG7JrfnG_FkMD4tFn-GIiENJO3l"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Services / What We Do Section */}
        <section className="bg-[#1A1410] pt-32 pb-32">
          <ScrollReveal delay={0} y={20}>
            <div className="max-w-screen-xl mx-auto text-center mb-24 px-8">
              <span className="font-sans text-[10px] text-[#C9A96E] tracking-[0.3em] block mb-4 uppercase">
                OUR EXPERTISE
              </span>
              <h2 className="font-serif italic text-[56px] leading-tight font-light text-white">
                What We Do
              </h2>
            </div>
          </ScrollReveal>

          {/* 7-Column Grid Desktop Layout (Scrollable on Mobile) */}
          <div className="max-w-screen-2xl mx-auto px-8 flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-7 gap-4 lg:gap-6 pb-8 snap-x snap-mandatory hide-scrollbars">
            {/* Service Card 1 */}
            <ScrollReveal delay={0} className="min-w-[280px] snap-center">
              <div className="group bg-[#242018] border-t-2 border-[#C9A96E]/30 p-8 flex flex-col h-[320px] transition-all duration-500 hover:bg-[#2E2820] hover:border-[#C9A96E]">
                <div className="mb-12">
                  <span className="material-symbols-outlined text-[#C9A96E] text-[24px]">
                    grid_view
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-sans text-[13px] text-white tracking-widest uppercase mb-4">
                    Interior Architecture
                  </h3>
                  <p className="font-sans text-[12px] text-[#8B7D72] truncate">
                    Structural precision meets artistic vision.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            {/* Service Card 2 */}
            <ScrollReveal delay={100} className="min-w-[280px] snap-center">
              <div className="group bg-[#242018] border-t-2 border-[#C9A96E]/30 p-8 flex flex-col h-[320px] transition-all duration-500 hover:bg-[#2E2820] hover:border-[#C9A96E]">
                <div className="mb-12">
                  <span className="material-symbols-outlined text-[#C9A96E] text-[24px]">
                    dashboard
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-sans text-[13px] text-white tracking-widest uppercase mb-4">
                    Space Management
                  </h3>
                  <p className="font-sans text-[12px] text-[#8B7D72] truncate">
                    Optimizing movement through curated flow.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            {/* Service Card 3 */}
            <ScrollReveal delay={200} className="min-w-[280px] snap-center">
              <div className="group bg-[#242018] border-t-2 border-[#C9A96E]/30 p-8 flex flex-col h-[320px] transition-all duration-500 hover:bg-[#2E2820] hover:border-[#C9A96E]">
                <div className="mb-12">
                  <span className="material-symbols-outlined text-[#C9A96E] text-[24px]">
                    build
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-sans text-[13px] text-white tracking-widest uppercase mb-4">
                    Furniture Customization
                  </h3>
                  <p className="font-sans text-[12px] text-[#8B7D72] truncate">
                    Bespoke pieces crafted for your sanctuary.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            {/* Service Card 4 */}
            <ScrollReveal delay={300} className="min-w-[280px] snap-center">
              <div className="group bg-[#242018] border-t-2 border-[#C9A96E]/30 p-8 flex flex-col h-[320px] transition-all duration-500 hover:bg-[#2E2820] hover:border-[#C9A96E]">
                <div className="mb-12">
                  <span className="material-symbols-outlined text-[#C9A96E] text-[24px]">
                    curtains
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-sans text-[13px] text-white tracking-widest uppercase mb-4">
                    Drapery & Blinds
                  </h3>
                  <p className="font-sans text-[12px] text-[#8B7D72] truncate">
                    Refining natural light through textiles.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            {/* Service Card 5 */}
            <ScrollReveal delay={400} className="min-w-[280px] snap-center">
              <div className="group bg-[#242018] border-t-2 border-[#C9A96E]/30 p-8 flex flex-col h-[320px] transition-all duration-500 hover:bg-[#2E2820] hover:border-[#C9A96E]">
                <div className="mb-12">
                  <span className="material-symbols-outlined text-[#C9A96E] text-[24px]">
                    public
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-sans text-[13px] text-white tracking-widest uppercase mb-4">
                    Worldwide Delivery
                  </h3>
                  <p className="font-sans text-[12px] text-[#8B7D72] truncate">
                    Global logistics for a borderless home.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            {/* Service Card 6 */}
            <ScrollReveal delay={500} className="min-w-[280px] snap-center">
              <div className="group bg-[#242018] border-t-2 border-[#C9A96E]/30 p-8 flex flex-col h-[320px] transition-all duration-500 hover:bg-[#2E2820] hover:border-[#C9A96E]">
                <div className="mb-12">
                  <span className="material-symbols-outlined text-[#C9A96E] text-[24px]">
                    local_hospital
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-sans text-[13px] text-white tracking-widest uppercase mb-4">
                    Commercial &amp; Medical
                  </h3>
                  <p className="font-sans text-[12px] text-[#8B7D72] truncate">
                    Clinics, cancer centers &amp; offices, elevated.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            {/* Service Card 7 */}
            <ScrollReveal delay={600} className="min-w-[280px] snap-center">
              <div className="group bg-[#242018] border-t-2 border-[#C9A96E]/30 p-8 flex flex-col h-[320px] transition-all duration-500 hover:bg-[#2E2820] hover:border-[#C9A96E]">
                <div className="mb-12">
                  <span className="material-symbols-outlined text-[#C9A96E] text-[24px]">
                    hotel
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-sans text-[13px] text-white tracking-widest uppercase mb-4">
                    Hospitality Interiors
                  </h3>
                  <p className="font-sans text-[12px] text-[#8B7D72] truncate">
                    Hotels &amp; suites dressed for distinction.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Decorative Image Section (Asymmetric Grid) */}
          <div className="max-w-screen-2xl mx-auto mt-32 grid grid-cols-12 gap-8 items-center px-8">
            <div className="col-span-12 lg:col-span-7 overflow-hidden rounded-lg bg-[#2C2420]">
              <img
                alt="Minimalist luxury interior with dark wood and gold accents"
                className="w-full h-[600px] object-cover opacity-80 hover:scale-105 transition-transform duration-1000"
                data-alt="luxury minimalist living room with deep espresso wood panelling gold sculptural lighting and soft warm ambient glow"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCChZyz2Bb2HcfbubDXs49tNy-ofPawj15e5m0lyI-rJeHcbYzL-zFQLoeiPxYmcByLWfs0MyHIiOMnYzdpgo5jZcdrN18nYD4u6bMcthUSJt5f2Di91pyzUus08WfriRSkvAZX18F3u0TfIy7pQnYq9s2i37jjdRCydJP8Y3WAZ7CGiJvHPYtWliaR9Zf6g7t5HaW0kJgy1CXtdENGc-0WTDyFfKY8Ea2hS5gtlMrCqYinWV7u-zUmvcmenvf100cpTXqVeLPk11RL"
              />
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-8">
              <span className="font-sans text-[10px] text-[#C9A96E] tracking-[0.3em] block uppercase">
                THE PROCESS
              </span>
              <h2 className="font-serif italic text-[42px] leading-tight text-white">
                Refined Execution
              </h2>
              <p className="font-sans text-[#8B7D72] leading-relaxed text-[16px] font-light">
                Every project at Blanca Luxury begins with a study of light and
                void. We believe that true luxury is the quiet confidence of a
                space that serves both function and soul.
              </p>
              <div className="pt-8">
                <button className="font-sans font-bold text-[11px] text-white tracking-[0.3em] uppercase border-b border-[#C9A96E] pb-2 hover:opacity-70 transition-opacity">
                  Inquire About Services
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Lookbook / Gallery Section */}
        <section className="bg-[#FAF8F5] pt-32 pb-24 px-12 relative w-full overflow-hidden">
          <div className="max-w-[1440px] mx-auto">
            {/* Header Section: Asymmetric & Editorial */}
            <header className="relative mb-24 flex flex-col items-start z-10">
              <ScrollReveal delay={0} y={30}>
                <h1 className="font-serif italic text-[120px] md:text-[180px] leading-none text-[#2C2420]/5 absolute -top-16 -left-4 pointer-events-none z-0">
                  The Look
                </h1>
                <div className="relative z-10 mt-20 ml-4 md:ml-12">
                  <h2 className="font-serif text-5xl md:text-6xl text-[#2C2420] tracking-tight mb-4">
                    The Look
                  </h2>
                  <p className="font-sans text-[13px] text-[#8B7D72] tracking-[0.05em]">
                    Draw inspiration from our curated spaces.
                  </p>
                </div>
              </ScrollReveal>
            </header>

            {/* Gallery Grid: Masonry-style Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Column 1 */}
              <ScrollReveal delay={0} className="flex flex-col gap-8">
                {/* Cell 1 */}
                <div className="group relative overflow-hidden rounded-[4px] cursor-pointer">
                  <img
                    className="w-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                    data-alt="Minimalist luxury living room with cream boucle sofa, soft natural light through linen drapes, and an architectural marble coffee table"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnHu_BYEHJI7HkB7izt6GnhcTZByuefaBfH-gCeqSjACFvDxIYP5Avn2JsHuzyOnPC2HwFRwaP3zMGOPBeFI2AChVgv5SLMaByuxfFDmSj38E12uy9fPH_amisxOxjDn45141Ba0kaHpnXWtpHMMmMv2xQ5UYActEf-pegAlRwMPbL5wNNC2NFNSGExiHEKQgfwBolYc2J-6OER3O9Noc4WjxkjYkUto6f6xo8YAdOMRco83zMQy22nB6YX-L6N-z6XzDTew3aV6uZ"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">
                        add
                      </span>
                    </div>
                  </div>
                </div>
                {/* Cell 2 */}
                <div className="group relative overflow-hidden rounded-[4px] cursor-pointer aspect-[3/4]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Close-up of high-end home fragrance bottle on a textured limestone surface with soft morning shadows"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0B1TB1mDtQPXcOkLWdK9w2q6qj9-yWAV9nak2Ey5ky9GybXgW64vJizVod9tQfkOKifK0UreCAnGvyj94IbQwPDZHv5GY2vMWepmlbpwaOoTP7hhNDg4GuZOXjDNoOwFM0vM2jCMTtFFP3oFDwLHuith0qlHf9UL_pH_ThXkdX_vU89Mox9eWe3EF6uBWDSy0szLNXkHBFDgdLX2wXrHrNlHu64DoqqRn1H3jxM28jvr_MQYO52l6GixR44mrfJxGrXs_wN9msF67"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">
                        add
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Column 2 */}
              <ScrollReveal
                delay={150}
                className="flex flex-col gap-8 mt-12 md:mt-24"
              >
                {/* Cell 3 */}
                <div className="group relative overflow-hidden rounded-[4px] cursor-pointer aspect-[4/5]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Detail of luxury heavy silk drapery in champagne gold flowing onto a dark oak hardwood floor in a sunlit room"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBND25uvH3P4MMDPWUn2fy_EMcZ6h8PJfGUth1j6yVx4MBtmt5c0k30mIE_oEl58K8B5Xv649arHEkb_A8laVk_BFWrx3RG2H9APTabWZWNe8BJhe5Gdai1eFlXQ8cTeSQ3oxsfs9ZrPao5q6TEPN6KnmItGwRlaAvVmJQ8Cro1sG6rdndoGBw2kAr1AoVJYRqYx7rtV2f7fxdUqvFEJgt-Ggdi2OlU8lchUGyz_hxiuYSaef5oJ9jSko8yOURNJ241F1VrpIHbVPF2"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">
                        add
                      </span>
                    </div>
                  </div>
                </div>
                {/* Cell 4 */}
                <div className="group relative overflow-hidden rounded-[4px] cursor-pointer">
                  <img
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Modern minimalist dining space with an organic wooden table, sculptural lighting fixture, and floor-to-ceiling windows"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPNexbfV3QUT_gILTxv_yRN6j1toBaBHo9Hbf5PFkezEqxgVKRcleeIVMRzQtGqkAxKaz8GC60iptPmRk4iWiajerLePLcL2QuLFLe1f8i6HCp1NtKZs7_HhV5RgmYfRNe9EOOQEA7Um3cDGoxX2DRydpfeSJ8imj0e1-tGJU0eI-tXGkbaAaJBk_9qHdOGbqGoBFWYrnQQPglAyvkEG9T-L1OFLwEW9dNI85UJMfPg9cDLWeL6-jR4LJra2OnX2CCmZHwWcW8EOIy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">
                        add
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Column 3 */}
              <ScrollReveal delay={300} className="flex flex-col gap-8">
                {/* Cell 5 */}
                <div className="group relative overflow-hidden rounded-[4px] cursor-pointer aspect-square">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Artistic close-up of a velvet armchair texture in deep taupe with a golden afternoon light beam highlighting the fabric"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxoF1xjAMV_ZEB2J0NJjNH0NtYb-gVRWyBI2jQrBZeedngFIWwhMbxSfoOOlVU85zE60VphCQ6g37sGUH9f-zGPJj5RXcnJhQ7uyT6QVSsHwL2sNR85j5a7dQYUZ3N170VAX13xKeNBvRtKZIcn-Fxnp43p55b30g89nhJ2ownzcuqyMMrlrvprNmb3mldrjAadB7R0P7BR1hO1SGfzGRw5YeLP2tt09WSsWYHLJ_7KJyqsBmiLNzt_BlG-lszgtofm39PwOtzmhJG"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">
                        add
                      </span>
                    </div>
                  </div>
                </div>
                {/* Cell 6 */}
                <div className="group relative overflow-hidden rounded-[4px] cursor-pointer aspect-[2/3]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="A curated bedroom corner with layered linen bedding, a ceramic vase with dried grass, and a minimalist brass wall sconce"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh7nhitWUownGkyR5EuXe4PDgoRtdy99lz6EcElwKp79jBQf1L1SjT0JQ8N4cVxf1UIJ5uTfc6nVTe3Sb56_kEPQ6NWxnKdRFebeU9QfS3Y25l6VNFWZ2bn-1RzQ5_SZylg2kFy7SV4qfn_ASaXmT63dZsJwgFGhJf3TlH0lU8aJmA2eGYjZeIjUqQZfQsrnk3QQSby8Ek3J2oTb9ta2WTj6dW0lB5--EGBW256u9MsBNzxgakVboYxKsYYtDB5XvQ3yTggZs7RfAC"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">
                        add
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Follow Link */}
            <div className="mt-24 flex justify-center">
              <a
                className="font-sans text-[12px] text-[#C9A96E] tracking-[0.15em] font-medium hover:text-[#2C2420] transition-colors duration-300"
                href="#"
              >
                FOLLOW US @BLANCA_LUXURY ↗
              </a>
            </div>
          </div>
        </section>

        {/* Cinematic Call-to-Action Banner */}
        <section className="relative w-full min-h-[640px] md:min-h-[720px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Moody Architectural Tone */}
          <div className="absolute inset-0 z-0">
            <img
              alt="Luxury interior under construction"
              className="w-full h-full object-cover"
              data-alt="dramatic empty luxury room interior under construction with exposed concrete columns high ceilings and moody natural side lighting cast in deep shadows"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnen5cQ8r4WG9FYmlbThU68PEgl8RNc8XHqcwChUdsw4vd8X-E1503-Nvy_tqCnkLFPsbZ5P4dDEpGSvpm9Pw871du7a033sXegG4Jfq_VrmANaE1gZZ6CTww44N2tF-3WxC_v3TsQZVRWs4xCINIh1e2NYYp5q9BTuaBnTftxvUb30VUmAK7P8o8kLRn37qk_ZQtaIn1yLS1MRmrL2jPx6sxuZ32xqf3od6CPamYAgOLmb72bjM3BU3xNJFw9SQw5iNn2qMeAbU8b"
            />
            {/* 65% Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/65 to-stone-950/80"></div>
          </div>
          {/* Content Container */}
          <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center">
            {/* Gold Rule */}
            <div className="w-[40px] h-[1px] bg-[#C9A96E] mb-8"></div>
            {/* Headline */}
            <h2 className="font-serif italic text-5xl md:text-[72px] leading-tight mb-2 text-white text-shadow-sm">
              You Dream It.
            </h2>
            <h2 className="font-serif italic text-5xl md:text-[72px] leading-tight mb-8 text-[#C9A96E] text-shadow-sm">
              We Build It.
            </h2>
            {/* Body Text */}
            <p className="font-sans text-white/70 text-[15px] max-w-[480px] leading-relaxed mb-12">
              Our professional interior architects take you from concept to
              completion — fully personalized, entirely yours.
            </p>
            {/* CTA Button */}
            <button className="group relative flex items-center justify-center h-[48px] px-8 border border-[#C9A96E] text-[#C9A96E] font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#C9A96E] hover:text-black active:scale-95">
              Book a Free Consultation
            </button>
          </div>
          {/* Bottom Tonal Shift for Section Transition */}
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#F0EBE3] to-transparent"></div>
        </section>

        {/* Showrooms / Locations Section */}
        <section className="bg-[#F0EBE3] py-32">
          {/* Header */}
          <ScrollReveal delay={0} y={20}>
            <div className="flex flex-col items-center text-center px-6 mb-20">
              <span className="font-sans text-[10px] text-[#C9A96E] tracking-[0.3em] font-medium mb-4 uppercase">
                WHERE TO FIND US
              </span>
              <h2 className="font-serif italic text-5xl md:text-[52px] text-[#2C2420] leading-tight">
                Our Showrooms
              </h2>
            </div>
          </ScrollReveal>

          {/* Location Cards Grid */}
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* LAGOS CARD */}
              <ScrollReveal delay={0}>
                <div className="bg-white border border-[#E8E0D5] overflow-hidden group hover:shadow-xl transition-all duration-700">
                  <div className="bg-[#1A1410] py-3 px-8">
                    <span className="text-white font-sans text-[11px] tracking-[0.3em] uppercase">
                      LAGOS
                    </span>
                  </div>
                  <div className="p-10 relative">
                    {/* Location Icon */}
                    <div className="absolute top-8 right-10">
                      <span className="material-symbols-outlined text-[#C9A96E] text-4xl font-light">
                        location_on
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="font-serif text-2xl md:text-[18px] text-[#2C2420] leading-relaxed max-w-[280px]">
                        11A Bishop Aboyade Cole, Victoria Island
                      </p>
                      <div className="mt-8 space-y-1">
                        <p className="font-sans text-[13px] text-[#8B7D72] tracking-wide">
                          +234 1 234 5678
                        </p>
                      </div>
                      <div className="mt-12">
                        <a
                          className="inline-flex items-center group/link text-[#C9A96E] text-sm tracking-widest font-medium uppercase transition-all"
                          href="#"
                        >
                          <span className="border-b border-[#C9A96E]/40 pb-1">
                            Get Directions
                          </span>
                          <span className="material-symbols-outlined ml-2 text-[16px] transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                            north_east
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* PORT HARCOURT CARD */}
              <ScrollReveal delay={150}>
                <div className="bg-white border border-[#E8E0D5] overflow-hidden group hover:shadow-xl transition-all duration-700">
                  <div className="bg-[#1A1410] py-3 px-8">
                    <span className="text-white font-sans text-[11px] tracking-[0.3em] uppercase">
                      PORT HARCOURT
                    </span>
                  </div>
                  <div className="p-10 relative">
                    {/* Location Icon */}
                    <div className="absolute top-8 right-10">
                      <span className="material-symbols-outlined text-[#C9A96E] text-4xl font-light">
                        location_on
                      </span>
                    </div>
                    <div className="mt-4 flex flex-col space-y-6">
                      <div className="pb-6 border-b border-[#E8E0D5]">
                        <p className="font-serif text-[18px] text-[#2C2420]">
                          Garden City Mall
                        </p>
                      </div>
                      <div className="pb-6 border-b border-[#E8E0D5]">
                        <p className="font-serif text-[18px] text-[#2C2420]">
                          J&apos;s Signature Hotel GRA
                        </p>
                      </div>
                      <div className="">
                        <p className="font-serif text-[18px] text-[#2C2420]">
                          1 Ekani Chiolu Road
                        </p>
                      </div>
                      <div className="mt-4 space-y-1">
                        <p className="font-sans text-[13px] text-[#8B7D72] tracking-wide">
                          +234 1 234 5678
                        </p>
                      </div>
                      <div className="mt-6">
                        <a
                          className="inline-flex items-center group/link text-[#C9A96E] text-sm tracking-widest font-medium uppercase transition-all"
                          href="#"
                        >
                          <span className="border-b border-[#C9A96E]/40 pb-1">
                            Get Directions
                          </span>
                          <span className="material-symbols-outlined ml-2 text-[16px] transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                            north_east
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Decorative Showroom Full Image */}
        <section className="w-full h-[600px] overflow-hidden">
          <img
            alt="Luxury showroom interior"
            className="w-full h-full object-cover"
            data-alt="Minimalist luxury interior showroom with high ceilings, warm soft lighting, marble floors, and elegant neutral furniture in a vast open space"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh_DAFCxESPaiS0CEzcQVL3WSfy_EiSyFRB1DPhZTni3L9WweINMF5WhJ6Qig59PkqZEhvxBA0EUP9_2kTDPtnOQ7HEzMkBZti-8XSJFvj5kpcuo3nz5YTzSmAFb_PUpnycpvOG5Ysefd4n4V65JWbrWaymgdoMqd1kD5AAhqAKRB1446AAZ41qi_9xXHbfhu3SQWF9Xln3tmszZn9eZzbAVqiHgpSfmBuKnvYTRNt5eszaIHIWK-rSTxuc_cI-nOXLkzMVNNfnHp7"
          />
        </section>

        {/* CEO Brand Story Section */}
        <ScrollReveal delay={0}>
          <section className="w-full bg-[#FAF8F5] overflow-hidden min-h-[600px] flex flex-col md:flex-row">
            {/* Left Column: CEO Portrait */}
            <div className="w-full md:w-[40%] h-[400px] md:h-auto overflow-hidden">
              <img
                alt="Stella Michael Ofori Portrait"
                className="w-full h-full object-cover filter saturate-[0.8] contrast-[1.05]"
                data-alt="Close crop editorial portrait of a woman with warm skin tones, desaturated and minimal aesthetic, soft natural side lighting, serene expression"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARBiffrPtBESQxJ_tyzlQh4HNCXB4DcbQ3YxQVGee8lJvaRsJz_bqRtWWZUkJziHVzo-cRVaZozjgKE0SqN_Mpx-lRAgwaxER7IF4zi5tWLfMGbvwDEFdcaw-F2e3v9_fTPNbWeImckg52zoIi6wEBhzIgl41gzIU_AgzdV2oVIay1vCIuEl8oAQ3y0xgAT4ToZPNthNqRNqMB2o-_7UhHFi3XPohh12VsRXl2xxXAM0k85KNNtVG-VO0mGrNWjiR1aFD_Ucb7vfYM"
              />
            </div>
            {/* Right Column: Story Text Content */}
            <div className="w-full md:w-[60%] flex items-center px-8 py-16 md:px-24 md:py-32 relative">
              {/* Watermark Quote */}
              <div className="absolute top-12 left-12 md:top-24 md:left-20 pointer-events-none select-none">
                <span className="font-serif text-[120px] leading-none text-[#C9A96E] opacity-30 select-none">
                  “
                </span>
              </div>
              <div className="relative z-10 max-w-xl">
                <blockquote className="mb-12">
                  <p className="font-serif italic text-[24px] md:text-[32px] leading-[1.4] text-[#2C2420]">
                    Luxury is not a price tag — it is the feeling of belonging
                    to a space.
                  </p>
                </blockquote>
                <div className="flex flex-col gap-4">
                  <div className="w-8 h-[1px] bg-[#C9A96E]"></div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#8B7D72] font-medium">
                      Stella Michael Ofori, PhD
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#8B7D72] mt-1">
                      Chief Executive Officer
                    </span>
                  </div>
                </div>
                <div className="mt-12">
                  <a
                    className="font-sans text-[12px] uppercase tracking-widest text-[#C9A96E] font-bold inline-flex items-center group transition-all"
                    href="#"
                  >
                    <span className="border-b border-[#C9A96E] pb-1">
                      Our Story →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Secondary Contextual Content (Editorial Grid) */}
        <section className="px-12 py-32 bg-[#FBF2E7]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start max-w-6xl mx-auto">
            <div className="space-y-6">
              <h3 className="font-serif uppercase tracking-[0.15em] text-[#2C2420] text-lg">
                The Heritage
              </h3>
              <p className="font-sans text-[#8B7D72] leading-relaxed">
                Each piece is a dialogue between the past and present, crafted
                in our atelier with a commitment to generational quality and
                architectural precision.
              </p>
            </div>
            <div className="md:col-span-2 overflow-hidden rounded-lg">
              <img
                alt="Minimalist Luxury Interior"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                data-alt="Wide angle shot of a minimalist luxury interior with high ceilings, soft warm sunlight filtering through linen curtains onto ivory furniture"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFfd0w4AH78JZ2pamJBF2TQmfqwD3bRiMSCdkn2ox_10vbu20J3FvroOax0Lnsl1vazVc4SRGhxAXMynSLltsfTmNkqoD7IHYIdIlfjYZEdg1dZszTIJbQrunwy1ceRZxn-WSdA-f5C7oZzjJR_wjFVjhF9DX9qoO4hXnGbDk7C1Vt4CsJZcz6MK5xCcPq_nhkD0So4pejLkNrSg6RaAFmS4S-eyYLm6HNyIRPwcMr8-mb5_uXQLP2vWZFxm6byz6u6Sz9BPbabzaf"
              />
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING ELEMENT: WhatsApp */}
      <div className="fixed bottom-10 right-10 z-50">
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
