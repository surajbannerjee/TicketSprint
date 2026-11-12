"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Crosshair,
  ChevronDown,
  Search,
  Bookmark,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Ticket,
  Heart,
  Sparkles,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { LOGO } from "@/constants/images";
import { useApp } from "@/context/AppContext";

export default function Header() {
  const pathname = usePathname();
  const {
    user,
    logout,
    openLoginModal,
    currentCity,
    selectedHall,
    openLocationModal,
    wishlist,
    unreadCount,
    openNotificationDrawer,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Movies", href: "/" },
    { name: "Events & Sports", href: "/events" },
    { name: "Cinemas & Venues", href: "/cinemas" },
    { name: "Offers & Passes", href: "/offers" },
  ];

  // Check if link is active
  const isLinkActive = (href) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/movies");
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0D14]/95 backdrop-blur-md border-b border-white/5">
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

          {/* Auto GPS Location Box (Interactive Modal Trigger) */}
          <button
            type="button"
            onClick={openLocationModal}
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#121622] hover:bg-[#181d2e] border border-white/10 hover:border-white/20 transition-all text-left cursor-pointer group"
            title="Change Location"
          >
            <Crosshair className="w-3.5 h-3.5 text-[#10B981] shrink-0 animate-pulse" />
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-bold tracking-wider text-[#10B981] uppercase">
                AUTO GPS
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs font-medium text-white truncate max-w-[140px]">
                  {selectedHall ? selectedHall.name : currentCity}
                </span>
                <ChevronDown className="w-3 h-3 text-pinkT group-hover:translate-y-0.5 transition-transform shrink-0" />
              </div>
            </div>
          </button>
        </div>

        {/* Center Section: Search Pill + Nav Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8 flex-1 justify-center max-w-xl">
          {/* Search Bar with LIVE Tag */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151928] border border-white/10 hover:border-white/20 transition-all w-full max-w-xs focus-within:border-[#FF2E63]/60">
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
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs xl:text-sm transition-colors whitespace-nowrap ${
                    active
                      ? "text-[#FF2E63] font-extrabold"
                      : "text-slate-300 hover:text-white font-medium"
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
          {/* Wishlist Link with dynamic count */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative p-2 rounded-lg hover:bg-white/5 text-pinkT hover:text-white transition-colors"
            title="Saved Watchlist"
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-pinkT" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-0.5 min-w-[14px] sm:min-w-[16px] h-3.5 sm:h-4 px-1 rounded-full bg-[#FF2E63] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center leading-none shadow-sm shadow-[#FF2E63]/50">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Notification Bell with interactive drawer trigger */}
          <button
            type="button"
            onClick={openNotificationDrawer}
            aria-label="Notifications"
            className="relative p-2 rounded-lg hover:bg-white/5 text-pinkT hover:text-white transition-colors cursor-pointer"
            title="View Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-pinkT" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF2E63] ring-2 ring-[#0B0D14]" />
            )}
          </button>

          {/* User Profile OR Sign In Button */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-1 sm:pl-2 group cursor-pointer"
                title="Account Menu"
              >
                {/* Circular Avatar with Green Status Indicator */}
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-1 ring-white/10 group-hover:ring-[#FF2E63]/50 transition-all"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[#0B0D14]" />
                </div>

                {/* Name + VIP Badge */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="font-heading text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                    {user.name}
                  </span>
                  {user.isVip && (
                    <span className="px-1.5 py-0.5 rounded bg-[#FF2E63] text-white text-[9px] font-black tracking-wider uppercase leading-none shadow-sm shadow-[#FF2E63]/30">
                      VIP
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-pinkT group-hover:translate-y-0.5 transition-transform" />
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#121624] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 border-b border-white/5 mb-1">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-[#94a3b8] truncate">{user.email}</p>
                    {user.isVip && (
                      <span className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF2E63]/20 text-[#FF2E63] text-[9px] font-bold uppercase tracking-wider">
                        <Sparkles className="w-2.5 h-2.5 fill-current" /> VIP Pass Active
                      </span>
                    )}
                  </div>

                  <Link
                    href="/confirmation"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Ticket className="w-4 h-4 text-[#10B981]" />
                    <span>My M-Ticket Passes</span>
                  </Link>

                  <Link
                    href="/wishlist"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-[#FF2E63]" />
                    <span>Saved Watchlist ({wishlist.length})</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      openLoginModal();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-[#6366F1]" />
                    <span>Change Avatar / Profile</span>
                  </button>

                  <div className="pt-1 mt-1 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#FF4F72] hover:bg-[#FF4F72]/10 transition-colors text-left cursor-pointer font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openLoginModal()}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF4F72] hover:brightness-110 active:scale-95 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#FF2E63]/30 transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

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

          {/* Mobile Location Pill (Interactive Modal Trigger) */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              openLocationModal();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#121622] border border-white/10 hover:border-white/20 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Crosshair className="w-4 h-4 text-[#10B981]" />
              <div>
                <div className="text-[9px] font-bold text-[#10B981] uppercase tracking-wider">
                  CURRENT LOCATION
                </div>
                <div className="text-xs font-semibold text-white truncate max-w-[200px]">
                  {selectedHall ? `${selectedHall.name} (${currentCity})` : currentCity}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-[#FF2E63] font-bold uppercase">Change</span>
          </button>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? "bg-[#FF2E63]/15 text-[#FF2E63] border border-[#FF2E63]/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Shortcuts */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-[#191b23] border border-white/10 text-white"
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-[#FF2E63]" />
                <span className="text-xs font-bold">Saved Watchlist</span>
              </div>
              <span className="text-xs font-bold text-[#FF2E63] px-2 py-0.5 rounded-full bg-[#FF2E63]/20">
                {wishlist.length}
              </span>
            </Link>

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

            {!user ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full py-3 rounded-xl bg-[#FF2E63] text-white font-bold text-xs uppercase tracking-wider text-center cursor-pointer"
              >
                Sign In / Join VIP
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#FF4F72] font-semibold text-xs text-center cursor-pointer"
              >
                Sign Out ({user.name})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
