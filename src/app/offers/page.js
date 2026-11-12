"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Tag,
  Sparkles,
  CheckCircle,
  Copy,
  Check,
  CreditCard,
  Gift,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import ActionButton from "@/components/Common/ActionButton";
import { useApp } from "@/context/AppContext";

const PROMO_CODES = [
  {
    code: "CHASE5",
    discount: "₹150 OFF",
    title: "Chase Sapphire VIP Discount",
    desc: "Valid on all IMAX 70mm and Dolby Atmos premium tickets this month.",
    expires: "Expires Nov 30, 2025",
    tag: "POPULAR",
  },
  {
    code: "SPRINTPOP",
    discount: "FREE CONCESSION",
    title: "Complimentary Artisan Popcorn Tub",
    desc: "Get a free hand-spun caramel or butter popcorn with any 2-ticket order.",
    expires: "Expires Dec 15, 2025",
    tag: "FOOD & DRINK",
  },
  {
    code: "STUDENT25",
    discount: "25% OFF",
    title: "Campus & Student Matinee Pass",
    desc: "Available for all weekday showtimes before 5:00 PM.",
    expires: "Always Active",
    tag: "STUDENT",
  },
  {
    code: "BOGO4DX",
    discount: "BOGO 50% OFF",
    title: "4DX Motion Experience Pass",
    desc: "Buy one 4DX ticket, get the second companion ticket at half price.",
    expires: "Expires Dec 31, 2025",
    tag: "SPECIAL FORMAT",
  },
];

