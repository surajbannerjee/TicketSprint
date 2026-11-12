"use client";

import React, { useState, useEffect } from "react";
import UpcomingCard from "@/components/Common/UpcomingCard";
import { TrendingUp } from "lucide-react";
import { UPCOMING_MOVIES } from "@/data/apiData";

export default function UpcomingBuzzSection({
  badge = "FAN ANTICIPATION METER",
  title = "Upcoming Blockbusters & Buzz",
  description = "Set instant advance notifications. Tickets unlock 48 hours prior to official premiere drops for registered fans.",
  className = "",
}) {
  const [items, setItems] = useState(UPCOMING_MOVIES);

  // Fetch upcoming movies dynamically from /api/movies?type=upcoming
  useEffect(() => {
    async function fetchUpcoming() {
      try {
        const res = await fetch("/api/movies?type=upcoming");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setItems(json.data);
          }
        }
      } catch (e) {
        console.warn("API upcoming fetch error:", e);
      }
    }
    fetchUpcoming();
  }, []);

  return (
    <section
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${className}`}
    >
      {/* 1. Header with Badge, Title, and Description */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-white/5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] sm:text-xs font-black tracking-wider uppercase">
            <TrendingUp className="w-3 h-3 stroke-[2.5]" />
            <span>{badge}</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-pinkT leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* 2. Grid of Upcoming Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
        {items.map((movie) => (
          <UpcomingCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            meta={movie.meta}
            image={movie.image}
            releaseBadge={movie.releaseBadge}
            badgeColor={movie.badgeColor}
            fansWaiting={movie.fansWaiting}
            buzzIndex={movie.buzzIndex}
            meterTheme={movie.meterTheme}
          />
        ))}
      </div>
    </section>
  );
}
