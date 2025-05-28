/* eslint-disable @next/next/no-img-element */
"use client";

import { useLenis } from "lenis/react";
import React, { useRef, useEffect, useState } from "react";

const lerp = (start: number, end: number, factor: number): number => start + (end - start) * factor;

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

interface Bounds {
  top: number;
  bottom: number;
  height: number;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, alt, speed = 0.3, className = "" }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const bounds = useRef<Bounds | null>(null);
  const currentTranslateY = useRef<number>(0);
  const targetTranslateY = useRef<number>(0);
  const rafId = useRef<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkScreenSize = (): void => {
      setIsDesktop(window.innerWidth >= 900);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const updateBounds = (): void => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
          height: rect.height,
        };
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const animate = (): void => {
      if (imageRef.current && bounds.current) {
        currentTranslateY.current = lerp(currentTranslateY.current, targetTranslateY.current, 0.1);

        if (Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01) {
          imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.5)`;
        }
      }
      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateBounds);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isDesktop]);

  useLenis(({ scroll }: { scroll: number }) => {
    if (!isDesktop || !bounds.current) return;

    const windowHeight = window.innerHeight;
    const elementMiddle = bounds.current.top + bounds.current.height / 2;
    const windowMiddle = scroll + windowHeight / 2;
    const distanceFromCenter = windowMiddle - elementMiddle;

    targetTranslateY.current = distanceFromCenter * speed;
  });

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={`w-full h-full object-cover absolute top-0 left-0 ${className}`}
      style={{
        willChange: isDesktop ? "transform" : "auto",
        transform: isDesktop ? "translateY(0) scale(1.5)" : "none",
      }}
    />
  );
};

export default ParallaxImage;
