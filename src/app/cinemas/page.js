"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Film,
  MapPin,
  Sparkles,
  Search,
  Navigation,
  Clock,
  Car,
  Wine,
  Volume2,
  Tv,
  CheckCircle,
} from "lucide-react";
import ActionButton from "@/components/Common/ActionButton";
import { useApp } from "@/context/AppContext";

const CINEMAS_DATA = [
  {
    id: "amc-metreon",
    name: "AMC Metreon 16 & IMAX - San Francisco",
    tag: "Grand Auditoria",
    address: "135 4th St, Downtown SF",
    distance: "1.2 miles away",
    formatBadge: "IMAX 70mm Dual Laser",
    amenities: [
      "IMAX 70mm Dual Laser",
      "Dolby Atmos Audio",
      "Plush Heated Recliners",
      "Reserved Seating",
      "Validated Parking (3 hrs)",
    ],
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    nowShowing: ["Dune: Part Two", "Neon Velocity", "Quantum Heist"],
    screenCount: 16,
  },
  {
    id: "regal-westpark",
    name: "Regal Edwards Westpark 14 - Dolby & ScreenX",
    tag: "Dolby Premier",
    address: "10100 S De Anza Blvd, Bay Area",
    distance: "3.4 miles away",
    formatBadge: "Dolby Vision HDR",
    amenities: [
      "Dolby Vision HDR",
      "Premium Large Format",
      "RealD 3D",
      "Luxury Power Rockers",
      "Craft Beer Bar",
    ],
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80",
    nowShowing: ["Dune: Part Two", "The Midnight Symphony"],
    screenCount: 14,
  },
  {
    id: "alamo-mission",
    name: "Alamo Drafthouse Cinema - New Mission",
    tag: "Dine-In Lounge",
    address: "2550 Mission St, San Francisco",
    distance: "2.1 miles away",
    formatBadge: "35mm Analog & Dine-In",
    amenities: [
      "35mm Analog Projection",
      "Full Table Service",
      "Microbrewery Onsite",
      "Strict No-Talking Policy",
    ],
    image:
      "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800&auto=format&fit=crop&q=80",
    nowShowing: ["Dune: Part Two", "Valkyrie: Eclipse"],
    screenCount: 5,
  },
  {
    id: "dolby-van-ness",
    name: "Dolby Cinema at 1000 Van Ness",
    tag: "Acoustic Prime",
    address: "1000 Van Ness Ave, San Francisco",
    distance: "1.8 miles away",
    formatBadge: "Dolby Atmos 64-Ch",
    amenities: [
      "Dual 4K Laser Projection",
      "Subwoofer-Equipped Seats",
      "Ultra-Contrast Blacks",
      "Express Concessions",
    ],
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",
    nowShowing: ["Dune: Part Two", "Neon Velocity"],
    screenCount: 12,
  },
];

export default function CinemasPage() {
  const { currentCity, openLocationModal } = useApp();
  const [selectedTech, setSelectedTech] = useState("all");
  const [searchVenue, setSearchVenue] = useState("");

  const techFilters = [
    { id: "all", label: "All Theatres" },
    { id: "imax", label: "IMAX 70mm Laser" },
    { id: "dolby", label: "Dolby Cinema" },
    { id: "dine-in", label: "Boutique Dine-In" },
  ];

  const filteredCinemas = CINEMAS_DATA.filter((cinema) => {
    const matchesSearch =
      cinema.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
      cinema.address.toLowerCase().includes(searchVenue.toLowerCase());
    const matchesTech =
      selectedTech === "all" ||
      cinema.formatBadge.toLowerCase().includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <div className="w-full bg-[#0B0D14] text-[#e2e2ec] font-sans min-h-screen pb-24">
      {/* 1. Hero Header */}
      <section className="relative w-full overflow-hidden bg-[#121624] border-b border-white/5 py-12 sm:py-16">
        <div className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 bg-[#10B981]/15 blur-[130px] rounded-full" />
        <div className="pointer-events-none absolute top-1/2 -left-20 w-80 h-80 bg-[#FF2E63]/15 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/30 text-[#6366F1] text-xs font-bold uppercase tracking-wider">
              <Film className="w-3.5 h-3.5" />
              <span>Cinema & Theatre Guide</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Cinemas & Auditoria
            </h1>
            <p className="text-sm sm:text-base text-pinkT leading-relaxed">
              Find state-of-the-art IMAX 70mm screens, Dolby Atmos spatial auditoria, and luxury boutique dine-in lounges in {currentCity}.
            </p>
          </div>

          {/* Search & Toolstrip */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#191b23] border border-white/10 w-full sm:max-w-md focus-within:border-[#10B981]">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by venue name, street, or amenities..."
                value={searchVenue}
                onChange={(e) => setSearchVenue(e.target.value)}
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
                <span>Selected: <strong className="text-white">{currentCity}</strong></span>
              </div>
              <span className="text-[10px] text-[#FF2E63] font-bold uppercase">Change City</span>
            </button>
          </div>

          {/* Tech Filters Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-6 scrollbar-none">
            {techFilters.map((tech) => (
              <button
                key={tech.id}
                type="button"
                onClick={() => setSelectedTech(tech.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedTech === tech.id
                    ? "bg-[#10B981] text-[#052E16] shadow-md shadow-[#10B981]/30"
                    : "bg-[#191b23] text-slate-400 hover:text-white hover:bg-[#20253b] border border-white/5"
                }`}
              >
                {tech.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Cinemas List Canvas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {filteredCinemas.map((cinema) => (
          <div
            key={cinema.id}
            className="group relative flex flex-col lg:flex-row rounded-3xl overflow-hidden bg-[#121624] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
          >
            {/* Left Cinema Photo Backdrop */}
            <div className="relative w-full lg:w-96 aspect-video lg:aspect-auto overflow-hidden bg-black shrink-0">
              <img
                src={cinema.image}
                alt={cinema.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#FF2E63] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                  {cinema.tag}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 font-bold">
                  {cinema.screenCount} Screens
                </span>
                <span className="font-semibold text-[#10B981]">
                  {cinema.distance}
                </span>
              </div>
            </div>

            {/* Right Details Container */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white group-hover:text-pinkT transition-colors">
                    {cinema.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-[#3131c0]/40 text-[#c0c1ff] text-xs font-bold uppercase tracking-wider border border-[#3131c0]">
                    {cinema.formatBadge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#94a3b8] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>{cinema.address} • {cinema.distance}</span>
                </p>
              </div>

              {/* Amenities Grid */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Auditorium & Sound Features:
                </span>
                <div className="flex flex-wrap gap-2">
                  {cinema.amenities.map((am, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-[#191b23] border border-white/5 text-xs text-slate-200 font-medium"
                    >
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>

              {/* Now Playing Mini Strip */}
              <div className="p-3.5 rounded-2xl bg-[#191b23]/80 border border-white/5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#FF2E63] font-bold">Now Showing:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cinema.nowShowing.map((mov, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-white"
                      >
                        {mov}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ActionButton
                    title="View Showtimes & Book"
                    link="/movies/dune-part-two#showtimes-section"
                    variant="primary"
                    size="sm"
                    className="shadow-md shadow-[#FF2E63]/25"
                  />
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#10B981] transition-colors"
                    title="Get Directions"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

