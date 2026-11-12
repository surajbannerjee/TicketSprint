"use client";

import React from "react";
import HeroSection from "@/components/SectionComponents/HeroSection";
import SprintPassBanner from "@/components/SectionComponents/SprintPassBanner";
import TrendingBlockbusters from "@/components/SectionComponents/TrendingBlockbusters";
import UpcomingBuzzSection from "@/components/SectionComponents/UpcomingBuzzSection";
import LiveSpectaclesSection from "@/components/SectionComponents/LiveSpectaclesSection";

export default function Home() {
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
