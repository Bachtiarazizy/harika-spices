"use client";

import { useLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";

// Hook for scroll-triggered animations
export function useScrollAnimation(callback: (scroll: number) => void, deps: unknown[] = []) {
  useLenis(({ scroll }) => {
    callback(scroll);
  }, deps);
}

// Hook for scroll to element
export function useScrollTo() {
  const lenis = useLenis();

  const scrollTo = (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    }
  };

  return scrollTo;
}

// Hook for scroll events
export function useScrollEvents() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScrollStart = () => {
      console.log("Scroll started");
    };

    const handleScrollStop = () => {
      console.log("Scroll stopped");
    };

    lenis.on("scroll-start", handleScrollStart);
    lenis.on("scroll-stop", handleScrollStop);

    return () => {
      lenis.off("scroll-start", handleScrollStart);
      lenis.off("scroll-stop", handleScrollStop);
    };
  }, [lenis]);

  return lenis;
}
