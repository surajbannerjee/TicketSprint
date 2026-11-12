"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ActionButton from "@/components/Common/ActionButton";
import {
  Timer,
  CheckCircle,
  Armchair,
  ShoppingBag,
  Plus,
  Minus,
  Shield,
  Tag,
  CreditCard,
  Wallet,
  Smartphone,
  Building,
  Lock,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function CheckoutClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const movie = searchParams.get("movie") || "dune-part-two";
  const venue = searchParams.get("venue") || "INOX South City Mall & IMAX";
  const time = searchParams.get("time") || "07:45 PM";
  const date = searchParams.get("date") || "Fri, May 17";
  const seatsParam = searchParams.get("seats") || "E8,E9";

  // Dynamic movie details
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    fetch(`/api/movies?id=${encodeURIComponent(movie)}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setMovieData(json.data);
        }
      })
      .catch((err) => console.error(err));
  }, [movie]);

  const displayTitle =
    movieData?.title ||
    movie
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const displayPoster =
    movieData?.posterImage ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";

  const displayFormat = movieData?.format || "IMAX Laser";

  const selectedSeatList = seatsParam ? seatsParam.split(",") : ["E8", "E9"];
  const ticketCount = selectedSeatList.length;
  const ticketUnitPrice = 350.0;
  const ticketsSubtotal = ticketCount * ticketUnitPrice;

  // Session timer (6 mins = 360s)
  const [sessionTime, setSessionTime] = useState(374);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatSessionTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Fulfillment: 'seat' vs 'counter'
  const [fulfillment, setFulfillment] = useState("seat");

  // Concession quantities
  const [fnbQty, setFnbQty] = useState({
    combo: 1, // IMAX Mega Combo (₹450)
    caramel: 0, // Caramel Popcorn (₹240)
    nachos: 0, // Artisan Loaded Nachos (₹280)
    tin: 0, // Dune 2 Collector Tin (₹399)
  });

  const updateQty = (key, delta) => {
    setFnbQty((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  // SprintProtect (₹49 per ticket)
  const [protectEnabled, setProtectEnabled] = useState(true);

  // Promo Code
  const [promoCode, setPromoCode] = useState("CHASE5");
  const [promoApplied, setPromoApplied] = useState(true);

  // Payment Method: 'express' | 'card' | 'bank' | 'wallet'
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Calculations
  const comboPrice = fnbQty.combo * 450.0;
  const caramelPrice = fnbQty.caramel * 240.0;
  const nachosPrice = fnbQty.nachos * 280.0;
  const tinPrice = fnbQty.tin * 399.0;
  const fnbSubtotal = comboPrice + caramelPrice + nachosPrice + tinPrice;

  const protectPrice = protectEnabled ? ticketCount * 49.0 : 0;
  const convenienceFee = 45.0;
  const taxes = 38.5;
  const promoDiscount = promoApplied ? 150.0 : 0.0;

  const grandTotal = Math.max(
    0,
    ticketsSubtotal +
    fnbSubtotal +
    protectPrice +
    convenienceFee +
    taxes -
    promoDiscount
  );

  const handlePay = () => {
    const query = new URLSearchParams({
      movie,
      venue,
      time,
      date,
      seats: seatsParam,
      total: grandTotal.toFixed(2),
      fnb: fnbQty.combo > 0 ? "IMAX Mega Combo (1x)" : "None",
    }).toString();
    router.push(`/confirmation?${query}`);
  };

  return (
    <div className="w-full bg-[#11131a] text-[#e2e2ec] font-sans min-h-screen py-10">
      <div className="max-w-[1440px] mx-auto  px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-widest text-[#ff2e63] font-black bg-[#ff4f72]/20 px-3 py-0.5 rounded-full border border-[#ff4f72]/30">
                Step 2 of 3 • Add-ons & Checkout
              </span>
              <span className="text-xs text-[#94a3b8] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                Seating Reserved
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enhance Your Experience
            </h1>
          </div>

          {/* Session Timer */}
          <div className="flex items-center gap-3 bg-[#191b23] px-4 py-2 rounded-xl border border-white/10 shadow-md">
            <div className="flex items-center gap-1.5 text-[#ff2e63]">
              <Timer className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] uppercase font-bold text-[#94a3b8]">
                Session Closes:
              </span>
            </div>
            <span className="font-heading text-lg text-[#ff2e63] font-bold tabular-nums">
              {formatSessionTime(sessionTime)}
            </span>
          </div>
        </div>

        {/* 2-Column Checkout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: F&B, SprintProtect, Promo, Payment Form (7-8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            {/* 1. Gourmet Concessions & F&B */}
            <section className="bg-[#191b23] rounded-2xl md:p-6 p-4 border border-white/10 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 bg-[#1d1f27] p-4 rounded-xl border border-white/5">
                <div>
                  <span className="text-[10px] uppercase text-[#10b981] font-bold tracking-wider block">
                    F&B Fulfillment Service
                  </span>
                  <span className="font-heading text-base font-bold text-white">
                    How should we serve you?
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#11131a] p-1 rounded-xl sm:rounded-full border border-white/5 gap-1 sm:gap-0">
                  <button
                    type="button"
                    onClick={() => setFulfillment("seat")}
                    className={`px-3.5 py-1.5 rounded-lg sm:rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${fulfillment === "seat"
                      ? "bg-[#ff4f72] text-white shadow-md shadow-[#ff4f72]/40"
                      : "text-[#94a3b8] hover:text-white"
                      }`}
                  >
                    <Armchair className="w-3.5 h-3.5" />
                    <span>Seat Delivery ({seatsParam})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillment("counter")}
                    className={`px-3.5 py-1.5 rounded-lg sm:rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${fulfillment === "counter"
                      ? "bg-[#ff4f72] text-white shadow-md shadow-[#ff4f72]/40"
                      : "text-[#94a3b8] hover:text-white"
                      }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Express Counter</span>
                  </button>
                </div>
              </div>

              {/* F&B Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Item 1: IMAX Mega Combo */}
                <div className="bg-[#1d1f27] rounded-xl p-4 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all group">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 bg-[#11131a]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr9cAIgQN0DLumhd-p-RfDGe_ZsaDD6aPUJU1QpXGc0u7e7F89Wgrs2O3XaEOtkz-Bit3qljVnpOe34y8uwfzrxUW3nOmfZXSCco_glvmghU-pO3gxH_oE3vQKyP8wvvN_-Ep9hEEyHQqDVgd0CUMxA46z6DILq8xfwBT7vg-ZdQS5FOrnpCctMgS2h6A9_STwTUFKKPwDopuVs388yF483lKi9QrYu5f7sZf9kulQ"
                      alt="IMAX Mega Combo"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-[#ff4f72] text-white shadow-md">
                        Best Value
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-baseline">
                      <span className="text-[10px] bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[#10b981] font-semibold">
                        Saves ₹120
                      </span>
                      <span className="font-heading text-lg font-black text-[#ff2e63]">
                        ₹450
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">
                      IMAX Mega Combo
                    </h3>
                    <p className="text-xs text-[#94a3b8] line-clamp-2 mt-0.5 mb-3">
                      Truffle butter XL popcorn + 2 large sodas (Coca-Cola/Sprite) + warm artisan nachos.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-xs text-[#94a3b8] font-medium">Quantity</span>
                    <div className="flex items-center bg-[#11131a] rounded-full p-1 border border-white/5">
                      <button
                        type="button"
                        onClick={() => updateQty("combo", -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-[#282a31] text-white hover:bg-[#33343c] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-white">
                        {fnbQty.combo}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty("combo", 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-[#ff4f72] text-white hover:brightness-110 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item 2: Caramel Popcorn */}
                <div className="bg-[#1d1f27] rounded-xl p-4 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all group">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 bg-[#11131a]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRrTnLiv10i7wXGxAt0N_3t6idyD6umQiqRFbTEXw6euVT4EeoU_bhPO-VMys6Wz3coLDT4zWYIqmyJ-oio1o08ylc2TwtsovLvcuKArjMfPbkQE-hI7wguUyyRfgCGCcBKhbKdvkyV9Bi60oWv0kBvDGhAT_6aHAqXvLskkmiQUEhZIWpTbWVZuWY9i6TrJdCyKh-QP2oL8TdaA-F7MiNndUGQAIyzcn_qj0y9pPG"
                      alt="Gourmet Caramel Popcorn Tub"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[#94a3b8]">
                        Signature
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span className="font-heading text-lg font-black text-white">
                        ₹240
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">
                      Gourmet Caramel Popcorn
                    </h3>
                    <p className="text-xs text-[#94a3b8] line-clamp-2 mt-0.5 mb-3">
                      Hand-spun copper kettle corn glazed with dark salted Madagascar vanilla caramel.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-xs text-[#94a3b8] font-medium">Quantity</span>
                    <div className="flex items-center bg-[#11131a] rounded-full p-1 border border-white/5">
                      <button
                        type="button"
                        onClick={() => updateQty("caramel", -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-[#282a31] text-white hover:bg-[#33343c] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-white">
                        {fnbQty.caramel}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty("caramel", 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-[#ff4f72] text-white hover:brightness-110 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item 3: Loaded Nachos */}
                <div className="bg-[#1d1f27] rounded-xl p-4 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all group">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 bg-[#11131a]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkBGNtGVtmQLNLBmn9NZolL-aBAJy3Ui5QNRLrGuEcOrySFn5CdILdneF2WVv3K4d4z7dg4PMA6x0y_j1dHyMcQ5il1Bnex-cpc_stj2J5Ngrco7tWV1X1l1JvXhvdm3uqKaYJz8Pye1TMrjARQNDCMHyRVxU-6NCEfOyo5qYvVQQQzt-H1EYcqpWZrMBm-YtxyR35yqW2Fx91V2b1L5DltRY6XIAv5w4dcRrzDm4g"
                      alt="Artisan Loaded Nachos"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className="font-heading text-lg font-black text-white">
                        ₹280
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">
                      Artisan Loaded Nachos
                    </h3>
                    <p className="text-xs text-[#94a3b8] line-clamp-2 mt-0.5 mb-3">
                      Blue corn chips bathed in warm smoked queso, charred jalapeños & house salsa.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-xs text-[#94a3b8] font-medium">Quantity</span>
                    <div className="flex items-center bg-[#11131a] rounded-full p-1 border border-white/5">
                      <button
                        type="button"
                        onClick={() => updateQty("nachos", -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-[#282a31] text-white hover:bg-[#33343c] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-white">
                        {fnbQty.nachos}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty("nachos", 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-[#ff4f72] text-white hover:brightness-110 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item 4: Dune 2 Collector Tin */}
                <div className="bg-[#1d1f27] rounded-xl p-4 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all group">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 bg-[#11131a]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIz89HKPoNBgvbUD-FptMK0tYxHYhv1oOVQFsXTSln_dWImcOZiycRCY5Cy9khrYu2PqF9t_gwgBPtBqSPJ7hQBG8ioVab1JKJ2hLGrhu54vew8FFxaTw8jw4aby_romT2ifXJBAuVFcHGT_1E-jINiBnWwoUsUtCPcnJyE3UiXuFYRwJsTv7vPgFdo-P4vOYK-6ba0PBUOrpSpOLscI2oa-XEkZ5xh-5nQezsRgVS"
                      alt="Dune 2 Collector Tin & Tumbler"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#3131c0] text-[#c0c1ff]">
                        Collector Ed.
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span className="font-heading text-lg font-black text-white">
                        ₹399
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">
                      Dune 2 Collector Tin & Cup
                    </h3>
                    <p className="text-xs text-[#94a3b8] line-clamp-2 mt-0.5 mb-3">
                      Embossed sandworm tin with insulated laser-cut Arrakis commemorative tumbler.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-xs text-[#94a3b8] font-medium">Quantity</span>
                    <div className="flex items-center bg-[#11131a] rounded-full p-1 border border-white/5">
                      <button
                        type="button"
                        onClick={() => updateQty("tin", -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-[#282a31] text-white hover:bg-[#33343c] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-white">
                        {fnbQty.tin}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty("tin", 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-[#ff4f72] text-white hover:brightness-110 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. SprintProtect Refund Guarantee */}
            <section className="bg-[#191b23] rounded-2xl md:p-6 p-4 border border-white/10 shadow-xl flex items-start gap-4 flex-wrap">
              <div className="p-3 bg-[#10b981]/15 text-[#10b981] rounded-xl shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-base text-white">
                      SprintProtect™ 100% Refund Guarantee
                    </h3>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#00a572]/20 text-[#10b981]">
                      Recommended
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#ff2e63]">
                    +₹49 / ticket
                  </span>
                </div>
                <p className="text-xs text-[#94a3b8] mb-3">
                  Plans change, movies shouldn't stress you out. Get a guaranteed 100% instant refund straight to your original payment method up to 2 hours before showtime.
                </p>

                <div className="flex items-center justify-between bg-[#1d1f27] p-3 rounded-xl border border-white/5">
                  <span className="text-xs text-white font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10b981]" />
                    Covering {ticketCount} Tickets (₹{(ticketCount * 49).toFixed(2)} total)
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={protectEnabled}
                      onChange={(e) => setProtectEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#282a31] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#00a572] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                  </label>
                </div>
              </div>
            </section>

            {/* 3. Promo Codes & Member Offers */}
            <section className="bg-[#191b23] rounded-2xl md:p-6 p-4 border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-[#ff2e63]" />
                <h3 className="font-heading font-bold text-base text-white">
                  Promo Codes & Member Offers
                </h3>
              </div>

              <div className="flex gap-2 mb-3 flex-wrap">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g. CHASE5)"
                  className="flex-1 bg-[#11131a] text-white text-xs font-bold uppercase rounded-xl px-4 py-2.5 border border-white/10 focus:outline-none focus:border-[#ff2e63]"
                />
                <ActionButton
                  title={promoApplied ? "Applied" : "Apply"}
                  onClick={() => setPromoApplied(true)}
                  variant="secondary"
                  size="sm"
                  icon={null}
                />
              </div>

              {promoApplied && (
                <div className="bg-[#1d1f27] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3131c0]/30 text-[#c0c1ff] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          CHASE SAPPHIRE PREFERRED
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#00a572]/20 text-[#10b981]">
                          Applied
                        </span>
                      </div>
                      <span className="text-[11px] text-[#94a3b8]">
                        ₹150 instant concession & IMAX discount deducted.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPromoApplied(false)}
                    className="p-1 text-[#94a3b8] hover:text-[#ff4f72] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </section>

            {/* 4. Payment Method & Details */}
            <section className="bg-[#191b23] rounded-2xl md:p-6 p-4 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#ff2e63]" />
                  <h3 className="font-heading font-bold text-base text-white">
                    Payment Method
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#10b981] flex items-center gap-1 bg-[#10b981]/10 px-2.5 py-1 rounded-full border border-[#10b981]/20">
                  <Lock className="w-3 h-3" /> 256-Bit SSL
                </span>
              </div>

              {/* 4 Payment Methods Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                {[
                  { id: "express", label: "UPI / Google Pay", icon: Smartphone },
                  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                  { id: "bank", label: "Net Banking", icon: Building },
                  { id: "wallet", label: "SprintWallet (₹500)", icon: Wallet },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = paymentMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPaymentMethod(item.id)}
                      className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer text-center ${isActive
                        ? "bg-[#1d1f27] border-2 border-[#ff4f72] shadow-md shadow-[#ff4f72]/20 text-white"
                        : "bg-[#1d1f27]/60 border border-white/5 hover:bg-[#1d1f27] text-[#94a3b8] hover:text-white"
                        }`}
                    >
                      <Icon className="w-5 h-5 text-[#ff2e63]" />
                      <span className="text-xs font-bold leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Card Form */}
              <div className="bg-[#1d1f27] p-4 rounded-xl border border-white/5 space-y-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#94a3b8] block mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Suraj Banerjee"
                    className="w-full bg-[#11131a] text-white text-xs rounded-lg px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-[#ff2e63]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#94a3b8] block mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="4112 •••• •••• 8920"
                      className="w-full bg-[#11131a] text-white text-xs rounded-lg px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-[#ff2e63] tracking-wider"
                    />
                    <CreditCard className="w-4 h-4 text-[#10b981] absolute right-3 top-3" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#94a3b8] block mb-1">
                      Expires
                    </label>
                    <input
                      type="text"
                      defaultValue="09/27"
                      className="w-full bg-[#11131a] text-white text-xs rounded-lg px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-[#ff2e63] text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#94a3b8] block mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      defaultValue="894"
                      maxLength={4}
                      className="w-full bg-[#11131a] text-white text-xs rounded-lg px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-[#ff2e63] text-center tracking-widest"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Order Summary (4-5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
            <div className="bg-[#191b23] rounded-2xl md:p-6 p-4 border border-white/10 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#ff2e63] font-black">
                    Checkout Breakdown
                  </span>
                  <h2 className="font-heading text-lg font-bold text-white">
                    Order Summary
                  </h2>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#ff4f72]/20 flex items-center justify-center text-[#ff2e63]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>

              {/* Movie Mini Header */}
              <div className="bg-[#1d1f27] p-3.5 rounded-xl border border-white/5 flex gap-3 items-center">
                <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-[#11131a]">
                  <img
                    src={displayPoster}
                    alt={displayTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#3131c0]/40 text-[#c0c1ff] font-bold">
                      {displayFormat}
                    </span>
                    <span className="text-[9px] text-[#94a3b8]">UA 13+</span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white truncate">
                    {displayTitle}
                  </h3>
                  <p className="text-xs text-[#94a3b8] truncate">
                    {venue} • Screen 1
                  </p>
                  <p className="text-[11px] text-[#10b981] font-semibold">
                    {date} • {time}
                  </p>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-2.5 text-xs text-[#94a3b8] pt-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-white font-medium block">
                      Club Premium Tickets
                    </span>
                    <span className="text-[11px]">
                      Seats {seatsParam} ({ticketCount}x ₹{ticketUnitPrice.toFixed(2)})
                    </span>
                  </div>
                  <span className="text-white font-bold">
                    ₹{ticketsSubtotal.toFixed(2)}
                  </span>
                </div>

                {fnbQty.combo > 0 && (
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-white font-medium block">
                        IMAX Mega Combo
                      </span>
                      <span className="text-[11px]">{fnbQty.combo}x ₹450</span>
                    </div>
                    <span className="text-white font-bold">
                      ₹{comboPrice.toFixed(2)}
                    </span>
                  </div>
                )}

                {fnbQty.caramel > 0 && (
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-white font-medium block">
                        Caramel Popcorn Tub
                      </span>
                      <span className="text-[11px]">{fnbQty.caramel}x ₹240</span>
                    </div>
                    <span className="text-white font-bold">
                      ₹{caramelPrice.toFixed(2)}
                    </span>
                  </div>
                )}

                {fnbQty.nachos > 0 && (
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-white font-medium block">
                        Artisan Loaded Nachos
                      </span>
                      <span className="text-[11px]">{fnbQty.nachos}x ₹280</span>
                    </div>
                    <span className="text-white font-bold">
                      ₹{nachosPrice.toFixed(2)}
                    </span>
                  </div>
                )}

                {fnbQty.tin > 0 && (
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-white font-medium block">
                        Dune 2 Collector Tin
                      </span>
                      <span className="text-[11px]">{fnbQty.tin}x ₹399</span>
                    </div>
                    <span className="text-white font-bold">
                      ₹{tinPrice.toFixed(2)}
                    </span>
                  </div>
                )}

                {protectEnabled && (
                  <div className="flex justify-between items-start text-[#10b981]">
                    <div>
                      <span className="font-medium block flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> SprintProtect™
                      </span>
                      <span className="text-[11px] text-[#94a3b8]">
                        {ticketCount}x ₹49 Guarantee
                      </span>
                    </div>
                    <span className="font-bold">₹{protectPrice.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Convenience Fee</span>
                  <span className="text-white font-medium">
                    ₹{convenienceFee.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes & GST (18%)</span>
                  <span className="text-white font-medium">
                    ₹{taxes.toFixed(2)}
                  </span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-[#ff2e63] font-bold">
                    <span>CHASE5 Promo Discount</span>
                    <span>-₹{promoDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#94a3b8] block">
                    Total Amount Due
                  </span>
                  <span className="text-[10px] text-[#10b981]">
                    Includes all taxes & fees
                  </span>
                </div>
                <span className="font-heading text-2xl font-black text-white">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Confirm Action Button */}
              <ActionButton
                title={`Confirm & Pay ₹${grandTotal.toFixed(2)}`}
                onClick={handlePay}
                variant="primary"
                size="lg"
                icon={<Lock className="w-4 h-4" />}
                className="w-full shadow-lg shadow-[#ff4f72]/40"
              />

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#94a3b8] pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" /> 100% Refundable
                </span>
                <span>•</span>
                <span>Instant M-Ticket</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

