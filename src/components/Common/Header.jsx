"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  Film,
  Building2,
  Music,
  Tag,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { LOGO } from "@/constants/images";
import { useApp } from "@/context/AppContext";
import { SEARCH_INDEX } from "@/constants/searchData";

export default function Header() {
  const router = useRouter();
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

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Filter search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle?.toLowerCase().includes(q);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchKeywords;
    }).slice(0, 6);
  }, [searchQuery]);

  // Close search dropdown and profile dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Search Submission (Enter key)
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      e.preventDefault();
      setSearchDropdownOpen(false);
      if (searchResults.length > 0) {
        router.push(searchResults[0].link);
      } else {
        router.push(`/cinemas?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const handleSelectSearchResult = (link) => {
    setSearchQuery("");
    setSearchDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push(link);
  };

  // Main Nav Links
  const navLinks = [
    { name: "Movies", href: "/" },
    { name: "Events & Sports", href: "/events" },
    { name: "Cinemas & Venues", href: "/cinemas" },
    { name: "Offers & Passes", href: "/offers" },
  ];

  const isLinkActive = (href) => {
    if (href === "/") {
      return (
        pathname === "/" ||
        pathname.startsWith("/movies") ||
        pathname.startsWith("/seat-selection")
      );
    }
    return pathname.startsWith(href);
  };

  const getItemIcon = (type) => {
    switch (type) {
      case "Movie":
        return <Film className="w-3.5 h-3.5 text-[#FF2E63]" />;
      case "Venue":
        return <Building2 className="w-3.5 h-3.5 text-[#10B981]" />;
      case "Concert":
      case "Sports":
        return <Music className="w-3.5 h-3.5 text-[#6366F1]" />;
      default:
        return <Tag className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0B0D14]/90 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-3 sm:px-6 lg:px-8 h-16 sm:h-20 gap-2 sm:gap-4">
        {/* Left Section: Logo + Location Pill */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform active:scale-95"
            aria-label="TicketSprint Home"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <Image
                src={LOGO}
                alt="TicketSprint Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <span className="font-heading font-extrabold text-base sm:text-xl tracking-tight text-white flex items-center">
              Ticket<span className="text-[#FF2E63]">Sprint</span>
            </span>
          </Link>

          {/* Interactive Location Pill */}
          <button
            type="button"
            onClick={openLocationModal}
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#121622] hover:bg-[#181d2e] border border-white/10 hover:border-white/20 transition-all text-left cursor-pointer group"
            title="Change Location & Compare Cinema Halls"
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

        {/* Center Section: Interactive Live Search Bar + Nav Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8 flex-1 justify-center max-w-xl">
          {/* Interactive Search Bar with Dropdown */}
          <div className="relative w-full max-w-xs" ref={searchContainerRef}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151928] border border-white/10 hover:border-white/20 transition-all focus-within:border-[#FF2E63]/80 focus-within:bg-[#191b23]">
              <Search className="w-3.5 h-3.5 text-pinkT shrink-0" />
              <span className="text-[9px] font-extrabold tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-[#20253b] text-slate-200 shrink-0">
                LIVE
              </span>
              <input
                type="text"
                placeholder="Search movies, halls, concerts..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchDropdownOpen(true);
                }}
                onFocus={() => {
                  if (searchQuery.trim()) setSearchDropdownOpen(true);
                }}
                onKeyDown={handleSearchSubmit}
                className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 outline-none border-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchDropdownOpen(false);
                  }}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchDropdownOpen && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#121624] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-[#161a29]">
                  <span>Search results ({searchResults.length})</span>
                  <span className="text-[10px] text-slate-500">Press Enter to view</span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-white/5 p-1">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectSearchResult(item.link)}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-colors text-left cursor-pointer group"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-9 h-11 object-cover rounded-lg shrink-0 border border-white/10"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white group-hover:text-[#FF2E63] transition-colors truncate">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-white/10 text-slate-300 shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">
                          {item.subtitle}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-[#10B981]">
                        <span>{item.tag}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  ))}

                  {searchResults.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No movies or halls found for &quot;{searchQuery}&quot;. Try &quot;Dune&quot;, &quot;Kolkata&quot;, or &quot;Arijit&quot;.
                    </div>
                  )}
                </div>
              </div>
            )}
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
            className="relative p-2 rounded-lg hover:bg-white/5 text-pinkT hover:text-white transition-colors cursor-pointer"
            title="Saved Watchlist"
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-pinkT" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-0.5 min-w-[14px] sm:min-w-[16px] h-3.5 sm:h-4 px-1 rounded-full bg-[#FF2E63] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center leading-none shadow-sm shadow-[#FF2E63]/50">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Notifications Trigger */}
          <button
            type="button"
            onClick={openNotificationDrawer}
            aria-label="Notifications"
            className="relative p-2 rounded-lg hover:bg-white/5 text-pinkT hover:text-white transition-colors cursor-pointer"
            title="Notifications"
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
                    <span>Change Avatar</span>
                  </button>

                  <div className="border-t border-white/5 my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#FF2E63] hover:bg-[#FF2E63]/10 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openLoginModal()}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FF2E63] via-[#FF3B6F] to-[#FF4B72] hover:brightness-110 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#FF2E63]/30 transition-all flex items-center gap-1.5 cursor-pointer"
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
          {/* Mobile Search Bar with Interactive Results */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#151928] border border-white/10 focus-within:border-[#FF2E63]">
              <Search className="w-4 h-4 text-pinkT shrink-0" />
              <input
                type="text"
                placeholder="Search movies, venues, concerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 outline-none border-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {searchQuery.trim().length > 0 && (
              <div className="bg-[#121624] border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSearchResult(item.link)}
                    className="w-full flex items-center justify-between p-2.5 text-left text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-bold text-white block truncate">{item.title}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{item.subtitle}</span>
                    </div>
                    <span className="text-[10px] text-[#10B981] font-bold shrink-0">{item.tag}</span>
                  </button>
                ))}
              </div>
            )}
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
              <span className="px-2 py-0.5 rounded-full bg-[#FF2E63] text-white text-[10px] font-black">
                {wishlist.length}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openNotificationDrawer();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#191b23] border border-white/10 text-white cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs font-bold">Notifications</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#FF2E63] text-white text-[10px] font-black">
                  {unreadCount} NEW
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
