"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero() {
  const imgRef      = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLDivElement>(null);
  const line2Ref    = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  // Set initial states before paint to avoid flash
  useIsoLayoutEffect(() => {
    gsap.set(eyebrowRef.current,  { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 });
    gsap.set(line1Ref.current,    { y: 40, autoAlpha: 0 });
    gsap.set(line2Ref.current,    { y: 40, autoAlpha: 0 });
    gsap.set(subRef.current,      { y: 20, autoAlpha: 0 });
    gsap.set(ctaRef.current,      { y: 20, autoAlpha: 0 });
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(eyebrowRef.current, {
        clipPath: "inset(0 0% 0 0)",
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(line1Ref.current, {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
        }, "-=0.45")
        .to(line2Ref.current, {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
        }, "-=0.75")
        .to([subRef.current, ctaRef.current], {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }, "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  // Parallax on scroll
  useEffect(() => {
    if (!imgRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "30% top",
      onUpdate: (self) => {
        if (imgRef.current) {
          gsap.set(imgRef.current, {
            y: self.progress * window.innerHeight * 0.4,
          });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      className="flex items-center md:items-end relative overflow-hidden"
      style={{
        height:     "calc(100svh - 72px)",
        minHeight:  520,
      }}
    >
      {/* ── Background image ── */}
      <div
        ref={imgRef}
        style={{
          position:           "absolute",
          inset:              "-20% 0 -20% 0",
          backgroundImage:    "url('https://res.cloudinary.com/djh9qeaf6/image/upload/v1777315397/IMG-20260418-WA0006_fs2bpz.jpg')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
          willChange:         "transform",
        }}
      />

      {/* ── Overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(160deg, rgba(15,13,11,0.72) 0%, rgba(15,13,11,0.45) 50%, rgba(15,13,11,0.80) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position:     "relative",
          zIndex:       10,
          paddingLeft:  "var(--space-gutter)",
          paddingRight: "var(--space-gutter)",
          paddingBottom: "clamp(24px, 6vw, 80px)",
          maxWidth:     720,
          width:        "100%",
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}
        >
          <span
            aria-hidden="true"
            style={{
              display:         "block",
              width:           32,
              height:          1,
              backgroundColor: "rgba(255,255,255,0.4)",
              flexShrink:      0,
            }}
          />
          <span
            style={{
              fontFamily:    "var(--font-body)",
              fontSize:      10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color:         "rgba(255,255,255,0.6)",
              whiteSpace:    "nowrap",
            }}
          >
            PORT HARCOURT · LAGOS · ABUJA
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ margin: 0 }}>
          <div
            ref={line1Ref}
            style={{
              fontFamily:  "var(--font-display)",
              fontSize:    "var(--text-3xl)",
              fontStyle:   "italic",
              fontWeight:  300,
              lineHeight:  0.95,
              color:       "#fff",
              overflow:    "hidden",
            }}
          >
            Spaces That
          </div>
          <div
            ref={line2Ref}
            style={{
              fontFamily:  "var(--font-display)",
              fontSize:    "var(--text-3xl)",
              fontStyle:   "italic",
              fontWeight:  300,
              lineHeight:  0.95,
              color:       "#fff",
              overflow:    "hidden",
              marginTop:   "0.04em",
            }}
          >
            Tell Your{" "}
            <span style={{ color: "var(--gold)" }}>Story</span>
          </div>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{
            fontFamily:  "var(--font-body)",
            fontSize:    "var(--text-base)",
            color:       "rgba(255,255,255,0.65)",
            maxWidth:    420,
            marginTop:   20,
            marginBottom: 0,
            lineHeight:  1.65,
          }}
        >
          Bespoke Italian &amp; Turkish furniture for Nigeria&apos;s most distinguished interiors.
        </p>

        {/* CTA row */}
        <div
          ref={ctaRef}
          style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 40, flexWrap: "wrap" }}
        >
          <Link href="/catalog" className="hero-cta-primary">
            Explore Collections
          </Link>
          <Link href="/contact" className="hero-cta-ghost">
            Book Consultation
            <ArrowRight />
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ArrowRight() {
  return (
    <span
      className="hero-arrow"
      aria-hidden="true"
      style={{
        display:    "inline-block",
        marginLeft: 8,
        transition: "transform 300ms var(--ease-luxury)",
      }}
    >
      →
    </span>
  );
}

function ScrollIndicator() {
  return (
    <div
      aria-hidden="true"
      style={{
        position:       "absolute",
        bottom:         40,
        right:          "var(--space-gutter)",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            12,
      }}
    >
      <span
        style={{
          fontFamily:    "var(--font-body)",
          fontSize:      9,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.4)",
          writingMode:   "vertical-rl",
          transform:     "rotate(180deg)",
        }}
      >
        SCROLL
      </span>
      <div
        style={{
          position:        "relative",
          width:           1,
          height:          60,
          backgroundColor: "rgba(255,255,255,0.25)",
          overflow:        "hidden",
        }}
      >
        <div className="scroll-scan" />
      </div>
    </div>
  );
}
