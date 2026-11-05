"use client";

import React from "react";
import Link from "next/link";
import {
  Ticket,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Play,
} from "lucide-react";
import { LOGO } from "@/constants/images";
import Image from "next/image";

/**
 * Footer Component
 * Pixel-perfect footer matching TicketSprint specifications:
 * - Brand & Security Trust Bar
 * - 5-column Navigation (Experiences, Venues, Corporate, Support, Mobile Apps)
 * - Copyright & Policy Links
 */
export default function Footer() {
  const experiences = [
    { name: "IMAX & 3D", href: "#imax-3d" },
    { name: "Concerts & Arenas", href: "#concerts-arenas" },
    { name: "Major League Sports", href: "#sports" },
    { name: "VIP Red Carpet Passes", href: "#vip-passes" },
  ];

  const venues = [
    { name: "Metropolitan Theatres", href: "#metro-theatres" },
    { name: "Stadiums & Domes", href: "#stadiums" },
    { name: "Open-Air Amphitheatres", href: "#amphitheatres" },
    { name: "Indie Lounges", href: "#indie-lounges" },
  ];

  const corporate = [
    { name: "Partner Program", href: "#partner" },
    { name: "Enterprise Bulk Booking", href: "#enterprise" },
    { name: "Brand Sponsorships", href: "#sponsorships" },
    { name: "Press & Media Kit", href: "#press" },
  ];

  const support = [
    { name: "Help Center & FAQs", href: "#help" },
    { name: "Refund & Cancellation", href: "#refunds" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Privacy Policy", href: "#privacy" },
  ];

  return (
    <footer className="w-full bg-[#0B0D14] border-t border-white/5 pt-10 pb-12 text-pinkT">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* 1. Top Card: Brand & Security Verification Badges */}
        <div className="rounded-2xl bg-[#121520] border border-white/10 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xl">
          {/* Brand Info */}
          <div className="space-y-1">
            {/* Logo Container */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-black border border-white/10 flex items-center justify-center shadow-md relative overflow-hidden group-hover:border-[#FF2E63]/50 transition-all">
                <Image
                  src={LOGO}
                  alt=""
                  width={180}
                  height={180}
                  className=""
                  priority
                />

              </div>
              <span className="font-heading font-extrabold text-lg sm:text-xl text-white tracking-tight">
                TicketSprint
              </span>
            </Link>
            <p className="font-sans text-xs sm:text-sm text-pinkT">
              Instant tickets. Zero lines. Pure entertainment.
            </p>
          </div>

          {/* Security Certifications */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 256-bit SSL */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181D2D] border border-white/10 text-sx text-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span className="font-medium text-[11px] sm:text-xs">
                256-bit SSL Encrypted
              </span>
            </div>

            {/* PCI-DSS Level 1 */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181D2D] border border-white/10 text-sx text-slate-200">
              <CreditCard className="w-4 h-4 text-[#818CF8]" />
              <span className="font-medium text-[11px] sm:text-xs">
                PCI-DSS Level 1 Certified
              </span>
            </div>
          </div>
        </div>

        {/* 2. Main Navigation Columns (5 columns) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 pt-2">
          {/* Column 1: Experiences */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sx uppercase tracking-wider text-white">
              Experiences
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {experiences.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-pinkT hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Venues */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sx uppercase tracking-wider text-white">
              Venues
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {venues.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-pinkT hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sx uppercase tracking-wider text-white">
              Corporate
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {corporate.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-pinkT hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sx uppercase tracking-wider text-white">
              Support
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-pinkT hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Mobile Experience */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <h4 className="font-heading font-bold text-sx uppercase tracking-wider text-white">
              Mobile Experience
            </h4>
            <p className="font-sans text-xs text-pinkT leading-relaxed">
              Download tickets directly to Apple Wallet or Google Pay.
            </p>

            <div className="space-y-2 pt-1">
              {/* App Store Button */}
              <Link
                href="#app-store"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/10 hover:border-white/20 transition-all text-left"
              >
                <Smartphone className="w-5 h-5 text-white shrink-0" />
                <div className="leading-tight">
                  <div className="text-[9px] uppercase tracking-wider text-pinkT">
                    Download on
                  </div>
                  <div className="text-xs font-bold text-white font-heading">
                    App Store
                  </div>
                </div>
              </Link>

              {/* Google Play Button */}
              <Link
                href="#google-play"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/10 hover:border-white/20 transition-all text-left"
              >
                <Play className="w-4 h-4 fill-white text-white shrink-0 ml-0.5" />
                <div className="leading-tight">
                  <div className="text-[9px] uppercase tracking-wider text-pinkT">
                    Get it on
                  </div>
                  <div className="text-xs font-bold text-white font-heading">
                    Google Play
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-pinkT">
          <div>
            © 2025 TicketSprint Inc. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href="#cookie-preferences"
              className="text-pinkT hover:text-white transition-colors"
            >
              Cookie Preferences
            </Link>
            <Link
              href="#accessibility"
              className="text-pinkT hover:text-white transition-colors"
            >
              Accessibility
            </Link>
            <Link
              href="#security-trust-center"
              className="text-pinkT hover:text-white transition-colors"
            >
              Security Trust Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

