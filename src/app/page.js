"use client";

import React, { useState } from "react";
import HeroSection from "@/components/SectionComponents/HeroSection";
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

      {/* Main Content Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-8">
        
        {/* Reusable ActionButton Demonstration */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <MousePointerClick className="w-5 h-5 text-[#FF2E63]" />
            <h2 className="font-heading text-xl font-bold tracking-tight text-white">
              Reusable ActionButton Component (2 Styles)
            </h2>
          </div>

          <Card className="bg-[#131620] border-white/10 text-white p-6 shadow-xl">
            <div className="space-y-4">
              <p className="text-sm text-slate-300">
                এই <code className="text-[#FF2E63] bg-black/50 px-1.5 py-0.5 rounded font-mono">&lt;ActionButton /&gt;</code> কম্পোনেন্টটি আপনার প্রজেক্টের যেকোনো জায়গায় <code className="text-[#10B981] font-mono">title</code> (বা text) এবং <code className="text-[#10B981] font-mono">link</code> (বা href) প্রপ দিয়ে সহজেই রিইউজ করতে পারবেন:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Variant 1: Primary Neon Glow Button */}
                <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#FF2E63]/20 text-[#FF2E63] border-[#FF2E63]/40">
                      Variant: &quot;primary&quot;
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">Vibrant Neon Glow</span>
                  </div>
                  <div className="py-3 flex items-center justify-center">
                    <ActionButton
                      title="BOOK TICKETS NOW"
                      link="#book-tickets"
                      variant="primary"
                    />
                  </div>
                  <pre className="text-[11px] p-2.5 rounded bg-black/80 text-slate-300 font-mono overflow-x-auto">
                    {`<ActionButton\n  title="BOOK TICKETS NOW"\n  link="/book-tickets"\n  variant="primary"\n/>`}
                  </pre>
                </div>

                {/* Variant 2: Secondary Dark Glass Button */}
                <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#6366F1]/20 text-[#818CF8] border-[#6366F1]/40">
                      Variant: &quot;secondary&quot;
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">Glassmorphism Play</span>
                  </div>
                  <div className="py-3 flex items-center justify-center">
                    <ActionButton
                      title="WATCH TRAILER"
                      link="#watch-trailer"
                      variant="secondary"
                    />
                  </div>
                  <pre className="text-[11px] p-2.5 rounded bg-black/80 text-slate-300 font-mono overflow-x-auto">
                    {`<ActionButton\n  title="WATCH TRAILER"\n  link="/watch-trailer"\n  variant="secondary"\n/>`}
                  </pre>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Quick Ticket Input */}
        <section className="text-center space-y-6 max-w-2xl mx-auto pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E63]" />
            Fast Component Architecture
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Ready to scale with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#6366F1] to-[#10B981]">
              TicketSprint
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <Input
              type="text"
              placeholder="Enter sprint task or movie title..."
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              className="bg-white/5 border-white/15 text-white placeholder:text-slate-500 focus-visible:ring-[#FF2E63]"
            />
            <Button className="bg-[#FF2E63] hover:bg-[#FF2E63]/90 text-white shrink-0">
              Submit Task
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </section>

        {/* Design System Preview */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Palette className="w-5 h-5 text-[#FF2E63]" />
            <h2 className="font-heading text-xl font-bold tracking-tight text-white">
              Design System Palette
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Swatches */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Color Tokens
              </h3>
              <div className="space-y-3">
                {colorSwatches.map((swatch) => (
                  <Card
                    key={swatch.name}
                    className="bg-[#131620] border-white/10 text-white overflow-hidden p-0 shadow-lg"
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-heading font-bold text-base flex items-center gap-2">
                          {swatch.name}
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/40 text-slate-300">
                            {swatch.hex}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-slate-400 mt-0.5">
                          {swatch.role}
                        </p>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-lg shadow-inner ${swatch.barClass}`}
                        style={{ backgroundColor: swatch.hex }}
                      />
                    </div>
                    <div
                      className="h-3 w-full bg-gradient-to-r"
                      style={{
                        background: `linear-gradient(to right, #000000, ${swatch.hex}, #ffffff)`,
                      }}
                    />
                  </Card>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Typography Families
              </h3>
              <div className="space-y-3">
                {typographyList.map((typo) => (
                  <Card
                    key={typo.role}
                    className="bg-[#131620] border-white/10 text-white p-5 shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                          {typo.role}
                        </div>
                        <div className="font-heading text-lg font-bold text-white mt-0.5">
                          {typo.family}
                        </div>
                      </div>
                      <span className="text-4xl font-light text-slate-300 select-none">
                        Aa
                      </span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <p className={`text-sm text-slate-300 ${typo.fontClass}`}>
                        {typo.sample}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Configuration Checklist */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Layers className="w-5 h-5 text-[#6366F1]" />
            <h2 className="font-heading text-xl font-bold tracking-tight text-white">
              Project Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-[#131620] border-white/10 text-white p-4">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mb-2" />
              <div className="font-bold text-sm">Next.js 16</div>
              <p className="text-xs text-slate-400 mt-1">App router with Turbopack engine</p>
            </Card>
            <Card className="bg-[#131620] border-white/10 text-white p-4">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mb-2" />
              <div className="font-bold text-sm">Tailwind CSS v4</div>
              <p className="text-xs text-slate-400 mt-1">Custom brand color variables</p>
            </Card>
            <Card className="bg-[#131620] border-white/10 text-white p-4">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mb-2" />
              <div className="font-bold text-sm">Shadcn UI</div>
              <p className="text-xs text-slate-400 mt-1">Pure JavaScript (.jsx) components</p>
            </Card>
            <Card className="bg-[#131620] border-white/10 text-white p-4">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] mb-2" />
              <div className="font-bold text-sm">Google Fonts</div>
              <p className="text-xs text-slate-400 mt-1">Plus Jakarta Sans & Inter</p>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 mt-16 text-center text-xs text-slate-500">
        <p>
          TicketSprint © 2026 • Built with Next.js, Tailwind CSS, Shadcn UI & JavaScript
        </p>
      </footer>
    </div>
  );
}
