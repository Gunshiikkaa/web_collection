"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Direct scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Integrate Lenis raf with GSAP ticker
    const updateGsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updateGsapTicker);
    gsap.ticker.lagSmoothing(0);

    // Make lenis globally accessible (optional, useful for custom modals)
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateGsapTicker);
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
