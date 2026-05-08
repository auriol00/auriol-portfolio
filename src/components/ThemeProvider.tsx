// ThemeProvider + useTheme — lightweight dark/light mode.
// Theme state lives in localStorage + a data-theme attribute on <html>.
// Layout injects CSS variables per theme via generateThemeStyles(); this module
// just toggles which set is active.
// Synced across components via a custom "theme-change" event on document,
// so all useTheme consumers update together without React context overhead.
"use client";

import { useEffect, useState, useCallback } from "react";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initial = getInitialTheme();
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  return <>{children}</>;
}

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    setThemeState(getInitialTheme());

    function onThemeChange(e: Event) {
      setThemeState((e as CustomEvent).detail as "light" | "dark");
    }
    document.addEventListener("theme-change", onThemeChange);
    return () => document.removeEventListener("theme-change", onThemeChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
    document.dispatchEvent(new CustomEvent("theme-change", { detail: next }));
  }, []);

  return { theme, toggleTheme };
}
