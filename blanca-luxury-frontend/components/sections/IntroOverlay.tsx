"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface IntroOverlayProps {
  onComplete: () => void;
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const overlayRef   = useRef<HTMLDivElement>(null);
  const blancaRef    = useRef<HTMLSpanElement>(null);
  const luxuryRef    = useRef<HTMLSpanElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("bl_intro_seen", "1");
        onComplete();
      },
    });

    // ── 1. Start: overlay visible, text hidden ──────────────────────────────
    gsap.set(overlayRef.current,  { opacity: 1 });
    gsap.set(blancaRef.current,   { clipPath: "inset(0 100% 0 0)", autoAlpha: 1 });
    gsap.set(luxuryRef.current,   { clipPath: "inset(0 0 0 100%)", autoAlpha: 1 });
    gsap.set(lineRef.current,     { scaleX: 0, transformOrigin: "left center" });
    gsap.set(taglineRef.current,  { autoAlpha: 0, y: 10 });

    // ── 2. "BLANCA" sweeps in from left, "LUXURY" from right ───────────────
    tl.to(blancaRef.current, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.9,
      ease: "power3.out",
      delay: 0.3,
    })
    .to(luxuryRef.current, {
      clipPath: "inset(0 0 0 0%)",
      duration: 0.9,
      ease: "power3.out",
    }, "<0.05")

    // ── 3. Gold divider line draws across ──────────────────────────────────
    .to(lineRef.current, {
      scaleX: 1,
      duration: 0.7,
      ease: "power2.inOut",
    }, "-=0.3")

    // ── 4. Tagline fades up ────────────────────────────────────────────────
    .to(taglineRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.2")

    // ── 5. Hold ────────────────────────────────────────────────────────────
    .to({}, { duration: 1.1 })

    // ── 6. Words part — BLANCA exits left, LUXURY exits right ─────────────
    .to(blancaRef.current, {
      x: "-8vw",
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.in",
    })
    .to(luxuryRef.current, {
      x: "8vw",
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.in",
    }, "<")
    .to([lineRef.current, taglineRef.current], {
      autoAlpha: 0,
      duration: 0.4,
    }, "<0.1")

    // ── 7. Overlay fades out, revealing the hero ───────────────────────────
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, "-=0.2");

  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          200,
        backgroundColor: "#0F0D0B",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
        gap:             0,
        pointerEvents:   "none",
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          display:        "flex",
          alignItems:     "baseline",
          gap:            "0.35em",
          overflow:       "hidden",
        }}
      >
        <span
          ref={blancaRef}
          style={{
            fontFamily:    "var(--font-display)",
            fontStyle:     "italic",
            fontWeight:    300,
            fontSize:      "clamp(52px, 9vw, 120px)",
            letterSpacing: "0.12em",
            color:         "#FAF8F5",
            lineHeight:    1,
            display:       "inline-block",
          }}
        >
          Blanca
        </span>
        <span
          ref={luxuryRef}
          style={{
            fontFamily:    "var(--font-display)",
            fontStyle:     "italic",
            fontWeight:    300,
            fontSize:      "clamp(52px, 9vw, 120px)",
            letterSpacing: "0.12em",
            color:         "#C9A96E",
            lineHeight:    1,
            display:       "inline-block",
          }}
        >
          Luxury
        </span>
      </div>

      {/* Gold divider */}
      <div
        ref={lineRef}
        style={{
          width:           "clamp(160px, 20vw, 280px)",
          height:          1,
          backgroundColor: "#C9A96E",
          marginTop:       "1.2em",
          opacity:         0.6,
        }}
      />

      {/* Tagline */}
      <p
        ref={taglineRef}
        style={{
          fontFamily:    "var(--font-body)",
          fontSize:      "clamp(10px, 1.2vw, 13px)",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.4)",
          marginTop:     "1.4em",
        }}
      >
        The Curated Sanctuary
      </p>
    </div>
  );
}
