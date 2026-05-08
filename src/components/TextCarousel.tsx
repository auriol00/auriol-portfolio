"use client";

import { useEffect, useRef, useState } from "react";

type TextCarouselProps = {
  texts: string[];
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function TextCarousel({
  texts,
  speed = 40,
  className = "",
  style,
}: TextCarouselProps) {
  const trackRef = useRef<HTMLSpanElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;
    setDistance(trackRef.current.scrollWidth / 2);
  }, [texts]);

  return (
    <span
      className={`block overflow-hidden whitespace-nowrap ${className}`}
      style={style}
    >
      <span
        ref={trackRef}
        className="inline-flex w-max"
        style={
          {
            "--marquee-distance": `-${distance}px`,
            "--marquee-duration": `${distance / speed}s`,
            animation:
              distance > 0
                ? "marquee var(--marquee-duration) linear infinite"
                : undefined,
          } as React.CSSProperties
        }
      >
        {[...texts, ...texts].map((text, index) => (
        <span key={index} className="inline-flex items-center gap-4 px-4">
          <span>{text}</span>
          <span aria-hidden="true" className="text-muted opacity-50">
            •
          </span>
        </span>
      ))}
      </span>
    </span>
  );
}