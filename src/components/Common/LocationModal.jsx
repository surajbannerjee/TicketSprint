"use client";

import React, { useState } from "react";
import {
  X,
  MapPin,
  Search,
  Crosshair,
  Check,
  Building2,
  Ticket,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import { useApp, CITIES_LIST } from "@/context/AppContext";

export default function LocationModal() {
  const {
    isLocationModalOpen,
    closeLocationModal,
    currentCity,
    setCity,
    selectedHall,
    setHall,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [expandedCity, setExpandedCity] = useState(currentCity || "Kolkata, WB");
  const [priceSort, setPriceSort] = useState("all"); // "all" | "low-to-high" | "high-to-low"

  if (!isLocationModalOpen) return null;

  // Filter cities by search term
  const filteredCities = CITIES_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.halls?.some(
        (h) =>
          h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.area.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Active selected or expanded city object
  const activeCityData =
    CITIES_LIST.find((c) => c.name === expandedCity) ||
    CITIES_LIST.find((c) => c.name === currentCity) ||
    CITIES_LIST[0];

  // Halls for active city sorted by price if requested
  const hallsList = [...(activeCityData?.halls || [])].sort((a, b) => {
    if (priceSort === "low-to-high") return a.ticketPrice - b.ticketPrice;
    if (priceSort === "high-to-low") return b.ticketPrice - a.ticketPrice;
    return 0;
  });

  const handleSelectCity = (cityName) => {
    setCity(cityName);
    setExpandedCity(cityName);
  };

  const handleSelectHall = (hall) => {
    setHall({
      ...hall,
      cityName: activeCityData.name,
    });
    setCity(activeCityData.name);
    closeLocationModal();
  };

  const handleDetectGPS = () => {
    setIsLocating(true);
    setTimeout(() => {
      setCity("Kolkata, WB");
      setExpandedCity("Kolkata, WB");
      setIsLocating(false);
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeLocationModal}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121624] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-[#e2e2ec] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background accents */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-[#10B981]/20 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 bg-[#FF2E63]/20 blur-3xl rounded-full" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between p-5 sm:p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-lg text-white">
                  Select Region & Cinema Hall
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold">
                  West Bengal Live
                </span>
              </div>
              <p className="text-[11px] text-[#94a3b8]">
                Find halls near you, compare ticket rates (lowest to highest) & reserve seats
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeLocationModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Auto GPS Bar */}
        <div className="relative z-10 p-5 sm:p-6 pb-2 space-y-3 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#191b23] border border-white/10 focus-within:border-[#10B981] transition-all">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search West Bengal city or cinema (e.g. Kolkata, South City, Howrah)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 outline-none border-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Auto GPS Trigger Button */}
          <button
            type="button"
            onClick={handleDetectGPS}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#10B981]/10 hover:bg-[#10B981]/20 border border-[#10B981]/30 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Crosshair
                className={`w-4 h-4 text-[#10B981] ${
                  isLocating ? "animate-spin" : "group-hover:scale-110"
                } transition-transform`}
              />
              <div>
                <span className="text-xs font-bold text-white block">
                  {isLocating ? "Locating via GPS coordinates..." : "Auto-Detect My West Bengal Location"}
                </span>
                <span className="text-[10px] text-[#10B981]">
                  Instantly connects to Kolkata & nearby West Bengal multiplexes
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-white uppercase px-2 py-0.5 rounded bg-[#10B981]/30">
              FAST GPS
            </span>
          </button>
        </div>

        {/* City Quick Pills */}
        <div className="relative z-10 px-5 sm:px-6 pt-1 pb-3 shrink-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
            Select City / District:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {filteredCities.map((city) => {
              const isCurrent = currentCity === city.name;
              const isExpanded = expandedCity === city.name;
              return (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => handleSelectCity(city.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isExpanded
                      ? "bg-[#FF2E63] text-white shadow-md shadow-[#FF2E63]/30"
                      : "bg-[#191b23] border border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span>{city.name}</span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected City Cinema Halls & Price Comparison Section */}
        <div className="relative z-10 px-5 sm:px-6 py-2 border-t border-white/10 bg-[#161a29]/60 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-white">
                Cinemas in {activeCityData.name}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#191b23] border border-white/10 text-[10px] text-[#10B981] font-bold">
                {activeCityData.halls?.length || 0} Halls Available
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              Price Range: <strong className="text-white">{activeCityData.priceRange}</strong> (Avg {activeCityData.avgPrice})
            </span>
          </div>

          {/* Price Sorting Buttons */}
          <div className="flex items-center gap-1 bg-[#191b23] p-1 rounded-xl border border-white/10 text-[10px]">
            <button
              type="button"
              onClick={() => setPriceSort("all")}
              className={`px-2 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                priceSort === "all" ? "bg-[#FF2E63] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setPriceSort("low-to-high")}
              className={`px-2 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                priceSort === "low-to-high" ? "bg-[#10B981] text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Lowest Price First"
            >
              <TrendingDown className="w-3 h-3" />
              <span>Lowest Price</span>
            </button>
            <button
              type="button"
              onClick={() => setPriceSort("high-to-low")}
              className={`px-2 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                priceSort === "high-to-low" ? "bg-[#6366F1] text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Highest Price / Premium First"
            >
              <TrendingUp className="w-3 h-3" />
              <span>Premium</span>
            </button>
          </div>
        </div>

        {/* Scrollable Halls List */}
        <div className="relative z-10 p-5 sm:px-6 pt-2 overflow-y-auto space-y-2.5 flex-1">
          {hallsList.map((hall) => {
            const isHallSelected = selectedHall?.id === hall.id;
            return (
              <div
                key={hall.id}
                onClick={() => handleSelectHall(hall)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group ${
                  isHallSelected
                    ? "bg-[#191b23] border-[#10B981] shadow-lg shadow-[#10B981]/15"
                    : "bg-[#191b23]/70 hover:bg-[#191b23] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="min-w-0 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-white shrink-0 group-hover:border-[#FF2E63]/40">
                    <Building2 className="w-5 h-5 text-[#FF2E63]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FF2E63] transition-colors truncate">
                        {hall.name}
                      </h4>
                      {hall.priceTag === "Cheapest" && (
                        <span className="px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] text-[9px] font-black uppercase">
                          Lowest Price
                        </span>
                      )}
                      {hall.priceTag === "Premium" && (
                        <span className="px-1.5 py-0.5 rounded bg-[#FF2E63]/20 text-[#FF2E63] text-[9px] font-black uppercase">
                          VIP IMAX
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {hall.area} • {hall.screens}
                    </p>
                    <span className="inline-block mt-1 text-[10px] text-slate-300 font-medium bg-white/5 px-2 py-0.5 rounded">
                      {hall.format}
                    </span>
                  </div>
                </div>

                {/* Price & Action Badge */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 block">Ticket Price:</span>
                    <span className="text-sm sm:text-base font-extrabold text-white">
                      {hall.priceBadge}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="mt-1 px-3 py-1 rounded-lg bg-[#FF2E63] hover:bg-[#ff4f72] text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                  >
                    <span>Select Hall</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {hallsList.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs">
              No halls found for &quot;{searchTerm}&quot;. Try searching Kolkata, Howrah, or Siliguri.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="relative z-10 p-3 sm:px-6 border-t border-white/10 bg-[#0B0D14] flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>Currently Selected: <strong className="text-white">{selectedHall ? `${selectedHall.name} (${currentCity})` : currentCity}</strong></span>
          </div>
          <button
            type="button"
            onClick={closeLocationModal}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
