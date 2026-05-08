// Carousel — reusable image slider with auto-advance, arrows, dots, and progress bar.
// Used in About (bio photos) and Portfolio (project screenshots).
// Slides cross-fade via absolute positioning + opacity transitions (no layout shift).
// Single-image mode hides all navigation controls automatically.
// Manual navigation (arrows/dots) resets the auto-advance timer to avoid double-slides.
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type CarouselProps = {
  images: string[];
  alt: string;
  interval?: number; // ms — default 3000
  height?: string; // Tailwind height classes — default "h-48 md:h-72 lg:h-80"
};

export default function Carousel({ images, alt, interval = 3000, height = "h-48 md:h-72 lg:h-80" }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;
  // Bump this to restart the auto-advance interval after manual navigation
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, interval);
    return () => clearInterval(timer);
  }, [total, interval, resetKey]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setResetKey((k) => k + 1);
  }, []);

  function next() { goTo((current + 1) % total); }
  function prev() { goTo((current - 1 + total) % total); }

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden group flex-shrink-0`}>

      {/* SLIDES */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 2 : 1 }}
        >
          {img ? (
            <Image src={img} alt={`${alt} ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-end justify-center bg-secondary">
              <div className="w-20 h-32 rounded-t-full" style={{ background: "var(--border)" }} />
            </div>
          )}
        </div>
      ))}

      {/* COUNTER */}
      {total > 1 && (
        <div className="absolute top-3 right-3 z-10 text-white text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.4)" }}>
          {current + 1} / {total}
        </div>
      )}

      {/* ARROWS — fixed dark bg + white icon so they're visible on any image/theme */}
      {total > 1 && (
        <div className="absolute inset-0 z-10 flex items-center justify-between px-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      )}

      {/* DOTS — active dot stretches wider for visual feedback */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === current ? "18px" : "6px",
                background: i === current ? "white" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      )}

      {/* PROGRESS BAR */}
      {total > 1 && (
        <div
          key={`${current}-${resetKey}`}
          className="absolute bottom-0 left-0 h-0.5 z-10"
          style={{
            background: "var(--primary)",
            animation: `progress ${interval}ms linear`,
          }}
        />
      )}

    </div>
  );
}
