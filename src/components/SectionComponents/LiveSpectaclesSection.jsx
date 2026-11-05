"use client";

import React from "react";
import Link from "next/link";
import {
  Ticket,
  MapPin,
  Calendar,
  ChevronRight,
  Map,
  Navigation,
} from "lucide-react";

const LIVE_EVENTS = [
  {
    id: "starlight-world-tour",
    category: "POP • WORLD TOUR",
    title: "Starlight World Tour 2025",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    badge: "SELLING FAST",
    badgeColor: "pink",
    venue: "Chase Center • San Francisco, CA",
    date: "Fri, Nov 14 • 8:00 PM PST",
    startingPrice: "$78",
    link: "#find-seats-starlight",
  },
  {
    id: "warriors-lakers",
    category: "NBA BASKETBALL • WESTERN CONF",
    title: "Warriors vs. Lakers",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80",
    badge: "RIVALRY GAME",
    badgeColor: "green",
    venue: "Chase Center • San Francisco, CA",
    date: "Sun, Nov 16 • 5:30 PM PST",
    startingPrice: "$115",
    link: "#find-seats-warriors",
  },
];

/**
 * LiveSpectaclesSection Component
 * Shows "Concerts & Arena Sports" cards and the "Looking for a specific theater experience?" venue discovery banner.
 */
export default function LiveSpectaclesSection({
  events = LIVE_EVENTS,
  title = "Concerts & Arena Sports",
  badge = "LIVE SPECTACLES",
  seeAllText = "Explore All Live Events",
  seeAllLink = "#",
  className = "",
}) {
  return (
    <section
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 ${className}`}
    >
      {/* 1. Section Header */}
      <div className="w-full flex items-end justify-between gap-4 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#10B981] font-mono">
            <Ticket className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{badge}</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            {title}
          </h2>
        </div>

        {seeAllText && (
          <Link
            href={seeAllLink}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#10B981] hover:text-[#34D399] transition-colors group shrink-0"
          >
            <span>{seeAllText}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* 2. Side-by-Side Wide Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="group relative rounded-2xl overflow-hidden bg-[#121522] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0B0D14]/80 flex flex-col sm:flex-row items-stretch"
          >
            {/* Left Media Image */}
            <div className="relative w-full sm:w-[45%] min-h-[200px] sm:min-h-full overflow-hidden bg-[#0B0D14] shrink-0">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(18, 21, 34, 0.2) 0%, rgba(18, 21, 34, 0) 50%, rgba(18, 21, 34, 0.8) 100%)",
                }}
              />

              {/* Top Badge */}
              {event.badge && (
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider font-mono shadow-md ${
                      event.badgeColor === "pink"
                        ? "bg-[#FF2E63] text-white shadow-[#FF2E63]/30"
                        : "bg-[#10B981] text-[#052E16] shadow-[#10B981]/30"
                    }`}
                  >
                    {event.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Right Information Area */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                {/* Category tag */}
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                  {event.category}
                </span>

                {/* Event Title */}
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-[#FFA4B6] transition-colors leading-snug">
                  {event.title}
                </h3>

                {/* Venue and Schedule Info */}
                <div className="space-y-1.5 pt-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Find Seats Action */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Tickets from
                  </span>
                  <span className="font-heading font-black text-lg text-white">
                    {event.startingPrice}
                  </span>
                </div>

                <Link
                  href={event.link}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF2E63] via-[#FF3B6F] to-[#FF4B72] text-white text-xs font-extrabold uppercase tracking-wider shadow-[0_6px_20px_rgba(255,46,99,0.45)] hover:shadow-[0_8px_25px_rgba(255,46,99,0.65)] hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  FIND SEATS
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Venue Experience Discovery Bar */}
      <div className="mt-6 w-full rounded-2xl bg-[#121520] border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
          {/* Green Map Icon Circle */}
          <div className="w-11 h-11 rounded-xl bg-[#10B981] flex items-center justify-center shrink-0 shadow-[0_6px_18px_rgba(16,185,129,0.35)]">
            <Map className="w-5 h-5 text-[#042417] stroke-[2.5]" />
          </div>

          {/* Description */}
          <div className="space-y-0.5">
            <h4 className="font-heading font-bold text-sm sm:text-base text-white tracking-tight">
              Looking for a specific theater experience?
            </h4>
            <p className="font-sans text-xs text-slate-400 leading-snug">
              Browse by screen technology: IMAX Laser 70mm, Dolby Vision, Barco
              Escape, and boutique dine-in lounges.
            </p>
          </div>
        </div>

        {/* Find Venues Near SF Button */}
        <Link
          href="#venues-near-sf"
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#1C2234] hover:bg-[#252D45] text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-white/10 transition-colors shrink-0 self-end sm:self-auto"
        >
          <Navigation className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Find Venues Near SF</span>
        </Link>
      </div>
    </section>
  );
}

