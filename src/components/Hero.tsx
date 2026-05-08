// Hero — full-screen landing section. Two-column layout: terminal + profile image.
// The terminal types commands character-by-character, then loops after a pause.
// Profile image uses an organic blob shape (border-radius trick) with a
// placeholder fallback if the image fails to load.
"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "@/components/LocaleProvider";
import portfolioConfig from "@/config/portfolio.config";
import Image from "next/image";
import { FiArrowRight, FiPlus, FiUser } from "react-icons/fi";
import Modal from "./Modal";
import SocialIcons from "./SocialIcons";

export default function Hero() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [showCvModal, setShowCvModal] = useState(false);
  const t = useTranslations("hero");
  const role = t("role");
  const hobbies = t("hobbies");
  const profileImageAlt = t("profileImageAlt");

  useEffect(() => {
    const lines = [
      { type: "command", text: "whoami" },
      { type: "output", text: portfolioConfig.name, cls: "name" },
      { type: "empty" },
      { type: "command", text: "cat role.txt" },
      { type: "output", text: role, cls: "role" },
      { type: "empty" },
      { type: "command", text: "cat hobbies.txt" },
      { type: "output", text: hobbies, cls: "bio" },
      { type: "empty" },
      { type: "pause" },
      { type: "command", text: "clear" },
    ];

    const firstName = portfolioConfig.name.split(" ")[0].toLowerCase();
    const primary = portfolioConfig.theme.primary;
    const cursor = '<span style="display:inline-block;width:8px;height:14px;background:var(--foreground-secondary);animation:blink 1s step-end infinite;vertical-align:middle;margin-left:1px;"></span>';

    const PROMPT = (partial: string, done: boolean) => {
      const user    = `<span style="color:#28c840;font-weight:bold;">${firstName}</span>`;
      const at      = `<span style="color:var(--foreground-secondary);">@</span>`;
      const host    = `<span style="color:#378ADD;font-weight:bold;">portfolio</span>`;
      const colon   = `<span style="color:var(--foreground-secondary);">:</span>`;
      const path    = `<span style="color:${primary};font-weight:bold;">~</span>`;
      const dollar  = `<span style="color:var(--foreground-secondary);margin-right:6px;">$</span>`;
      const command = `<span style="color:var(--foreground);"> ${partial}</span>`;

      return `${user}${at}${host}${colon}${path}${dollar}${command}${done ? "" : cursor}`;
    };

    let li = 0, ci = 0;
    let curEl: HTMLElement | null = null;
    let stopped = false;
    // Track all pending timeouts so cleanup cancels everything
    const timers: ReturnType<typeof setTimeout>[] = [];

    function schedule(fn: () => void, ms: number) {
      const id = setTimeout(fn, ms);
      timers.push(id);
    }

    function next() {
      if (stopped || !bodyRef.current) return;
      if (li >= lines.length) return;

      const line = lines[li];
      const body = bodyRef.current;

      if (line.type === "empty") {
        const d = document.createElement("div");
        d.style.height = "8px";
        body.appendChild(d);
        li++;
        schedule(next, 150);
        return;
      }

      if (line.type === "pause") {
        li++;
        schedule(next, 6000);
        return;
      }

      if (line.type === "command") {
        if (ci === 0) {
          curEl = document.createElement("div");
          curEl.style.cssText = "margin-bottom:2px;font-family:monospace;font-size:13px;";
          body.appendChild(curEl);
        }
        if (ci < (line.text as string).length) {
          ci++;
          const partial = (line.text as string).slice(0, ci);
          curEl!.innerHTML = PROMPT(partial, false);
          schedule(next, 120);
          return;
        } else {
          curEl!.innerHTML = PROMPT(line.text as string, true);
          ci = 0;
          li++;

          if ((line.text as string) === "clear") {
            schedule(() => {
              if (!stopped && bodyRef.current) {
                bodyRef.current.innerHTML = "";
                li = 0;
                ci = 0;
                curEl = null;
                schedule(next, 100);
              }
            }, 600);
            return;
          }

          schedule(next, 350);
          return;
        }
      }

      if (line.type === "output") {
        const d = document.createElement("div");
        d.style.fontFamily = "monospace";
        d.style.fontSize = "13px";
        d.style.paddingLeft = "4px";
        d.style.marginBottom = "4px";
        if (line.cls === "name") {
          d.style.cssText += "font-size:20px;font-weight:700;color:var(--foreground);font-family:monospace;";
        } else if (line.cls === "role") {
          d.style.cssText += `color:${primary};font-weight:600;font-family:monospace;`;
        } else {
          d.style.cssText += "color:var(--foreground-secondary);font-family:monospace;line-height:1.6;";
        }
        d.textContent = line.text as string;
        body.appendChild(d);
        li++;
        schedule(next, 180);
      }
    }

    schedule(next, 700);
    return () => {
      stopped = true;
      timers.forEach(clearTimeout);
      if (bodyRef.current) bodyRef.current.innerHTML = "";
    };
  }, [role, hobbies]);

  return (
    <section id="hero" className="min-h-screen flex items-center px-6 md:px-20 lg:px-40">
      <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

        {/* LEFT COLUMN — Terminal + Social + CV button */}
        <div className="order-2 md:order-1 flex flex-col gap-5 w-full">

          {/* TERMINAL */}
          <div
            className="rounded-xl overflow-hidden border shadow-md w-full max-w-md bg-card border-main"
          >
            <div
              className="px-4 py-2.5 flex items-center gap-2 bg-secondary"
            >
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs font-mono mx-auto text-muted">
                {portfolioConfig.name.split(" ")[0].toLowerCase()}@portfolio: ~
              </span>
            </div>
            <div
              ref={bodyRef}
              className="p-5 min-h-64 max-h-64 overflow-y-auto"
              style={{ fontFamily: "monospace" }}
            />
          </div>

          {/* SOCIAL ICONS */}
          <SocialIcons size="lg" />


          {/* CV BUTTON */}
          <button
            onClick={() => setShowCvModal(true)}
            className="btn btn-primary w-fit"
          >
            <FiPlus size={14} /> {t("cvButton")}
          </button>

          {showCvModal && (
            <Modal title={t("cvModalTitle")} onClose={() => setShowCvModal(false)}>
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-muted">
                  {t("cvModalText")}
                </p>
                <a
                  href="#contact"
                  onClick={() => setShowCvModal(false)}
                  className="btn btn-primary justify-center"
                >
                  {t("cvModalCta")} <FiArrowRight size={14} />
                </a>
              </div>
            </Modal>
          )}

        </div>


       {/* RIGHT COLUMN — Profile image with organic blob shape */}
      <div className="order-1 md:order-2 flex items-center justify-center">
        <div
          className="relative w-48 h-56 md:w-72 md:h-80 lg:w-80 lg:h-96 overflow-hidden float"
          style={{
            borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
          }}
        >
          {/* Placeholder — always rendered behind the real image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary">
            <FiUser size={48} style={{ color: "var(--border)" }} />
            <p className="text-xs text-center px-4 text-muted">
              {profileImageAlt}
            </p>
          </div>

          {/* Real image — stacked on top, hides on error to reveal placeholder */}
          <Image
            src={portfolioConfig.profileImage}
            alt={profileImageAlt}
            fill
            sizes="(max-width: 768px) 192px, (max-width: 1024px) 288px, 320px"
            priority
            className="object-cover object-top"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
      </div>
</div>
    </section>
  );
}
