"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Film,
  Sparkles,
  Search,
  Filter,
  Bookmark,
  Calendar,
  Clock,
  Star,
  Flame,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import MovieCard from "@/components/Common/MovieCard";
import UpcomingCard from "@/components/Common/UpcomingCard";
import ActionButton from "@/components/Common/ActionButton";
import { useApp } from "@/context/AppContext";

export default function AllMoviesPage() {
  const { currentCity, openLocationModal } = useApp();
  const [activeTab, setActiveTab] = useState("now-showing"); // "now-showing" | "upcoming"
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all movies & upcoming movies from API
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [resNow, resUpcoming] = await Promise.all([
          fetch("/api/movies"),
          fetch("/api/movies?type=upcoming"),
        ]);

        if (resNow.ok) {
          const jsonNow = await resNow.json();
          if (jsonNow.success && jsonNow.data) {
            setNowShowingMovies(jsonNow.data);
          }
        }

        if (resUpcoming.ok) {
          const jsonUp = await resUpcoming.json();
          if (jsonUp.success && jsonUp.data) {
            setUpcomingMovies(jsonUp.data);
          }
        }
      } catch (e) {
        console.warn("Error fetching movies page data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const genres = ["All", "Sci-Fi", "Action", "Drama", "Animation", "Horror", "Fantasy"];
  const formats = ["All", "IMAX", "4DX", "Dolby", "ScreenX", "VIP"];

  // Filter Now Showing
  const filteredNowShowing = nowShowingMovies.filter((m) => {
    const matchesGenre =
      selectedGenre === "All" ||
      m.genre?.toLowerCase() === selectedGenre.toLowerCase();
    const matchesFormat =
      selectedFormat === "All" ||
      m.format?.toLowerCase() === selectedFormat.toLowerCase();
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genre?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesFormat && matchesSearch;
  });

  // Filter Upcoming
  const filteredUpcoming = upcomingMovies.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.meta?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-full bg-[#0B0D14] text-[#e2e2ec] font-sans min-h-screen pb-24">
      {/* 1. Page Hero Banner */}
      <section className="relative w-full overflow-hidden bg-[#121624] border-b border-white/5 py-12 sm:py-16">
        <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 bg-[#FF2E63]/15 blur-[120px] rounded-full" />
        <div className="pointer-events-none absolute top-1/3 -right-20 w-96 h-96 bg-[#6366F1]/15 blur-[130px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2E63]/15 border border-[#FF2E63]/30 text-[#FF2E63] text-xs font-bold uppercase tracking-wider">
              <Film className="w-3.5 h-3.5" />
              <span>Cinema Catalog</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              All Movies & Blockbusters
            </h1>
            <p className="text-sm sm:text-base text-pinkT leading-relaxed">
              Explore all films currently playing across cinema halls in {currentCity}, along with upcoming premiere drops and fan-awaited blockbusters.
            </p>
          </div>

          {/* Search & Location Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#191b23] border border-white/10 w-full sm:max-w-md focus-within:border-[#FF2E63]">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search movies, genre, languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 outline-none border-none"
              />
            </div>

            <button
              type="button"
              onClick={openLocationModal}
              className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-[#191b23] border border-white/10 hover:border-white/25 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <span>Region: <strong className="text-white">{currentCity}</strong></span>
              <span className="text-[10px] text-[#FF2E63] font-bold uppercase ml-2">Change</span>
            </button>
          </div>

          {/* Tab Switcher: In Theaters Now vs Upcoming Anticipation */}
          <div className="mt-8 flex items-center gap-3 border-b border-white/10 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab("now-showing")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "now-showing"
                  ? "bg-[#FF2E63] text-white shadow-lg shadow-[#FF2E63]/30"
                  : "bg-[#191b23] text-slate-400 hover:text-white"
              }`}
            >
              <Film className="w-4 h-4" />
              <span>In Theaters Now ({nowShowingMovies.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "upcoming"
                  ? "bg-[#10B981] text-[#052E16] font-extrabold shadow-lg shadow-[#10B981]/30"
                  : "bg-[#191b23] text-slate-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Upcoming & Buzz ({upcomingMovies.length})</span>
            </button>
          </div>

          {/* Filter Pills for Now Showing */}
          {activeTab === "now-showing" && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-semibold mr-1">Genre:</span>
              {genres.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGenre(g)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedGenre === g
                      ? "bg-white text-black font-bold"
                      : "bg-[#191b23] text-slate-300 hover:text-white"
                  }`}
                >
                  {g}
                </button>
              ))}

              <div className="hidden sm:block w-[1px] h-4 bg-white/10 mx-2" />

              <span className="text-xs text-slate-400 font-semibold mr-1">Format:</span>
              {formats.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSelectedFormat(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedFormat === f
                      ? "bg-[#FF2E63] text-white font-bold"
                      : "bg-[#191b23] text-slate-300 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. Grid Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : activeTab === "now-showing" ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Showing {filteredNowShowing.length} Movies in Theaters
              </span>
              <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                Live Showtimes Available
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {filteredNowShowing.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {filteredNowShowing.length === 0 && (
              <div className="text-center py-20 text-slate-400 space-y-2">
                <p className="text-base font-bold text-white">No movies match your filters</p>
                <p className="text-xs text-slate-500">Try selecting a different genre or clearing the search query.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Showing {filteredUpcoming.length} Awaited Upcoming Releases
              </span>
              <span className="text-xs text-[#FF2E63] font-semibold">
                Advance Booking Unlocks 48 Hours Before Release
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcoming.map((item) => (
                <UpcomingCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  meta={item.meta}
                  image={item.image}
                  releaseBadge={item.releaseBadge}
                  badgeColor={item.badgeColor}
                  fansWaiting={item.fansWaiting}
                  buzzIndex={item.buzzIndex}
                  meterTheme={item.meterTheme}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
