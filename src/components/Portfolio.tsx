// Portfolio — project showcase. Each project alternates image left/right (zigzag layout
// via CSS direction:rtl trick — avoids duplicating markup for reversed order).
// Long descriptions are truncated with -webkit-line-clamp and expand in a modal.
// VideoContent renders an embedded YouTube/Vimeo player with a playlist sidebar.
"use client";

import { useState } from "react";
import { useTranslations } from "@/components/LocaleProvider";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { FiGlobe, FiVideo, FiX } from "react-icons/fi";
import portfolioConfig from "@/config/portfolio.config";
import Modal from "@/components/Modal";
import SectionHeader from "./SectionHeader";
import Tag from "./Tag";
import ReadMoreButton from "./ReadMoreButton";
import Carousel from "./Carousel";

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

function getEmbedUrl(url: string): string {
  const ytId = getYouTubeId(url);
  if (ytId) return `https://www.youtube.com/embed/${ytId}`;
  if (url.includes("vimeo.com")) {
    const vimeoId = url.split("/").pop();
    return `https://player.vimeo.com/video/${vimeoId}`;
  }
  return url;
}

type Video = { title: string; url: string; duration: string };
type Project = (typeof portfolioConfig.projects)[0];

function VideoContent({ project }: { project: Project }) {
  const t = useTranslations("portfolio");
  const [activeIndex, setActiveIndex] = useState(0);
  const videos = project.videos;
  const activeVideo = videos[activeIndex];
  const embedUrl = getEmbedUrl(activeVideo.url);
  const isYouTubeOrVimeo = getYouTubeId(activeVideo.url) || activeVideo.url.includes("vimeo.com");

  return (
    <div className={`${videos.length > 1 ? "md:grid md:grid-cols-5" : ""}`}>

      {/* PLAYER */}
      <div className={`${videos.length > 1 ? "md:col-span-3 border-r" : ""} border-main`}>
        {isYouTubeOrVimeo ? (
          <div className="w-full aspect-video">
            <iframe src={embedUrl} className="w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
          </div>
        ) : (
          <div className="w-full aspect-video bg-gray-900">
            <video src={activeVideo.url} controls className="w-full h-full" />
          </div>
        )}

        {/* NOW PLAYING */}
        <div className="px-5 py-3 border-b border-main">
          <p className="text-xs uppercase tracking-wide mb-1 text-muted">{t("nowPlaying")}</p>
          <p className="text-sm font-medium text-main">{activeVideo.title}</p>
          <p className="text-xs mt-0.5 text-muted">{activeVideo.duration}</p>
        </div>

        {/* OPEN BTN */}
        <div className="px-5 py-4">
          <a
            href={activeVideo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary justify-center w-full rounded-xl"
          >
            <FiVideo size={14} />
            {t("openInTab")}
          </a>
        </div>
      </div>

      {/* PLAYLIST */}
      {videos.length > 1 && (
        <div className="md:col-span-2 flex flex-col">
          <p className="px-4 pt-4 pb-2 text-xs font-medium uppercase tracking-wide text-muted">
            {t("allVideos")} ({videos.length})
          </p>
          <div className="flex flex-row md:flex-col gap-2 px-3 pb-3 overflow-x-auto md:overflow-x-visible">
            {videos.map((video: Video, i: number) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className="flex gap-3 items-center p-2 rounded-xl cursor-pointer transition-all flex-shrink-0 md:flex-shrink hover:opacity-80"
                style={{ background: activeIndex === i ? "var(--background-secondary)" : "transparent" }}
              >
                <div className="w-16 h-10 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden" style={{ background: portfolioConfig.theme.secondary }}>
                  {getYouTubeId(video.url) && (
                    <Image src={`https://img.youtube.com/vi/${getYouTubeId(video.url)}/mqdefault.jpg`} alt={video.title} fill sizes="64px" className="object-cover" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 ml-0.5" style={{ borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "7px solid white" }} />
                    </div>
                  </div>
                  {activeIndex === i && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: portfolioConfig.theme.primary }} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: activeIndex === i ? portfolioConfig.theme.primary : "var(--foreground)" }}>
                    {video.title}
                  </p>
                  <p className="text-xs mt-0.5 text-muted">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default function Portfolio() {
  const t = useTranslations("portfolio");
  const [videoProjectId, setVideoProjectId] = useState<number | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const videoProject = portfolioConfig.projects.find((p) => p.id === videoProjectId) ?? null;
  const expandedProject = portfolioConfig.projects.find((p) => p.id === expandedProjectId) ?? null;

  return (
    <section id="portfolio" className="section-padding bg-secondary">
      <div className="section-container">

        {/* HEADER */}
        <SectionHeader subtitle={t("subtitle")} title={t("title")} />

        {/* PROJECT LIST — zigzag layout via alternating direction:rtl */}
        <div className="flex flex-col gap-16">
          {portfolioConfig.projects.map((project, index) => (
            <div
              key={project.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-start ${index % 2 === 1 ? "md:[direction:rtl]" : ""}`}
            >
              {/* IMAGE CAROUSEL with live-demo hover overlay */}
              <div className="relative group">
                <Carousel images={project.images} alt={t(`items.${project.id}.title`)} interval={10000} />

                {/* LIVE OVERLAY */}
                <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-gray-800 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors pointer-events-auto"
                    >
                      <FiGlobe size={14} />
                      {t("liveOpen")}
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 bg-white/20 text-white/70 text-sm px-5 py-2.5 rounded-full cursor-not-allowed pointer-events-auto">
                      <FiX size={16} />
                      {t("noDemo")}
                    </span>
                  )}
                </div>
              </div>

              {/* CONTENT — type badge, title, description, tags, action links */}
              <div className="flex flex-col gap-4 min-h-48 md:[direction:ltr]">
                <p className="text-xs font-semibold tracking-widest uppercase text-accent">
                  {t(`items.${project.id}.type`)}
                </p>
                <h3 className="text-2xl font-semibold text-main">
                  {t(`items.${project.id}.title`)}
                </h3>

                {/* DESCRIPTION — max 5 lines */}
                <div>
                  <p
                    className="leading-relaxed text-sm text-muted"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {t(`items.${project.id}.description`)}
                  </p>
                  {t(`items.${project.id}.description`).length > 200 && (
                    <ReadMoreButton onClick={() => setExpandedProjectId(project.id)} />
                  )}
                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>

                {/* LINKS */}
                <div className="flex gap-3 flex-wrap">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <FiGlobe size={14} />
                      {t("liveOpen")}
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      <FaGithub size={14} />
                      Code
                    </a>
                  )}
                  {project.videos.length > 0 && (
                    <button
                      onClick={() => setVideoProjectId(project.id)}
                      className="btn btn-primary"
                    >
                      <FiVideo size={14} />
                      Video
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* VIDEO MODAL */}
      {videoProject && (
        <Modal
          title={t(`items.${videoProject.id}.title`)}
          onClose={() => setVideoProjectId(null)}
        >
          <VideoContent project={videoProject} />
        </Modal>
      )}

      {/* DESCRIPTION MODAL */}
      {expandedProject && (
        <Modal
          title={t(`items.${expandedProject.id}.title`)}
          onClose={() => setExpandedProjectId(null)}
        >
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              {t(`items.${expandedProject.id}.type`)}
            </p>
            <div className="flex flex-wrap gap-2">
              {expandedProject.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {t(`items.${expandedProject.id}.description`)}
            </p>
          </div>
        </Modal>
      )}

    </section>
  );
}
