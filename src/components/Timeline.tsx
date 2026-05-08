// Timeline — resume/CV section displayed as a responsive card grid (not a vertical line).
// Each card has an image, a numbered badge, type tag, and truncated description.
// Long descriptions expand in a modal via ReadMoreButton.
// Company names link externally if companyUrl is provided.
"use client";

import { useState } from "react";
import { useTranslations } from "@/components/LocaleProvider";
import Image from "next/image";
import portfolioConfig from "@/config/portfolio.config";
import Modal from "@/components/Modal";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import SectionHeader from "./SectionHeader";
import Tag from "./Tag";
import ReadMoreButton from "./ReadMoreButton";

export default function Timeline() {
  const t = useTranslations("timeline");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const expandedItem = portfolioConfig.timeline.find((i) => i.id === expandedId);

  return (
    <section id="timeline" className="section-padding bg-main">
      <div className="section-container">

        {/* HEADER */}
        <SectionHeader subtitle={t("subtitle")} title={t("title")} />
        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioConfig.timeline.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden hover:shadow-md transition-shadow border flex flex-col bg-card border-main"
            >
              {/* IMAGE */}
              <div className="relative w-full h-40 flex-shrink-0 bg-secondary">
                {item.image ? (
                  <Image src={item.image} alt={t(`items.${item.id}.title`)} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-end justify-center bg-secondary">
                    <div className="w-20 h-28 rounded-t-full" style={{ background: "var(--border)" }} />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: portfolioConfig.theme.primary }}>
                    {item.id}
                  </div>
                  <Tag label={t(`items.${item.id}.type`)} variant="brand" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col gap-2 flex-1 min-h-36">
                <h3 className="text-sm font-semibold text-main">{t(`items.${item.id}.title`)}</h3>
                {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium hover:underline cursor-pointer inline-flex items-center gap-1 text-accent"
                    >
                      {t(`items.${item.id}.company`)}
                      <FiExternalLink size={10} />
                    </a>
                  ) : (
                    <p className="text-xs font-medium text-accent">
                      {t(`items.${item.id}.company`)}
                    </p>
                  )}
                <p className="text-xs text-muted">{t(`items.${item.id}.date`)}</p>

                {/* DESCRIPTION — max 3 lines */}
                <div className="flex-1">
                  <p
                    className="text-xs leading-relaxed text-muted"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {t(`items.${item.id}.description`)}
                  </p>
                  {t(`items.${item.id}.description`).length > 100 && (
                    <ReadMoreButton onClick={() => setExpandedId(item.id)} />
                  )}
                </div>

                {/* TAGS */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags.map((tag) => (
                       <Tag key={tag} label={tag} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}


        </div>

      </div>

      {/* DESCRIPTION MODAL */}
      {expandedItem && (
        <Modal
          title={t(`items.${expandedItem.id}.title`)}
          onClose={() => setExpandedId(null)}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Tag label={t(`items.${expandedItem.id}.type`)} variant="brand" />
              <span className="text-xs text-muted">
                {t(`items.${expandedItem.id}.date`)}
              </span>
            </div>
            <p className="text-xs font-medium text-accent">
              {t(`items.${expandedItem.id}.company`)}
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {t(`items.${expandedItem.id}.description`)}
            </p>
            {expandedItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {expandedItem.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

    </section>
  );
}
