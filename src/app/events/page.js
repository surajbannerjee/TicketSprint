"use client";

import React, { useState } from "react";
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

const EVENTS_DATA = [
  {
    id: "starlight-tour",
    title: "Starlight World Tour 2025",
    subTitle: "Pop • Electronic • Live Laser Show",
    tag: "SELLING FAST",
    tagColor: "bg-[#FF2E63] text-white",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&auto=format&fit=crop&q=80",
    venue: "Chase Center",
    city: "San Francisco, CA",
    date: "Fri, Nov 14, 2025",
    time: "8:00 PM PST",
    price: "$78",
    category: "concerts",
    rating: "98% Demand",
  },
  {
    id: "warriors-lakers",
    title: "Warriors vs. Lakers",
    subTitle: "NBA Basketball • Western Conf Prime Clash",
    tag: "RIVALRY GAME",
    tagColor: "bg-[#10B981] text-[#052E16]",
    image:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&auto=format&fit=crop&q=80",
    venue: "Chase Center",
    city: "San Francisco, CA",
    date: "Sun, Nov 16, 2025",
    time: "5:30 PM PST",
    price: "$115",
    category: "sports",
    rating: "99% Sold",
  },
  {
    id: "neon-symphony",
    title: "The Midnight Symphony: Live in Concert",
    subTitle: "Orchestral • Cinema Scores & Choral",
    tag: "LIMITED RUN",
    tagColor: "bg-[#6366F1] text-white",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    venue: "Davies Symphony Hall",
    city: "San Francisco, CA",
    date: "Sat, Nov 22, 2025",
    time: "7:30 PM PST",
    price: "$65",
    category: "concerts",
    rating: "95% Demand",
  },
  {
    id: "f1-viewing-dome",
    title: "Grand Prix Immersive 360° Viewing Dome",
    subTitle: "Motorsport • 4K 120fps Laser Projection",
    tag: "VIP EXPERIENCE",
    tagColor: "bg-amber-400 text-black",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80",
    venue: "The Embarcadero Arena",
    city: "San Francisco, CA",
    date: "Sun, Nov 30, 2025",
    time: "1:00 PM PST",
    price: "$45",
    category: "sports",
    rating: "90% Demand",
  },
  {
    id: "cyberpunk-rave",
    title: "Neon Horizon Bass & Synth Festival",
    subTitle: "EDM • 360 Spatial Audio Dome",
    tag: "STAGE PASS",
    tagColor: "bg-[#FF4F72] text-white",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    venue: "Bill Graham Civic Auditorium",
    city: "San Francisco, CA",
    date: "Fri, Dec 5, 2025",
    time: "9:00 PM PST",
    price: "$55",
    category: "festivals",
    rating: "94% Demand",
  },
  {
    id: "standup-champions",
    title: "All-Star Comedy Night Live",
    subTitle: "Standup Comedy • Front Row Cocktails",
    tag: "HOT TICKET",
    tagColor: "bg-emerald-400 text-black",
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&auto=format&fit=crop&q=80",
    venue: "The Masonic San Francisco",
    city: "San Francisco, CA",
    date: "Sat, Dec 13, 2025",
    time: "8:00 PM PST",
    price: "$40",
    category: "comedy",
    rating: "92% Demand",
  },
];

export default function EventsPage() {
  const { currentCity, toggleWishlist, isInWishlist } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Spectacles" },
    { id: "concerts", label: "Music & World Tours" },
    { id: "sports", label: "NBA & Sports" },
    { id: "festivals", label: "EDM & Festivals" },
    { id: "comedy", label: "Comedy & Standup" },
  ];

  const filteredEvents = EVENTS_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#0B0D14] text-[#e2e2ec] font-sans min-h-screen pb-24">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#121624] border-b border-white/5 py-12 sm:py-16">
        <div className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 bg-[#FF2E63]/20 blur-[130px] rounded-full" />
        <div className="pointer-events-none absolute top-1/2 -left-20 w-80 h-80 bg-[#10B981]/15 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Live Spectacles & Stadiums</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Concerts & Arena Sports
            </h1>
            <p className="text-sm sm:text-base text-pinkT leading-relaxed">
              Experience the world&apos;s biggest music tours and high-stakes games in {currentCity}. Real-time interactive seat picking with zero scalper markups.
            </p>
          </div>

          {/* Search & Toolstrip */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#191b23] border border-white/10 w-full sm:max-w-md focus-within:border-[#FF2E63]">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search concerts, teams, arenas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 outline-none border-none"
              />
            </div>

            {/* Location Pill */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#191b23] border border-white/10 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Showing events for: <strong className="text-white">{currentCity}</strong></span>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-6 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#FF2E63] text-white shadow-md shadow-[#FF2E63]/30"
                    : "bg-[#191b23] text-slate-400 hover:text-white hover:bg-[#20253b] border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs uppercase font-extrabold text-[#94a3b8] tracking-wider">
            Live Spectacles ({filteredEvents.length} Events)
          </span>
          <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Live Seating Allocation Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => {
            const isBookmarked = isInWishlist(evt.id);
            return (
              <div
                key={evt.id}
                className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-[#121522] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0B0D14]/80"
              >
                {/* Event Image Banner */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-black">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121522] via-[#121522]/30 to-transparent" />

                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black tracking-wider shadow-md ${evt.tagColor}`}
                    >
                      {evt.tag}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist({
                        id: evt.id,
                        title: evt.title,
                        posterImage: evt.image,
                        format: "Live Event",
                        rating: evt.rating,
                        duration: evt.time,
                        genre: evt.subTitle,
                        link: "/seat-selection?movie=starlight-tour&venue=Chase+Center",
                      });
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-[#FF2E63] text-white border border-white/10 transition-colors cursor-pointer"
                    title="Save to Watchlist"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked ? "fill-[#FF2E63] text-[#FF2E63]" : ""
                      }`}
                    />
                  </button>

                  {/* Demand Pill */}
                  <div className="absolute bottom-2.5 left-3">
                    <span className="text-[11px] font-bold text-white bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                      🔥 {evt.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#FF2E63] font-bold uppercase tracking-wider block">
                      {evt.subTitle}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-pinkT transition-colors line-clamp-1">
                      {evt.title}
                    </h3>
                  </div>

                  {/* Location & Time Metadata */}
                  <div className="space-y-1 text-xs text-[#94a3b8] bg-[#191b23]/70 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                      <span className="truncate">
                        {evt.venue} • {evt.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                      <span>
                        {evt.date} • {evt.time}
                      </span>
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div>
                      <span className="text-[10px] uppercase text-[#94a3b8] font-bold block">
                        Tickets from
                      </span>
                      <span className="font-heading text-lg font-black text-white">
                        {evt.price}
                      </span>
                    </div>

                    <ActionButton
                      title="Find Seats"
                      link={`/seat-selection?movie=${evt.id}&venue=${encodeURIComponent(
                        evt.venue
                      )}&time=${encodeURIComponent(evt.time)}&format=Arena+Live`}
                      variant="primary"
                      size="sm"
                      className="shadow-md shadow-[#FF2E63]/30"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

