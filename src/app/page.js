"use client";

import React, { useState } from "react";
import HeroSection from "@/components/SectionComponents/HeroSection";
import SprintPassBanner from "@/components/SectionComponents/SprintPassBanner";
import TrendingBlockbusters from "@/components/SectionComponents/TrendingBlockbusters";
import UpcomingBuzzSection from "@/components/SectionComponents/UpcomingBuzzSection";
import LiveSpectaclesSection from "@/components/SectionComponents/LiveSpectaclesSection";
import ActionButton from "@/components/Common/ActionButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Palette,
  MousePointerClick,
} from "lucide-react";

export default function Home() {
  const [ticketInput, setTicketInput] = useState("");

  const colorSwatches = [
    {
      name: "Primary",
      hex: "#FF2E63",
      role: "Brand vibrant pink/red",
      barClass: "bg-[#FF2E63]",
      gradient: "from-[#2A0812] via-[#FF2E63] to-[#FFF0F4]",
    },
    {
      name: "Secondary",
      hex: "#6366F1",
      role: "Action indigo",
      barClass: "bg-[#6366F1]",
      gradient: "from-[#0F1133] via-[#6366F1] to-[#EEF2FF]",
    },
    {
      name: "Tertiary",
      hex: "#10B981",
      role: "Success emerald",
      barClass: "bg-[#10B981]",
      gradient: "from-[#042016] via-[#10B981] to-[#ECFDF5]",
    },
    {
      name: "Neutral",
      hex: "#0B0D14",
      role: "Deep canvas base",
      barClass: "bg-[#0B0D14] border border-white/20",
      gradient: "from-[#000000] via-[#4B5563] to-[#FFFFFF]",
    },
  ];

  const typographyList = [
    {
      role: "Headline",
      family: "Plus Jakarta Sans",
      fontClass: "font-heading",
      sample: "Sprint fast, deliver seamlessly.",
    },
    {
      role: "Body",
      family: "Inter",
      fontClass: "font-sans",
      sample:
        "The all-in-one ticket management engine built with Next.js, Tailwind CSS & Shadcn UI.",
    },
    {
      role: "Label",
      family: "Inter",
      fontClass: "font-sans uppercase tracking-wider text-xs",
      sample: "PRIORITY: CRITICAL • ASSIGNED TO SPRINT #42",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0B0D14] text-[#F8FAFC] selection:bg-[#FF2E63] selection:text-white overflow-hidden pb-16">
      {/* Background dot pattern matching user image */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative gradient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF2E63]/15 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-96 right-0 w-[450px] h-[300px] bg-[#6366F1]/15 blur-[120px] rounded-full" />

      {/* 1. Cinematic Hero Section (Exact Replica of Uploaded Image) */}
      <HeroSection />

      {/* 2. SprintPass VIP Tier Banner Component */}
      <SprintPassBanner />

      {/* 3. Trending Blockbusters Section (Swiper Slider + MovieCard Map + Filter Dropdown) */}
      <TrendingBlockbusters />

      {/* 4. Upcoming Blockbusters & Buzz Section (Fan Anticipation Meter) */}
      <UpcomingBuzzSection />

      {/* 5. Live Spectacles: Concerts & Arena Sports + Venue Experience Discovery */}
      <LiveSpectaclesSection />


    </div>
  );
}
