"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Film,
  SlidersHorizontal,
  ChevronRight,
  Check,
  ChevronLeft,
} from "lucide-react";

/**
 * SectionHeader Component
 * Reusable section title with badge, filter dropdown (animated), and "See all" link.
 *
 * @param {string} badge - Small top badge text (e.g. "IN THEATERS NOW")
 * @param {React.ReactNode} badgeIcon - Optional icon for the badge
 * @param {string} title - Main section title
 * @param {Array<string>} filterOptions - Available filter options
 * @param {string} activeFilter - Currently selected filter
 * @param {function} onFilterSelect - Filter change callback
 * @param {string} seeAllText - See all button text
 * @param {string} seeAllLink - Link URL for see all
 * @param {string} prevButtonId - DOM id or selector for swiper prev
 * @param {string} nextButtonId - DOM id or selector for swiper next
 * @param {string} className - Optional custom class
 */
export default function SectionHeader({
  badge = "IN THEATERS NOW",
  badgeIcon,
  title = "Trending Blockbusters",
  filterOptions = [],
  activeFilter = "All",
  onFilterSelect,
  seeAllText = "See all (24)",
  seeAllLink = "#",
  prevButtonId,
  nextButtonId,
  className = "",
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 ${className}`}
    >
      {/* Left: Badge & Heading */}
      <div className="space-y-1.5">
        {badge && (
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#FF2E63] ">
            {badgeIcon || <Film className="w-3.5 h-3.5 text-[#FF2E63]" />}
            <span>{badge}</span>
          </div>
        )}
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
          {title}
        </h2>
      </div>

      {/* Right: Filter Dropdown & See All Link + Slider Arrows */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Custom Dropdown Filter */}
        {filterOptions.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${dropdownOpen || activeFilter !== "All"
                  ? "bg-[#1E2438] border-[#FF2E63]/50 text-white shadow-md shadow-[#FF2E63]/20"
                  : "bg-[#121522] border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                }`}
            >
              <span>{activeFilter === "All" ? "Filter Genre" : activeFilter}</span>
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Animated Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#121522] border border-white/10 p-1.5 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider  border-b border-white/10 mb-1">
                  Filter by Genre
                </div>
                <div className="space-y-0.5">
                  {filterOptions.map((option) => {
                    const isSelected = activeFilter === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          if (onFilterSelect) onFilterSelect(option);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isSelected
                            ? "bg-[#FF2E63] text-white font-semibold"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                          }`}
                      >
                        <span>{option}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* See All Link */}
        {seeAllText && (
          <Link
            href={seeAllLink}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#10B981] hover:text-[#34D399] transition-colors group"
          >
            <span>{seeAllText}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}

        {/* Swiper Slider Arrows (if IDs provided) */}
        {prevButtonId && nextButtonId && (
          <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-white/10">
            <button
              id={prevButtonId}
              type="button"
              aria-label="Previous slide"
              className="p-1.5 rounded-full bg-[#121522] hover:bg-[#1a1f32] border border-white/10 text-slate-300 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id={nextButtonId}
              type="button"
              aria-label="Next slide"
              className="p-1.5 rounded-full bg-[#121522] hover:bg-[#1a1f32] border border-white/10 text-slate-300 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

