// Skills — filterable grid of skill cards grouped by category.
// "All" tab shows every category; individual tabs filter to one.
// Icons resolve in order: custom logo → Simple Icons CDN → first 2 letters fallback.
"use client";

import { useState } from "react";
import { useTranslations } from "@/components/LocaleProvider";
import portfolioConfig from "@/config/portfolio.config";
import SectionHeader from "./SectionHeader";
import Image from "next/image";

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="text-base"
          style={{ color: star <= stars ? portfolioConfig.theme.primary : "var(--border)" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  const t = useTranslations("skills");
  const [activeTab, setActiveTab] = useState("all");
  const categories = portfolioConfig.skills.categories;
  const visibleCategories = activeTab === "all"
    ? categories
    : categories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="section-padding bg-secondary">
      <div className="section-container">

        {/* HEADER */}
        <SectionHeader
          subtitle={t("subtitle")}
          title={t("title")}
          description={t("description")}
        />

        {/* TABS */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActiveTab("all")}
            className="px-4 py-2 rounded-full text-sm transition-all border cursor-pointer"
            style={
              activeTab === "all"
                ? { background: portfolioConfig.theme.secondary, color: "white", borderColor: portfolioConfig.theme.secondary }
                : { background: "var(--background)", color: "var(--foreground-secondary)", borderColor: "var(--border)" }
            }
          >
            {t("all")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="px-4 py-2 rounded-full text-sm transition-all border cursor-pointer"
              style={
                activeTab === cat.id
                  ? { background: portfolioConfig.theme.secondary, color: "white", borderColor: portfolioConfig.theme.secondary }
                  : { background: "var(--background)", color: "var(--foreground-secondary)", borderColor: "var(--border)" }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* CATEGORIES */}
        {visibleCategories.map((category) => (
          <div key={category.id} className="mb-10">

            {/* CATEGORY HEADER */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: portfolioConfig.theme.primary }} />
              <span className="text-sm font-semibold text-main">
                {category.label}
              </span>
              <span className="text-xs text-muted">
                {category.items.length} Skills
              </span>
            </div>

            {/* SKILL CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {category.items.map((skill) => (
                <div
                  key={skill.name}
                  className="rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-sm transition-shadow border bg-card border-main"
                >
                  {/* ICON */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-secondary"
                  >
                    {skill.logo ? (
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        width={28}
                        height={28}
                        className="object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : skill.icon ? (
                      <img
                        src={`https://cdn.simpleicons.org/${skill.icon}`}
                        alt={skill.name}
                        width={28}
                        height={28}
                        className="object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <span
                        className="text-sm font-bold"
                        style={{ color: portfolioConfig.theme.secondary }}
                      >
                        {skill.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* NAME */}
                  <span
                    className="text-xs font-medium text-center text-main"
                  >
                    {skill.name}
                  </span>

                  {/* STARS */}
                  <StarRating stars={skill.stars} />

                  {/* PERCENT */}
                  <span className="text-xs text-muted">
                    {skill.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
