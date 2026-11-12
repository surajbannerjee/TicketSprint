"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ActionButton from "@/components/Common/ActionButton";
import { Ticket, MapPin, Calendar, ChevronRight, Navigation, Map } from "lucide-react";
import { EVENTS } from "@/data/apiData";

export default function LiveSpectaclesSection({
  title = "Concerts & Arena Sports",
  badge = "LIVE SPECTACLES",
  seeAllText = "Explore All Live Events",
  seeAllLink = "/events",
  className = "",
}) {
  const [eventsList, setEventsList] = useState(EVENTS.slice(0, 2));

  // Fetch live events dynamically from /api/events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setEventsList(json.data.slice(0, 2));
          }
        }
      } catch (e) {
        console.warn("API events fetch error:", e);
      }
    }
    fetchEvents();
  }, []);

  return (
    <section
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 ${className}`}
    >
      {/* 1. Section Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6366F1]/15 text-[#6366F1] border border-[#6366F1]/30 text-[10px] sm:text-xs font-black tracking-wider uppercase mb-2">
            <Ticket className="w-3 h-3 stroke-[2.5]" />
            <span>{badge}</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
        </div>

        <Link
          href={seeAllLink}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FF2E63] hover:text-[#ff4f72] transition-colors group self-start sm:self-auto cursor-pointer"
        >
          <span>{seeAllText}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 2. Main 12-Column Grid (6 cols / 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 2 Event Cards (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {eventsList.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col sm:flex-row bg-[#151928] rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden shadow-lg"
            >
              {/* Event Poster Image */}
              <div className="relative w-full sm:w-44 md:w-48 lg:w-44 xl:w-52 h-44 sm:h-auto shrink-0 overflow-hidden bg-black/40">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent to-[#151928]/90" />

                {/* Badge Tag */}
                {event.badge && (
                  <span
                    className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                      event.badgeColor === "green"
                        ? "bg-[#10B981] text-[#052E16]"
                        : "bg-[#FF2E63] text-white"
                    }`}
                  >
                    {event.badge}
                  </span>
                )}
              </div>

              {/* Event Meta Content */}
              <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-3 min-w-0">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider text-pinkT uppercase block truncate">
                    {event.category}
                  </span>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-[#FF2E63] transition-colors leading-snug line-clamp-2">
                    {event.title}
                  </h3>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-pinkT shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Calendar className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span className="truncate">{event.date}</span>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-pinkT block leading-none">From</span>
                    <span className="font-heading text-sm sm:text-base font-extrabold text-white">
                      {event.startingPrice}
                    </span>
                  </div>

                  <ActionButton
                    title="Find Seats"
                    link={event.link}
                    variant="primary"
                    size="sm"
                    className="!px-4 !py-1.5 !text-xs whitespace-nowrap"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Interactive Venue Experience Guide (6 cols) */}
        <div className="lg:col-span-6 relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#121624] via-[#151928] to-[#121624] border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl">
          {/* Background Ambient Glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-[#6366F1]/20 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 bg-[#FF2E63]/15 blur-3xl rounded-full" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-bold uppercase tracking-wider">
              <Navigation className="w-3.5 h-3.5" />
              <span>West Bengal Stadiums & Arenas</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Book Tickets for Live Cricket & Mega Music Festivals
            </h3>

            <p className="text-xs sm:text-sm text-pinkT leading-relaxed max-w-lg">
              Explore 360° seat views, fast-track VIP gates, and express stadium concession passes for iconic venues including Eden Gardens, Eco Park Grounds, and Biswa Bangla Mela Prangan.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-pinkT uppercase block font-bold">Eden Gardens</span>
                <span className="text-sm font-extrabold text-white">66,000+ Capacity</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-pinkT uppercase block font-bold">Eco Park</span>
                <span className="text-sm font-extrabold text-white">Open Air Mega Stage</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-pinkT uppercase block font-bold">M-Ticket Express</span>
                <span className="text-sm font-extrabold text-[#10B981]">QR Scan at Turnstile</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <ActionButton
              title="Browse All Live Spectacles"
              link="/events"
              variant="primary"
              size="md"
              className="justify-center"
            />
            <ActionButton
              title="View Auditoria & Venues"
              link="/cinemas"
              variant="secondary"
              size="md"
              className="justify-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
