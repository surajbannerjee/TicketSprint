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
  TrendingUp,
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
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const desktopInputRef = useRef(null);
  const modalInputRef = useRef(null);

  // Filter search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle?.toLowerCase().includes(q);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchKeywords;
    }).slice(0, 8);
  }, [searchQuery]);

  // Focus modal input when modal opens
  useEffect(() => {
    if (searchModalOpen && modalInputRef.current) {
      setTimeout(() => {
        modalInputRef.current?.focus();
      }, 50);
    }
  }, [searchModalOpen]);

  // Close dropdowns on outside click
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
      setSearchModalOpen(false);
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
    setSearchModalOpen(false);
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

  const trendingPills = ["Dune", "Kolkata", "South City", "Arijit Singh", "4DX"];

  return (
    <>
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

          {/* Center Section: Search Pill Button & Nav Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-center max-w-xl">
            {/* Search Pill (Click opens Search Modal / Focuses Input) */}
            <div className="relative" ref={searchContainerRef}>
              <div
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151928] hover:bg-[#191e32] border border-white/10 hover:border-[#FF2E63]/60 transition-all cursor-pointer group w-64 xl:w-72 shadow-inner"
              >
                <Search className="w-3.5 h-3.5 text-pinkT group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-[9px] font-extrabold tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-[#20253b] text-slate-200 shrink-0">
                  LIVE
                </span>
                <span className="text-xs text-slate-400 group-hover:text-slate-200 truncate select-none">
                  Search movies, halls, concerts...
                </span>
              </div>
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

          {/* Right Section: Mobile Search Icon + Wishlist + Notifs + Profile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Search Icon button for mobile / tablet screens */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-pinkT hover:text-white transition-colors cursor-pointer"
              title="Search TicketSprint"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-pinkT" />
            </button>

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
            {/* Mobile Search Button Trigger */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchModalOpen(true);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#151928] border border-white/10 text-left cursor-pointer"
            >
              <Search className="w-4 h-4 text-pinkT shrink-0" />
              <span className="text-xs text-slate-400">Search movies, venues, concerts...</span>
              <span className="ml-auto text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#20253b] text-slate-300">
                LIVE
              </span>
            </button>

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

      {/* Full-Screen Interactive Search Modal (Opens on clicking Search input/pill) */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#121624] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-[#e2e2ec] flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Ambient Glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 bg-[#FF2E63]/25 blur-3xl rounded-full" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 bg-[#6366F1]/20 blur-3xl rounded-full" />

            {/* Input Bar */}
            <div className="relative z-10 flex items-center gap-3 p-4 sm:p-5 border-b border-white/10">
              <Search className="w-5 h-5 text-[#FF2E63] shrink-0" />
              <input
                ref={modalInputRef}
                type="text"
                autoFocus
                placeholder="Search movies, IMAX auditoria, concerts, promo codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-500 outline-none border-none font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-bold transition-colors cursor-pointer shrink-0"
              >
                ESC
              </button>
            </div>

            {/* Quick Trending Suggestions Bar */}
            <div className="relative z-10 px-4 sm:px-5 py-2.5 bg-[#161a29]/80 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 shrink-0">
                <TrendingUp className="w-3 h-3 text-[#10B981]" /> Trending:
              </span>
              {trendingPills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setSearchQuery(pill)}
                  className="px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-[#FF2E63]/20 hover:text-[#FF2E63] border border-white/10 text-[11px] text-slate-300 font-semibold whitespace-nowrap transition-colors cursor-pointer"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Scrollable Results */}
            <div className="relative z-10 p-3 sm:p-4 overflow-y-auto space-y-2 flex-1">
              {searchQuery.trim().length > 0 ? (
                <>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block px-2 mb-1">
                    Matching Results ({searchResults.length})
                  </span>
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectSearchResult(item.link)}
                      className="w-full flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#191b23]/70 hover:bg-[#191b23] border border-white/5 hover:border-white/20 transition-all text-left cursor-pointer group"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-11 h-14 sm:w-12 sm:h-16 object-cover rounded-xl shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FF2E63] transition-colors truncate">
                            {item.title}
                          </h4>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300 shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {item.subtitle}
                        </p>
                        <span className="inline-block mt-1 text-[10px] text-slate-300 font-medium bg-white/5 px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                        <span>{item.tag}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}

                  {searchResults.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No results found for &quot;{searchQuery}&quot;. Try searching for &quot;Dune&quot;, &quot;Kolkata&quot;, or &quot;South City&quot;.
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 sm:p-6 text-center space-y-2">
                  <Search className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-300">
                    Type a title, venue name, or city to search
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                    Try searching for Dune, Arijit Singh Live, INOX South City, or Priya Cinema.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="relative z-10 p-3 sm:px-5 border-t border-white/10 bg-[#0B0D14] flex items-center justify-between text-xs text-slate-400 shrink-0">
              <span className="text-[11px]">Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Enter</kbd> to jump directly to first match</span>
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
