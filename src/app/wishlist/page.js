"use client";

import React from "react";
import Link from "next/link";
import { Bookmark, Trash2, Calendar, Star, Film, Sparkles, ArrowRight } from "lucide-react";
import ActionButton from "@/components/Common/ActionButton";
import { useApp } from "@/context/AppContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useApp();

  return (
    <div className="w-full bg-[#0B0D14] text-[#e2e2ec] font-sans min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="relative w-full overflow-hidden bg-[#121624] border-b border-white/5 py-12 sm:py-16">
        <div className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 bg-[#FF2E63]/15 blur-[120px] rounded-full" />
        <div className="pointer-events-none absolute top-1/2 -left-20 w-80 h-80 bg-[#6366F1]/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2E63]/15 border border-[#FF2E63]/30 text-[#FF2E63] text-xs font-bold uppercase tracking-wider">
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>Personal Watchlist</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Saved Movies & Spectacles
              </h1>
              <p className="text-sm sm:text-base text-pinkT max-w-xl">
                Keep track of anticipated premieres, set alerts for seat drops, and book direct showtimes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-2xl bg-[#191b23] border border-white/10 text-xs font-bold text-white">
                <strong className="text-[#FF2E63] text-base mr-1.5">{wishlist.length}</strong>
                Saved Item{wishlist.length === 1 ? "" : "s"}
              </span>
              <ActionButton
                title="Browse More"
                link="/"
                variant="secondary"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Wishlist Grid Canvas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-[#121522] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0B0D14]/80"
              >
                {/* Poster Top */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#121522]">
                  <img
                    src={item.posterImage}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(18,21,34,0.3) 0%, rgba(18,21,34,0.1) 40%, #121522 100%)",
                    }}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-wide">
                      {item.format || "IMAX"}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-[#FF2E63] text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                      title="Remove from Watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Rating / Runtime Pill */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[#10B981] font-bold text-xs flex items-center gap-1">
                      <span>🍃</span> {item.rating || "94%"}
                    </span>
                    {item.duration && (
                      <span className="text-pinkT text-xs font-medium">
                        • {item.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-pinkT transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-pinkT font-medium">
                      {item.genre || "Action • Sci-Fi • 4K Laser"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 pt-2 border-t border-white/5">
                    <ActionButton
                      title="Book Seats"
                      link={item.link || `/movies/${item.id}`}
                      variant="primary"
                      size="sm"
                      icon={<Calendar className="w-4 h-4" />}
                      className="flex-1 shadow-md shadow-[#FF2E63]/20"
                    />
                    <Link
                      href={item.link || `/movies/${item.id}`}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-[#191b23] border border-white/10 flex items-center justify-center text-slate-500 mb-4">
              <Bookmark className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              Your Watchlist is Empty
            </h3>
            <p className="text-xs text-pinkT mb-6 leading-relaxed">
              Explore our current blockbusters and live concerts, then click the bookmark icon on any card to save it here for quick access.
            </p>
            <ActionButton
              title="Explore Trending Movies"
              link="/"
              variant="primary"
              size="md"
              icon={<Film className="w-4 h-4" />}
            />
          </div>
        )}
      </section>
    </div>
  );
}

