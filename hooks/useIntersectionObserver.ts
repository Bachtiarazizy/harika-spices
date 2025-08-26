import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(threshold = 0.1): [React.RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isVisible];
}
