"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Crosshair,
  ChevronDown,
  Search,
  Bookmark,
  Bell,
  Ticket,
  Menu,
  X,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Movies");

  const navLinks = [
    { name: "Movies", href: "#movies" },
    { name: "Events & Sports", href: "#events-sports" },
    { name: "Cinemas & Venues", href: "#cinemas-venues" },
    { name: "Offers & Passes", href: "#offers-passes" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0D14]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-3">
        {/* Left Section: Brand Logo + Location */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Logo Container */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-black border border-white/10 flex items-center justify-center shadow-md relative overflow-hidden group-hover:border-[#FF2E63]/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E63]/20 to-transparent" />
              <Ticket className="w-5 h-5 text-[#FF2E63] transform -rotate-12 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-heading font-extrabold text-lg sm:text-xl text-white tracking-tight">
              TicketSprint
            </span>
          </Link>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-white/15 hidden sm:block" />

          {/* Auto GPS Location Box */}
          <button
            type="button"
            className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#121622] hover:bg-[#181d2e] border border-white/10 transition-colors text-left"
          >
            <Crosshair className="w-4 h-4 text-[#10B981] shrink-0 animate-pulse" />
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-bold tracking-wider text-[#10B981] uppercase font-mono">
                AUTO GPS
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs font-medium text-white">
                  San Francisco, CA
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </button>
        </div>

        {/* Center Section: Search Pill + Nav Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {/* Compact Search Bar with LIVE Tag */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151928] border border-white/10 hover:border-white/20 transition-all cursor-pointer">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#20253b] text-slate-200">
              LIVE
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-16 focus:w-28 transition-all duration-200 bg-transparent text-xs text-white placeholder:text-slate-500 outline-none border-none"
            />
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <button
                  key={link.name}
                  onClick={() => setActiveTab(link.name)}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#FFA4B6] font-semibold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Saved / Bookmark with count 3 */}
          <button
            type="button"
            aria-label="Bookmarks"
            className="relative p-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
          >
            <Bookmark className="w-5 h-5 text-slate-300" />
            <span className="absolute 0 top-1 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FF2E63] text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-sm">
              3
            </span>
          </button>

          {/* Notification Bell with Red/Pink dot */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative p-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF2E63] ring-2 ring-[#0B0D14]" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
            {/* Avatar with Online Status */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&auto=format&fit=crop&q=80"
                alt="Alex Rivera"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[#0B0D14]" />
            </div>

            {/* Name and VIP Badge */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-heading text-sm font-semibold text-white whitespace-nowrap">
                Alex Rivera
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#FF2E63] text-white text-[10px] font-black tracking-wider uppercase leading-none shadow-sm shadow-[#FF2E63]/30">
                VIP
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-5 border-t border-white/10 bg-[#0B0D14] space-y-4">
          {/* Mobile Location */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#121622] border border-white/10">
            <div className="flex items-center gap-2.5">
              <Crosshair className="w-4 h-4 text-[#10B981]" />
              <div>
                <div className="text-[9px] font-bold text-[#10B981] uppercase font-mono">
                  AUTO GPS
                </div>
                <div className="text-xs font-medium text-white">
                  San Francisco, CA
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    setActiveTab(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-white/5 text-[#FFA4B6] font-semibold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
