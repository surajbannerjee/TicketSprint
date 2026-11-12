"use client";

import React, { useState, useEffect } from "react";
import ActionButton from "@/components/Common/ActionButton";
import { Star, Volume2, Armchair, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useApp } from "@/context/AppContext";

/**
 * Reusable & Dynamic HeroSection Component
 * Connects directly to /api/movies (TMDB & Local API).
 * Rotates movies dynamically or shows the current featured blockbuster.
 * Banner buttons dynamically link to specific booking & trailer targets.
 */
export default function HeroSection({
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
  const [moviesList, setMoviesList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch movies from /api/movies dynamically
  useEffect(() => {
    async function loadBannerMovies() {
      try {
        const res = await fetch("/api/movies");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            setMoviesList(json.data);
          }
        }
      } catch (e) {
        console.warn("HeroSection fetch error, using default:", e);
      }
    }
    loadBannerMovies();
  }, []);

  // Filter movies by selected format if selected
  const activeMovies = selectedFormat === "all"
    ? moviesList
    : moviesList.filter((m) => m.format?.toLowerCase() === selectedFormat.toLowerCase());

  const currentPool = activeMovies.length > 0 ? activeMovies : moviesList;

  // Auto-slide banner every 7 seconds
  useEffect(() => {
    if (currentPool.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentPool.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [currentPool]);

  // Current movie data fallback
  const fallbackMovie = {
    id: "dune-part-two",
    title: "DUNE: PART TWO",
    highlight: "IMAX",
    watermark: "THE SPRINT EXPERIENCE",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family in a breathtaking visual spectacle.",
    backdropImage:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1440&auto=format&fit=crop&q=80",
    exclusiveBadge: "IMAX 70MM EXCLUSIVE",
    certificate: "UA 16+",
    genre: "Sci-Fi / Adventure",
    duration: "2h 46m",
    criticScore: "95%",
    imdbRating: "8.6",
    audioVisualSpec: "Dolby Atmos • 70mm Dual Laser",
    bookLink: "/movies/dune-part-two",
    trailerLink: "https://www.youtube.com/results?search_query=dune+part+two+trailer",
  };

  const activeRawMovie = currentPool[currentIndex] || fallbackMovie;

  // Fully dynamic button links specific to active movie
  const movieSlug = activeRawMovie.id || "dune-part-two";
  const dynamicBookLink = `/seat-selection?movie=${movieSlug}`;
  const dynamicTrailerLink = `/movies/${movieSlug}#trailer`;

  const movie = {
    id: movieSlug,
    title: activeRawMovie.title,
    highlight: activeRawMovie.highlight || activeRawMovie.format || "IMAX",
    watermark: activeRawMovie.watermark || "NOW PLAYING IN AUDITORIA",
    description: activeRawMovie.synopsis || activeRawMovie.description || fallbackMovie.description,
    backdropImage: activeRawMovie.backdropImage || fallbackMovie.backdropImage,
    exclusiveBadge: activeRawMovie.exclusiveBadge || `${activeRawMovie.format || "IMAX"} EXCLUSIVE`,
    certificate: activeRawMovie.certificate || "UA 16+",
    genre: activeRawMovie.genre || "Sci-Fi",
    duration: activeRawMovie.duration || "2h 30m",
    criticScore: activeRawMovie.criticScore || activeRawMovie.rating || "94%",
    imdbRating: activeRawMovie.imdbRating || "8.5",
    audioVisualSpec: activeRawMovie.audioVisualSpec || "Dolby Atmos • Laser 4K",
    ticketButton: {
      title: "BOOK TICKETS NOW",
      link: dynamicBookLink,
    },
    trailerButton: {
      title: "WATCH TRAILER",
      link: dynamicTrailerLink,
    },
  };

  const displayLocation = locationStatus || `Showing real-time availability in ${currentCity}`;

  const handleFormatClick = (id) => {
    setSelectedFormat(id);
    setCurrentIndex(0);
    if (onFormatChange) onFormatChange(id);
  };

  const handleNextSlide = () => {
    if (currentPool.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % currentPool.length);
    }
  };

  const handlePrevSlide = () => {
    if (currentPool.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + currentPool.length) % currentPool.length);
    }
  };

  return (
    <section
      className={`relative w-full min-h-[calc(100vh-64px)] sm:min-h-[660px] lg:min-h-[740px] flex flex-col justify-between overflow-hidden bg-[#0B0D14] border-b border-white/10 ${className}`}
    >
      {/* 1. Full-Screen Dynamic Background Image */}
      <div
        key={movie.backdropImage}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out animate-in fade-in zoom-in-105"
        style={{
          backgroundImage: `url('${movie.backdropImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2E63]/15 via-transparent to-[#6366F1]/25" />
      </div>

      {/* Multi-layered Vignette Gradients for High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-[#0B0D14]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D14] via-[#0B0D14]/70 to-transparent w-full md:w-3/4 pointer-events-none" />

      {/* Slide Navigation Arrows (Desktop) */}
      {currentPool.length > 1 && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-2">
          <button
            type="button"
            onClick={handlePrevSlide}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#FF2E63] text-white border border-white/10 hover:border-transparent flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
            aria-label="Previous Banner Movie"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNextSlide}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#FF2E63] text-white border border-white/10 hover:border-transparent flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
            aria-label="Next Banner Movie"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

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

          {/* Main Dynamic Title */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight uppercase">
            {movie.title}{" "}
            {movie.highlight && (
              <span className="text-[#FF2E63]">{movie.highlight}</span>
            )}
          </h1>

          {/* Synopsis Description */}
          <p className="font-sans text-pinkT text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
            {movie.description}
          </p>

          {/* Fully Dynamic Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <ActionButton
              title={movie.ticketButton.title}
              link={movie.ticketButton.link}
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
            />

            <ActionButton
              title={movie.trailerButton.title}
              link={movie.trailerButton.link}
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

          {/* Slide Indicator Dots */}
          {currentPool.length > 1 && (
            <div className="flex items-center gap-1.5 pt-2">
              {currentPool.slice(0, 8).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "w-7 bg-[#FF2E63]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Format Filters Bar (Clicking changes pool dynamically) */}
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
