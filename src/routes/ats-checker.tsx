import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Cpu,
  FileCheck2,
  CheckCircle2,
  Wand2,
  Layers,
  Search,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/ats-checker")({
  head: () => ({
    meta: [
      { title: "ATS Resume Checker (Under Development) — CVify.AI" },
      {
        name: "description",
        content:
          "Our AI-powered ATS Resume Checker is currently under development. We're working to make your resume stand out.",
      },
      { property: "og:title", content: "ATS Resume Checker (Under Development) — CVify.AI" },
      {
        property: "og:description",
        content:
          "Our AI-powered ATS Resume Checker is currently under development. We're working to make your resume stand out.",
      },
    ],
  }),
  component: ATSCheckerPage,
});

function ATSCheckerPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 md:py-20 overflow-hidden">
      {/* Background grid and radial glow */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-neon/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 w-full">
        {/* Centered Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-3xl border border-border/80 bg-card/75 glass backdrop-blur-2xl p-8 sm:p-12 md:p-16 text-center shadow-soft overflow-hidden"
        >
          {/* Subtle top neon border accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-2/3 bg-gradient-to-r from-transparent via-neon to-transparent shadow-[0_0_20px_var(--neon)]" />

          {/* Badges: COMING SOON + Under Development */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neon/50 bg-neon/15 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-neon shadow-[0_0_18px_rgba(255,230,0,0.25)]">
              <Sparkles className="h-3 w-3" />
              COMING SOON
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              Under Development
            </div>
          </div>

          {/* Animated Construction / Progress Illustration */}
          <div className="relative my-8 sm:my-10 flex items-center justify-center">
            {/* Background rotating radar / orbit rings */}
            <div className="absolute -inset-10 flex items-center justify-center pointer-events-none -z-10">
              <div className="h-64 w-64 rounded-full border border-dashed border-neon/20 animate-[spin_36s_linear_infinite]" />
              <div className="absolute h-80 w-80 rounded-full border border-border/40" />
              <div className="absolute h-48 w-48 rounded-full bg-neon/10 blur-2xl" />
            </div>

            {/* Central Animated Blueprint Document */}
            <div className="relative w-64 sm:w-72 rounded-2xl border border-neon/40 bg-background/90 p-5 shadow-2xl backdrop-blur-md">
              {/* Corner tech marks */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-neon/60">┌</div>
              <div className="absolute top-2 right-2 text-[9px] font-mono text-neon/60">┐</div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-neon/60">└</div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-neon/60">┘</div>

              {/* Document Header Skeleton */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neon text-neon-foreground shadow-glow">
                    <FileCheck2 className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <div className="h-2 w-20 rounded bg-foreground/80 font-mono text-[9px]" />
                    <div className="mt-1 h-1.5 w-12 rounded bg-muted-foreground/40" />
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded bg-neon/15 px-2 py-0.5 font-mono text-[10px] font-bold text-neon">
                  <Cpu className="h-3 w-3 animate-pulse" />
                  AI v2.0
                </span>
              </div>

              {/* Wireframe Resume Lines */}
              <div className="mt-3.5 space-y-2.5 text-left">
                <div className="space-y-1.5">
                  <div className="h-2 w-14 rounded bg-neon/70" />
                  <div className="h-1.5 w-full rounded bg-muted/80" />
                  <div className="h-1.5 w-5/6 rounded bg-muted/60" />
                </div>
                <div className="space-y-1.5 pt-1 border-t border-border/40">
                  <div className="h-2 w-16 rounded bg-neon/70" />
                  <div className="flex gap-1.5">
                    <div className="h-4 w-12 rounded-full bg-neon/20 border border-neon/30" />
                    <div className="h-4 w-14 rounded-full bg-neon/20 border border-neon/30" />
                    <div className="h-4 w-10 rounded-full bg-neon/20 border border-neon/30" />
                  </div>
                </div>
              </div>

              {/* Animated Vertical Laser Scan Beam */}
              <motion.div
                animate={{
                  top: ["8%", "90%", "8%"],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.2,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon to-transparent shadow-[0_0_16px_var(--neon)]"
              >
                <div className="absolute left-1/2 -top-1 -translate-x-1/2 h-2.5 w-16 rounded-full bg-neon/50 blur-sm" />
              </motion.div>

              {/* Floating Orbiting Chip: Keyword Match */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -top-3.5 -right-3 sm:-right-6 flex items-center gap-1.5 rounded-xl border border-neon/40 bg-card/95 px-3 py-1.5 text-xs font-semibold shadow-soft backdrop-blur-md"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-neon" />
                <span className="text-[11px]">Keywords</span>
                <span className="rounded bg-neon/25 px-1.5 py-0.2 text-[10px] font-mono font-bold text-neon">
                  98%
                </span>
              </motion.div>

              {/* Floating Orbiting Chip: Action Verbs */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.3 }}
                className="absolute -bottom-3.5 -left-3 sm:-left-6 flex items-center gap-1.5 rounded-xl border border-border/80 bg-card/95 px-3 py-1.5 text-xs font-semibold shadow-soft backdrop-blur-md"
              >
                <Wand2 className="h-3.5 w-3.5 text-neon" />
                <span className="text-[11px]">Action Verbs</span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* Heading and Subtitle */}
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            We're Building <span className="text-neon">Something Smart!</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Our AI-powered ATS Resume Checker is currently under development. We're working to make
            your resume stand out.
          </p>

          {/* Progress / Pipeline Status Bar */}
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border/70 bg-background/50 p-4 text-left">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-neon" /> Calibration Progress
              </span>
              <span className="font-mono font-bold text-neon">82% completed</span>
            </div>
            {/* Visual Progress Bar */}
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-muted/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "82%" }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-neon/70 via-neon to-neon shadow-[0_0_12px_var(--neon)]"
              />
            </div>
            {/* Feature Milestones */}
            <div className="mt-3.5 grid grid-cols-3 gap-2 text-center text-[11px] text-muted-foreground">
              <div className="flex items-center justify-center gap-1 rounded-lg bg-card/50 py-1 px-1.5">
                <Search className="h-3 w-3 text-neon" />
                <span className="truncate">Keyword Match</span>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-lg bg-card/50 py-1 px-1.5">
                <Layers className="h-3 w-3 text-neon" />
                <span className="truncate">Layout Parser</span>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-lg bg-card/50 py-1 px-1.5">
                <Wand2 className="h-3 w-3 text-neon" />
                <span className="truncate">AI Enhancer</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/builder"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-neon px-6 py-3.5 text-sm font-bold text-neon-foreground shadow-glow hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Build a Resume Instead
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
