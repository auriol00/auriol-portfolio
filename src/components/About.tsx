// About — two-column section: image carousel (left) + bio text with CTAs (right).
// "Hire me" links to LinkedIn if configured, otherwise falls back to #contact.
"use client";

import { useTranslations } from "@/components/LocaleProvider";
import portfolioConfig from "@/config/portfolio.config";
import SectionHeader from "./SectionHeader";
import Carousel from "./Carousel";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section-padding bg-main">
      <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* IMAGE CAROUSEL */}
        <div className="flex justify-center">
          <div className="w-72 md:w-full lg:w-full float">
            <Carousel
              images={portfolioConfig.about.images}
              alt={t("alt")}
              interval={10000}
              height="h-64 md:h-80 lg:h-96"
            />
          </div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col gap-6">
          <SectionHeader subtitle={t("subtitle")} title={t("title")} />
          <p className="leading-relaxed text-muted">
            {t("text")}
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#contact"
              className="btn btn-primary"
            >
              {t("cta")}
            </a>
            <a
              href={portfolioConfig.social.find(s => s.name === "linkedin")?.url || "#contact"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t("hire")}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
