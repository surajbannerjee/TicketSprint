"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X, Ticket, ArrowRight, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function WebNotificationPrompt() {
  const { user, openLoginModal } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // If user is already logged in, do not show
    if (user) {
      setIsVisible(false);
      return;
    }

    // Check if dismissed previously in this session
    const wasDismissed = sessionStorage.getItem("ts_web_notif_dismissed");
    if (wasDismissed) return;

    // Show popup notification after 1.2s on page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [user]);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem("ts_web_notif_dismissed", "true");
    } catch (e) {}
  };

  const handleOpenLogin = () => {
    openLoginModal();
    handleDismiss();
  };

  if (!isVisible || user || dismissed) return null;

  return (
    <aside
      aria-label="Welcome notification"
      className="fixed bottom-5 left-5 z-40 max-w-[340px] sm:max-w-sm w-[calc(100vw-40px)] animate-in fade-in slide-in-from-bottom-6 duration-300 pointer-events-auto"
    >
      <div className="relative rounded-2xl bg-[#121624]/95 backdrop-blur-xl border border-white/15 p-4 shadow-2xl shadow-black/70 text-[#e2e2ec] overflow-hidden">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-24 h-24 bg-[#FF2E63]/25 blur-2xl rounded-full" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-24 h-24 bg-[#10B981]/20 blur-2xl rounded-full" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF2E63] to-[#FF4F72] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#FF2E63]/30">
            <Ticket className="w-5 h-5" />
          </div>

          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#10B981]">
                TicketSprint Pass
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
              Unlock VIP Seats & Zero Fees
            </h4>
            <p className="text-[11px] text-[#94a3b8] mt-1 leading-relaxed">
              Sign in or create an account to get instant M-Ticket passes and free popcorn vouchers.
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={handleOpenLogin}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FF2E63] via-[#FF3B6F] to-[#FF4B72] hover:brightness-110 active:scale-95 text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#FF2E63]/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Sign In / Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold hover:bg-white/5 transition-colors cursor-pointer"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

