"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ActionButton from "@/components/Common/ActionButton";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  DoorOpen,
  Utensils,
  Download,
  Share2,
  CalendarPlus,
  RefreshCw,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Navigation,
  ParkingCircle,
  MessageSquare,
  QrCode,
  Ticket,
} from "lucide-react";

export default function ConfirmationClient() {
  const searchParams = useSearchParams();

  const movie = searchParams.get("movie") || "dune-part-two";
  const venue = searchParams.get("venue") || "AMC Metreon 16";
  const time = searchParams.get("time") || "07:45 PM";
  const date = searchParams.get("date") || "Fri, May 17";
  const seatsParam = searchParams.get("seats") || "E8,E9";
  const total = searchParams.get("total") || "58.13";
  const fnb = searchParams.get("fnb") || "IMAX Mega Combo (1x)";

  // QR dynamic security refresh countdown (30s loop)
  const [qrCountdown, setQrCountdown] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => {
      setQrCountdown((prev) => (prev > 1 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#11131a] text-[#e2e2ec] font-sans min-h-screen pb-16 sm:pb-20 relative overflow-x-hidden">
      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[320px] bg-[#00a572]/15 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-96 -right-32 w-[400px] max-w-full h-[400px] bg-[#ff4f72]/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-[640px] -left-32 w-[400px] max-w-full h-[400px] bg-[#3131c0]/20 blur-[130px] rounded-full" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 pt-6 sm:pt-10">
        {/* Booking Success Header */}
        <section className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          {/* Glowing Animated Icon */}
          <div className="relative flex items-center justify-center mb-4 sm:mb-5">
            <div className="absolute inset-0 rounded-full bg-[#10b981]/25 blur-2xl animate-pulse" />
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#10b981] to-[#059669] shadow-[0_0_36px_rgba(16,185,129,0.45)] text-white">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#191b23] border border-white/10 mb-3 shadow-md max-w-full flex-wrap justify-center text-center">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping shrink-0" />
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#10b981] font-bold">
              Booking Confirmed
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[11px] sm:text-xs font-mono text-[#94a3b8]">
              #TS-884920194
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2 px-2">
            Your tickets are ready.
          </h1>
          <p className="text-xs sm:text-base text-[#94a3b8] max-w-lg leading-relaxed px-2">
            Sent directly to{" "}
            <strong className="text-white break-all">surajbanerjee255@gmail.com</strong> and{" "}
            <strong className="text-white whitespace-nowrap">+91 98765 43210</strong> via SMS &
            WhatsApp.
          </p>
        </section>

        {/* Main 2-Column Grid: M-Ticket Centerpiece & Contextual Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Centerpiece: M-Ticket Boarding Pass (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#191b23]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Top Cinematic Backdrop Header */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxt1zu5W6pzIb2zc4BXIeExfOWCW0-R_xvk_x1G7sBzlRNrbrGCFgFbOo0vVWfwqoRezPSewsM9NbSkqHpHOnvC9d7HjHY7RhvdK3q5wjF_Ki0TUNb1Q0_6c_5FtU6bHcUv3BhrTWBkFCZcj-9zgitZv-XLMqAADLKQtCOv8TRD8PgK8gMpibP1wzIYXYTzsHIxNybTkPTy50Qz_3mqmXMk5DiS8rC9MCJA4EqeBd7"
                  alt="Dune Part Two"
                  className="w-full h-full object-cover object-center filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191b23] via-[#191b23]/70 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 z-10">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#3131c0]/90 backdrop-blur-md text-[#c0c1ff] text-[10px] sm:text-xs uppercase tracking-wider font-extrabold border border-[#3131c0]/50 shadow-md">
                    IMAX with Laser • 4K
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#0c0e15]/90 backdrop-blur-md text-[#10b981] text-[10px] sm:text-xs font-bold border border-[#10b981]/30 shadow-md">
                    <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" /> Instant Gate Pass
                  </span>
                </div>

                {/* Movie Title & Venue */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#ff2e63] font-black block">
                    Sci-Fi Epic • PG-13 • 2h 46m
                  </span>
                  <h2 className="font-heading text-xl sm:text-3xl font-black text-white tracking-tight uppercase drop-shadow-md leading-tight">
                    DUNE: PART TWO
                  </h2>
                  <p className="text-xs text-[#94a3b8] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                    <span className="truncate">{venue} • Auditorium 1, San Francisco, CA</span>
                  </p>
                </div>
              </div>

              {/* Ticket Core Details Strip */}
              <div className="p-3.5 sm:p-6 flex flex-col gap-3.5 sm:gap-5">
                {/* 4-Item Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#1d1f27] border border-white/5">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase text-[#94a3b8] font-bold">
                      Date
                    </span>
                    <span className="font-heading text-xs sm:text-sm font-bold text-white truncate">
                      {date}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#94a3b8]">2025</span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase text-[#94a3b8] font-bold">
                      Showtime
                    </span>
                    <span className="font-heading text-xs sm:text-sm font-bold text-[#ff2e63] truncate">
                      {time}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#10b981] truncate">
                      Doors: 07:15 PM
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase text-[#94a3b8] font-bold">
                      Screen
                    </span>
                    <span className="font-heading text-xs sm:text-sm font-bold text-white truncate">
                      IMAX GT 1
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#94a3b8] truncate">North Wing</span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase text-[#94a3b8] font-bold">
                      Seats
                    </span>
                    <span className="font-heading text-xs sm:text-sm font-bold text-[#ff2e63] truncate">
                      Row E : {seatsParam}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#10b981] truncate">
                      Premium Club
                    </span>
                  </div>
                </div>

                {/* Gate Entry Turnstile Pill */}
                <div className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#282a31]/60 border border-white/5">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0c0e15] flex items-center justify-center text-[#10b981] shrink-0">
                      <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#94a3b8] block truncate">
                        Fast Track Turnstile
                      </span>
                      <span className="text-xs font-bold text-white block truncate">
                        Enter via North Lobby • Gate 2
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-[10px] uppercase font-bold shrink-0">
                    Level 3
                  </span>
                </div>

                {/* F&B In-Seat Voucher Token */}
                <div className="rounded-xl sm:rounded-2xl bg-[#33343c]/50 p-3 sm:p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ff4f72] flex items-center justify-center text-white shrink-0 shadow-md">
                      <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-xs font-bold text-white truncate">
                          {fnb}
                        </span>
                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#00a572]/20 text-[#10b981] shrink-0">
                          Active
                        </span>
                      </div>
                      <span className="text-[11px] text-[#94a3b8] block mt-0.5">
                        Seat Delivery Confirmed • Dispatched at 07:35 PM to {seatsParam}
                      </span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0 shrink-0">
                    <span className="text-[10px] uppercase text-[#94a3b8] block">
                      Order Code
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-white">
                      #FNB-4402
                    </span>
                  </div>
                </div>
              </div>

              {/* Perforated Cut-Out Notch Divider */}
              <div className="relative flex items-center justify-between w-full h-8 overflow-hidden bg-[#191b23]">
                <div className="w-5 h-8 -ml-2.5 rounded-r-full bg-[#11131a]" />
                <div className="flex-1 border-b-2 border-dashed border-white/15 mx-3 sm:mx-4" />
                <div className="w-5 h-8 -mr-2.5 rounded-l-full bg-[#11131a]" />
              </div>

              {/* Scannable Dynamic QR Pass Section */}
              <div className="p-4 sm:p-8 flex flex-col items-center text-center bg-[#191b23]">
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 text-center">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shrink-0" />
                  <span className="text-[11px] sm:text-xs text-[#10b981] uppercase tracking-wider font-extrabold">
                    Live Dynamic Gate Code
                  </span>
                  <span className="text-white/20 hidden xs:inline">•</span>
                  <span className="text-[10px] sm:text-xs text-[#94a3b8]">
                    Dynamic anti-screenshot pass
                  </span>
                </div>

                {/* High Contrast QR Code with Scan Laser Line */}
                <div className="relative p-3.5 sm:p-5 bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col items-center max-w-[280px] sm:max-w-none w-full sm:w-auto">
                  <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 bg-white flex items-center justify-center p-2 overflow-hidden rounded-xl">
                    <svg
                      className="w-full h-full text-black"
                      fill="currentColor"
                      viewBox="0 0 100 100"
                    >
                      <rect x="0" y="0" width="28" height="28" rx="2" />
                      <rect x="4" y="4" width="20" height="20" rx="1" fill="#ffffff" />
                      <rect x="8" y="8" width="12" height="12" rx="1" />
                      <rect x="72" y="0" width="28" height="28" rx="2" />
                      <rect x="76" y="4" width="20" height="20" rx="1" fill="#ffffff" />
                      <rect x="80" y="8" width="12" height="12" rx="1" />
                      <rect x="0" y="72" width="28" height="28" rx="2" />
                      <rect x="4" y="76" width="20" height="20" rx="1" fill="#ffffff" />
                      <rect x="8" y="80" width="12" height="12" rx="1" />
                      <rect x="34" y="4" width="6" height="6" />
                      <rect x="46" y="4" width="6" height="12" />
                      <rect x="58" y="4" width="6" height="6" />
                      <rect x="34" y="16" width="18" height="6" />
                      <rect x="58" y="16" width="6" height="10" />
                      <rect x="4" y="34" width="6" height="6" />
                      <rect x="16" y="34" width="12" height="6" />
                      <rect x="4" y="46" width="18" height="6" />
                      <rect x="4" y="58" width="6" height="6" />
                      <rect x="76" y="34" width="18" height="6" />
                      <rect x="76" y="46" width="6" height="12" />
                      <rect x="88" y="52" width="6" height="14" />
                      <rect x="34" y="34" width="12" height="12" />
                      <rect x="52" y="34" width="14" height="6" />
                      <rect x="52" y="46" width="6" height="14" />
                      <rect x="64" y="46" width="6" height="6" />
                      <rect x="34" y="52" width="12" height="6" />
                      <rect x="34" y="64" width="6" height="18" />
                      <rect x="46" y="64" width="12" height="6" />
                      <rect x="64" y="58" width="6" height="24" />
                      <rect x="46" y="76" width="12" height="18" />
                      <rect x="76" y="76" width="18" height="6" />
                      <rect x="76" y="88" width="6" height="6" />
                      <rect x="88" y="88" width="6" height="6" />
                    </svg>

                    {/* Laser Scan Animation Line */}
                    <div className="absolute inset-x-0 h-1 bg-[#ff2e63] shadow-[0_0_12px_#ff4f72] animate-[bounce_3s_infinite] opacity-80" />
                  </div>

                  {/* Refresh countdown */}
                  <div className="mt-2.5 sm:mt-3 flex items-center justify-between w-full px-1 sm:px-2 text-black text-[10px] sm:text-xs">
                    <span className="font-mono font-bold truncate">
                      CODE: 8849-2019-4912
                    </span>
                    <span className="font-mono font-bold text-[#bd0041] flex items-center gap-1 shrink-0 ml-2">
                      <RefreshCw className="w-3 sm:w-3.5 h-3 sm:h-3.5 animate-spin" />
                      0:{qrCountdown.toString().padStart(2, "0")}s
                    </span>
                  </div>
                </div>

                {/* Barcode Fallback */}
                <div className="mt-4 sm:mt-5 w-full max-w-xs flex flex-col items-center">
                  <div className="h-8 sm:h-9 w-full flex items-center justify-between gap-1 overflow-hidden px-4 opacity-75">
                    <div className="w-1 h-full bg-white" />
                    <div className="w-2 h-full bg-white" />
                    <div className="w-0.5 h-full bg-white" />
                    <div className="w-1.5 h-full bg-white" />
                    <div className="w-3 h-full bg-white" />
                    <div className="w-1 h-full bg-white" />
                    <div className="w-0.5 h-full bg-white" />
                    <div className="w-2 h-full bg-white" />
                    <div className="w-1 h-full bg-white" />
                    <div className="w-3 h-full bg-white" />
                    <div className="w-0.5 h-full bg-white" />
                    <div className="w-2 h-full bg-white" />
                    <div className="w-1.5 h-full bg-white" />
                    <div className="w-1 h-full bg-white" />
                    <div className="w-2 h-full bg-white" />
                    <div className="w-3 h-full bg-white" />
                  </div>
                  <span className="font-mono text-[11px] sm:text-xs text-[#94a3b8] mt-1 tracking-widest truncate">
                    TS-8849-20194-{seatsParam.replace(",", "")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contextual Action Sidebar (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* Wallet Integrations */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#191b23] border border-white/10 shadow-xl space-y-3.5 sm:space-y-4">
              <h3 className="font-heading text-sm sm:text-base font-bold text-white">
                Pass Integrations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Apple Wallet */}
                <button
                  type="button"
                  className="flex items-center gap-3 p-3 rounded-xl sm:rounded-2xl bg-[#0c0e15] hover:bg-[#1d1f27] border border-white/5 transition-all text-left group cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black border border-white/10 flex items-center justify-center text-white font-black text-sm shrink-0">
                    
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#94a3b8] block">Add to</span>
                    <span className="text-xs font-bold text-white truncate block">
                      Apple Wallet
                    </span>
                  </div>
                </button>

                {/* Google Wallet */}
                <button
                  type="button"
                  className="flex items-center gap-3 p-3 rounded-xl sm:rounded-2xl bg-[#0c0e15] hover:bg-[#1d1f27] border border-white/5 transition-all text-left group cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#3131c0]/30 border border-[#3131c0]/50 flex items-center justify-center text-[#c0c1ff] shrink-0">
                    <Sparkles className="w-4 h-4 fill-current" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#94a3b8] block">Save to</span>
                    <span className="text-xs font-bold text-white truncate block">
                      Google Wallet
                    </span>
                  </div>
                </button>
              </div>

              {/* Utility Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] border border-white/5 transition-colors text-left cursor-pointer w-full gap-2 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Download className="w-4 h-4 text-[#ff2e63] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block truncate">
                        Download PDF Tickets & Invoice
                      </span>
                      <span className="text-[10px] text-[#94a3b8] block truncate">
                        Includes tax breakdown • 1.4 MB
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#94a3b8] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] border border-white/5 transition-colors text-left cursor-pointer w-full gap-2 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Share2 className="w-4 h-4 text-[#10b981] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block truncate">
                        Share Ticket with Companion
                      </span>
                      <span className="text-[10px] text-[#94a3b8] block truncate">
                        Sends isolated pass invite via iMessage
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#94a3b8] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] border border-white/5 transition-colors text-left cursor-pointer w-full gap-2 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CalendarPlus className="w-4 h-4 text-[#6366f1] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block truncate">
                        Add to Calendar
                      </span>
                      <span className="text-[10px] text-[#94a3b8] block truncate">
                        Auto-syncs 2hr transit alert
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#94a3b8] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Cancellation & Refund Guarantee Card */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#191b23] border border-white/10 shadow-xl space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-heading text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
                  Easy Cancellation Policy
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#10b981] shrink-0">
                  100% Refundable
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Change of plans? Free instant cancellation is available until{" "}
                <strong className="text-white">05:45 PM, May 17</strong> (2 hours
                prior to showtime). Refunds credit immediately to your original
                payment method.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  className="text-[#ff4f72] hover:underline font-bold cursor-pointer"
                >
                  Cancel Booking & Refund
                </button>
                <button
                  type="button"
                  className="text-[#94a3b8] hover:text-white cursor-pointer"
                >
                  View Policy Details
                </button>
              </div>
            </div>

            {/* Getting There & Directions Map Preview */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#191b23] border border-white/10 shadow-xl space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-bold text-white truncate">
                    Getting There
                  </h3>
                  <p className="text-xs text-[#94a3b8] truncate">
                    AMC Metreon 16 • 135 4th St, SF
                  </p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#282a31] text-[#10b981] hover:bg-[#10b981] hover:text-[#0c0e15] transition-colors shrink-0"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>

              {/* Map Preview Image */}
              <div
                className="relative w-full h-32 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden bg-cover bg-center border border-white/5"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtNY7e3T2bL84DuKbHvXDPhj1mkktQDq-GK5XBcmVWEfdP5oTSr70GCGRbK799oQc2PYE9RDMsLI_WJjR3E5neA7YiVqfcC6Rek86isnx_dmtvaGwalcgsTWgkuET7la2G_v9Tz5nYTJ5LnjqFUn1SvyYOU4ZmYoxuBzmYGCPXtNl1vRHZb67e0P6shEyTUa5Rr5aQvi7OAqPok3_bw8Ku2KepszS0iaw-Sa2AFic4')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap items-center justify-between gap-1.5 text-xs">
                  <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white font-semibold text-[11px] sm:text-xs truncate">
                    Auditorium 1 • 3rd Floor
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#10b981] font-bold text-[10px] sm:text-[11px] shrink-0">
                    12 min drive
                  </span>
                </div>
              </div>

              {/* Parking Instructions */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#282a31]/50 border border-white/5 text-xs text-[#94a3b8]">
                <ParkingCircle className="w-4 h-4 text-[#c0c1ff] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">
                    Complimentary Parking Validation
                  </strong>
                  <span className="leading-relaxed">
                    Show this digital pass at Yerba Buena Garage customer counter
                    for up to 3 hours of free parking.
                  </span>
                </div>
              </div>
            </div>

            {/* Instant Support Chat Card */}
            <div className="p-4 rounded-xl sm:rounded-2xl bg-[#282a31]/60 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#3131c0] flex items-center justify-center text-white shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-heading font-bold text-xs text-white block">
                    Have an issue with this booking?
                  </span>
                  <span className="text-[11px] text-[#94a3b8] block">
                    Priority concierge response in under 2 mins.
                  </span>
                </div>
              </div>
              <ActionButton
                title="Live Chat"
                variant="primary"
                size="sm"
                icon={null}
                className="w-full sm:w-auto justify-center shrink-0"
              />
            </div>
          </div>
        </div>

        {/* SprintPoints Reward Banner */}
        <section className="mt-8 sm:mt-14 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#191b23] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-xl">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 w-full md:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#00a572]/20 flex items-center justify-center text-[#10b981] shrink-0 border border-[#10b981]/30">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                  Suraj, you earned 340 SprintPoints
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#ff2e63]/20 text-[#ff2e63] text-[10px] font-bold uppercase shrink-0">
                  +VIP Tier Locked
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed">
                Use points towards your next ticket purchase or free concessions on your upcoming visits.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
            <ActionButton
              title="Explore More Movies"
              link="/"
              variant="secondary"
              size="md"
              icon={null}
              className="w-full sm:w-auto justify-center"
            />
            <ActionButton
              title="View Rewards"
              link="#rewards"
              variant="primary"
              size="md"
              icon={null}
              className="w-full sm:w-auto justify-center"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
