"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AnimatedH1Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  lineSelector?: string;
  animateOnScroll?: boolean;
  direction?: "top" | "bottom";
};

const AnimatedH1 = ({ children, className = "", delay = 0, duration = 1, ease = "power4.out", stagger = 0.1, lineSelector = "", animateOnScroll = false, direction = "bottom" }: AnimatedH1Props) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [headingId, setHeadingId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const textSplitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    setHeadingId(`h1-${Math.floor(Math.random() * 10000)}`);
  }, []);

  useEffect(() => {
    if (!headingId || !headingRef.current) return;

    const lineClass = `line-${headingId}`;

    const text = new SplitType(headingRef.current, {
      types: "lines",
      lineClass: lineClass,
    });

    textSplitRef.current = text;

    const selector = lineSelector || `.${lineClass}`;
    const lines = document.querySelectorAll(selector);

    lines.forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span class="line-inner-${headingId}">${content}</span>`;
    });

    const initialY = direction === "top" ? "-100%" : "100%";

    gsap.set(`.line-inner-${headingId}`, {
      y: initialY,
      display: "block",
    });

    setIsInitialized(true);

    return () => {
      if (textSplitRef.current) textSplitRef.current.revert();
    };
  }, [headingId, lineSelector, direction]);

  useGSAP(
    () => {
      if (!isInitialized || !headingRef.current) return;

      const tl = gsap.timeline({
        defaults: {
          ease,
          duration,
        },
        ...(animateOnScroll
          ? {
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          : {}),
      });

      tl.to(`.line-inner-${headingId}`, {
        y: "0%",
        stagger,
        delay,
      });

      return () => {
        if (animateOnScroll) {
          ScrollTrigger.getAll()
            .filter((st) => st.trigger === headingRef.current)
            .forEach((st) => st.kill());
        }
      };
    },
    {
      scope: headingRef,
      dependencies: [isInitialized, animateOnScroll, delay, duration, ease, stagger, direction],
    }
  );

  return (
    <h1 ref={headingRef} className={`overflow-hidden ${className}`} data-heading-id={headingId}>
      {children}
    </h1>
  );
};

export default AnimatedH1;
