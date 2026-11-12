"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  X,
  Sparkles,
  User,
  Mail,
  Lock,
  Check,
  ShieldCheck,
  ArrowRight,
  Upload,
  Crown,
  ChevronDown,
  ChevronUp,
  Percent,
  Clock,
  Ticket,
  Flame,
} from "lucide-react";
import { useApp, PRESET_AVATARS } from "@/context/AppContext";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useApp();

  const [activeTab, setActiveTab] = useState("signin"); // "signin" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0].url);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  // Default is standard user (false). Only true if user chooses VIP tier
  const [isVip, setIsVip] = useState(false);
  const [showVipPerks, setShowVipPerks] = useState(false);

  const fileInputRef = useRef(null);

  if (!isLoginModalOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Please choose an image under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedAvatar(event.target.result);
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: name.trim() || (isVip ? "Suraj Banerjee (VIP)" : "Suraj Banerjee"),
      email: email.trim() || "surajbanerjee255@gmail.com",
      avatar: uploadedAvatar || selectedAvatar,
      isVip,
    });
  };

  const handleQuickDemo = (demoType) => {
    if (demoType === "vip") {
      login({
        name: "Suraj Banerjee",
        email: "surajbanerjee255@gmail.com",
        avatar: PRESET_AVATARS[0].url,
        isVip: true,
      });
    } else {
      login({
        name: "Suraj Banerjee",
        email: "surajbanerjee255@gmail.com",
        avatar: PRESET_AVATARS[1].url,
        isVip: false,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#121624] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-[#e2e2ec] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background accents */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 bg-[#FF2E63]/25 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 bg-[#6366F1]/20 blur-3xl rounded-full" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-5 sm:p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF2E63] to-[#FF4F72] flex items-center justify-center text-white shadow-md shadow-[#FF2E63]/30">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-white">
                {activeTab === "signin" ? "Sign In to TicketSprint" : "Create New Account"}
              </h2>
              <p className="text-[11px] text-[#94a3b8]">
                Standard access is free • VIP membership unlocks exclusive theater benefits
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeLoginModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="relative z-10 px-5 sm:px-6 pt-4 shrink-0">
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[#191b23] border border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("signin")}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === "signin"
                  ? "bg-[#FF2E63] text-white shadow-md shadow-[#FF2E63]/30"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === "signup"
                  ? "bg-[#FF2E63] text-white shadow-md shadow-[#FF2E63]/30"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="relative z-10 p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Avatar Selection (Sign Up) */}
          {activeTab === "signup" && (
            <div className="space-y-2 pb-1">
              <label className="text-xs font-bold text-white flex items-center justify-between">
                <span>Select Profile Avatar</span>
                <span className="text-[10px] text-[#FF2E63] font-medium">Click to select</span>
              </label>

              {/* Preset Avatars Grid */}
              <div className="grid grid-cols-6 gap-2 pt-1">
                {PRESET_AVATARS.map((av) => {
                  const isSelected = selectedAvatar === av.url && !uploadedAvatar;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => {
                        setSelectedAvatar(av.url);
                        setUploadedAvatar(null);
                        setUploadedFileName("");
                      }}
                      className={`relative aspect-square rounded-full p-0.5 transition-all cursor-pointer group ${
                        isSelected
                          ? "ring-2 ring-[#FF2E63] scale-110 shadow-lg shadow-[#FF2E63]/40"
                          : "ring-1 ring-white/10 hover:ring-white/40 opacity-75 hover:opacity-100"
                      }`}
                      title={av.name}
                    >
                      <img
                        src={av.url}
                        alt={av.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white ring-2 ring-[#121624]">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Select Image File Button */}
              <div className="pt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {uploadedAvatar ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#191b23] border border-[#10B981]/50">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={uploadedAvatar}
                        alt="Uploaded preview"
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#10B981]"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block truncate">
                          {uploadedFileName || "Custom photo selected"}
                        </span>
                        <span className="text-[10px] text-[#10B981]">Ready for profile avatar</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSelectImageClick}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedAvatar(null);
                          setUploadedFileName("");
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSelectImageClick}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#191b23] hover:bg-[#20253b] border border-dashed border-white/20 hover:border-[#FF2E63] text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
                  >
                    <Upload className="w-4 h-4 text-[#FF2E63] group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Select Image from Device</span>
                    <span className="text-[10px] text-slate-500">(JPG, PNG, WebP)</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Name Field (Sign Up) */}
          {activeTab === "signup" && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Full Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Suraj Banerjee"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#191b23] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF2E63]"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="surajbanerjee255@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#191b23] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF2E63]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Password</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#191b23] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF2E63]"
              />
            </div>
          </div>

          {/* Account Tier Selection: Normal User vs VIP Pass Subscription */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold text-white flex items-center justify-between">
              <span>Account Membership Tier</span>
              <span className="text-[10px] text-slate-400">Choose your membership</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {/* Normal / Free User Option */}
              <button
                type="button"
                onClick={() => setIsVip(false)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  !isVip
                    ? "bg-[#191b23] border-[#10B981] shadow-md shadow-[#10B981]/20 ring-1 ring-[#10B981]"
                    : "bg-[#191b23]/60 border-white/10 hover:border-white/20 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white">Standard User</span>
                  {!isVip && (
                    <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="mt-1">
                  <span className="text-[11px] font-bold text-[#10B981] block">Free Forever</span>
                  <span className="text-[9px] text-slate-400">Regular booking & standard seats</span>
                </div>
              </button>

              {/* VIP Subscription Pass Option */}
              <button
                type="button"
                onClick={() => setIsVip(true)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isVip
                    ? "bg-[#191b23] border-[#FF2E63] shadow-lg shadow-[#FF2E63]/25 ring-1 ring-[#FF2E63]"
                    : "bg-[#191b23]/60 border-white/10 hover:border-white/20 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 text-[#FF2E63] fill-current" />
                    <span className="text-xs font-extrabold text-white">VIP Pass</span>
                  </div>
                  {isVip ? (
                    <div className="w-4 h-4 rounded-full bg-[#FF2E63] flex items-center justify-center text-white">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded bg-[#FF2E63]/20 text-[#FF2E63] text-[9px] font-black uppercase">
                      PRO
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <span className="text-[11px] font-bold text-[#FF2E63] block">₹499 / Month</span>
                  <span className="text-[9px] text-slate-300">VIP recliner access & perks</span>
                </div>
              </button>
            </div>

            {/* VIP Pass Benefits Accordion Box */}
            <div className="rounded-2xl bg-[#161a29]/80 border border-white/10 p-3 space-y-2">
              <button
                type="button"
                onClick={() => setShowVipPerks(!showVipPerks)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#FF2E63]" />
                  <span>VIP Pass Subscription Benefits</span>
                </div>
                {showVipPerks ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* Collapsible Benefits List */}
              {showVipPerks && (
                <div className="pt-2 border-t border-white/10 space-y-2 text-[11px] text-slate-300 animate-in fade-in duration-150">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#FF2E63]/20 text-[#FF2E63] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span><strong>Zero Convenience Fees:</strong> 100% free booking fee on all movie & concert tickets.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#FF2E63]/20 text-[#FF2E63] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span><strong>VIP Recliner Early Access:</strong> Reserve heated recliners 48 hours before public opens.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#FF2E63]/20 text-[#FF2E63] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span><strong>Free Popcorn & Beverages:</strong> 2 free large gourmet combos monthly at all WB auditoria.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#FF2E63]/20 text-[#FF2E63] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span><strong>Instant Free Cancellation:</strong> Cancel tickets up to 20 minutes before showtime with zero penalty.</span>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Includes Pink VIP badge in profile</span>
                    <Link
                      href="/offers"
                      onClick={closeLoginModal}
                      className="text-[#FF2E63] font-bold hover:underline"
                    >
                      Learn more on Offers page →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF2E63] via-[#FF3B6F] to-[#FF4B72] hover:brightness-110 active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#FF2E63]/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>
              {activeTab === "signin"
                ? isVip
                  ? "Sign In as VIP Member"
                  : "Sign In as Standard User"
                : isVip
                ? "Join & Subscribe to VIP Pass (₹499)"
                : "Create Standard Free Account"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo Login Shortcut */}
          <div className="pt-2 border-t border-white/10 text-center">
            <span className="text-[10px] text-[#94a3b8] block mb-2">Or test instantly with 1-click:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("standard")}
                className="py-1.5 px-2 rounded-lg bg-[#191b23] hover:bg-[#20253b] border border-white/10 text-[11px] text-slate-200 font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Standard User (Free)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("vip")}
                className="py-1.5 px-2 rounded-lg bg-[#191b23] hover:bg-[#20253b] border border-[#FF2E63]/40 text-[11px] text-white font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Crown className="w-3 h-3 text-[#FF2E63]" />
                <span>VIP Pass (Suraj)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
