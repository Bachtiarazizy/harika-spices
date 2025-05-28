"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import type React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { JSX } from "react/jsx-runtime";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AnimatedCopyProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  lineSelector?: string;
  animateOnScroll?: boolean;
  direction?: "top" | "bottom";
  tag?: keyof JSX.IntrinsicElements;
}

const AnimatedCopy: React.FC<AnimatedCopyProps> = ({ children, className = "", delay = 0, duration = 1, ease = "power4.out", stagger = 0.05, lineSelector = "", animateOnScroll = true, direction = "bottom", tag = "p" }) => {
  const copyRef = useRef<HTMLElement>(null);
  const [copyId, setCopyId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const textSplitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    setCopyId(`copy-${Math.floor(Math.random() * 10000)}`);
  }, []);

  useEffect(() => {
    if (!copyId || !copyRef.current) return;

    const lineClass = `line-${copyId}`;

    const text = new SplitType(copyRef.current, {
      types: "lines",
      lineClass: lineClass,
    });

    textSplitRef.current = text;

    const selector = lineSelector || `.${lineClass}`;
    const lines = document.querySelectorAll(selector);

    lines.forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span class="line-inner-${copyId}">${content}</span>`;
    });

    const initialY = direction === "top" ? "-100%" : "100%";

    gsap.set(`.line-inner-${copyId}`, {
      y: initialY,
      display: "block",
    });

    setIsInitialized(true);

    return () => {
      if (textSplitRef.current) textSplitRef.current.revert();
    };
  }, [copyId, lineSelector, direction]);

  useGSAP(
    () => {
      if (!isInitialized || !copyRef.current) return;

      const tl = gsap.timeline({
        defaults: {
          ease,
          duration,
        },
        ...(animateOnScroll
          ? {
              scrollTrigger: {
                trigger: copyRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          : {}),
      });

      tl.to(`.line-inner-${copyId}`, {
        y: "0%",
        stagger,
        delay,
      });

      return () => {
        if (animateOnScroll) {
          ScrollTrigger.getAll()
            .filter((st) => st.vars.trigger === copyRef.current)
            .forEach((st) => st.kill());
        }
      };
    },
    {
      scope: copyRef,
      dependencies: [isInitialized, animateOnScroll, delay, duration, ease, stagger, direction],
    }
  );

  const Tag = tag as React.ElementType;

  return (
    <Tag
      ref={copyRef}
      className={`animated-copy ${className}`}
      data-copy-id={copyId}
      style={
        {
          // Tailwind CSS equivalent styles applied via style prop for dynamic classes
          "--line-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        } as React.CSSProperties
      }
    >
      <style jsx>{`
        .animated-copy [class^="line-"] {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          display: block;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        .animated-copy [class^="line-inner-"] {
          position: relative;
          display: block;
          will-change: transform;
        }
      `}</style>
      {children}
    </Tag>
  );
};

export default AnimatedCopy;
