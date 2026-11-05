"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, Bell, BellRing, Check } from "lucide-react";

/**
 * UpcomingCard Component
 * Card featuring movie preview, release countdown badge, fan anticipation meter & notify action.
 *
 * @param {object} item - Movie/Event data object
 * @param {string} className - Optional custom class
 */
export default function UpcomingCard({
  item = {
    id: "valkyrie-eclipse",
    title: "Valkyrie: Eclipse",
    meta: "Epic Fantasy • Dir. Elena Thorne",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    releaseBadge: "RELEASES IN 4 DAYS",
    badgeColor: "pink", // "pink" | "blue" | "dark"
    fansWaiting: "42.8k fans waiting",
    buzzIndex: 92,
    meterTheme: "emerald", // "emerald" | "indigo" | "pink"
  },
  className = "",
}) {
  const [isNotified, setIsNotified] = useState(false);

  // Release badge styling
  const badgeClasses = {
    pink: "bg-[#FF2E63] text-white shadow-md shadow-[#FF2E63]/30",
    blue: "bg-[#6366F1] text-white shadow-md shadow-[#6366F1]/30",
    dark: "bg-black/75 border border-white/20 text-slate-200 backdrop-blur-md",
  }[item.badgeColor || "pink"] || "bg-[#FF2E63] text-white";

  // Buzz meter bar colors
  const meterBarStyles = {
    emerald: {
      bar: "bg-gradient-to-r from-[#10B981] to-[#34D399]",
      text: "text-[#10B981]",
    },
    indigo: {
      bar: "bg-gradient-to-r from-[#818CF8] to-[#C7D2FE]",
      text: "text-[#818CF8]",
    },
    pink: {
      bar: "bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B]",
      text: "text-[#FF2E63]",
    },
  }[item.meterTheme || "emerald"] || {
    bar: "bg-gradient-to-r from-[#10B981] to-[#34D399]",
    text: "text-[#10B981]",
  };

  return (
    <div
      className={`group relative flex flex-col justify-between h-full w-full rounded-2xl overflow-hidden bg-[#121522] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0B0D14]/80 ${className}`}
    >
      {/* 1. Landscape Media / Poster with Top Countdown Badge */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0B0D14]">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover object-center transition-transform duration-700"
        />

        {/* Multi-stop Gradient matched to #121522 for seamless blend */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18, 21, 34, 0.4) 0%, rgba(18, 21, 34, 0) 35%, rgba(18, 21, 34, 0.45) 70%, #121522 100%)",
          }}
        />

        {/* Top-left Release Badge */}
        {item.releaseBadge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${badgeClasses}`}
            >
              {item.releaseBadge}
            </span>
          </div>
        )}
      </div>

      {/* 2. Middle Content: Title, Meta & Fan Anticipation Meter */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        {/* Title and Subtitle */}
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#FFA4B6] transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="font-sans text-xs text-slate-400 font-medium line-clamp-1">
            {item.meta}
          </p>
        </div>

        {/* Fan Anticipation Meter Box */}
        <div className="rounded-xl bg-[#0B0D14]/90 border border-white/5 p-2.5 sm:p-3 space-y-2">
          {/* Top row: Fans Count + Buzz Index */}
          <div className="flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Users className={`w-3.5 h-3.5 ${meterBarStyles.text}`} />
              <span className={`text-[11px] font-semibold ${meterBarStyles.text}`}>
                {item.fansWaiting}
              </span>
            </div>
            <span className="text-[11px] font-bold text-white ">
              {item.buzzIndex}% Buzz Index
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${meterBarStyles.bar}`}
              style={{ width: `${item.buzzIndex}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Footer Action: Notify Me at Drop */}
      <div className="p-5">
        <button
          type="button"
          onClick={() => setIsNotified(!isNotified)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 border ${isNotified
              ? "bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981]"
              : "bg-[#171B2A] hover:bg-[#FF2E63] text-slate-200 hover:text-white border-white/10 hover:border-[#FF2E63] group-hover:shadow-md group-hover:shadow-[#FF2E63]/25"
            }`}
        >
          {isNotified ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Notified for Premiere</span>
            </>
          ) : (
            <>
              <BellRing className="w-3.5 h-3.5 text-[#FF2E63] group-hover:text-white transition-colors" />
              <span>Notify Me at Drop</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