export default function OffersPage() {
  const { user, openLoginModal } = useApp();
  const [copiedCode, setCopiedCode] = useState(null);
  const [inputCode, setInputCode] = useState("");
  const [redeemStatus, setRedeemStatus] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    if (inputCode.toUpperCase() === "CHASE5" || inputCode.toUpperCase() === "SPRINTPOP") {
      setRedeemStatus({
        success: true,
        message: `Promo code "${inputCode.toUpperCase()}" applied to your account!`,
      });
    } else {
      setRedeemStatus({
        success: false,
        message: `Code "${inputCode}" is either expired or invalid. Try CHASE5!`,
      });
    }
  };

  return (
    <div className="w-full bg-[#0B0D14] text-[#e2e2ec] font-sans min-h-screen pb-24">
      {/* 1. Hero Header */}
      <section className="relative w-full overflow-hidden bg-[#121624] border-b border-white/5 py-12 sm:py-16">
        <div className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 bg-[#FF2E63]/20 blur-[130px] rounded-full" />
        <div className="pointer-events-none absolute top-1/2 -left-20 w-80 h-80 bg-[#10B981]/15 blur-[120px] rounded-full" />

        <div className="max-w-[1440px] mx-auto  px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2E63]/15 border border-[#FF2E63]/30 text-[#FF2E63] text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>Discounts & VIP Passes</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Exclusive Offers & Passes
            </h1>
            <p className="text-sm sm:text-base text-pinkT leading-relaxed">
              Unlock instant discounts, free concession vouchers, and zero-fee booking with TicketSprint partner programs.
            </p>
          </div>

          {/* Quick Redeem Bar */}
          <form
            onSubmit={handleApply}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md"
          >
            <div className="flex-1 relative flex items-center">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Enter promo voucher (e.g. CHASE5)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full bg-[#191b23] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-[#FF2E63]"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-[#FF2E63] hover:brightness-110 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#FF2E63]/30"
            >
              Apply
            </button>
          </form>

          {redeemStatus && (
            <div
              className={`mt-3 text-xs font-semibold flex items-center gap-1.5 ${redeemStatus.success ? "text-[#10B981]" : "text-[#FF4F72]"
                }`}
            >
              {redeemStatus.success ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Tag className="w-4 h-4" />
              )}
              <span>{redeemStatus.message}</span>
            </div>
          )}
        </div>
      </section>

      {/* 2. Featured SprintPass Unlimited Banner */}
      <section className="max-w-[1440px] mx-auto  px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#191b23] via-[#121624] to-[#0c0e15] border border-white/15 p-6 sm:p-10 shadow-2xl">
          <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-[#FF2E63]/25 blur-[100px] rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FF2E63] text-white text-xs font-black uppercase tracking-wider shadow-md shadow-[#FF2E63]/30">
                  ANNUAL VIP PASS
                </span>
                <span className="text-xs text-[#10B981] font-bold">
                  ★ Highest Rated Member Benefit
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                SprintPass™ All-Access Cinema Membership
              </h2>

              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Watch any movie, in any format (including IMAX 70mm Laser and Dolby Atmos) with zero online convenience fees, free popcorn upgrades, and 48-hour advance premiere access.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  "Zero Booking Fees",
                  "IMAX 70mm Upgrades",
                  "Free Large Popcorn",
                  "Priority Seat Hold",
                ].map((perk, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#0c0e15]/70 border border-white/5 text-xs font-semibold text-white flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 stroke-[3]" />
                    <span className="truncate">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & CTA Box */}
            <div className="w-full lg:w-auto p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 flex flex-col items-center text-center shrink-0 space-y-4">
              <div>
                <span className="text-xs uppercase text-[#94a3b8] font-bold block">
                  Membership from
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-3xl sm:text-4xl font-black text-white">
                    ₹499
                  </span>
                  <span className="text-xs text-[#94a3b8]">/month</span>
                </div>
                <span className="text-[10px] text-[#10B981] font-semibold block mt-1">
                  Cancel anytime • 30-day money-back guarantee
                </span>
              </div>

              <ActionButton
                title={user?.isVip ? "Active on Your Account" : "Unlock SprintPass VIP"}
                onClick={() => {
                  if (!user) openLoginModal();
                }}
                variant="primary"
                size="md"
                icon={<Zap className="w-4 h-4 fill-current" />}
                className="w-full shadow-lg shadow-[#FF2E63]/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Promo Codes Grid */}
      <section className="max-w-[1440px] mx-auto  px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-6">
          <span className="font-heading font-extrabold text-xl text-white">
            Active Promo Codes
          </span>
          <span className="text-xs text-pinkT font-medium">
            Copy code and enter at checkout
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROMO_CODES.map((promo) => (
            <div
              key={promo.code}
              className="p-5 sm:p-6 rounded-2xl bg-[#121624] border border-white/10 hover:border-white/20 transition-all shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-black bg-white/10 text-[#FF2E63]">
                    {promo.tag}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {promo.desc}
                  </p>
                </div>

                <span className="px-3 py-1.5 rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] font-extrabold text-sm whitespace-nowrap shrink-0">
                  {promo.discount}
                </span>
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 font-medium">
                  {promo.expires}
                </span>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-[#191b23] border border-dashed border-white/20 font-mono text-xs font-bold text-white tracking-wider">
                    {promo.code}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(promo.code)}
                    className="p-2 rounded-lg bg-[#FF2E63] hover:brightness-110 active:scale-95 text-white transition-all cursor-pointer shadow-sm shadow-[#FF2E63]/25"
                    title="Copy Promo Code"
                  >
                    {copiedCode === promo.code ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Partner Cards Banner */}
      <section className="max-w-[1440px] mx-auto  px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-6 rounded-2xl bg-[#191b23] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-[#6366F1] shrink-0" />
            <div>
              <h4 className="font-heading font-bold text-base text-white">
                Bank & Payment Perks Active
              </h4>
              <p className="text-xs text-[#94a3b8]">
                Chase Sapphire, Apple Pay, and Amex cardholders automatically receive discount suggestions at checkout.
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase transition-colors whitespace-nowrap"
          >
            Explore Movies
          </Link>
        </div>
      </section>
    </div>
  );
}

