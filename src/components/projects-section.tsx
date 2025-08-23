"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Github, ExternalLink, Sparkles } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react"

type Project = {
  id: number
  title: string
  description: string
  tech: string[]
  github: string
  live: string
  featured?: boolean
  highlight?: string
  media?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Full Stack RAG Assistant – LLM Powered Chatbot",
    description: "Full-stack Retrieval-Augmented Generation chatbot featuring user credit tracking via Redis, domain-specific context retrieval, Cohere embeddings, and Gemini LLM responses. Optimized for faster semantic search and adaptive context handling.",
    tech: ["Next.js", "FastAPI", "Redis", "Pinecone", "Cohere", "Google Gemini", "Supabase", "LangChain"],
    github: "https://github.com/karanhimadri/RAG-Based-ChatBot.git",
    live: "https://rag-chatbot-demo.vercel.app",
    featured: true,
    highlight: "12K+ docs indexed • ~6s avg response • <50ms vector lookup",
    media: "/images/chat_inerfacd.png"
  },
  {
    id: 2,
    title: "Prescripto – Full-Stack Healthcare Platform",
    description: "Designed a role-based backend (doctor/patient/admin) with appointment scheduling, file uploads, and Razorpay payments. Deployed via Docker Compose on Render.",
    tech: ["React.js", "Spring Boot", "MySQL", "Razorpay", "Docker", "Render", "Tailwind CSS"],
    github: "https://github.com/himadrikaran/ecommerce-platform",
    live: "https://ecommerce-demo.vercel.app",
  },
  {
    id: 3,
    title: "MERN Authentication Microservice",
    description: "Developed secure authentication flows with JWT, HTTP-only cookies, and OTP email verification. Dockerized and deployed with environment-specific configs and CORS handling.",
    tech: ["Express.js", "MongoDB", "Bravo SMTP", "HTTPS-Cookies", "Docker"],
    github: "https://github.com/himadrikaran/ai-document-processor",
    live: "https://ai-doc-processor.herokuapp.com",
  },
  {
    id: 4,
    title: "Stock Price Predictor",
    description: "A machine learning project that predicts stock closing prices using historical data and Linear Regression models.",
    tech: ["Python", "Pandas", "Scikit-Learn", "Numpy", "Matplotlib", "yfinance"],
    github: "https://github.com/himadrikaran",
    live: "https://example.com",
  }
]

const GradientRing = () => (
  <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 blur-xl" />
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/40 via-primary to-primary/40 [mask:linear-gradient(#000,transparent_70%)]" />
  </div>
)

function useCardTilt() {
  const [mounted, setMounted] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionTemplate`${y.get() / 15}deg`
  const rotateY = useMotionTemplate`${x.get() / -15}deg`

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!mounted) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    x.set((px - 0.5) * 20)
    y.set((py - 0.5) * 20)
  }, [x, y, mounted])

  const handleLeave = useCallback(() => {
    if (!mounted) return
    x.set(0); y.set(0)
  }, [x, y, mounted])

  return { x, y, rotateX, rotateY, handleMove, handleLeave, mounted }
}

const FeaturedCard = ({ project }: { project: Project }) => {
  const { rotateX, rotateY, handleMove, handleLeave, mounted } = useCardTilt()
  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: mounted ? rotateX : "0deg",
        rotateY: mounted ? rotateY : "0deg"
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <GradientRing />
      <div className="relative rounded-2xl border bg-card/60 backdrop-blur-xl p-8 overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_60%)]" />
        <div className="relative z-10 grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {project.title}
              </h3>
            </div>
            {project.highlight && (
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-primary bg-primary/5 w-fit">
                {project.highlight}
              </div>
            )}
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium tracking-wide text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <Button asChild size="sm" className="group/cta">
                <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
                  Live Demo
                  <ExternalLink className="ml-1 h-4 w-4 group-hover/cta:translate-x-0.5 transition-transform" />
                </a>
              </Button>
              <Button asChild size="sm" variant="secondary" className="group/gh">
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}>
                  <Github className="mr-1 h-4 w-4 group-hover/gh:rotate-12 transition-transform" />
                  Code
                </a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl border bg-gradient-to-br from-primary/10 via-transparent to-primary/5 flex items-center justify-center overflow-hidden">
            {/* Media placeholder replaced with image */}
            <img
              src={project.media}
              alt="Portfolio Preview"
              className="absolute inset-0 h-full w-full object-contain bg-black" // bg-black optional for empty space
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--primary)/0.15),transparent_40%,hsl(var(--primary)/0.15))] opacity-40 animate-pulse" />
            <span className="relative z-10 text-[10px] uppercase tracking-widest text-muted-foreground">Preview</span>
          </div>
        </div>
        {/* subtle bottom gradient edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
    </motion.div>
  )
}

const CompactCard = ({ project, index }: { project: Project; index: number }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 30 } : false}
      whileInView={mounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Card className="relative h-full overflow-hidden rounded-xl border bg-card/70 backdrop-blur-xl">
        <CardContent className="pt-5 px-5 pb-4 flex flex-col gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold tracking-tight text-sm line-clamp-2 group-hover:text-primary transition-colors">{project.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map(t => (
              <span key={t} className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">{t}</span>
            ))}
            {project.tech.length > 5 && (
              <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">+{project.tech.length - 5}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="px-5 pb-4 pt-0 flex gap-3">
          <Button asChild size="sm" variant="secondary" className="h-7 px-2 text-[11px]">
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} repository`}>
              <Github className="mr-1 h-3 w-3" /> Code
            </a>
          </Button>
          <Button asChild size="sm" className="h-7 px-2 text-[11px]">
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
              Demo <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [mounted, setMounted] = useState(false)
  const featured = projects.find(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="projects" className="relative py-28">
      {/* background aesthetics */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur">
            {mounted && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
            )}
            Latest Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            <span className="bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent">Featured Projects</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-sm md:text-base leading-relaxed">
            Systems & products engineered with a focus on performance, resilience and elegant developer experience.
          </p>
        </motion.div>

        {featured && (
          <div className="mb-16">
            <FeaturedCard project={featured} />
          </div>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <CompactCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
