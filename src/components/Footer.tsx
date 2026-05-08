// Footer — three-column grid: branding + tagline carousel, phone, email.
// Bottom bar with copyright and attribution. Social icons reused at small size.
"use client";

import { useTranslations } from "@/components/LocaleProvider";
import portfolioConfig from "@/config/portfolio.config";
import { FaHeart } from "react-icons/fa6";
import SocialIcons from "./SocialIcons";
import TextCarousel from "./TextCarousel";

export default function Footer() {
  const t = useTranslations("footer");
  const taglines = t.raw("taglines") as string[];

  return (
    <footer className="border-t pt-10 pb-4 px-6 md:px-20 lg:px-40 bg-main border-main">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          <div className="flex flex-col gap-4">
            <span className="font-serif italic text-xl" style={{ color: portfolioConfig.theme.primary }}>
              {portfolioConfig.name}
            </span>
            <TextCarousel
              texts={taglines}
              className="text-sm underline leading-relaxed max-w-xs text-muted"
            />
            <SocialIcons size="sm" />

          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium text-muted">{t("phone")}</h4>
            <a href={`tel:${portfolioConfig.contact.phone}`} className="text-sm hover:opacity-70 transition-opacity text-muted">
              {portfolioConfig.contact.phone}
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium text-muted">{t("email")}</h4>
            <a href={`mailto:${portfolioConfig.contact.email}`} className="text-sm hover:opacity-70 transition-opacity text-muted">
              {portfolioConfig.contact.email}
            </a>
          </div>
        </div>
        <div className="border-t pt-4 text-center border-main">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {portfolioConfig.name} — Built with{" "}
          <FaHeart size={10} style={{ display: "inline", color: portfolioConfig.theme.primary, margin: "0 2px" }} />
         by <a href="https://github.com/auriol00" target="_blank" className="underline hover:opacity-70 transition-opacity text-muted">Auriol</a>
        </p>
      </div>
      </div>
    </footer>
  );
}
