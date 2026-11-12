"use client";

import React, { useState, useEffect } from "react";
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
  Tag,
  ArrowUpDown,
} from "lucide-react";
import ActionButton from "@/components/Common/ActionButton";
import { useApp } from "@/context/AppContext";
import { CINEMAS } from "@/data/apiData";

export default function CinemasPage() {
  const { currentCity, openLocationModal, setHall } = useApp();
  const [selectedTech, setSelectedTech] = useState("all");
  const [searchVenue, setSearchVenue] = useState("");
  const [priceSort, setPriceSort] = useState("none"); // "none" | "asc" | "desc"
  const [cinemasList, setCinemasList] = useState(CINEMAS);
  const [loading, setLoading] = useState(false);

  // Fetch cinemas from /api/cinemas dynamically
  useEffect(() => {
    async function loadCinemas() {
      try {
        setLoading(true);
        const url = `/api/cinemas${priceSort === "asc" ? "?sort=price-asc" : priceSort === "desc" ? "?sort=price-desc" : ""}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setCinemasList(json.data);
          }
        }
      } catch (e) {
        console.warn("API cinemas fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadCinemas();
  }, [priceSort]);

  const techFilters = [
    { id: "all", label: "All Theatres" },
    { id: "imax", label: "IMAX 70mm Laser" },
    { id: "dolby", label: "Dolby Cinema / Atmos" },
    { id: "4dx", label: "4DX Dynamic" },
    { id: "heritage", label: "Heritage Halls" },
  ];

  const filteredCinemas = cinemasList.filter((cinema) => {
    const matchesSearch =
      cinema.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
      cinema.address.toLowerCase().includes(searchVenue.toLowerCase()) ||
      cinema.amenities.some((a) => a.toLowerCase().includes(searchVenue.toLowerCase()));
    const matchesTech =
      selectedTech === "all" ||
      cinema.formatBadge.toLowerCase().includes(selectedTech) ||
      cinema.amenities.some((a) => a.toLowerCase().includes(selectedTech));
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
              Find state-of-the-art IMAX 70mm screens, Dolby Atmos spatial auditoria, and luxury boutique dine-in lounges in {currentCity}. Compare ticket rates across halls in real-time.
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

            <div className="flex items-center gap-2.5">
              {/* Price Sort Filter */}
              <div className="flex items-center gap-1 bg-[#191b23] p-1 rounded-xl border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setPriceSort("none")}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    priceSort === "none" ? "bg-[#FF2E63] text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Default
                </button>
                <button
                  type="button"
                  onClick={() => setPriceSort("asc")}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    priceSort === "asc" ? "bg-[#10B981] text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Lowest Price
                </button>
                <button
                  type="button"
                  onClick={() => setPriceSort("desc")}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    priceSort === "desc" ? "bg-[#6366F1] text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Premium
                </button>
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
          </div>

          {/* Technology Filters */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {techFilters.map((tech) => (
              <button
                key={tech.id}
                type="button"
                onClick={() => setSelectedTech(tech.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTech === tech.id
                    ? "bg-[#10B981] text-[#052E16] font-extrabold shadow-md shadow-[#10B981]/25"
                    : "bg-[#191b23] text-slate-300 hover:text-white hover:bg-[#20253b] border border-white/5"
                }`}
              >
                {tech.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Venues Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Displaying {filteredCinemas.length} Venues
          </span>
          <span className="text-xs text-slate-400">
            Powered by TicketSprint Auditoria API
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 rounded-3xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCinemas.map((cinema) => (
              <div
                key={cinema.id}
                className="group rounded-3xl bg-[#121624] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row shadow-xl hover:shadow-2xl hover:shadow-black/60"
              >
                {/* Cinema Image */}
                <div className="relative w-full sm:w-56 md:w-60 h-48 sm:h-auto shrink-0 overflow-hidden bg-black/40">
                  <img
                    src={cinema.image}
                    alt={cinema.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent to-[#121624]" />

                  {/* Format badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                    {cinema.formatBadge}
                  </span>
                </div>

                {/* Cinema Details */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF2E63]">
                        {cinema.tag}
                      </span>
                      <span className="text-xs font-extrabold text-white">
                        {cinema.ticketPriceRange}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#10B981] transition-colors leading-snug">
                      {cinema.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{cinema.address}</span>
                    </p>
                  </div>

                  {/* Amenities checklist */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Venue Experience
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cinema.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-white/5 text-[11px] text-slate-300 flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3 text-[#10B981]" />
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Now Showing & Action */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] text-slate-500 block">Now Playing</span>
                      <span className="text-xs text-white font-semibold truncate block">
                        {cinema.nowShowing.join(", ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setHall({
                            id: cinema.id,
                            name: cinema.name,
                            area: cinema.address,
                            screens: `${cinema.screenCount} Screens`,
                            ticketPrice: cinema.cheapestPrice,
                            priceBadge: cinema.ticketPriceRange,
                            format: cinema.formatBadge,
                            cityName: cinema.city,
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#10B981] hover:text-[#052E16] text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        Set My Hall
                      </button>

                      <ActionButton
                        title="Book Seats"
                        link="/movies/dune-part-two#showtimes-section"
                        variant="primary"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCinemas.length === 0 && !loading && (
          <div className="text-center py-16 text-slate-400 space-y-2">
            <p className="text-base font-bold text-white">No theatres found</p>
            <p className="text-xs text-slate-500">Try searching another location or clearing technology filter.</p>
          </div>
        )}
      </section>
    </div>
  );
}
