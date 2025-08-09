"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  Send,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react"

type Channel = {
  id: string
  label: string
  value: string
  href: string
  icon: React.ReactNode
  accent?: string
  description?: string
}

const CHANNELS: Channel[] = [
  {
    id: "email",
    label: "Email",
    value: "himadrikaran516@gmail.com",
    href: "mailto:himadrikaran516@gmail.com",
    icon: <Mail className="h-4 w-4" />,
    description: "Best for detailed collaboration inquiries"
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/himadrikaran",
    href: "https://github.com/karanhimadri",
    icon: <Github className="h-4 w-4" />,
    description: "Open-source & code footprint"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/himadrikaran",
    href: "https://linkedin.com/in/himadrikaran",
    icon: <Linkedin className="h-4 w-4" />,
    description: "Professional network & career updates"
  }
]

function ChannelRow({ c, onCopy, copied }: { c: Channel; onCopy: (v: string) => void; copied: boolean }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-start gap-4 rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur supports-[backdrop-filter]:bg-card/40 hover:border-primary/60"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/70 text-primary shadow-inner">
        {c.icon}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium tracking-tight text-foreground">{c.label}</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50 transition group-hover:text-primary" />
        </div>
        <span className="truncate text-xs font-mono text-primary/80">{c.value}</span>
        {c.description && (
          <span className="mt-1 text-[10px] text-muted-foreground/70">{c.description}</span>
        )}
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          onCopy(c.value)
        }}
        aria-label="Copy"
        className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-background/70 text-muted-foreground/70 transition hover:text-primary"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100 [background:radial-gradient(circle_at_25%_20%,hsl(var(--primary)/0.25),transparent_60%)]" />
    </motion.a>
  )
}

type FormState = "idle" | "sending" | "sent" | "error"

export function ContactSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [formState, setFormState] = useState<FormState>("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const disabled = formState === "sending"

  function copy(value: string) {
    navigator?.clipboard?.writeText(value).then(() => {
      setCopiedId(value)
      setTimeout(() => setCopiedId(null), 1800)
    })
  }

  function validate(): boolean {
    return name.trim().length >= 2 && /.+@.+\..+/.test(email) && message.trim().length > 10
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      setFormState("error")
      setTimeout(() => setFormState("idle"), 2500)
      return
    }
    setFormState("sending")
    await new Promise((r) => setTimeout(r, 1400))
    setFormState("sent")
    setTimeout(() => {
      setFormState("idle")
      setName("")
      setEmail("")
      setMessage("")
    }, 3500)
  }

  return (
    <section id="contact" className="relative scroll-mt-20 py-20">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-small/[0.04] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--primary)/0.18),transparent_70%)]" />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-20 flex max-w-3xl flex-col items-center text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground backdrop-blur">
            <Mail className="h-3.5 w-3.5 text-primary" />
            <span>Connect</span>
            <Send className="h-3.5 w-3.5 text-primary" />
          </div>
          <h2 className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Let&apos;s build something meaningful
          </h2>
          <p className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            Open to impactful product engineering, AI integration, platform acceleration and high‑leverage collaboration. Fast, thoughtful responses.
          </p>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-5">
          {/* Channels & meta */}
          <div className="order-2 flex flex-col gap-10 lg:order-1 lg:col-span-2">
            <Card className="relative overflow-hidden border-border/70 bg-card/70 p-6 backdrop-blur supports-[backdrop-filter]:bg-card/40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--primary)/0.18),transparent_65%)]" />
              <div className="relative mb-6 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight">Direct Channels</h3>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-primary">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>Reach</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {CHANNELS.map((c) => (
                  <ChannelRow key={c.id} c={c} onCopy={copy} copied={copiedId === c.value} />
                ))}
              </div>
            </Card>
          </div>

          {/* Form */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <Card className="relative overflow-hidden border-border/70 bg-card/70 p-8 backdrop-blur supports-[backdrop-filter]:bg-card/40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.15),transparent_65%)]" />
              <div className="relative mb-8 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight">Start a Conversation</h3>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[10px] font-medium tracking-widest text-muted-foreground/80">
                  <Send className="h-3.5 w-3.5" />
                  <span>Message</span>
                </div>
              </div>
              <form onSubmit={onSubmit} className="relative space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 rounded-lg border-border/60 bg-background/70 backdrop-blur"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 rounded-lg border-border/60 bg-background/70 backdrop-blur"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Briefly describe what you&apos;d like to build or discuss..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-lg border-border/60 bg-background/70 backdrop-blur"
                  />
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-12">
                  <div className="text-[10px] text-muted-foreground/70">
                    I will never share your information. Responses typically within 24h.
                  </div>
                  <motion.div whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Button
                      type="submit"
                      disabled={disabled}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-primary via-primary/80 to-primary/60 px-8 py-5 text-sm font-semibold tracking-wide text-primary-foreground shadow disabled:from-muted disabled:to-muted"
                    >
                      <AnimatePresence initial={false} mode="wait">
                        {formState === "idle" && (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2"
                          >
                            <Send className="h-4 w-4" />
                            Send Message
                          </motion.span>
                        )}
                        {formState === "sending" && (
                          <motion.span
                            key="sending"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2"
                          >
                            <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                            Sending...
                          </motion.span>
                        )}
                        {formState === "sent" && (
                          <motion.span
                            key="sent"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2"
                          >
                            <Check className="h-4 w-4" />
                            Sent — thank you!
                          </motion.span>
                        )}
                        {formState === "error" && (
                          <motion.span
                            key="error"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2"
                          >
                            <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                            Please complete all fields
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 [background:radial-gradient(circle_at_30%_20%,hsl(var(--primary-foreground)/0.25),transparent_60%)]" />
                    </Button>
                  </motion.div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
