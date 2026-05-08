// SocialIcons — renders social links from config with a cascading icon strategy:
// 1. Try Simple Icons CDN by name  2. Fallback to custom logo URL  3. Hide if both fail.
// Used in Hero (large) and Footer (small). Items without a URL render as non-clickable spans.
"use client";

import { useState } from "react";
import portfolioConfig from "@/config/portfolio.config";

type SocialIconsProps = {
  size?: "sm" | "lg";
};

const sizeMap = {
  sm: { container: "w-7 h-7", icon: 14 },
  lg: { container: "w-9 h-9", icon: 18 },
};

function SocialIcon({ s, iconSize, className }: {
  s: { name: string; url: string; logo: string };
  iconSize: number;
  className: string;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  const src = s.logo || `https://cdn.simpleicons.org/${s.name}/white`;

  const img = (
    <img
      src={src}
      alt={s.name}
      width={iconSize}
      height={iconSize}
      className={s.logo ? "invert" : ""}
      onError={() => setHidden(true)}
    />
  );

  const style = { background: portfolioConfig.theme.secondary };

  return s.url ? (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className={className} style={style} aria-label={s.name}>
      {img}
    </a>
  ) : (
    <span className={className} style={style} aria-label={s.name}>
      {img}
    </span>
  );
}

export default function SocialIcons({ size = "lg" }: SocialIconsProps) {
  const { container, icon } = sizeMap[size];
  const className = `${container} rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`;

  return (
    <div className="flex gap-3">
      {portfolioConfig.social.map((s) => (
        <SocialIcon key={s.name} s={s} iconSize={icon} className={className} />
      ))}
    </div>
  );
}
