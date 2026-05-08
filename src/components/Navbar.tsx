"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMoon, FiSun, FiMenu, FiX, FiGlobe, FiChevronDown } from "react-icons/fi";
import portfolioConfig from "@/config/portfolio.config";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslations, useLocale, useSetLocale, locales, type Locale } from "@/components/LocaleProvider";

const languages: { code: Locale; flag: string; label: string }[] = [
  { code: "en", flag: "EN", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
];

export default function Navbar() {
  const t = useTranslations();
  const tn = useTranslations("nav");
  const locale = useLocale();
  const setLocale = useSetLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b transition-colors bg-main border-main">
      <div className="flex items-center justify-between px-6 md:px-10 py-5">

        {/* LOGO */}
        <span
          className="font-serif italic text-xl"
          style={{ color: portfolioConfig.theme.primary }}
        >
          {portfolioConfig.name}
        </span>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {portfolioConfig.navbar.sections.map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className="text-sm transition-colors hover:opacity-70 text-muted"
            >
              {tn(section)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* LANGUAGE TOGGLE */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity border-main text-main bg-main"
            >
              <FiGlobe size={13} />
              {locale.toUpperCase()}
              <FiChevronDown size={10} />
            </button>

            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div
                  className="absolute top-[calc(100%+6px)] right-0 rounded-xl border overflow-hidden z-50 min-w-36 bg-card border-main shadow-lg"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLocale(lang.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs cursor-pointer hover:opacity-70 transition-opacity ${
                        locale === lang.code ? "font-semibold text-accent" : "text-muted"
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      {locale === lang.code && <span className="text-accent">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer hover:opacity-70 border-main bg-secondary text-main"
            aria-label={t("themeToggle")}
          >
            {theme === "light" ? <FiMoon size={16} /> : <FiSun size={16} />}
          </button>

          {/* HAMBURGER */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-main"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("menuOpen")}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-main ${menuOpen ? "max-h-96 border-t" : "max-h-0"}`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {portfolioConfig.navbar.sections.map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className="text-sm py-1 transition-colors hover:opacity-70 text-muted"
              onClick={() => setMenuOpen(false)}
            >
              {tn(section)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
