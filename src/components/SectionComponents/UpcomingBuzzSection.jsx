"use client";

import React from "react";
import UpcomingCard from "@/components/Common/UpcomingCard";
import { TrendingUp } from "lucide-react";

const DEFAULT_UPCOMING_MOVIES = [
  {
    id: "valkyrie-eclipse",
    title: "Valkyrie: Eclipse",
    meta: "Epic Fantasy • Dir. Elena Thorne",
    image:
      "https://www.movy.sx/img/w780/lV1uc72FkvHqzY9rDeAQXWaSFOi.jpg/q65.webp",
    releaseBadge: "RELEASES IN 4 DAYS",
    badgeColor: "pink",
    fansWaiting: "42.8k fans waiting",
    buzzIndex: 92,
    meterTheme: "emerald",
  },
  {
    id: "chronicles-of-aeris",
    title: "Chronicles of Aeris",
    meta: "Animation / Adventure • All Ages",
    image:
      "https://www.movy.sx/img/w780/bgMD95c7IUVgzAWYbcoxRXidtFI.jpg/q65.webp",
    releaseBadge: "RELEASES IN 12 DAYS",
    badgeColor: "blue",
    fansWaiting: "28.1k fans waiting",
    buzzIndex: 78,
    meterTheme: "indigo",
  },
  {
    id: "the-echo-chamber",
    title: "The Echo Chamber",
    meta: "Psychological Horror • Rated R",
    image:
      "https://www.movy.sx/img/w780/cd8AggcjG4kW4Lb6voA54UhwgFZ.jpg/q65.webp",
    releaseBadge: "RELEASES IN 19 DAYS",
    badgeColor: "dark",
    fansWaiting: "51.4k fans waiting",
    buzzIndex: 97,
    meterTheme: "pink",
  },
];

/**
 * UpcomingBuzzSection Component
 * "Upcoming Blockbusters & Buzz" section showcasing fan anticipation meters and drop notifications.
 *
 * @param {Array} items - List of upcoming movie objects
 * @param {string} badge - Top subtitle badge
 * @param {string} title - Section heading
 * @param {string} description - Explanatory subtitle text on the right
 * @param {string} className - Optional class
 */
export default function UpcomingBuzzSection({
  items = DEFAULT_UPCOMING_MOVIES,
  badge = "FAN ANTICIPATION METER",
  title = "Upcoming Blockbusters & Buzz",
  description = "Set instant advance notifications. Tickets unlock 48 hours prior to official premiere drops for registered fans.",
  className = "",
}) {
  return (
    <section
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 lg:py-15 py-5 ${className}`}
    >
      <div className="p-5 bg-[#191B23] rounded-2xl">
        {/* 1. Section Header Area */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
          {/* Left: Badge & Title */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#818CF8] ">
              <TrendingUp className="w-3.5 h-3.5 text-[#818CF8]" />
              <span>{badge}</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              {title}
            </h2>
          </div>

          {/* Right: Description Text */}
          {description && (
            <p className="font-sans text-xs sm:text-sm text-pinkT max-w-md md:text-left leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* 2. Grid Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {items.map((item) => (
            <div key={item.id} className="h-full">
              <UpcomingCard item={item} className="h-full" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

