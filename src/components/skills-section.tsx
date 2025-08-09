"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code,
  Database,
  Cloud,
  Terminal,
  Bot,
  LayoutTemplate,
  Cpu,
  Gauge,
  Rocket
} from "lucide-react"

type Skill = {
  name: string
  level: number // 0-100 proficiency
  experience?: string // years or note
  highlight?: boolean
  description?: string
}

type SkillCategory = {
  id: string
  label: string
  icon: React.ReactNode
  skills: Skill[]
  blurb: string
  domain: "frontend" | "backend" | "ai" | "devops" | "data" | "tools"
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend Engineering",
    icon: <LayoutTemplate className="h-6 w-6 text-primary" />,
    domain: "frontend",
    blurb: "High-performance interfaces with clean architecture & motion.",
    skills: [
      { name: "React", level: 92, experience: "5y", highlight: true, description: "Hooks, Suspense, concurrent patterns, RSC" },
      { name: "Next.js", level: 90, experience: "4y", highlight: true, description: "App Router, Edge, ISR, Route Handlers" },
      { name: "TypeScript", level: 93, experience: "5y", highlight: true, description: "Type ergonomics, API modeling" },
      { name: "Tailwind", level: 88, experience: "4y" },
      { name: "Framer Motion", level: 86, experience: "3y" },
      { name: "Web Performance", level: 82, experience: "Core Web Vitals" }
    ]
  },
  {
    id: "backend",
    label: "Backend & APIs",
    icon: <Code className="h-6 w-6 text-primary" />,
    domain: "backend",
    blurb: "Robust API surfaces, modular service design, secure & observable.",
    skills: [
      { name: "Node.js", level: 90, experience: "6y", highlight: true },
      { name: "NestJS", level: 84, experience: "3y" },
      { name: "FastAPI", level: 80, experience: "3y" },
      { name: "Go", level: 70, experience: "2y" },
      { name: "GraphQL", level: 78, experience: "2y" },
      { name: "Auth & Security", level: 82, experience: "OWASP" }
    ]
  },
  {
    id: "data",
    label: "Data & Persistence",
    icon: <Database className="h-6 w-6 text-primary" />,
    domain: "data",
    blurb: "Optimized data flows, indexing strategies & caching layers.",
    skills: [
      { name: "PostgreSQL", level: 88, experience: "5y", highlight: true },
      { name: "MongoDB", level: 82, experience: "4y" },
      { name: "Redis", level: 80, experience: "4y" },
      { name: "Vector DB (Pinecone / Chroma)", level: 76, experience: "2y" },
      { name: "Prisma / ORM", level: 84, experience: "4y" }
    ]
  },
  {
    id: "ai",
    label: "AI Engineering",
    icon: <Bot className="h-6 w-6 text-primary" />,
    domain: "ai",
    blurb: "Applied LLM systems, retrieval pipelines, evaluation, safety.",
    skills: [
      { name: "LangChain", level: 80, experience: "2y", highlight: true },
      { name: "RAG Architecture", level: 82, experience: "Prod" },
      { name: "Prompt Engineering", level: 78 },
      { name: "Embedding Strategies", level: 74 },
      { name: "TensorFlow", level: 65 },
      { name: "Evaluation / Metrics", level: 70 }
    ]
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    icon: <Cloud className="h-6 w-6 text-primary" />,
    domain: "devops",
    blurb: "Shipping fast with reliability, observability & scalability.",
    skills: [
      { name: "Docker", level: 88, experience: "5y", highlight: true },
      { name: "Kubernetes", level: 72, experience: "2y" },
      { name: "AWS / GCP", level: 80, experience: "Multi-cloud" },
      { name: "CI/CD", level: 85, experience: "GitHub Actions" },
      { name: "Infra as Code", level: 70, experience: "Terraform" },
      { name: "Observability", level: 74, experience: "Logs / Traces" }
    ]
  },
  {
    id: "tools",
    label: "Tooling & Practices",
    icon: <Terminal className="h-6 w-6 text-primary" />,
    domain: "tools",
    blurb: "Engineering excellence & velocity multipliers.",
    skills: [
      { name: "Git / GitHub", level: 92, experience: "Flow / trunk" },
      { name: "Testing (Jest / Vitest)", level: 82 },
      { name: "Design Systems", level: 80 },
      { name: "Agile Delivery", level: 78 },
      { name: "Architecture", level: 85 },
      { name: "DX Automation", level: 76 }
    ]
  }
]

