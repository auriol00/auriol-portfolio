"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import portfolioConfig from "@/config/portfolio.config";

import en from "../../messages/en.json";
import de from "../../messages/de.json";
import fr from "../../messages/fr.json";

type Messages = Record<string, unknown>;
type Locale = "de" | "en" | "fr";

const allMessages: Record<Locale, Messages> = { en, de, fr };

const locales: Locale[] = ["de", "en", "fr"];

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
}

const LocaleContext = createContext<LocaleContextValue>(null!);

function resolve(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((cur, key) => {
    if (cur && typeof cur === "object" && key in (cur as Record<string, unknown>)) {
      return (cur as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

type TranslateFunction = {
  (key: string): string;
  raw: (key: string) => unknown;
};

export function useTranslations(namespace?: string): TranslateFunction {
  const { messages } = useContext(LocaleContext);
  const scope = namespace ? resolve(messages, namespace) : messages;

  const t = useCallback(
    (key: string): string => {
      const val = resolve(scope, key);
      if (typeof val === "string") return val;
      return key;
    },
    [scope],
  ) as TranslateFunction;

  t.raw = (key: string): unknown => resolve(scope, key);

  return t;
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

export function useSetLocale(): (locale: Locale) => void {
  return useContext(LocaleContext).setLocale;
}

export { locales };
export type { Locale };

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(portfolioConfig.defaultLocale);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && locales.includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((loc: Locale) => {
    setLocaleState(loc);
    localStorage.setItem("locale", loc);
    document.documentElement.setAttribute("lang", loc);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  const messages = allMessages[locale];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, messages }}>
      {children}
    </LocaleContext.Provider>
  );
}
