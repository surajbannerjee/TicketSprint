"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ActionButton from "@/components/Common/ActionButton";
import { useApp } from "@/context/AppContext";
import {
  Calendar,
  Clock,
  MapPin,
  Hourglass,
  Check,
  X as XIcon,
  Accessibility,
  Lock,
  ShieldCheck,
  ChevronRight,
  Info,
  Sparkles,
} from "lucide-react";

export default function SeatSelectionClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentCity, selectedHall } = useApp();

  // Query values with sensible defaults
  const movieParam = searchParams.get("movie") || "dune-part-two";
  const defaultVenue = selectedHall?.name ? `${selectedHall.name} - ${currentCity || "Kolkata"}` : "INOX South City Mall & IMAX";
  const venueParam = searchParams.get("venue") || defaultVenue;
  const timeParam = searchParams.get("time") || "07:45 PM";
  const dateParam = searchParams.get("date") || "Fri, 17 May 2025";
  const formatParam = searchParams.get("format") || "IMAX Laser";

  // Dynamic Movie Data Fetching
  const [movieData, setMovieData] = useState(null);
  const [isLoadingMovie, setIsLoadingMovie] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingMovie(true);
    fetch(`/api/movies?id=${encodeURIComponent(movieParam)}`)
      .then((res) => res.json())
      .then((json) => {
        if (isMounted && json.success && json.data) {
          setMovieData(json.data);
        }
      })
      .catch((err) => console.error("Error loading movie:", err))
      .finally(() => {
        if (isMounted) setIsLoadingMovie(false);
      });
    return () => {
      isMounted = false;
    };
  }, [movieParam]);

  // Derived Title and Poster with elegant fallback
  const displayTitle =
    movieData?.title ||
    movieParam
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const displayPoster =
    movieData?.posterImage ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";

  const displayFormat = movieData?.format || formatParam;
  const displayDuration = movieData?.duration || "2h 30m";
  const displayGenre = movieData?.genre || "Blockbuster";

  // Countdown timer: 10 minutes (600 seconds)
  const [timeLeft, setTimeLeft] = useState(582);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Selected seats state: defaults to E8 & E9 as shown in Stitch design
  const [selectedSeats, setSelectedSeats] = useState([
    { row: "E", num: 8, tier: "club", price: 18.5 },
    { row: "E", num: 9, tier: "club", price: 18.5 },
  ]);

  // Booked seat registry
  const bookedSeatKeys = new Set([
    "A-3",
    "A-4",
    "B-5",
    "B-6",
    "C-4",
    "C-5",
    "D-3",
    "D-4",
    "D-9",
    "D-10",
    "E-4",
    "E-5",
    "F-11",
    "F-12",
  ]);

  // Accessible seats
  const accessibleSeatKeys = new Set(["B-1", "B-8"]);

  // Cart held
  const heldSeatKeys = new Set(["E-10"]);

  const toggleSeat = (row, num, tier, price) => {
    const key = `${row}-${num}`;
    if (bookedSeatKeys.has(key) || heldSeatKeys.has(key)) return;

    const exists = selectedSeats.some((s) => s.row === row && s.num === num);
    if (exists) {
      setSelectedSeats(
        selectedSeats.filter((s) => !(s.row === row && s.num === num))
      );
    } else {
      setSelectedSeats([...selectedSeats, { row, num, tier, price }]);
    }
  };

  const isSeatSelected = (row, num) => {
    return selectedSeats.some((s) => s.row === row && s.num === num);
  };

  const { user, openLoginModal } = useApp();

  const totalPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  const handleProceed = () => {
    const doProceed = () => {
      const seatsStr = selectedSeats.map((s) => `${s.row}${s.num}`).join(",");
      const query = new URLSearchParams({
        movie: movieParam,
        venue: venueParam,
        time: timeParam,
        date: dateParam,
        seats: seatsStr,
        total: totalPrice.toFixed(2),
      }).toString();
      router.push(`/checkout?${query}`);
    };

    if (!user) {
      openLoginModal(doProceed);
      return;
    }

    doProceed();
  };

  return (
    <div className="w-full bg-[#11131a] text-[#e2e2ec] font-sans min-h-screen lg:pb-32 md:pb-15 pb-7">
      {/* 1. Top Cinema Event Metadata Strip */}
      <section className="w-full bg-[#191b23] px-4 sm:px-6 lg:px-8 py-4 border-b border-white/10 shadow-lg">
        <div className="max-w-[1440px] mx-auto  flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Movie Poster & Metadata */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0 w-16 h-20 rounded-lg overflow-hidden shadow-lg bg-[#282a31] border border-white/10">
              <img
                src={displayPoster}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {displayTitle}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#3131c0]/40 text-[#c0c1ff] text-[10px] font-extrabold uppercase tracking-wider border border-[#3131c0]/50">
                  {displayFormat}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#282a31] text-[#10b981] text-[10px] font-bold">
                  UA 13+ • {displayDuration}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#94a3b8]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#10b981]" />
                  {dateParam}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#ff2e63]" />
                  {timeParam} (Night Show)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#6366f1]" />
                  {venueParam} • Screen 1 (Auditorium A)
                </span>
              </div>
            </div>
          </div>

          {/* Seat Reservation Countdown Timer */}
          <div className="flex items-center gap-3 bg-[#1d1f27] px-4 py-2.5 rounded-xl border border-white/10 shadow-inner self-start lg:self-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ff4f72]/20 text-[#ff2e63] animate-pulse">
              <Hourglass className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase text-[#94a3b8] tracking-wider font-extrabold">
                  Seat Lock Active
                </span>
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              </div>
              <p className="font-heading text-lg text-[#ff2e63] font-bold tracking-tight">
                {formatTimer(timeLeft)}{" "}
                <span className="text-xs text-[#94a3b8] font-normal">
                  mins left
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Auditorium Workspace */}
      <section className="w-full px-2.5 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8 overflow-hidden">
        {/* Legend Quick-Strip */}
        <div className="w-full bg-[#191b23]/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 border border-white/10 shadow-sm">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-5 text-xs">
            {/* Available */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-t-sm rounded-b-xs bg-[#242838] border-t-2 border-white/30 border-x border-b border-white/10" />
              <span className="text-[#94a3b8] text-[11px] sm:text-xs">Available</span>
            </div>
            {/* Selected */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-t-sm rounded-b-xs bg-gradient-to-t from-[#bd0041] to-[#ff4f72] text-white flex items-center justify-center shadow-[0_0_8px_rgba(255,79,114,0.8)] font-bold text-[9px] sm:text-xs">
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
              </span>
              <span className="text-white font-bold text-[11px] sm:text-xs">Selected</span>
            </div>
            {/* Booked */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-t-sm rounded-b-xs bg-[#0c0e15] border border-white/5 text-[#555] flex items-center justify-center opacity-50">
                <XIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </span>
              <span className="text-[#555] text-[11px] sm:text-xs">Booked</span>
            </div>
            {/* Accessible */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-t-sm rounded-b-xs bg-[#242661] text-[#c0c1ff] flex items-center justify-center border border-[#484cdb]">
                <Accessibility className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </span>
              <span className="text-[#94a3b8] text-[11px] sm:text-xs">Accessible</span>
            </div>
            {/* Held */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-t-sm rounded-b-xs bg-amber-950/40 text-amber-300 flex items-center justify-center border border-amber-500/50 animate-pulse">
                <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </span>
              <span className="text-[#94a3b8] text-[11px] sm:text-xs">Held</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#94a3b8]">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10b981]" />
            <span>Laser Proj. (1.43:1)</span>
          </div>
        </div>

        {/* Curved Laser Screen Graphic */}
        <div className="relative w-full flex flex-col items-center pt-1 pb-3 sm:pb-5 select-none max-w-full overflow-hidden">
          <div className="w-full max-w-3xl relative flex flex-col items-center px-2">
            <svg
              className="w-full h-auto drop-shadow-[0_12px_24px_rgba(255,178,186,0.35)]"
              viewBox="0 0 960 90"
            >
              <defs>
                <linearGradient id="imaxGlow" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#3131c0" stopOpacity="0.2" />
                  <stop offset="25%" stopColor="#ff4f72" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="75%" stopColor="#ff4f72" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3131c0" stopOpacity="0.2" />
                </linearGradient>
                <radialGradient cx="50%" cy="0%" id="screenBeam" r="90%">
                  <stop offset="0%" stopColor="#ffb2ba" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#3131c0" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path
                d="M 60,15 Q 480,95 900,15 L 820,90 Q 480,110 140,90 Z"
                fill="url(#screenBeam)"
                opacity="0.85"
              />
              <path
                d="M 40,25 Q 480,90 920,25"
                fill="none"
                stroke="url(#imaxGlow)"
                strokeLinecap="round"
                strokeWidth="7"
              />
            </svg>

            <div className="mt-2 flex flex-col items-center gap-0.5 text-center px-2">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#94a3b8] font-black">
                ALL EYES THIS WAY — CURVED IMAX SCREEN
              </p>
              <span className="text-[9px] sm:text-[10px] uppercase text-[#64748b] tracking-wider font-semibold">
                Dolby Atmos Audio Array Behind Screen
              </span>
            </div>
          </div>
        </div>

        {/* 3. Seating Tiers Grid Canvas (Fluid Responsive - Zero Horizontal Scroll) */}
        <div className="w-full max-w-full flex flex-col gap-5 sm:gap-7 items-center">
          {/* TIER 1: VIP Ultra Recliners ($24.00) */}
          <div className="w-full max-w-3xl flex flex-col gap-2.5 sm:gap-3 bg-[#191b23]/70 rounded-2xl p-2.5 xs:p-3.5 sm:p-5 border border-amber-500/20 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-1.5 px-1 pb-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <span className="font-heading font-bold text-sm sm:text-base text-white">
                  VIP Recliners
                </span>
                <span className="text-[9px] sm:text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded-full uppercase font-bold">
                  Dual Heated • Table Service
                </span>
              </div>
              <span className="text-sm sm:text-base text-[#ff2e63] font-extrabold">
                $24.00
              </span>
            </div>

            {/* Rows A & B */}
            <div className="flex flex-col gap-2.5 sm:gap-3 items-center w-full">
              {["A", "B"].map((row) => (
                <div key={row} className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 w-full">
                  <span className="w-3 xs:w-4 sm:w-6 text-center text-[10px] sm:text-xs font-bold text-[#94a3b8] shrink-0">
                    {row}
                  </span>
                  <div className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-4 md:gap-6">
                    {[
                      [1, 2],
                      [3, 4],
                      [5, 6],
                      [7, 8],
                    ].map(([s1, s2], pairIdx) => (
                      <div
                        key={pairIdx}
                        className="flex items-center gap-0.5 xs:gap-1 bg-[#141724]/90 p-1 xs:p-1.5 rounded-lg sm:rounded-xl border border-amber-500/20 shadow-sm"
                      >
                        {[s1, s2].map((num) => {
                          const key = `${row}-${num}`;
                          const isBooked = bookedSeatKeys.has(key);
                          const isAccess = accessibleSeatKeys.has(key);
                          const isSelected = isSeatSelected(row, num);

                          if (isBooked) {
                            return (
                              <button
                                key={num}
                                type="button"
                                disabled
                                className="w-[18px] xs:w-[22px] sm:w-8 md:w-9 h-[22px] xs:h-[26px] sm:h-8 md:h-9 rounded-t-[4px] sm:rounded-t-lg rounded-b-[2px] bg-[#0c0e15] border border-white/5 text-[#444] cursor-not-allowed flex items-center justify-center text-[8px] xs:text-[10px] sm:text-xs opacity-50"
                              >
                                {num}
                              </button>
                            );
                          }

                          if (isAccess && !isSelected) {
                            return (
                              <button
                                key={num}
                                type="button"
                                onClick={() => toggleSeat(row, num, "vip", 24)}
                                className="w-[18px] xs:w-[22px] sm:w-8 md:w-9 h-[22px] xs:h-[26px] sm:h-8 md:h-9 rounded-t-[4px] sm:rounded-t-lg rounded-b-[2px] bg-[#242661] text-[#c0c1ff] border border-[#484cdb] flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer text-[8px] xs:text-[10px] sm:text-xs shadow-sm"
                                title="Wheelchair Accessible"
                              >
                                <Accessibility className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                              </button>
                            );
                          }

                          return (
                            <button
                              key={num}
                              type="button"
                              onClick={() => toggleSeat(row, num, "vip", 24)}
                              className={`w-[18px] xs:w-[22px] sm:w-8 md:w-9 h-[22px] xs:h-[26px] sm:h-8 md:h-9 rounded-t-[4px] sm:rounded-t-lg rounded-b-[2px] text-[8px] xs:text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all cursor-pointer active:scale-95 ${isSelected
                                  ? "bg-gradient-to-t from-[#bd0041] via-[#ff2e63] to-[#ff4f72] text-white shadow-[0_0_12px_rgba(255,79,114,0.9)] ring-1.5 sm:ring-2 ring-white/60 scale-105 z-10"
                                  : "bg-[#242838] hover:bg-[#2e3447] text-white border-t-2 border-amber-400/40 border-x border-b border-white/5 hover:border-amber-400/70"
                                }`}
                            >
                              {isSelected ? (
                                <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                              ) : (
                                num
                              )}
                            </button>
                          );
                        })}
                        <span
                          className="w-2 xs:w-2.5 sm:w-3.5 h-3.5 xs:h-4 sm:h-5 rounded bg-black/50 border border-amber-400/30 flex items-center justify-center text-[7px] xs:text-[8px] sm:text-[9px]"
                          title="Cocktail Table"
                        >
                          🍸
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="w-3 xs:w-4 sm:w-6 text-center text-[10px] sm:text-xs font-bold text-[#94a3b8] shrink-0">
                    {row}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 2: Premium Club ($18.50) [SWEET SPOT] */}
          <div className="w-full max-w-3xl flex flex-col gap-2.5 sm:gap-3 bg-[#191b23] rounded-2xl p-2.5 xs:p-3.5 sm:p-5 border border-white/10 shadow-xl relative">
            {/* Sweet Spot Marker */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff4f72] to-[#bd0041] text-white px-3 sm:px-4 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase font-black tracking-wider shadow-[0_0_15px_rgba(255,79,114,0.6)] flex items-center gap-1.5 whitespace-nowrap z-10">
              <Sparkles className="w-3 h-3 fill-current" />
              Acoustic & Visual Sweet Spot
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1.5 px-1 pb-1 mt-1 sm:mt-2">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff4f72]" />
                <span className="font-heading font-bold text-sm sm:text-base text-white">
                  Premium Club
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#94a3b8] bg-[#282a31] px-2 py-0.5 rounded-full">
                  Rows C to F • Dolby Atmos Optimized
                </span>
              </div>
              <span className="text-sm sm:text-base text-[#ff2e63] font-extrabold">
                $18.50
              </span>
            </div>

            {/* Rows C, D, E, F */}
            <div className="flex flex-col gap-2 xs:gap-2.5 items-center w-full">
              {["C", "D", "E", "F"].map((row) => (
                <div key={row} className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 w-full">
                  <span className="w-3 xs:w-4 sm:w-6 text-center text-[9px] xs:text-[10px] sm:text-xs font-bold text-[#94a3b8] shrink-0">
                    {row}
                  </span>
                  <div className="flex items-center justify-center gap-[2px] xs:gap-[3px] sm:gap-1 md:gap-1.5">
                    {Array.from({ length: 13 }, (_, idx) => idx + 1).map(
                      (num) => {
                        const key = `${row}-${num}`;
                        const isBooked = bookedSeatKeys.has(key);
                        const isHeld = heldSeatKeys.has(key);
                        const isSelected = isSeatSelected(row, num);
                        const hasAisle = num === 3 || num === 10;

                        let seatBtn = null;

                        if (isBooked) {
                          seatBtn = (
                            <button
                              key={num}
                              type="button"
                              disabled
                              className="w-[17px] xs:w-[20px] sm:w-[26px] md:w-[30px] h-[20px] xs:h-[24px] sm:h-[28px] md:h-[32px] rounded-t-[4px] sm:rounded-t-[6px] rounded-b-[2px] sm:rounded-b-xs bg-[#0c0e15] border border-white/5 text-[#444] opacity-50 cursor-not-allowed flex items-center justify-center text-[8px] xs:text-[9px] sm:text-xs"
                            >
                              {num}
                            </button>
                          );
                        } else if (isHeld) {
                          seatBtn = (
                            <button
                              key={num}
                              type="button"
                              disabled
                              className="w-[17px] xs:w-[20px] sm:w-[26px] md:w-[30px] h-[20px] xs:h-[24px] sm:h-[28px] md:h-[32px] rounded-t-[4px] sm:rounded-t-[6px] rounded-b-[2px] sm:rounded-b-xs bg-amber-950/40 text-amber-300 border border-amber-500/50 text-[8px] xs:text-[9px] sm:text-xs flex items-center justify-center"
                              title="Held"
                            >
                              {num}
                            </button>
                          );
                        } else {
                          seatBtn = (
                            <button
                              key={num}
                              type="button"
                              onClick={() => toggleSeat(row, num, "club", 18.5)}
                              className={`w-[17px] xs:w-[20px] sm:w-[26px] md:w-[30px] h-[20px] xs:h-[24px] sm:h-[28px] md:h-[32px] rounded-t-[4px] sm:rounded-t-[6px] rounded-b-[2px] sm:rounded-b-xs text-[8px] xs:text-[9px] sm:text-xs font-bold flex items-center justify-center transition-all cursor-pointer active:scale-95 ${isSelected
                                  ? "bg-gradient-to-t from-[#bd0041] via-[#ff2e63] to-[#ff4f72] text-white shadow-[0_0_12px_rgba(255,79,114,0.9)] ring-1.5 sm:ring-2 ring-white/60 scale-105 z-10"
                                  : "bg-[#202535] hover:bg-[#2b3145] text-white border-t-2 border-[#ff4f72]/40 border-x border-b border-white/5 hover:border-[#ff4f72]/80 hover:scale-105"
                                }`}
                            >
                              {isSelected ? (
                                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                              ) : (
                                num
                              )}
                            </button>
                          );
                        }

                        return (
                          <React.Fragment key={num}>
                            {seatBtn}
                            {hasAisle && <div className="w-1.5 xs:w-2 sm:w-3 md:w-4 shrink-0" />}
                          </React.Fragment>
                        );
                      }
                    )}
                  </div>
                  <span className="w-3 xs:w-4 sm:w-6 text-center text-[9px] xs:text-[10px] sm:text-xs font-bold text-[#94a3b8] shrink-0">
                    {row}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 3: Standard Reserve ($14.00) */}
          <div className="w-full max-w-3xl flex flex-col gap-2.5 sm:gap-3 bg-[#191b23]/70 rounded-2xl p-2.5 xs:p-3.5 sm:p-5 border border-white/5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-1.5 px-1 pb-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
                <span className="font-heading font-bold text-sm sm:text-base text-white">
                  Standard Reserve
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#94a3b8] bg-[#282a31] px-2 py-0.5 rounded-full">
                  Rows G, H, J, K • Stadium Elevation
                </span>
              </div>
              <span className="text-sm sm:text-base text-[#ff2e63] font-extrabold">
                $14.00
              </span>
            </div>

            {/* Rows G, H, J, K */}
            <div className="flex flex-col gap-2 xs:gap-2.5 items-center w-full">
              {["G", "H", "J", "K"].map((row) => (
                <div key={row} className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 w-full">
                  <span className="w-3 xs:w-4 sm:w-6 text-center text-[9px] xs:text-[10px] sm:text-xs font-bold text-[#94a3b8] shrink-0">
                    {row}
                  </span>
                  <div className="flex items-center justify-center gap-[2px] xs:gap-[3px] sm:gap-1 md:gap-1.5">
                    {Array.from({ length: 13 }, (_, idx) => idx + 1).map(
                      (num) => {
                        const isSelected = isSeatSelected(row, num);
                        const hasAisle = num === 3 || num === 10;

                        return (
                          <React.Fragment key={num}>
                            <button
                              type="button"
                              onClick={() =>
                                toggleSeat(row, num, "standard", 14.0)
                              }
                              className={`w-[17px] xs:w-[20px] sm:w-[26px] md:w-[30px] h-[20px] xs:h-[24px] sm:h-[28px] md:h-[32px] rounded-t-[4px] sm:rounded-t-[6px] rounded-b-[2px] sm:rounded-b-xs text-[8px] xs:text-[9px] sm:text-xs font-bold flex items-center justify-center transition-all cursor-pointer active:scale-95 ${isSelected
                                  ? "bg-gradient-to-t from-[#bd0041] via-[#ff2e63] to-[#ff4f72] text-white shadow-[0_0_12px_rgba(255,79,114,0.9)] ring-1.5 sm:ring-2 ring-white/60 scale-105 z-10"
                                  : "bg-[#202535] hover:bg-[#2b3145] text-white border-t-2 border-[#6366f1]/40 border-x border-b border-white/5 hover:border-[#6366f1]/80 hover:scale-105"
                                }`}
                            >
                              {isSelected ? (
                                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                              ) : (
                                num
                              )}
                            </button>
                            {hasAisle && <div className="w-1.5 xs:w-2 sm:w-3 md:w-4 shrink-0" />}
                          </React.Fragment>
                        );
                      }
                    )}
                  </div>
                  <span className="w-3 xs:w-4 sm:w-6 text-center text-[9px] xs:text-[10px] sm:text-xs font-bold text-[#94a3b8] shrink-0">
                    {row}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sticky Bottom Checkout Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#121624]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto  flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Selected Seat Badges & Price Summary */}
          <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-[#94a3b8] font-bold">
                Selected Seats ({selectedSeats.length})
              </span>
              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                {selectedSeats.length === 0 ? (
                  <span className="text-xs text-[#94a3b8] italic">
                    Tap any seat above to select
                  </span>
                ) : (
                  selectedSeats.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-[#ff4f72]/20 border border-[#ff4f72]/40 text-[#ff2e63] font-bold text-xs"
                    >
                      {s.row}
                      {s.num}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="h-8 w-px bg-white/10 hidden sm:block" />

            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-[#94a3b8] font-bold">
                Total Price
              </span>
              <span className="font-heading text-xl sm:text-2xl font-black text-white">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* ActionButton */}
          <ActionButton
            title="Proceed to F&B & Checkout"
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
            variant="primary"
            size="md"
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
            className="w-full sm:w-auto shadow-lg shadow-[#ff4f72]/40"
          />
        </div>
      </div>
    </div>
  );
}

