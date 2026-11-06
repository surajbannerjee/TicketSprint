"use client";

import React from "react";
import Link from "next/link";
import { Ticket, Play } from "lucide-react";

/**
 * ActionButton Component
 * Reusable across the app with distinct variants:
 * 1. "primary" - Vibrant pink gradient with neon glow (e.g. BOOK TICKETS NOW, FIND SEATS)
 * 2. "secondary" - Dark translucent glass with border & backdrop blur (e.g. WATCH TRAILER, Claim Perks, Find Venues)
 * 3. "glass" - Subtle transparent dark glass
 * 4. "tertiary" - Emerald accent button
 * 5. "outline" - Ghost border button
 *
 * @param {string} title - The text displayed on the button (also supports `text`)
 * @param {string} link - URL link to navigate (supports `href`)
 * @param {"primary" | "secondary" | "glass" | "tertiary" | "outline"} variant - Button style variant
 * @param {React.ReactNode | null | false} icon - Custom icon, or null/false for no icon
 * @param {"left" | "right"} iconPosition - Position of the icon relative to text
 * @param {string} className - Optional custom CSS classes
 * @param {function} onClick - Optional click handler
 * @param {"sm" | "md" | "lg"} size - Button size
 */
export default function ActionButton({
  title,
  text,
  children,
  link,
  href,
  variant = "primary",
  icon,
  iconPosition = "left",
  className = "",
  onClick,
  size = "md",
  disabled = false,
  type = "button",
  ...props
}) {
  const buttonText = children || title || text;
  const targetLink = link || href;

  // Size styling
  const sizeClasses =
    {
      sm: "px-4 py-2 text-xs gap-2",
      md: "px-6 py-3 text-xs sm:text-sm gap-2.5",
      lg: "px-8 py-3.5 text-sm sm:text-base gap-3",
    }[size] || "px-6 py-3 text-xs sm:text-sm gap-2.5";

  // Variant styling
  const variantClasses =
    {
      primary:
        "bg-gradient-to-r from-[#FF4F72] via-[#FF3B6F] to-[#BD0041] text-white font-extrabold uppercase tracking-wider shadow-[0_8px_25px_-4px_rgba(255,46,99,0.55)] hover:shadow-[0_12px_32px_-4px_rgba(255,46,99,0.75)] hover:brightness-110 active:scale-[0.98]",
      secondary:
        "bg-[#1C2234] hover:bg-[#252D45] text-slate-200 hover:text-white font-bold tracking-wider border border-white/10 hover:border-white/20 backdrop-blur-md hover:brightness-110 active:scale-[0.98]",
      glass:
        "bg-black/40 hover:bg-black/60 text-white font-bold uppercase tracking-wider border border-white/20 hover:border-white/40 backdrop-blur-md active:scale-[0.98]",
      tertiary:
        "bg-[#10B981] hover:bg-[#059669] text-[#052E16] font-extrabold uppercase tracking-wider shadow-[0_4px_16px_rgba(16,185,129,0.35)] active:scale-[0.98]",
      outline:
        "bg-transparent hover:bg-white/5 text-slate-200 hover:text-white font-bold border border-white/15 hover:border-white/30 backdrop-blur-sm active:scale-[0.98]",
    }[variant] ||
    "bg-gradient-to-r from-[#FF4F72] via-[#FF3B6F] to-[#BD0041] text-white font-extrabold uppercase tracking-wider shadow-[0_8px_25px_-4px_rgba(255,46,99,0.55)] hover:shadow-[0_12px_32px_-4px_rgba(255,46,99,0.75)] hover:brightness-110 active:scale-[0.98]";

  // Render icon based on props
  const renderIcon = () => {
    if (icon === null || icon === false) return null;
    if (icon !== undefined) return icon;
    if (variant === "primary") {
      return <Ticket className="w-4 h-4 shrink-0 transform -rotate-12" />;
    }
    if (variant === "secondary" || variant === "glass") {
      return <Play className="w-4 h-4 shrink-0 fill-current" />;
    }
    return null;
  };

  const iconElement = renderIcon();

  const content = (
    <>
      {iconPosition === "left" && iconElement}
      <span className="font-heading whitespace-nowrap">{buttonText}</span>
      {iconPosition === "right" && iconElement}
    </>
  );

  const roundedClass = className.includes("rounded-") ? "" : "rounded-full";
  const baseClasses = `inline-flex items-center ${roundedClass} justify-center transition-all duration-200 cursor-pointer select-none ${sizeClasses} ${variantClasses} ${className} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  }`;

  if (targetLink) {
    return (
      <Link href={targetLink} className={baseClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {content}
    </button>
  );
}
