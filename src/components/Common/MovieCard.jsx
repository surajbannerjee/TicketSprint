"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bookmark, Play, Calendar } from "lucide-react";

/**
 * MovieCard Component
 * Reusable movie card with equal height, custom #121522 matched gradient,
 * tags, ratings, trailer play, and booking action.
 *
 * @param {object} movie - Movie data object
 * @param {string} className - Optional container class
 */
export default function MovieCard({
  movie = {
    id: "1",
    title: "Dune: Awakening",
    posterImage:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    format: "IMAX",
    isNowShowing: true,
    rating: "94%",
    duration: "2h 46m",
    languages: "English • Spanish Dub",
    showtimes: "14 Showtimes Today",
    bookLink: "#book-seats",
    trailerLink: "#watch-trailer",
  },
  className = "",
}) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      className={`group relative flex flex-col justify-between h-full w-full rounded-2xl overflow-hidden bg-[#121522] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0B0D14]/80 ${className}`}
    >
      {/* 1. Poster Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#121522]">
        <img
          src={movie.posterImage}
          alt={movie.title}
          className="h-full w-full absolute inset-0 object-cover object-center transition-transform duration-500 "
        />

        {/* Gradient matched to #121522: subtle on top, heavy and seamless on bottom */}
        <div
          className="absolute inset-0 pointer-events-none z-5"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18, 21, 34, 0.45) 0%, rgba(18, 21, 34, 0.08) 18%, rgba(18, 21, 34, 0) 40%, rgba(18, 21, 34, 0.45) 68%, rgba(18, 21, 34, 0.88) 88%, #121522 100%)",
          }}
        />

        {/* Top Badges Row */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            {/* Now Showing Pill */}
            {movie.isNowShowing && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#10B981] text-[#052E16] text-[10px] font-bold tracking-wider uppercase  shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#052E16] animate-pulse" />
                NOW SHOWING
              </span>
            )}

            {/* Format Pill (IMAX, 4DX, Dolby, ScreenX) */}
            {movie.format && (
              <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-md">
                {movie.format}
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            aria-label="Save to watchlist"
            onClick={(e) => {
              e.preventDefault();
              setBookmarked(!bookmarked);
            }}
            className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-colors backdrop-blur-md"
          >
            <Bookmark
              className={`w-3.5 h-3.5 transition-colors ${bookmarked
                ? "fill-[#FF2E63] text-[#FF2E63]"
                : "text-white hover:text-[#FF2E63]"
                }`}
            />
          </button>
        </div>

        {/* Bottom Poster Row: Rating Pill & Play Trailer Button */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          {/* Rating & Duration */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#121522]/85 border border-white/15 backdrop-blur-md text-xs text-white shadow-sm">
            {movie.rating && (
              <span className="font-bold text-[#10B981] flex items-center gap-1">
                <span>🍃</span>
                {movie.rating}
              </span>
            )}
            {movie.duration && (
              <span className="text-slate-300 font-medium text-[11px]">
                • {movie.duration}
              </span>
            )}
          </div>

          {/* Play Trailer Button */}
          <Link
            href={movie.trailerLink || "#trailer"}
            aria-label={`Watch trailer for ${movie.title}`}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-[#FF2E63] border border-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </Link>
        </div>
      </div>

      {/* 2. Movie Info Area (Flex grow with uniform height) */}
      <div className="px-4 pt-3.5 pb-2 flex-1 flex flex-col justify-start min-h-[76px] space-y-1.5">
        <Link href={movie.bookLink || "#"} className="block">
          <h3 className="font-heading font-bold text-base text-white hover:text-[#FFA4B6] transition-colors line-clamp-1">
            {movie.title}
          </h3>
        </Link>

        {/* Languages and Showtimes info */}
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs">
          {movie.languages && (
            <span className="text-slate-400 font-medium">
              {movie.languages}
            </span>
          )}
          {movie.showtimes && (
            <span className="text-[#10B981] font-semibold">
              • {movie.showtimes}
            </span>
          )}
        </div>
      </div>

      {/* 3. Card Footer Action: Book Seats (Pinned to bottom) */}
      <div className="px-4 pb-4 pt-3 ">
        <Link
          href={movie.bookLink || "#"}
          className="w-full py-2.5 px-4 rounded-xl bg-[#171B2A] hover:bg-[#FF2E63] text-slate-200 hover:text-white border border-white/10 hover:border-[#FF2E63] text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md group-hover:shadow-[#FF2E63]/25"
        >
          <span>Book Seats</span>
          <Calendar className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
        </Link>
      </div>
    </div>
  );
}
