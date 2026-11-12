"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Flame,
  Search,
  Filter,
  Bookmark,
  Share2,
  Trophy,
  Music,
  Tv,
} from "lucide-react";
import ActionButton from "@/components/Common/ActionButton";
import { useApp } from "@/context/AppContext";
import { EVENTS } from "@/data/apiData";

export default function EventsPage() {
  const { currentCity, openLocationModal, toggleWishlist, isInWishlist } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [eventsList, setEventsList] = useState(EVENTS);
  const [loading, setLoading] = useState(false);

  // Fetch events from /api/events dynamically
  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const res = await fetch("/api/events");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setEventsList(json.data);
          }
        }
      } catch (e) {
        console.warn("API events fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const categories = [
    { id: "all", label: "All Spectacles" },
    { id: "concerts", label: "Music & Concerts" },
    { id: "sports", label: "Live Stadium Sports" },
    { id: "festivals", label: "Music Festivals" },
    { id: "comedy", label: "Standup Comedy" },
  ];

  const filteredEvents = eventsList.filter((event) => {
    const matchesCategory =
      selectedCategory === "all" || event.categoryType === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#0B0D14] text-[#e2e2ec] font-sans min-h-screen pb-24">
      {/* 1. Hero Header */}
      <section className="relative w-full overflow-hidden bg-[#121624] border-b border-white/5 py-12 sm:py-16">
        <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 bg-[#FF2E63]/15 blur-[120px] rounded-full" />
        <div className="pointer-events-none absolute top-1/3 -right-20 w-96 h-96 bg-[#6366F1]/15 blur-[130px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2E63]/15 border border-[#FF2E63]/30 text-[#FF2E63] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Spectacles & Concerts</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Live Concerts & Stadium Sports
            </h1>
            <p className="text-sm sm:text-base text-pinkT leading-relaxed">
              Discover arena tours, high-stakes cricket derbies, and stand-up specials in {currentCity}. Real-time interactive seat maps and express turnstile passes.
            </p>
          </div>

          {/* Search & Location Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#191b23] border border-white/10 w-full sm:max-w-md focus-within:border-[#FF2E63]">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search concerts, teams, artists, or stadiums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 outline-none border-none"
              />
            </div>

            <button
              type="button"
              onClick={openLocationModal}
              className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-[#191b23] border border-white/10 hover:border-white/25 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Region: <strong className="text-white">{currentCity}</strong></span>
              </div>
              <span className="text-[10px] text-[#FF2E63] font-bold uppercase ml-2">Change</span>
            </button>
          </div>

          {/* Categories Pill Selector */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#FF2E63] text-white shadow-md shadow-[#FF2E63]/30"
                    : "bg-[#191b23] text-slate-300 hover:text-white hover:bg-[#20253b] border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Showing {filteredEvents.length} Spectacles
          </span>
          <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            Live Ticketing Active
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const bookmarked = isInWishlist(event.id);
              return (
                <div
                  key={event.id}
                  className="group rounded-3xl bg-[#121624] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-black/60"
                >
                  {/* Poster Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-transparent" />

                    {/* Tag badge */}
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md ${
                        event.badgeColor === "green"
                          ? "bg-[#10B981] text-[#052E16]"
                          : "bg-[#FF2E63] text-white"
                      }`}
                    >
                      {event.badge}
                    </span>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleWishlist({
                          id: event.id,
                          title: event.title,
                          posterImage: event.image,
                          format: event.category,
                          rating: event.rating,
                          duration: event.date,
                          genre: event.venue,
                          link: event.link,
                        })
                      }
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-[#FF2E63] transition-colors cursor-pointer"
                      title={bookmarked ? "Remove from Watchlist" : "Save to Watchlist"}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarked ? "fill-[#FF2E63] text-[#FF2E63]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF2E63] block">
                        {event.category}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#FF2E63] transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {event.venue} • {event.city}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Flame className="w-3.5 h-3.5 text-[#FF2E63] shrink-0" />
                        <span>{event.rating}</span>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Starting from</span>
                        <span className="font-heading text-lg font-extrabold text-white">
                          {event.startingPrice}
                        </span>
                      </div>

                      <ActionButton
                        title="Book Seats"
                        link={event.link}
                        variant="primary"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-16 text-slate-400 space-y-2">
            <p className="text-base font-bold text-white">No live spectacles match your filters</p>
            <p className="text-xs text-slate-500">Try switching categories or clearing search keywords.</p>
          </div>
        )}
      </section>
    </div>
  );
}
