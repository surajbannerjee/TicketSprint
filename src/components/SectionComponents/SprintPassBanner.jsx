"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, X } from "lucide-react";

/**
 * SprintPassBanner Component
 * Reusable VIP membership perk banner matching the TicketSprint design.
 *
 * @param {string} title - Main membership title
 * @param {string} badgeText - Status badge text (e.g. ACTIVE MEMBER)
 * @param {string} description - Perk details text
 * @param {string} buttonText - Action button label
 * @param {string} buttonLink - Action button URL
 * @param {function} onClaim - Click handler for claim button
 * @param {boolean} dismissible - Whether the banner can be closed
 * @param {function} onDismiss - Dismiss callback
 * @param {string} className - Optional container class
 */
export default function SprintPassBanner({
  title = "SprintPass VIP Tier",
  badgeText = "ACTIVE MEMBER",
  description = "Save 20% on all IMAX weekday showtimes + Complimentary gourmet truffle popcorn upgrade on arrival.",
  buttonText = "Claim Perks",
  buttonLink = "#claim-perks",
  onClaim,
  dismissible = true,
  onDismiss,
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <div
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 lg:py-15 py-5 ${className}`}
    >
      <div className="relative w-full rounded-2xl bg-[#121520] border border-white/10 p-3.5 sm:p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl backdrop-blur-md">

        {/* Left Side: Glowing Star Icon + Title + Description */}
        <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
          {/* Glowing Pink Icon Box */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FF2E63] flex items-center justify-center shadow-[0_8px_20px_rgba(255,46,99,0.38)]">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-heading font-bold text-sm sm:text-base text-white tracking-tight">
                {title}
              </span>
              {badgeText && (
                <span className="px-2 py-0.5 rounded-full bg-[#10B981] text-[#042417] text-[10px] font-black tracking-wider uppercase ">
                  {badgeText}
                </span>
              )}
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-snug line-clamp-2 md:line-clamp-none">
              {description}
            </p>
          </div>
        </div>

        {/* Right Side: Claim Button + Dismiss (X) */}
        <div className="flex items-center gap-3 self-end md:self-center shrink-0">
          {buttonLink ? (
            <Link
              href={buttonLink}
              onClick={onClaim}
              className="px-4 sm:px-5 py-2 rounded-full bg-[#1C2234] hover:bg-[#252D45] text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-white/10 transition-colors shadow-sm"
            >
              {buttonText}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onClaim}
              className="px-4 sm:px-5 py-2 rounded-full bg-[#1C2234] hover:bg-[#252D45] text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-white/10 transition-colors shadow-sm"
            >
              {buttonText}
            </button>
          )}

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

