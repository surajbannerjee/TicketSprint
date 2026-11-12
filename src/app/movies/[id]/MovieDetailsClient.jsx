"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ActionButton from "@/components/Common/ActionButton";
import { useApp } from "@/context/AppContext";
import {
  Bookmark,
  Play,
  Ticket,
  Film,
  Calendar,
  Clock,
  MapPin,
  Flame,
  Volume2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  Layers,
  X,
  SlidersHorizontal,
  Navigation,
} from "lucide-react";

export default function MovieDetailsClient({ movieId = "dune-part-two" }) {
  const router = useRouter();
  const { toggleWishlist, isInWishlist, currentCity, selectedHall } = useApp();
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedTimeWindow, setSelectedTimeWindow] = useState("all");
  const [maxPrice, setMaxPrice] = useState(700);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Dynamic movie state
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(`/api/movies?id=${encodeURIComponent(movieId)}`)
      .then((res) => res.json())
      .then((json) => {
        if (isMounted && json.success && json.data) {
          setMovieData(json.data);
        }
      })
      .catch((err) => console.error("Error fetching movie details:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [movieId]);

  // Dynamic fallback values
  const title =
    movieData?.title ||
    movieId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const posterImage =
    movieData?.posterImage ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";

  const backdropImage =
    movieData?.backdropImage ||
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1440&auto=format&fit=crop&q=80";

  const format = movieData?.format || "IMAX";
  const duration = movieData?.duration || "2h 25m";
  const genre = movieData?.genre || "Action • Sci-Fi";
  const rating = movieData?.rating || "94%";
  const criticScore = movieData?.criticScore || rating;
  const imdbRating = movieData?.imdbRating || "8.4";
  const synopsis =
    movieData?.synopsis ||
    `Experience ${title} with high-definition laser projection, immersive Dolby Atmos sound, and comfortable plush recliner seating.`;

  const isBookmarked = isInWishlist(movieId);

  const dates = [
    { label: "Today", day: "15", month: "May" },
    { label: "Tomorrow", day: "16", month: "May" },
    { label: "Fri", day: "17", month: "May" },
    { label: "Sat", day: "18", month: "May" },
    { label: "Sun", day: "19", month: "May" },
    { label: "Mon", day: "20", month: "May" },
    { label: "Tue", day: "21", month: "May" },
  ];

  const venues = [
    {
      id: "amc-metreon",
      name: "AMC Metreon 16 & IMAX - San Francisco",
      tag: "Grand Auditoria",
      distance: "1.2 miles away • 135 4th St, Downtown SF",
      amenities: [
        "IMAX 70mm Dual Laser",
        "Dolby Atmos",
        "Plush Recliners",
        "Reserved Seating",
        "Validated Parking (3 hrs)",
      ],
      showtimes: [
        {
          time: "01:15 PM",
          format: "IMAX 70mm • Laser",
          price: "₹450.00",
          status: "available",
          statusText: "Available",
        },
        {
          time: "04:30 PM",
          format: "IMAX 70mm • Laser",
          price: "₹480.00",
          status: "filling",
          statusText: "8 seats left!",
        },
        {
          time: "07:45 PM",
          format: "IMAX 70mm • Prime Eve",
          price: "₹520.00",
          status: "almost-sold",
          statusText: "Front row only",
        },
        {
          time: "10:30 PM",
          format: "IMAX 70mm • Laser",
          price: "₹420.00",
          status: "available",
          statusText: "Available",
        },
      ],
    },
    {
      id: "regal-westpark",
      name: "Regal Edwards Westpark 14 - Dolby Cinema & ScreenX",
      tag: "Dolby Premier",
      distance: "3.4 miles away • 10100 S De Anza Blvd",
      amenities: [
        "Dolby Vision HDR",
        "Premium Large Format",
        "RealD 3D",
        "Luxury Rockers",
      ],
      showtimes: [
        {
          time: "02:00 PM",
          format: "Dolby Cinema",
          price: "₹380.00",
          status: "available",
          statusText: "Available",
        },
        {
          time: "05:15 PM",
          format: "Dolby Cinema",
          price: "₹420.00",
          status: "available",
          statusText: "Available",
        },
        {
          time: "08:30 PM",
          format: "Dolby Cinema",
          price: "₹450.00",
          status: "filling",
          statusText: "5 seats left!",
        },
      ],
    },
    {
      id: "alamo-drafthouse",
      name: "Alamo Drafthouse Cinema New Mission",
      tag: "Dine-In Lounge",
      distance: "2.1 miles away • 2550 Mission St • In-Theater Dining & Craft Beers",
      amenities: [
        "35mm Projection",
        "Full Table Service",
        "Microbrewery Onsite",
        "Strict Quiet Policy",
      ],
      showtimes: [
        {
          time: "03:30 PM",
          format: "35mm Analog",
          price: "₹320.00",
          status: "available",
          statusText: "Available",
        },
        {
          time: "06:45 PM",
          format: "35mm Analog",
          price: "₹380.00",
          status: "filling",
          statusText: "2 seats left!",
        },
        {
          time: "09:50 PM",
          format: "35mm Analog",
          price: "₹320.00",
          status: "available",
          statusText: "Available",
        },
      ],
    },
  ];

  const handleSelectSlot = (venueName, time, format, price) => {
    const selectedDate = dates[selectedDateIndex];
    const dateStr = `${selectedDate.label}, ${selectedDate.day} ${selectedDate.month} 2025`;
    const query = new URLSearchParams({
      movie: movieId,
      time,
      venue: venueName,
      format,
      price,
      date: dateStr,
    }).toString();
    router.push(`/seat-selection?${query}`);
  };

  return (
    <div className="w-full bg-[#11131a] text-[#e2e2ec] font-sans min-h-screen">
      {/* 1. Immersive Cinematic Hero Backing */}
      <section className="relative w-full overflow-hidden bg-[#0c0e15]">
        {/* Background Atmosphere Image */}
        <div className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-35 scale-105 transform duration-1000 ease-out transition-transform"
            style={{
              backgroundImage: `url('${backdropImage}')`,
            }}
          />
          {/* Gradient Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-[#11131a]/80 to-[#11131a]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11131a] via-[#11131a]/70 to-transparent" />

          {/* Hero Main Content */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto  px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              {/* Left Column: Movie Poster & Buzz Pill */}
              <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
                <div className="relative aspect-[2/3] w-full max-w-[280px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 bg-[#1d1f27] border border-white/10 group">
                  <img
                    src={posterImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-[#0c0e15]/90 backdrop-blur-md text-[#ff2e63] text-[10px] uppercase tracking-widest font-extrabold border border-[#ff2e63]/30">
                      {format}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#00a572]/90 text-white text-[10px] font-bold uppercase tracking-wider">
                      Exclusive Run
                    </span>
                  </div>

                  {/* Play Trailer Floating Overlay */}
                  <button
                    type="button"
                    onClick={() => setIsTrailerOpen(true)}
                    aria-label="Play Trailer"
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-tr from-[#ff4f72] to-[#bd0041] text-white flex items-center justify-center backdrop-blur-md shadow-lg shadow-[#ff4f72]/50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </button>
                </div>

                {/* Buzz Tracker Micro-Widget */}
                <div className="flex items-center gap-3 bg-[#191b23]/90 backdrop-blur-xl p-3.5 rounded-xl border border-white/10 shadow-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#ff4f72]/20 text-[#ff2e63] shrink-0">
                    <Flame className="w-5 h-5 fill-current animate-pulse" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#e2e2ec] font-bold truncate">
                        58,420 Fans Interested
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#ff2e63] animate-ping" />
                    </div>
                    <span className="text-[11px] text-[#ff2e63] font-semibold">
                      Extremely High Demand in {currentCity || "Kolkata"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Title, Metadata, Acclaim Bar, CTA */}
              <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-5">
                {/* Format Badges & Runtime */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#94a3b8]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#282a31] text-[#e2e2ec] font-bold">
                    UA 13+
                  </span>
                  <span>•</span>
                  <span>{duration}</span>
                  <span>•</span>
                  <span>{genre}</span>
                  <span>•</span>
                  <span className="text-[#10b981] font-semibold">
                    Now Playing Across WB
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-none">
                    {title}
                  </h1>
                  <p className="text-lg sm:text-xl text-[#c0c1ff] font-semibold tracking-wide">
                    The {format} Special Presentation
                  </p>
                </div>

                {/* Acclaim Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 bg-[#191b23]/80 backdrop-blur-lg p-4 rounded-2xl border border-white/10 max-w-2xl divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                  {/* Rotten Tomatoes Critic */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ff2e63]/20 flex items-center justify-center text-[#ff2e63] shrink-0">
                      <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading font-extrabold text-xl text-white">
                          {criticScore}
                        </span>
                        <span className="text-[10px] text-[#ff2e63] uppercase font-bold tracking-wider">
                          Fresh
                        </span>
                      </div>
                      <span className="text-[11px] text-[#94a3b8]">Verified Reviews</span>
                    </div>
                  </div>

                  {/* Popcorn Audience */}
                  <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-4">
                    <div className="w-10 h-10 rounded-full bg-[#00a572]/20 flex items-center justify-center text-[#10b981] shrink-0">
                      <Sparkles className="w-5 h-5 fill-current" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading font-extrabold text-xl text-white">
                          {rating}
                        </span>
                        <span className="text-[10px] text-[#10b981] uppercase font-bold tracking-wider">
                          Audience
                        </span>
                      </div>
                      <span className="text-[11px] text-[#94a3b8]">12,500+ Verified Fans</span>
                    </div>
                  </div>

                  {/* IMDb */}
                  <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-4">
                    <div className="w-10 h-10 rounded-lg bg-[#282a31] flex items-center justify-center text-amber-400 font-black text-xs tracking-tighter shrink-0">
                      IMDb
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading font-extrabold text-xl text-white">
                          {imdbRating}
                        </span>
                        <span className="text-xs text-[#94a3b8]">/10</span>
                      </div>
                      <span className="text-[11px] text-[#94a3b8]">Global Critics</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                  <ActionButton
                    title="Quick Jump to Showtimes"
                    link="#showtimes-section"
                    variant="primary"
                    icon={<Ticket className="w-5 h-5 -rotate-12" />}
                    size="md"
                    className="w-full sm:w-auto justify-center shadow-lg shadow-[#ff4f72]/30"
                  />
                  <ActionButton
                    title="Watch Official Trailer"
                    onClick={() => setIsTrailerOpen(true)}
                    variant="secondary"
                    icon={<Play className="w-4 h-4 fill-current" />}
                    size="md"
                    className="w-full sm:w-auto justify-center"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      toggleWishlist({
                        id: movieId,
                        title: title,
                        posterImage: posterImage,
                        format: format,
                        rating: rating,
                        duration: duration,
                        genre: genre,
                        link: `/movies/${movieId}`,
                      })
                    }
                    aria-label="Bookmark movie"
                    className={`h-11 sm:w-12 sm:h-12 px-4 sm:px-0 rounded-xl sm:rounded-full border border-white/15 flex items-center justify-center transition-colors cursor-pointer gap-2 ${isBookmarked
                        ? "bg-[#ff2e63] text-white border-[#ff2e63] shadow-md shadow-[#ff2e63]/30"
                        : "bg-[#282a31] hover:bg-[#33343c] text-white"
                      }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
                    />
                    <span className="sm:hidden text-xs font-bold uppercase tracking-wider">
                      {isBookmarked ? "Saved to Watchlist" : "Save to Watchlist"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Synopsis & Cast Strip Bento */}
      <section className="w-full max-w-[1440px] mx-auto  px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Synopsis & Key Features */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex items-center gap-2 text-[#ff2e63]">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-extrabold">
                Story & Experience Details
              </span>
            </div>
            <p className="text-base text-[#e2e2ec] leading-relaxed">
              {synopsis}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#191b23] border border-white/5 flex flex-col">
                <span className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider">
                  Native Aspect
                </span>
                <span className="font-heading text-lg text-white font-bold my-0.5">
                  1.43:1
                </span>
                <span className="text-xs text-[#10b981] font-medium">
                  Full IMAX Frame
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#191b23] border border-white/5 flex flex-col">
                <span className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider">
                  Sound Mix
                </span>
                <span className="font-heading text-lg text-white font-bold my-0.5">
                  12-Track
                </span>
                <span className="text-xs text-[#c0c1ff] font-medium">
                  Laser Precision Audio
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#191b23] border border-white/5 flex flex-col col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider">
                  Physical Stock
                </span>
                <span className="font-heading text-lg text-white font-bold my-0.5">
                  70mm Film
                </span>
                <span className="text-xs text-[#ff4f72] font-medium">
                  Rare Analog Projection
                </span>
              </div>
            </div>
          </div>

          {/* Cast & Director */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-base text-white">
                Featured Cast & Crew
              </span>
              <span className="text-xs uppercase text-[#94a3b8] font-semibold">
                4 Key Creators
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Timothee */}
              <div className="flex flex-col bg-[#191b23] rounded-xl p-2 border border-white/5 group hover:border-white/20 transition-all">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-[#1d1f27]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdroFck0AUFLBuDIDP3lu7OsoFzDZmfTzlzKhvbjafyVm5VFPvxM1hW3CYKfoX6SPnnYVe73XDtDJE_gqnSxMNifpJg9khGIDjBKRgHFM-yKnN_M8uiAeXEMwxoX1_q04LrWPSJUp4Np1cZ1ild3Oxz7KlCXuIrG9_MY8RthRdUDBSRcBhmSgfsoHB5bFiGtK0cHSG_YxINic3_XzwHQUG75zSqmaVlcko3TlEhyVl"
                    alt="Timothée Chalamet"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-xs text-white font-bold pt-2 truncate">
                  Timothée C.
                </span>
                <span className="text-[11px] text-[#94a3b8] truncate">
                  Paul Atreides
                </span>
              </div>

              {/* Zendaya */}
              <div className="flex flex-col bg-[#191b23] rounded-xl p-2 border border-white/5 group hover:border-white/20 transition-all">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-[#1d1f27]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOR16POlHXykvOQny_CBRlTOK4hHnlsSlDDwQyNQMthwv33ebYREOPhs8MEPuHQ2iPphbiowg2LznbZr7ffyHM7JV2KmmkdY2RaTnV3EjGTg0wOK0tKrNrndn8Rg4O9CASNBLhtX-sLLVIbSQKeF8ucemLPF0DKIaAhnWFMI0Tb4c6H8v66fOLjYGKun66ZBwn2uBsQ8-iMyArylrO2vXNkjoBPcqeHV9JNetO5ToR"
                    alt="Zendaya"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-xs text-white font-bold pt-2 truncate">
                  Zendaya
                </span>
                <span className="text-[11px] text-[#94a3b8] truncate">Chani</span>
              </div>

              {/* Rebecca Ferguson */}
              <div className="flex flex-col bg-[#191b23] rounded-xl p-2 border border-white/5 group hover:border-white/20 transition-all">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-[#1d1f27]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-hAyLpjc_r9fHrIBZ7qbG5vxrlJIvXMZ4vgSt9Rn6S1RaGppTZhzg__7ilZe_TYavE8q879wloBYOsATbIKVCNl8efGROdOzvkkfVysgSUqyTRS0CNBVFEZamsZ2IrrtPRTBP9V-InomfRW3PfXVJTLlKFlbNDjCYLryJf-qS4Xm5-qcQy3tNFApGZy1Uza6C1oJRcgmZIoErxq213zZx5P5cgKwhaxVsZIysrsNN"
                    alt="Rebecca Ferguson"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-xs text-white font-bold pt-2 truncate">
                  R. Ferguson
                </span>
                <span className="text-[11px] text-[#94a3b8] truncate">
                  Lady Jessica
                </span>
              </div>

              {/* Denis Villeneuve */}
              <div className="flex flex-col bg-[#191b23] rounded-xl p-2 border border-white/5 group hover:border-white/20 transition-all">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-[#1d1f27]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZz-52-YRdSjIs9Xa6P959LR4eYL9oa3UrfdQY-OZfGwAtdjHvKVbqjlcvI9nNFEaDgYCftWRxEYCQYEhbXoD2GEj-xO0xnaXVIMItRC-57GZyce2K1051xsUNmWAYQhptC7OKyHUzXD83aHt0qCazduIz2qZ-KfveMBMA7bZrPFAJvFg7GvAoD-KTQ_4GPFdlvaZV-wsCV1xAsNSieLB0AYt2axG99DIj-vAAJLoO"
                    alt="Denis Villeneuve"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-xs text-white font-bold pt-2 truncate">
                  Denis V.
                </span>
                <span className="text-[11px] text-[#10b981] font-semibold truncate">
                  Director
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DATE SELECTION STRIP & FILTER HUB */}
      <section
        id="showtimes-section"
        className="w-full bg-[#191b23] py-10 border-y border-white/10"
      >
        <div className="max-w-[1440px] mx-auto  px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#ff2e63]" />
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Select Date & Showtime
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#10b981] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              Real-time seat allocations active
            </div>
          </div>

          {/* 7-Day Date Selector */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {dates.map((date, idx) => {
              const isActive = selectedDateIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDateIndex(idx)}
                  className={`shrink-0 flex flex-col items-center justify-center w-24 py-3 px-2 rounded-xl transition-all cursor-pointer select-none font-semibold ${isActive
                    ? "bg-gradient-to-b from-[#ff4f72] to-[#bd0041] text-white shadow-lg shadow-[#ff4f72]/30 scale-105"
                    : "bg-[#1d1f27] hover:bg-[#282a31] text-[#94a3b8] hover:text-white border border-white/5"
                    }`}
                >
                  <span className="text-[11px] uppercase tracking-wider font-bold opacity-90">
                    {date.label}
                  </span>
                  <span className="font-heading text-2xl font-extrabold leading-none my-1">
                    {date.day}
                  </span>
                  <span className="text-xs">{date.month}</span>
                </button>
              );
            })}
          </div>

          {/* Advanced Filter Toolstrip */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 rounded-2xl bg-[#1d1f27] border border-white/10">
            {/* Screen Format */}
            <div className="md:col-span-5 flex flex-col gap-2">
              <label className="text-xs uppercase font-extrabold text-[#94a3b8] tracking-wider">
                Screen Format
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "All Formats" },
                  { id: "imax", label: "IMAX 70mm" },
                  { id: "dolby", label: "Dolby Atmos" },
                  { id: "4dx", label: "4DX" },
                  { id: "standard", label: "Standard" },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${selectedFormat === fmt.id
                      ? "bg-[#ff4f72] text-white shadow-md shadow-[#ff4f72]/30"
                      : "bg-[#282a31] text-[#94a3b8] hover:text-white hover:bg-[#33343c]"
                      }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Window */}
            <div className="md:col-span-4 flex flex-col gap-2">
              <label className="text-xs uppercase font-extrabold text-[#94a3b8] tracking-wider">
                Time Window
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: "morn", label: "Morn" },
                  { id: "aft", label: "Aft" },
                  { id: "eve", label: "Eve" },
                  { id: "night", label: "Night" },
                ].map((time) => (
                  <button
                    key={time.id}
                    type="button"
                    onClick={() => setSelectedTimeWindow(time.id)}
                    className={`py-1.5 px-1 rounded-lg text-center text-xs font-bold transition-colors cursor-pointer ${selectedTimeWindow === time.id
                      ? "bg-[#ff4f72] text-white shadow-md shadow-[#ff4f72]/30"
                      : "bg-[#282a31] text-[#94a3b8] hover:text-white hover:bg-[#33343c]"
                      }`}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Range */}
            <div className="md:col-span-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase font-extrabold text-[#94a3b8] tracking-wider">
                  Max Price / Seat
                </label>
                <span className="text-xs font-black text-[#ff2e63]">
                  ₹{maxPrice}.00
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-[#94a3b8]">₹200</span>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#ff2e63] bg-[#33343c] h-2 rounded-lg cursor-pointer"
                />
                <span className="text-xs text-[#94a3b8]">₹1000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CINEMA VENUES & SHOWTIME LISTINGS */}
      <section className="w-full max-w-[1440px] mx-auto  px-4 sm:px-6 lg:px-8 py-14 flex flex-col gap-8">
        {/* Availability Guide Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#191b23] rounded-xl border border-white/5">
          <span className="text-xs font-semibold text-[#94a3b8]">
            Availability Guide:
          </span>
          <div className="flex items-center gap-5 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
              <span className="text-white">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-white">Filling Fast (&lt;10 left)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff4f72] animate-pulse" />
              <span className="text-white">Almost Sold Out</span>
            </div>
          </div>
        </div>

        {/* Venue Cards */}
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="flex flex-col bg-[#191b23] rounded-2xl md:p-6 p-4 sm:p-7 border border-white/10 shadow-xl transition-all"
          >
            {/* Venue Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <Film className="w-6 h-6 text-[#ff2e63]" />
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                    {venue.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ff2e63]/20 text-[#ff2e63] text-[10px] uppercase font-bold tracking-wider">
                    {venue.tag}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#94a3b8]">
                  <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>{venue.distance}</span>
                </div>
              </div>
            </div>

            {/* Amenities Badges */}
            <div className="flex flex-wrap items-center gap-2 py-4">
              {venue.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[#1d1f27] text-xs text-[#94a3b8] font-medium border border-white/5"
                >
                  {amenity}
                </span>
              ))}
            </div>

            {/* Showtime Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {venue.showtimes.map((slot, i) => {
                const pipColor =
                  slot.status === "available"
                    ? "bg-[#10b981]"
                    : slot.status === "filling"
                      ? "bg-amber-400"
                      : "bg-[#ff4f72] animate-pulse";

                const textHighlight =
                  slot.status === "available"
                    ? "text-[#10b981]"
                    : slot.status === "filling"
                      ? "text-amber-400"
                      : "text-[#ff2e63]";

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() =>
                      handleSelectSlot(
                        venue.name,
                        slot.time,
                        slot.format,
                        slot.price
                      )
                    }
                    className="group relative flex flex-col p-4 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] border border-white/5 hover:border-[#ff2e63]/50 transition-all text-left cursor-pointer hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-heading text-lg font-bold text-white group-hover:text-[#ff2e63] transition-colors">
                        {slot.time}
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full ${pipColor}`} />
                    </div>
                    <span className="text-[11px] text-[#94a3b8] mt-0.5">
                      {slot.format}
                    </span>
                    <div className="flex items-center justify-between mt-3 text-xs">
                      <span className={`font-semibold ${textHighlight}`}>
                        {slot.statusText}
                      </span>
                      <span className="text-white font-extrabold">
                        {slot.price}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* 5. Trailer Modal Dialog */}
      {isTrailerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#121624] border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-white">
                Dune: Part Two — Official Movie Trailer
              </h3>
              <button
                type="button"
                onClick={() => setIsTrailerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/Way9Dexny3w?autoplay=1"
                title="Dune: Part Two Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

