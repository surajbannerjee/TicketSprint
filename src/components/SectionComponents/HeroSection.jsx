"use client";

import React, { useState } from "react";
import ActionButton from "@/components/Common/ActionButton";
import { Star, Volume2, Armchair } from "lucide-react";
import { useApp } from "@/context/AppContext";

/**
 * Reusable HeroSection Component
 * Full-screen edge-to-edge cinematic banner with responsive layout.
 */
export default function HeroSection({
  movie = {
    title: "CYBER RUNNER",
    highlight: "2099",
    watermark: "THE ROGUE CHRONICLES",
    description:
      "In a fractured neo-megacity, an augmented black-ops runner uncovers an artificial consciousness syndicate threatening to dismantle humanity's neural grid.",
    backdropImage:
      "https://www.movy.sx/img/original/58v1KFe3rxvHrYM1hLH5ScpwqNR.jpg/w780-h1092-q72-fx50-fy28.webp",
    exclusiveBadge: "IMAX 3D EXCLUSIVE",
    certificate: "UA 16+",
    genre: "Sci-Fi / Action / Thriller",
    duration: "2h 38m",
    criticScore: "96%",
    imdbRating: "8.9",
    audioVisualSpec: "Dolby Atmos • 70mm Dual Laser",
    ticketButton: {
      title: "BOOK TICKETS NOW",
      link: "/movies/dune-part-two",
    },
    trailerButton: {
      title: "WATCH TRAILER",
      link: "/movies/dune-part-two",
    },
  },
  formats = [
    { id: "all", label: "All Formats" },
    { id: "imax", label: "IMAX 3D" },
    { id: "dolby", label: "Dolby Cinema" },
    { id: "4dx", label: "4DX Experience" },
    { id: "screenx", label: "ScreenX 270°" },
    { id: "vip", label: "VIP Recliner", hasIcon: true },
  ],
  locationStatus,
  onFormatChange,
  className = "",
}) {
  const { currentCity } = useApp();
  const [selectedFormat, setSelectedFormat] = useState(formats[0]?.id || "all");
  const displayLocation = locationStatus || `Showing real-time availability in ${currentCity}`;

  const handleFormatClick = (id) => {
    setSelectedFormat(id);
    if (onFormatChange) onFormatChange(id);
  };

  return (
    <section
      className={`relative w-full min-h-[calc(100vh-64px)] sm:min-h-[660px] lg:min-h-[740px] flex flex-col justify-between overflow-hidden bg-[#0B0D14] border-b border-white/10 ${className}`}
    >
      {/* 1. Full-Screen Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('${movie.backdropImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2E63]/15 via-transparent to-[#6366F1]/25" />
      </div>

      {/* Multi-layered Vignette Gradients for High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-[#0B0D14]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D14] via-[#0B0D14]/70 to-transparent w-full md:w-3/4 pointer-events-none" />

      {/* 2. Main Hero Content Constrained Inside Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-end pt-20 pb-8 sm:pb-12">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          {/* Top Meta Badges & Ratings Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs">
            {movie.exclusiveBadge && (
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#FF2E63] text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md shadow-[#FF2E63]/30">
                {movie.exclusiveBadge}
              </span>
            )}

            {movie.certificate && (
              <span className="px-2 py-0.5 rounded bg-black/60 border border-white/15 text-slate-200 font-semibold text-[10px] sm:text-[11px]">
                {movie.certificate}
              </span>
            )}

            <span className="text-pinkT font-medium text-xs">
              {movie.genre} • {movie.duration}
            </span>

            {movie.criticScore && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-200 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-semibold text-[#10B981]">
                  {movie.criticScore}
                </span>
              </div>
            )}

            {movie.imdbRating && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-200 text-xs">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">{movie.imdbRating}</span>
                <span className="text-[10px] text-pinkT uppercase">IMDb</span>
              </div>
            )}
          </div>

          {/* Faint Watermark Background Title */}
          {movie.watermark && (
            <div className="select-none pointer-events-none -mb-5 sm:-mb-6 text-[10px] sm:text-xs font-extrabold tracking-[0.25em] text-white/15 uppercase font-heading">
              {movie.watermark}
            </div>
          )}

          {/* Main Title */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight uppercase">
            {movie.title}{" "}
            {movie.highlight && (
              <span className="text-pink">{movie.highlight}</span>
            )}
          </h1>

          {/* Synopsis Description */}
          <p className="font-sans text-pinkT text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl">
            {movie.description}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <ActionButton
              title={movie.ticketButton?.title || "BOOK TICKETS NOW"}
              link={movie.ticketButton?.link || "/movies/dune-part-two"}
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
            />

            <ActionButton
              title={movie.trailerButton?.title || "WATCH TRAILER"}
              link={movie.trailerButton?.link || "/movies/dune-part-two"}
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
            />

            {movie.audioVisualSpec && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs text-pinkT">
                <Volume2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span className="text-[11px] text-pinkT truncate">
                  {movie.audioVisualSpec}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bottom Format Filters Bar */}
      <div className="relative z-10 w-full bg-[#0B0D14]/90 border-t border-white/10 backdrop-blur-md py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          {/* Format Selection Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {formats.map((fmt) => {
              const isActive = selectedFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => handleFormatClick(fmt.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-[#FF2E63] text-white shadow-md shadow-[#FF2E63]/30"
                      : "bg-white/5 hover:bg-white/10 text-pinkT hover:text-white"
                  }`}
                >
                  {fmt.hasIcon && (
                    <Armchair
                      className={`w-3.5 h-3.5 ${
                        isActive ? "text-white" : "text-[#10B981]"
                      }`}
                    />
                  )}
                  {fmt.label}
                </button>
              );
            })}
          </div>

          {/* Real-time Status Notification */}
          {displayLocation && (
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-pinkT shrink-0 self-start sm:self-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span>{displayLocation}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
