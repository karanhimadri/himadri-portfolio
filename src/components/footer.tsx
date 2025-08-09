"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, ArrowUpRight, Sparkles, Heart, Terminal } from "lucide-react"
import { motion } from "framer-motion"

const YEAR = new Date().getFullYear()

const SOCIAL = [
  { id: "github", label: "GitHub", href: "https://github.com/himadrikaran", icon: <Github className="h-4 w-4" /> },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/himadrikaran", icon: <Linkedin className="h-4 w-4" /> },
  { id: "email", label: "Email", href: "mailto:himadri.karan01@gmail.com", icon: <Mail className="h-4 w-4" /> }
]

const NAV = [
  {
    heading: "Build",
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "About", href: "#about" }
    ]
  },
  {
    heading: "Engage",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Resume", href: "/resume.pdf", external: true },
      { label: "GitHub", href: "https://github.com/himadrikaran", external: true }
    ]
  },
  {
    heading: "Focus",
    links: [
      { label: "AI Systems", href: "#projects" },
      { label: "Performance", href: "#skills" },
      { label: "Platform", href: "#about" }
    ]
  }
]

function SocialBadge({ s }: { s: (typeof SOCIAL)[number] }) {
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={s.label}
      className="group relative inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition hover:border-primary/50 hover:text-primary"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border/50 bg-card/60 text-primary shadow-inner">
        {s.icon}
      </span>
      <span>{s.label}</span>
      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 transition group-hover:text-primary" />
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100 [background:radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.25),transparent_60%)]" />
    </a>
  )
}

export function Footer() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <footer className="relative mt-14 border-t border-border/60 bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur">
      {/* Background visuals */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-small/[0.035] [mask-image:linear-gradient(to_top,transparent,black_15%,black_85%,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,hsl(var(--primary)/0.15),transparent_65%)]" />
      </div>
      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand / Mission */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[10px] font-semibold tracking-wide text-muted-foreground/80">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                <span>Himadri Karan</span>
              </div>
              <h3 className="mt-5 text-balance text-lg font-semibold tracking-tight text-foreground">
                Engineering resilient, intelligent & performant product systems.
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Bridging full‑stack engineering with applied AI & platform craftsmanship—delivering velocity without sacrificing code quality or user experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <SocialBadge key={s.id} s={s} />
              ))}
            </div>
          </div>
          {/* Navigation columns */}
          <div className="md:col-span-3 grid gap-10 sm:grid-cols-3">
            {NAV.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
                  {col.heading}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.external ? "_blank" : undefined}
                        rel={l.external ? "noopener noreferrer" : undefined}
                        className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80 transition hover:text-primary"
                      >
                        <span>{l.label}</span>
                        {l.external && (
                          <ArrowUpRight className="h-3 w-3 text-muted-foreground/40 transition group-hover:text-primary" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-6 border-t border-border/60 pt-10 md:flex-row md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-[11px] font-medium text-muted-foreground/70 md:text-left"
          >
            © {YEAR} Himadri Karan. Crafted with <Heart className="inline h-3 w-3 text-primary" /> & purposeful iteration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
              <Sparkles className="mr-1 inline h-3 w-3 text-primary" /> Next.js • TypeScript • Tailwind • Framer Motion
            </span>
            {mounted && (
              <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[10px] font-medium tracking-wide text-muted-foreground/70">
                Build {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "local"}
              </span>
            )}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
