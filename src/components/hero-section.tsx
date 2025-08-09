"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

// Shimmer cycle: one role shown at a time with a subtle gradient sweep + progress bar
function RoleShimmerCycle() {
  const roles = [
    "Full‑Stack + AI Developer",
    "Backend Developer",
    "Node.JS Developer",
    "LLMs Intigretion"
  ];
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const period = 2600; // ms per role

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % roles.length);
    }, period);
    return () => clearInterval(id);
  }, [mounted, roles.length]);

  // SSR fallback
  return (
    <div className="relative w-full flex flex-col items-center select-none">
      <style jsx>{`
        @keyframes progressGrow { 
          0% { transform:scaleX(0); }
          100% { transform:scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cycle-bar > div { animation:none !important; transform:scaleX(1) !important; }
        }
      `}</style>
      <div className="relative h-10 flex items-center justify-center">
        <span className="relative text-lg sm:text-xl md:text-2xl font-medium tracking-tight bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent px-4 transition-opacity duration-500"
          style={mounted ? { opacity: 1 } : { opacity: 1 }}
          key={mounted ? index : 'static'}
        >
          {roles[mounted ? index : 0]}
        </span>
      </div>
      <div className="cycle-bar mt-3 h-1 w-40 sm:w-52 md:w-60 bg-border/50 overflow-hidden rounded-full">
        <div
          key={mounted ? index : 'p-static'}
          className="h-full origin-left bg-gradient-to-r from-primary to-cyan-400"
          style={mounted ? { animation: `progressGrow ${period}ms linear` } : undefined}
        />
      </div>
    </div>
  );
}

// Subtle infinite marquee of keyword pills
function KeywordMarquee() {
  const [mounted, setMounted] = useState(false);
  const keywords = [
    "TypeScript",
    "Next.js",
    "Spring Boot",
    "RAG",
    "LLMs",
    "Vector DBs",
    "LangChain",
    "MongoDB",
    "Testing",
    "Realtime Socket.io",
    "System Design",
    "Microservice"
  ];

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // SSR fallback: static grid of keywords
    return (
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {keywords.slice(0, 6).map((k, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-4 py-1 text-xs font-medium text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/40"
          >
            {k}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative mt-12 w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div
        className="flex gap-4 whitespace-nowrap pr-4 will-change-transform"
        style={{
          animation: 'marquee 28s linear infinite'
        }}
      >
        {[...keywords, ...keywords].map((k, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-4 py-1 text-xs font-medium text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/40"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15),transparent_40%)]"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.2),transparent_70%)]"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.15),transparent_70%)]"></div>

      {/* Add global marquee animation */}
      <style jsx global>{`
        @keyframes marquee { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-50%); } 
        }
      `}</style>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : undefined}
          animate={mounted ? { opacity: 1, y: 0 } : undefined}
          transition={mounted ? { duration: 0.8, ease: "easeOut" } : undefined}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-foreground tracking-tighter"
            initial={mounted ? { opacity: 0, y: 20 } : undefined}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={mounted ? { duration: 0.8, delay: 0.1 } : undefined}
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Himadri
            </span>
            <motion.span
              animate={mounted ? { rotate: [0, 14, -8, 14, -4, 10, 0] } : undefined}
              transition={mounted ? {
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
                repeatDelay: 3
              } : undefined}
              className="inline-block origin-bottom-right"
            >
              👋
            </motion.span>
          </motion.h1>

          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : undefined}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={mounted ? { duration: 0.8, delay: 0.2 } : undefined}
            className="mb-10 flex flex-col items-center justify-center"
          >
            {/* Shimmer cycle roles */}
            <RoleShimmerCycle />
          </motion.div>

          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : undefined}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={mounted ? { duration: 0.8, delay: 0.3 } : undefined}
            className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="group">
              <a
                href="/Himadri_Karan_FullStake_AI_Developer_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
                <Download className="ml-2 h-4 w-4 group-hover:animate-bounce" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="group">
              <a href="https://github.com/karanhimadri" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="group">
              <a href="https://linkedin.com/in/himadrikaran" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="group">
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Contact
              </a>
            </Button>
          </motion.div>
          <KeywordMarquee />
        </motion.div>

        <motion.div
          initial={mounted ? { opacity: 0 } : undefined}
          animate={mounted ? { opacity: 1 } : undefined}
          transition={mounted ? { duration: 1, delay: 1 } : undefined}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          {mounted ? (
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          ) : (
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          )}
        </motion.div>
      </div>
    </section>
  )
}
