"use client";

import React, { useState } from "react";
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
  Ticket,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Code2,
  Palette,
  Type,
  Zap,
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
    <div className="relative min-h-screen bg-[#0B0D14] text-[#F8FAFC] selection:bg-[#FF2E63] selection:text-white overflow-hidden">
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

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-16">
        <section className="text-center space-y-6 max-w-3xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E63]" />
            Configured with Custom Colors & Typography
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Build sprint-ready apps with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#6366F1] to-[#10B981]">
              TicketSprint
            </span>
          </h1>

          <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed">
            Your Next.js project is fully set up with Tailwind CSS, Shadcn UI, and
            100% pure JavaScript. No TypeScript, configured with your exact design palette and fonts.
          </p>

          {/* Quick Input Action */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <Input
              type="text"
              placeholder="e.g. Implement user authentication..."
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              className="bg-white/5 border-white/15 text-white placeholder:text-slate-500 focus-visible:ring-[#FF2E63]"
            />
            <Button className="bg-[#FF2E63] hover:bg-[#FF2E63]/90 text-white shrink-0">
              Create Ticket
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </section>

        {/* Design System Preview (Matching the User's Image) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Palette className="w-5 h-5 text-[#FF2E63]" />
            <h2 className="font-heading text-xl font-bold tracking-tight text-white">
              Design System Palette
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Swatches Column */}
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
                    {/* Gradient strip preview */}
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

            {/* Typography Column */}
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

        {/* Shadcn UI Showcase */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Layers className="w-5 h-5 text-[#6366F1]" />
            <h2 className="font-heading text-xl font-bold tracking-tight text-white">
              Installed Shadcn UI Components
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Component 1: Button Collection */}
            <Card className="bg-[#131620] border-white/10 text-white">
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>
                  Custom styled using brand variables
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <Button className="w-full bg-[#FF2E63] hover:bg-[#FF2E63]/90 text-white">
                  Primary Button
                </Button>
                <Button className="w-full bg-[#6366F1] hover:bg-[#6366F1]/90 text-white">
                  Secondary Button
                </Button>
                <Button className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                  Tertiary Button
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  Outline Button
                </Button>
              </CardContent>
            </Card>

            {/* Component 2: Ticket Card Sample */}
            <Card className="bg-[#131620] border-white/10 text-white flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-[#FF2E63]/20 text-[#FF2E63] border-[#FF2E63]/40">
                    High Priority
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">#TS-102</span>
                </div>
                <CardTitle className="pt-2">Setup Authentication Flow</CardTitle>
                <CardDescription>
                  Integrate OAuth login and user sessions for Sprint 1.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Next.js App Router configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Pure JavaScript components</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
                <span>Due in 2 days</span>
                <Badge className="bg-[#6366F1]/20 text-[#818CF8] border-[#6366F1]/30">
                  In Progress
                </Badge>
              </CardFooter>
            </Card>

            {/* Component 3: Project Checklist */}
            <Card className="bg-[#131620] border-white/10 text-white">
              <CardHeader>
                <CardTitle>Configuration Status</CardTitle>
                <CardDescription>
                  Checked and verified setup details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Next.js 16 & Turbopack</span>
                    <p className="text-xs text-slate-400">Fast local build and App router</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Tailwind CSS v4</span>
                    <p className="text-xs text-slate-400">Theme variables & utility engine</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">No TypeScript</span>
                    <p className="text-xs text-slate-400">100% JavaScript (.js / .jsx)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Google Fonts Loaded</span>
                    <p className="text-xs text-slate-400">Plus Jakarta Sans & Inter</p>
                  </div>
                </div>
              </CardContent>
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
