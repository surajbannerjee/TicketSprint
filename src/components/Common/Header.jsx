"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Crosshair,
  ChevronDown,
  Search,
  Bookmark,
  Bell,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { LOGO } from "@/constants/images";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Movies");

  const navLinks = [
    { name: "Movies", href: "/movies/dune-part-two" },
    { name: "Events & Sports", href: "#events-sports" },
    { name: "Cinemas & Venues", href: "#cinemas-venues" },
    { name: "Offers & Passes", href: "#offers-passes" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0D14]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section: Brand Logo + Location */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Logo Container */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black border border-white/10 flex items-center justify-center shadow-md relative overflow-hidden group-hover:border-[#FF2E63]/50 transition-all">
              <Image
                src={LOGO}
                alt="TicketSprint"
                width={180}
                height={180}
                priority
              />
            </div>
            <span className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight">
              TicketSprint
            </span>
          </Link>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-white/15 hidden md:block" />

          {/* Auto GPS Location Box */}
          <button
            type="button"
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#121622] hover:bg-[#181d2e] border border-white/10 transition-colors text-left"
          >
            <Crosshair className="w-3.5 h-3.5 text-[#10B981] shrink-0 animate-pulse" />
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-bold tracking-wider text-[#10B981] uppercase">
                AUTO GPS
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs font-medium text-white truncate max-w-[110px]">
                  San Francisco, CA
                </span>
                <ChevronDown className="w-3 h-3 text-pinkT shrink-0" />
              </div>
            </div>
          </button>
        </div>

        {/* Center Section: Search Pill + Nav Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8 flex-1 justify-center max-w-xl">
          {/* Search Bar with LIVE Tag */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151928] border border-white/10 hover:border-white/20 transition-all w-full max-w-xs">
            <Search className="w-3.5 h-3.5 text-pinkT shrink-0" />
            <span className="text-[9px] font-extrabold tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-[#20253b] text-slate-200">
              LIVE
            </span>
            <input
              type="text"
              placeholder="Search movies, venues, concerts..."
              className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 outline-none border-none"
            />
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#ff2e63] font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Saved / Bookmark with count 3 */}
          <Link
            href="/movies/dune-part-two"
            aria-label="Bookmarks"
            className="relative p-2 rounded-lg hover:bg-white/5 text-pinkT hover:text-white transition-colors"
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-pinkT" />
            <span className="absolute top-1 right-0.5 min-w-[14px] sm:min-w-[16px] h-3.5 sm:h-4 px-1 rounded-full bg-[#FF2E63] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center leading-none shadow-sm">
              3
            </span>
          </Link>

          {/* Notification Bell */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative p-2 rounded-lg hover:bg-white/5 text-pinkT hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-pinkT" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF2E63] ring-2 ring-[#0B0D14]" />
          </button>

          {/* User Profile -> Link to M-Ticket pass */}
          <Link
            href="/confirmation"
            className="flex items-center gap-2 pl-1 sm:pl-2 group"
            title="View confirmed M-Ticket"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&auto=format&fit=crop&q=80"
                alt="Alex Rivera"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-1 ring-white/10 group-hover:ring-[#ff2e63]/50 transition-all"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[#0B0D14]" />
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              <span className="font-heading text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                Alex
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#FF2E63] text-white text-[9px] font-black tracking-wider uppercase leading-none shadow-sm shadow-[#FF2E63]/30">
                VIP
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-pinkT hover:text-white hover:bg-white/5 cursor-pointer ml-1"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 border-t border-white/10 bg-[#0B0D14] space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Mobile Search Bar */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#151928] border border-white/10">
            <Search className="w-4 h-4 text-pinkT shrink-0" />
            <input
              type="text"
              placeholder="Search movies, venues, concerts..."
              className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 outline-none border-none"
            />
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#20253b] text-slate-300">
              LIVE
            </span>
          </div>

          {/* Mobile Location Pill */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#121622] border border-white/10">
            <div className="flex items-center gap-2.5">
              <Crosshair className="w-4 h-4 text-[#10B981]" />
              <div>
                <div className="text-[9px] font-bold text-[#10B981] uppercase tracking-wider">
                  AUTO GPS LOCATION
                </div>
                <div className="text-xs font-semibold text-white">
                  San Francisco, CA
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-pinkT" />
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#FF2E63]/15 text-[#FF2E63] border border-[#FF2E63]/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick Access to M-Ticket pass */}
          <div className="pt-2 border-t border-white/10">
            <Link
              href="/confirmation"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#FF4F72]/20 to-[#BD0041]/20 border border-[#FF4F72]/30 text-white"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🎟️</span>
                <span className="text-xs font-bold">View My M-Ticket Pass</span>
              </div>
              <span className="text-[10px] font-mono text-[#10b981] font-bold">
                ACTIVE
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
