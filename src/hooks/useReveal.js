import { useCallback, useEffect, useState } from "react";

export default function useReveal(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
    once = true,
  } = options;

  const [element, setElement] = useState(null);
  const [visible, setVisible] = useState(false);

  const ref = useCallback((node) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, threshold, rootMargin, once]);

  return {
    ref,
    visible,
  };
}
