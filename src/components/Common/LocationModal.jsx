"use client";

import React, { useState } from "react";
import { X, MapPin, Search, Crosshair, Check, Building2 } from "lucide-react";
import { useApp, CITIES_LIST } from "@/context/AppContext";

export default function LocationModal() {
  const { isLocationModalOpen, closeLocationModal, currentCity, setCity } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  if (!isLocationModalOpen) return null;

  const filteredCities = CITIES_LIST.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetectGPS = () => {
    setIsLocating(true);
    setTimeout(() => {
      setCity("San Francisco, CA");
      setIsLocating(false);
      closeLocationModal();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeLocationModal}
    >
      <div
        className="relative w-full max-w-lg bg-[#121624] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-[#e2e2ec] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background accents */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 bg-[#10B981]/20 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 bg-[#6366F1]/20 blur-3xl rounded-full" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between p-5 sm:p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-white">
                Select Your Region
              </h2>
              <p className="text-[11px] text-[#94a3b8]">
                Find IMAX screens, upcoming stadium sports & live concerts near you
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
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#191b23] border border-white/10 focus-within:border-[#10B981] transition-all">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search your city or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 outline-none border-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="text-slate-400 hover:text-white text-xs"
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
                  {isLocating ? "Detecting exact GPS coordinates..." : "Use Current GPS Location"}
                </span>
                <span className="text-[10px] text-[#10B981]">
                  Auto-detect nearest auditoria with 70mm & Dolby Atmos
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-white uppercase px-2 py-0.5 rounded bg-[#10B981]/30">
              FAST
            </span>
          </button>
        </div>

        {/* Cities List */}
        <div className="relative z-10 p-5 sm:p-6 pt-2 overflow-y-auto space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
            Available Metropolitan Hubs ({filteredCities.length})
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredCities.map((city) => {
              const isSelected = currentCity === city.name;
              return (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => setCity(city.name)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#191b23] border-[#10B981] shadow-md shadow-[#10B981]/20"
                      : "bg-[#191b23]/60 hover:bg-[#191b23] border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate block">
                        {city.name}
                      </span>
                      {city.isPopular && (
                        <span className="text-[8px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-white/10 text-slate-300 shrink-0">
                          HOT
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {city.theatres} • {city.distance}
                    </span>
                  </div>

                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <Building2 className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-xs">
              No metropolitan venues found for &quot;{searchTerm}&quot;. Try searching &quot;San Francisco&quot; or &quot;New York&quot;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
