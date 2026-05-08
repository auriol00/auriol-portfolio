// ReadMoreButton — inline "read more →" trigger used under truncated text blocks.
// Opens a Modal with the full content (parent handles the modal state).
"use client";

import { useTranslations } from "@/components/LocaleProvider";
import { FiArrowRight } from "react-icons/fi";

type ReadMoreButtonProps = {
  onClick: () => void;
};

export default function ReadMoreButton({ onClick }: ReadMoreButtonProps) {
  const t = useTranslations();
  return (
    <button
      onClick={onClick}
      className="text-xs mt-1 cursor-pointer hover:opacity-70 transition-opacity inline-flex items-center gap-1 text-accent"
    >
      {t("readMore")} <FiArrowRight size={12} />
    </button>
  );
}
