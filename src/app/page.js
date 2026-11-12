"use client";

import React, { useState } from "react";
import HeroSection from "@/components/SectionComponents/HeroSection";
import SprintPassBanner from "@/components/SectionComponents/SprintPassBanner";
import TrendingBlockbusters from "@/components/SectionComponents/TrendingBlockbusters";
import UpcomingBuzzSection from "@/components/SectionComponents/UpcomingBuzzSection";
import LiveSpectaclesSection from "@/components/SectionComponents/LiveSpectaclesSection";
import { Sparkles, X, UserCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { user, openLoginModal } = useApp();
  const [bannerDismissed, setBannerDismissed] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0B0D14] text-[#F8FAFC] selection:bg-[#FF2E63] selection:text-white overflow-hidden">
      {/* Background dot pattern matching user image */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative gradient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF2E63]/15 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-96 right-0 w-[450px] h-[300px] bg-[#6366F1]/15 blur-[120px] rounded-full" />

      {/* Welcome / Sign In Quick Prompt Banner (Shown for guest visitors) */}
      {!user && !bannerDismissed && (
        <div className="relative z-30 bg-gradient-to-r from-[#191b23] via-[#121624] to-[#191b23] border-b border-white/10 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0" />
              <p className="text-slate-200 truncate">
                <strong className="text-white">First time at TicketSprint?</strong> Sign in to unlock instant seat reservation, zero booking fees & free popcorn vouchers!
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => openLoginModal()}
                className="px-3 py-1 rounded-full bg-[#FF2E63] hover:bg-[#ff4f72] text-white font-extrabold text-[11px] uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Sign In / Join
              </button>
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Cinematic Hero Section (Exact Replica of Uploaded Image) */}
      <HeroSection />

      {/* 2. SprintPass VIP Tier Banner Component */}
      <SprintPassBanner />

      {/* 3. Trending Blockbusters Section (Swiper Slider + MovieCard Map + Filter Dropdown) */}
      <TrendingBlockbusters />

      {/* 4. Upcoming Blockbusters & Buzz Section (Fan Anticipation Meter) */}
      <UpcomingBuzzSection />

      {/* 5. Live Spectacles: Concerts & Arena Sports + Venue Experience Discovery */}
      <LiveSpectaclesSection />
    </div>
  );
}
