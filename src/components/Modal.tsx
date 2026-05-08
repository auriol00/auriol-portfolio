// Modal — generic overlay used for CV requests, expanded descriptions, and video players.
// Closes on ESC key, backdrop click, or X button. Content is passed as children.
"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import portfolioConfig from "@/config/portfolio.config";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ title, onClose, children }: ModalProps) {

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl w-full max-w-lg bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-main"
        >
          <h3 className="font-semibold text-main">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity text-muted bg-secondary"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-5">
          {children}
        </div>

      </div>
    </div>
  );
}
