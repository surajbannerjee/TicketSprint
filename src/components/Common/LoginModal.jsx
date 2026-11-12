"use client";

import React, { useState } from "react";
import { X, Sparkles, User, Mail, Lock, Check, ShieldCheck, ArrowRight } from "lucide-react";
import { useApp, PRESET_AVATARS } from "@/context/AppContext";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useApp();

  const [activeTab, setActiveTab] = useState("signin"); // "signin" | "signup"
  const [name, setName] = useState("Alex");
  const [email, setEmail] = useState("alex.rivera@example.com");
  const [password, setPassword] = useState("••••••••");
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0].url);
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [isVip, setIsVip] = useState(true);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: activeTab === "signup" ? (name || "Alex") : (name || "Alex"),
      email: email || "alex.rivera@example.com",
      avatar: customAvatarUrl.trim() || selectedAvatar,
      isVip,
    });
  };

  const handleQuickDemo = (demoType) => {
    if (demoType === "alex-vip") {
      login({
        name: "Alex",
        email: "alex.rivera@example.com",
        avatar: PRESET_AVATARS[0].url,
        isVip: true,
      });
    } else {
      login({
        name: "Jordan",
        email: "jordan.k@example.com",
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
                {activeTab === "signin" ? "Sign In to TicketSprint" : "Create VIP Account"}
              </h2>
              <p className="text-[11px] text-[#94a3b8]">
                Instant seat reservation, zero service fees & M-Ticket pass
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
              Create Account
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="relative z-10 p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Avatar Selection (Available for Sign Up or custom profile) */}
          {activeTab === "signup" && (
            <div className="space-y-2 pb-1">
              <label className="text-xs font-bold text-white flex items-center justify-between">
                <span>Select Your Avatar</span>
                <span className="text-[10px] text-[#FF2E63] font-medium">Click to select</span>
              </label>

              {/* Preset Avatars Grid */}
              <div className="grid grid-cols-6 gap-2 pt-1">
                {PRESET_AVATARS.map((av) => {
                  const isSelected = selectedAvatar === av.url && !customAvatarUrl.trim();
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => {
                        setSelectedAvatar(av.url);
                        setCustomAvatarUrl("");
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

              {/* Custom Image URL fallback */}
              <div className="pt-1">
                <input
                  type="url"
                  placeholder="Or paste custom image URL (e.g. https://...)"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="w-full bg-[#191b23] border border-white/10 rounded-xl px-3 py-1.5 text-[11px] text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF2E63]"
                />
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
                  placeholder="e.g. Alex Rivera"
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
                placeholder="name@example.com"
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

          {/* VIP Perks Indicator */}
          <div className="p-3 rounded-xl bg-[#191b23] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs text-white font-semibold">VIP Pass Membership</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#FF2E63] text-white text-[9px] font-black uppercase tracking-wider">
              INCLUDED
            </span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF2E63] via-[#FF3B6F] to-[#FF4B72] hover:brightness-110 active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#FF2E63]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{activeTab === "signin" ? "Sign In & Continue" : "Complete Registration"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo Login Shortcut */}
          <div className="pt-2 border-t border-white/10 text-center">
            <span className="text-[10px] text-[#94a3b8] block mb-2">Or test instantly with 1-click:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("alex-vip")}
                className="py-1.5 px-2 rounded-lg bg-[#191b23] hover:bg-[#20253b] border border-white/10 text-[11px] text-white font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF2E63]" />
                <span>Alex (VIP Pass)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("guest")}
                className="py-1.5 px-2 rounded-lg bg-[#191b23] hover:bg-[#20253b] border border-white/10 text-[11px] text-slate-300 font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Jordan (Standard)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
