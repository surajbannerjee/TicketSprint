"use client";

import React, { useState } from "react";
import ActionButton from "@/components/Common/ActionButton";
import { Star, X } from "lucide-react";

/**
 * SprintPassBanner Component
 * Reusable VIP membership perk banner with responsive layout.
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
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 ${className}`}
    >
      <div className="relative w-full rounded-2xl bg-[#121520] border border-white/10 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl backdrop-blur-md">
        {/* Left Side: Glowing Star Icon + Title + Description */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
          {/* Glowing Pink Icon Box */}
          <div className="relative shrink-0 mt-0.5 sm:mt-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FF2E63] flex items-center justify-center shadow-[0_8px_20px_rgba(255,46,99,0.38)]">
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
                <span className="px-2 py-0.5 rounded-full bg-[#10B981] text-[#042417] text-[9px] sm:text-[10px] font-black tracking-wider uppercase">
                  {badgeText}
                </span>
              )}
            </div>
            <p className="font-sans text-xs sm:text-sm text-pinkT leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Right Side: Claim Button + Dismiss (X) */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3 shrink-0 pt-1 md:pt-0 border-t border-white/5 md:border-none">
          <ActionButton
            title={buttonText}
            link={buttonLink}
            onClick={onClaim}
            variant="secondary"
            icon={null}
            size="sm"
            className="flex-1 md:flex-initial"
          />

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="p-2 rounded-lg text-pinkT hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
