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
    <div className="w-full bg-[#11131a] text-[#e2e2ec] font-sans min-h-screen pb-20 relative overflow-hidden">
      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#00a572]/15 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-96 -right-32 w-[520px] h-[480px] bg-[#ff4f72]/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-[640px] -left-32 w-[480px] h-[440px] bg-[#3131c0]/20 blur-[130px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        {/* Booking Success Header */}
        <section className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          {/* Glowing Animated Icon */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="absolute inset-0 rounded-full bg-[#10b981]/25 blur-2xl animate-pulse" />
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#10b981] to-[#059669] shadow-[0_0_36px_rgba(16,185,129,0.45)] text-white">
              <CheckCircle className="w-10 h-10 stroke-[2.5]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#191b23] border border-white/10 mb-3 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span className="text-xs uppercase tracking-wider text-[#10b981] font-bold">
              Booking Confirmed
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-mono text-[#94a3b8]">
              #TS-884920194
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">
            Your tickets are ready.
          </h1>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-lg leading-relaxed">
            Sent directly to{" "}
            <strong className="text-white">alex.rivera@example.com</strong> and{" "}
            <strong className="text-white">+1 (415) 555-0192</strong> via SMS &
            WhatsApp.
          </p>
        </section>

        {/* Main 2-Column Grid: M-Ticket Centerpiece & Contextual Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Centerpiece: M-Ticket Boarding Pass (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative rounded-3xl bg-[#191b23]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Top Cinematic Backdrop Header */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxt1zu5W6pzIb2zc4BXIeExfOWCW0-R_xvk_x1G7sBzlRNrbrGCFgFbOo0vVWfwqoRezPSewsM9NbSkqHpHOnvC9d7HjHY7RhvdK3q5wjF_Ki0TUNb1Q0_6c_5FtU6bHcUv3BhrTWBkFCZcj-9zgitZv-XLMqAADLKQtCOv8TRD8PgK8gMpibP1wzIYXYTzsHIxNybTkPTy50Qz_3mqmXMk5DiS8rC9MCJA4EqeBd7"
                  alt="Dune Part Two"
                  className="w-full h-full object-cover object-center filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191b23] via-[#191b23]/60 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#3131c0]/80 backdrop-blur-md text-[#c0c1ff] text-xs uppercase tracking-wider font-extrabold border border-[#3131c0]">
                    IMAX with Laser • 4K
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c0e15]/80 backdrop-blur-md text-[#10b981] text-xs font-bold border border-[#10b981]/30">
                    <Sparkles className="w-3.5 h-3.5 fill-current" /> Instant Gate Pass
                  </span>
                </div>

                {/* Movie Title & Venue */}
                <div className="absolute bottom-4 left-4 right-4 space-y-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#ff2e63] font-black">
                    Sci-Fi Epic • PG-13 • 2h 46m
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight uppercase drop-shadow-md">
                    DUNE: PART TWO
                  </h2>
                  <p className="text-xs text-[#94a3b8] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                    {venue} • Auditorium 1, San Francisco, CA
                  </p>
                </div>
              </div>

              {/* Ticket Core Details Strip */}
              <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
                {/* 4-Item Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#1d1f27] border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#94a3b8] font-bold">
                      Date
                    </span>
                    <span className="font-heading text-sm font-bold text-white">
                      {date}
                    </span>
                    <span className="text-[11px] text-[#94a3b8]">2025</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#94a3b8] font-bold">
                      Showtime
                    </span>
                    <span className="font-heading text-sm font-bold text-[#ff2e63]">
                      {time}
                    </span>
                    <span className="text-[11px] text-[#10b981]">
                      Doors: 07:15 PM
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#94a3b8] font-bold">
                      Screen
                    </span>
                    <span className="font-heading text-sm font-bold text-white">
                      IMAX GT 1
                    </span>
                    <span className="text-[11px] text-[#94a3b8]">North Wing</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#94a3b8] font-bold">
                      Seats
                    </span>
                    <span className="font-heading text-sm font-bold text-[#ff2e63]">
                      Row E : {seatsParam}
                    </span>
                    <span className="text-[11px] text-[#10b981]">
                      Premium Club
                    </span>
                  </div>
                </div>

                {/* Gate Entry Turnstile Pill */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#282a31]/60 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0c0e15] flex items-center justify-center text-[#10b981]">
                      <DoorOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#94a3b8] block">
                        Fast Track Turnstile
                      </span>
                      <span className="text-xs font-bold text-white">
                        Enter via North Lobby • Gate 2
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-[10px] uppercase font-bold">
                    Level 3
                  </span>
                </div>

                {/* F&B In-Seat Voucher Token */}
                <div className="rounded-2xl bg-[#33343c]/50 p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ff4f72] flex items-center justify-center text-white shrink-0 shadow-md">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {fnb}
                        </span>
                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#00a572]/20 text-[#10b981]">
                          Active
                        </span>
                      </div>
                      <span className="text-[11px] text-[#94a3b8]">
                        Seat Delivery Confirmed • Dispatched at 07:35 PM to {seatsParam}
                      </span>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-[10px] uppercase text-[#94a3b8] block">
                      Order Code
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      #FNB-4402
                    </span>
                  </div>
                </div>
              </div>

              {/* Perforated Cut-Out Notch Divider */}
              <div className="relative flex items-center justify-between w-full h-8 overflow-hidden bg-[#191b23]">
                <div className="w-6 h-10 -ml-3 rounded-r-full bg-[#11131a]" />
                <div className="flex-1 border-b-2 border-dashed border-white/15 mx-4" />
                <div className="w-6 h-10 -mr-3 rounded-l-full bg-[#11131a]" />
              </div>

              {/* Scannable Dynamic QR Pass Section */}
              <div className="p-5 sm:p-8 flex flex-col items-center text-center bg-[#191b23]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-xs text-[#10b981] uppercase tracking-wider font-extrabold">
                    Live Dynamic Gate Code
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs text-[#94a3b8]">
                    Dynamic anti-screenshot pass
                  </span>
                </div>

                {/* High Contrast QR Code with Scan Laser Line */}
                <div className="relative p-4 sm:p-5 bg-white rounded-3xl shadow-2xl flex flex-col items-center max-w-full">
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 bg-white flex items-center justify-center p-2 overflow-hidden rounded-xl">
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
                  <div className="mt-3 flex items-center justify-between w-full px-2 text-black text-xs">
                    <span className="font-mono font-bold">
                      CODE: 8849-2019-4912
                    </span>
                    <span className="font-mono font-bold text-[#bd0041] flex items-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      0:{qrCountdown.toString().padStart(2, "0")}s
                    </span>
                  </div>
                </div>

                {/* Barcode Fallback */}
                <div className="mt-5 w-full max-w-xs flex flex-col items-center">
                  <div className="h-9 w-full flex items-center justify-between gap-1 overflow-hidden px-4 opacity-75">
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
                  <span className="font-mono text-xs text-[#94a3b8] mt-1 tracking-widest">
                    TS-8849-20194-{seatsParam.replace(",", "")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contextual Action Sidebar (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Wallet Integrations */}
            <div className="p-6 rounded-3xl bg-[#191b23] border border-white/10 shadow-xl space-y-4">
              <h3 className="font-heading text-base font-bold text-white">
                Pass Integrations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Apple Wallet */}
                <button
                  type="button"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0c0e15] hover:bg-[#1d1f27] border border-white/5 transition-all text-left group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-black border border-white/10 flex items-center justify-center text-white font-black text-sm">
                    
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94a3b8] block">Add to</span>
                    <span className="text-xs font-bold text-white">
                      Apple Wallet
                    </span>
                  </div>
                </button>

                {/* Google Wallet */}
                <button
                  type="button"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0c0e15] hover:bg-[#1d1f27] border border-white/5 transition-all text-left group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#3131c0]/30 border border-[#3131c0]/50 flex items-center justify-center text-[#c0c1ff]">
                    <Sparkles className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94a3b8] block">Save to</span>
                    <span className="text-xs font-bold text-white">
                      Google Wallet
                    </span>
                  </div>
                </button>
              </div>

              {/* Utility Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] border border-white/5 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-[#ff2e63]" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Download PDF Tickets & Invoice
                      </span>
                      <span className="text-[10px] text-[#94a3b8]">
                        Includes tax breakdown • 1.4 MB
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#94a3b8]" />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] border border-white/5 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Share2 className="w-4 h-4 text-[#10b981]" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Share Ticket with Companion
                      </span>
                      <span className="text-[10px] text-[#94a3b8]">
                        Sends isolated pass invite via iMessage
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#94a3b8]" />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] border border-white/5 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <CalendarPlus className="w-4 h-4 text-[#6366f1]" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Add to Calendar
                      </span>
                      <span className="text-[10px] text-[#94a3b8]">
                        Auto-syncs 2hr transit alert
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#94a3b8]" />
                </button>
              </div>
            </div>

            {/* Cancellation & Refund Guarantee Card */}
            <div className="p-6 rounded-3xl bg-[#191b23] border border-white/10 shadow-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                  Easy Cancellation Policy
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#10b981]">
                  100% Refundable
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Change of plans? Free instant cancellation is available until{" "}
                <strong className="text-white">05:45 PM, May 17</strong> (2 hours
                prior to showtime). Refunds credit immediately to your original
                payment method.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
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
            <div className="p-6 rounded-3xl bg-[#191b23] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-sm font-bold text-white">
                    Getting There
                  </h3>
                  <p className="text-xs text-[#94a3b8]">
                    AMC Metreon 16 • 135 4th St, SF
                  </p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#282a31] text-[#10b981] hover:bg-[#10b981] hover:text-[#0c0e15] transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>

              {/* Map Preview Image */}
              <div
                className="relative w-full h-36 rounded-2xl overflow-hidden bg-cover bg-center border border-white/5"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtNY7e3T2bL84DuKbHvXDPhj1mkktQDq-GK5XBcmVWEfdP5oTSr70GCGRbK799oQc2PYE9RDMsLI_WJjR3E5neA7YiVqfcC6Rek86isnx_dmtvaGwalcgsTWgkuET7la2G_v9Tz5nYTJ5LnjqFUn1SvyYOU4ZmYoxuBzmYGCPXtNl1vRHZb67e0P6shEyTUa5Rr5aQvi7OAqPok3_bw8Ku2KepszS0iaw-Sa2AFic4')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white font-semibold">
                    Auditorium 1 • 3rd Floor
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#10b981] font-bold text-[11px]">
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
                  <span>
                    Show this digital pass at Yerba Buena Garage customer counter
                    for up to 3 hours of free parking.
                  </span>
                </div>
              </div>
            </div>

            {/* Instant Support Chat Card */}
            <div className="p-4 rounded-2xl bg-[#282a31]/60 backdrop-blur-md border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#3131c0] flex items-center justify-center text-white shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xs text-white block">
                    Have an issue with this booking?
                  </span>
                  <span className="text-[11px] text-[#94a3b8]">
                    Priority concierge response in under 2 mins.
                  </span>
                </div>
              </div>
              <ActionButton
                title="Live Chat"
                variant="primary"
                size="sm"
                icon={null}
              />
            </div>
          </div>
        </div>

        {/* SprintPoints Reward Banner */}
        <section className="mt-14 p-6 rounded-3xl bg-[#191b23] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00a572]/20 flex items-center justify-center text-[#10b981] shrink-0 border border-[#10b981]/30">
              <Sparkles className="w-7 h-7 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg font-bold text-white">
                  Alex, you earned 340 SprintPoints
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#ff2e63]/20 text-[#ff2e63] text-[10px] font-bold uppercase">
                  +VIP Tier Locked
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Use points towards your next ticket purchase or free concessions on your upcoming visits.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
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

