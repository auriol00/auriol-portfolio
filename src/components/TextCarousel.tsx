// TextCarousel — marquee-style horizontal scroll for taglines.
// Short text stays still. Long text scrolls right-to-left and back like a news ticker.
"use client";

import { useState, useEffect, useRef } from "react";

type TextCarouselProps = {
  texts: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function TextCarousel({ texts, interval = 6000, className = "", style }: TextCarouselProps) {
  const [current, setCurrent] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [marqueeStyle, setMarqueeStyle] = useState<React.CSSProperties | undefined>();

  useEffect(() => {
    if (texts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  useEffect(() => {
    const text = textRef.current;
    const container = containerRef.current;
    if (!text || !container) return;

    requestAnimationFrame(() => {
      const overflow = text.scrollWidth - container.clientWidth;
      if (overflow > 0) {
        const duration = Math.max(overflow / 25, 4);
        setMarqueeStyle({
          "--marquee-distance": `-${overflow}px`,
          animation: `marquee ${duration}s ease-in-out infinite alternate`,
        } as React.CSSProperties);
      } else {
        setMarqueeStyle(undefined);
      }
    });
  }, [current, texts]);

  return (
    <span
      ref={containerRef}
      className={`block overflow-hidden whitespace-nowrap ${className}`}
      style={style}
    >
      <span
        ref={textRef}
        className="inline-block"
        style={marqueeStyle}
      >
        {texts[current]}
      </span>
    </span>
  );
}
