"use client";

import { useState, useEffect } from "react";
import { IntroOverlay } from "./IntroOverlay";

export function IntroGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("bl_intro_seen")) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return <IntroOverlay onComplete={() => setShow(false)} />;
}
