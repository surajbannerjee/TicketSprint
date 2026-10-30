"use client";

import React, { useState } from "react";
import ActionButton from "@/components/Common/ActionButton";
import {
  Star,
  Sparkles,
  Volume2,
  Armchair,
  Layers,
  Circle,
} from "lucide-react";

/**
 * Reusable HeroSection Component
 * Modeled accurately after the TicketSprint cinematic hero design.
 *
 * Supports complete customization via props, or runs with default Cyber Runner 2099 content.
 */
export default function HeroSection({
  movie = {
    title: "CYBER RUNNER",
    highlight: "2099",
    watermark: "THE ROGUE CHRONICLES",
    description:
      "In a fractured neo-megacity, an augmented black-ops runner uncovers an artificial consciousness syndicate threatening to dismantle humanity's neural grid.",
    backdropImage:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&q=80&auto=format&fit=crop",
    exclusiveBadge: "IMAX 3D EXCLUSIVE",
    certificate: "UA 16+",
    genre: "Sci-Fi / Action / Thriller",
    duration: "2h 38m",
    criticScore: "96%",
    imdbRating: "8.9",
    audioVisualSpec: "Dolby Atmos • 70mm Dual Laser",
    ticketButton: {
      title: "BOOK TICKETS NOW",
      link: "#book-tickets",
    },
    trailerButton: {
      title: "WATCH TRAILER",
      link: "#watch-trailer",
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
  locationStatus = "Showing real-time availability in San Francisco",
  onFormatChange,
  className = "",
}) {
  const [selectedFormat, setSelectedFormat] = useState(formats[0]?.id || "all");

  const handleFormatClick = (id) => {
    setSelectedFormat(id);
    if (onFormatChange) onFormatChange(id);
  };

  return (
    <section className={`relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 ${className}`}>
      {/* Cinematic Main Banner Container */}
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0B0D14] shadow-2xl flex flex-col justify-between">
        
        {/* Background Image with Depth & Fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('${movie.backdropImage}')`,
          }}
        >
          {/* Cyberpunk Atmospheric Color Tints */}
          <div className="absolute inset-0 bg-[#0B0D14]/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2E63]/20 via-transparent to-[#6366F1]/20" />
        </div>

        {/* Deep Multi-stop Vignette Overlays for Crisp Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-[#0B0D14]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D14] via-[#0B0D14]/80 to-transparent w-full md:w-3/4" />

        {/* Content Area */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex-1 flex flex-col justify-end max-w-3xl space-y-5">
          
          {/* Top Meta Badges & Ratings Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            {/* Exclusive Badge */}
            {movie.exclusiveBadge && (
              <span className="px-3 py-1 rounded-full bg-[#FF2E63] text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md shadow-[#FF2E63]/30">
                {movie.exclusiveBadge}
              </span>
            )}

            {/* Certificate Badge */}
            {movie.certificate && (
              <span className="px-2 py-0.5 rounded bg-black/60 border border-white/15 text-slate-200 font-semibold text-[11px]">
                {movie.certificate}
              </span>
            )}

            {/* Genre & Duration */}
            <span className="text-slate-300 font-medium hidden xs:inline">
              {movie.genre} • {movie.duration}
            </span>

            {/* Critic Score / Rotten Tomatoes Style Green Icon */}
            {movie.criticScore && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-semibold text-[#10B981]">{movie.criticScore}</span>
              </div>
            )}

            {/* IMDb Rating */}
            {movie.imdbRating && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-200">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">{movie.imdbRating}</span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">IMDb</span>
              </div>
            )}
          </div>

          {/* Faint Watermark Background Title */}
          {movie.watermark && (
            <div className="select-none pointer-events-none -mb-6 text-xs sm:text-sm font-extrabold tracking-[0.25em] text-white/10 uppercase">
              {movie.watermark}
            </div>
          )}

          {/* Main Title */}
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-none">
            {movie.title}{" "}
            {movie.highlight && (
              <span className="text-[#FFA4B6]">{movie.highlight}</span>
            )}
          </h1>

          {/* Description */}
          <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            {movie.description}
          </p>

          {/* Call to Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {/* Primary Action Button using Reusable ActionButton */}
            <ActionButton
              title={movie.ticketButton?.title || "BOOK TICKETS NOW"}
              link={movie.ticketButton?.link || "#book"}
              variant="primary"
              size="md"
            />

            {/* Secondary Action Button using Reusable ActionButton */}
            <ActionButton
              title={movie.trailerButton?.title || "WATCH TRAILER"}
              link={movie.trailerButton?.link || "#trailer"}
              variant="secondary"
              size="md"
            />

            {/* Audio/Video Specs Tag */}
            {movie.audioVisualSpec && (
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md text-xs text-slate-300">
                <Volume2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="font-mono text-[11px] text-slate-300">
                  {movie.audioVisualSpec}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Format Filters Bar */}
        <div className="relative z-10 w-full bg-[#0B0D14]/90 border-t border-white/10 backdrop-blur-md px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Format Selection Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            {formats.map((fmt) => {
              const isActive = selectedFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => handleFormatClick(fmt.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#FF2E63] text-white shadow-md shadow-[#FF2E63]/30"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
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
          {locationStatus && (
            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 self-start sm:self-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span>{locationStatus}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
