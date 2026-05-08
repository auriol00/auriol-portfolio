// Contact — email form powered by EmailJS (no backend needed).
// State machine: idle → sending → success/error. On success the form is replaced
// by a confirmation message. On error a mailto fallback link is shown.
// Requires NEXT_PUBLIC_EMAILJS_* env vars — without them the form silently fails.
"use client";

import { useState, useRef } from "react";
import { useTranslations } from "@/components/LocaleProvider";
import emailjs from "@emailjs/browser";
import portfolioConfig from "@/config/portfolio.config";
import SectionHeader from "./SectionHeader";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function Contact() {
  const t = useTranslations("contact");
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ from_name: "", from_email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ from_name: "", from_email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-padding bg-secondary">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <SectionHeader subtitle={t("subtitle")} title={t("title")} />

        {/* SUCCESS STATE */}
        {status === "success" ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="text-xl font-semibold mb-2 text-main">
              {t("successTitle")}
            </h3>
            <p className="text-sm mb-6 text-muted">
              {t("successText")}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-sm underline cursor-pointer hover:opacity-70 transition-opacity text-muted"
            >
              {t("newMessage")}
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* NAME */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-muted">
                {t("name")}
              </label>
              <input
                type="text"
                name="from_name"
                required
                value={formData.from_name}
                onChange={handleChange}
                className="border-b py-2 text-sm outline-none bg-transparent transition-all text-main border-main"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-muted">
                {t("email")}
              </label>
              <input
                type="email"
                name="from_email"
                required
                value={formData.from_email}
                onChange={handleChange}
                className="border-b py-2 text-sm outline-none bg-transparent transition-all text-main border-main"
              />
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-muted">
                {t("message")}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="border-b py-2 text-sm outline-none bg-transparent resize-none transition-all text-main border-main"
              />
            </div>

            {/* ERROR STATE — mailto fallback */}
            {status === "error" && (
              <p className="text-sm text-red-500">
                {t("errorText")}{" "}
                <a href={`mailto:${portfolioConfig.contact.email}`} className="underline">
                  {portfolioConfig.contact.email}
                </a>
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-primary w-full justify-center disabled:opacity-50"
            >
              {status === "sending" ? t("sending") : t("send")}
            </button>

          </form>
        )}

      </div>
    </section>
  );
}