// Radial gauge using conic-gradient
function GaugePill({ level }: { level: number }) {
  return (
    <div
      className="relative h-6 w-6 shrink-0 rounded-full border border-border/60 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.25),transparent_60%)]"
      aria-label={`Proficiency ${level}%`}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(hsl(var(--primary)) ${level * 3.6}deg, hsl(var(--muted-foreground)/0.15) ${level * 3.6}deg)`
        }}
      />
      <div className="absolute inset-[3px] rounded-full bg-background flex items-center justify-center text-[0.55rem] font-medium tracking-tight">
        {Math.round(level)}
      </div>
    </div>
  )
}

function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group relative flex items-center gap-3 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 backdrop-blur supports-[backdrop-filter]:bg-card/40 hover:border-primary/60 hover:bg-card/80"
    >
      <GaugePill level={skill.level} />
      <div className="flex flex-col leading-tight">
        <span className={`text-xs font-medium tracking-tight ${skill.highlight ? "text-primary" : "text-foreground"}`}>
          {skill.name}
        </span>
        {skill.experience && (
          <span className="text-[10px] text-muted-foreground/70">{skill.experience}</span>
        )}
      </div>
      {skill.description && (
        <div className="pointer-events-none absolute -left-1/2 top-full z-10 mt-2 w-56 origin-top scale-90 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
          <div className="rounded-lg border bg-popover/95 p-3 text-[11px] leading-relaxed shadow-md ring-1 ring-black/5">
            {skill.description}
          </div>
        </div>
      )}
    </motion.div>
  )
}

function CategoryCard({ cat, index }: { cat: SkillCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-background/90 via-background/70 to-background/60 p-6 backdrop-blur supports-[backdrop-filter]:bg-background/40"
    >
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card/70 text-primary shadow-inner">
            {cat.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{cat.label}</h3>
            <p className="text-xs text-muted-foreground/70 max-w-[18rem] leading-snug">
              {cat.blurb}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
          <Cpu className="h-3 w-3" />
          <span>{cat.skills.length} skills</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {cat.skills.map((s) => (
          <SkillBadge key={s.name} skill={s} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.07),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-px rounded-[inherit] ring-1 ring-inset ring-white/5" />
    </motion.div>
  )
}

function MatrixView() {
  // Flatten & sort by level
  const flat = CATEGORIES.flatMap((c) => c.skills.map((s) => ({ ...s, category: c.label })))
  const sorted = flat.sort((a, b) => b.level - a.level).slice(0, 30)
  return (
    <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sorted.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.02 }}
          className="group relative overflow-hidden rounded-lg border border-border/70 bg-card/60 p-4 backdrop-blur-sm hover:border-primary/60"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium tracking-tight text-foreground/90">
              {s.name}
            </span>
            <span className="text-[10px] text-muted-foreground/60">{s.level}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${s.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary/50"
            />
          </div>
          {s.experience && (
            <div className="mt-2 text-[10px] font-medium text-muted-foreground/60">
              {s.experience}
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,transparent,rgba(255,255,255,0.04))] opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.div>
      ))}
    </div>
  )
}

export function SkillsSection() {
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useState<"categories" | "matrix">("categories")
  useEffect(() => setMounted(true), [])

  return (
    <section id="skills" className="relative scroll-mt-20 py-28">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-small/[0.04] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,hsl(var(--primary)/0.15),transparent_60%)]" />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-14 flex flex-col items-center gap-6 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <Gauge className="h-3.5 w-3.5 text-primary" />
            <span>Capability Map</span>
            <Rocket className="h-3.5 w-3.5 text-primary" />
          </div>
          <h2 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Technical Skills
          </h2>
          <p className="max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            A distilled snapshot of the technologies and practices I leverage to architect, ship and scale high‑impact products. Focused depth across core verticals; pragmatic breadth everywhere else.
          </p>
          <div className="flex items-center gap-3 rounded-full border border-border/60 bg-card/60 p-1 text-xs font-medium backdrop-blur">
            <button
              onClick={() => setView("categories")}
              className={`relative rounded-full px-4 py-1 transition-colors ${view === "categories" ? "text-foreground" : "text-muted-foreground"}`}
            >
              {view === "categories" && (
                <motion.span layoutId="skillView" className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/30" />
              )}
              <span className="relative">By Domain</span>
            </button>
            <button
              onClick={() => setView("matrix")}
              className={`relative rounded-full px-4 py-1 transition-colors ${view === "matrix" ? "text-foreground" : "text-muted-foreground"}`}
            >
              {view === "matrix" && (
                <motion.span layoutId="skillView" className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/30" />
              )}
              <span className="relative">Matrix</span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {mounted && view === "categories" && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {CATEGORIES.map((c, i) => (
                <CategoryCard key={c.id} cat={c} index={i} />
              ))}
            </motion.div>
          )}
          {mounted && view === "matrix" && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
            >
              <MatrixView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
