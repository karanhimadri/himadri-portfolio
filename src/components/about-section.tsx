"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
	User,
	Code,
	Target,
	Rocket,
	Brain,
	Layers,
	Shield,
	Sparkles,
	Workflow,
	Globe2
} from "lucide-react"

type Pillar = {
	icon: React.ReactNode
	title: string
	body: string
}

const PILLARS: Pillar[] = [
	{
		icon: <Brain className="h-5 w-5 text-primary" />,
		title: "Systems Thinking",
		body: "I zoom out to model flows, constraints & feedback loops before writing code. Architecture serves outcomes, not the other way around."
	},
	{
		icon: <Layers className="h-5 w-5 text-primary" />,
		title: "Composable Design",
		body: "Build primitives → compose capabilities. Clean boundaries let teams iterate fast without entropy."
	},
	{
		icon: <Shield className="h-5 w-5 text-primary" />,
		title: "Reliability & Trust",
		body: "Secure by default, observable by design. Instrument everything & surface the signals that matter."
	},
	{
		icon: <Sparkles className="h-5 w-5 text-primary" />,
		title: "Human‑Centered UX",
		body: "Delight emerges from micro‑interactions + performance + clarity. Motion & AI responsibly amplifying user intent."
	}
]

type TimelineItem = {
	year: string
	heading: string
	detail: string
	icon: React.ReactNode
}

const TIMELINE: TimelineItem[] = [
	{
		year: "2021",
		heading: "Foundational Engineering",
		detail: "Deepened core in TypeScript + backend fundamentals; shipped internal tooling that reduced build times ~30%.",
		icon: <Code className="h-4 w-4" />
	},
	{
		year: "2022",
		heading: "Full‑Stack Product Impact",
		detail: "Led end‑to‑end feature verticals (design → prod) with resilient API design & edge delivery.",
		icon: <Workflow className="h-4 w-4" />
	},
	{
		year: "2023",
		heading: "AI Enablement",
		detail: "Built RAG & LLM augmentation pipelines; production vector indexing & evaluation loops.",
		icon: <Brain className="h-4 w-4" />
	},
	{
		year: "2024",
		heading: "Platform & Scale",
		detail: "Architected modular services, improved latency & resilience; codified DX automation scripts.",
		icon: <Rocket className="h-4 w-4" />
	},
	{
		year: "2025",
		heading: "Global Reach & AI UX",
		detail: "Optimizing real‑time AI assisted flows + multilingual experiences with edge inference orchestration.",
		icon: <Globe2 className="h-4 w-4" />
	}
]

const metrics = [
	{ label: "Prod Features", value: 120, suffix: "+" },
	{ label: "LLM Pipelines", value: 15, suffix: "+" },
	{ label: "Perf Gains", value: 40, suffix: "%" },
	{ label: "Teams Enabled", value: 6, suffix: "+" }
]

function MetricCard({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/60 px-5 py-4 backdrop-blur supports-[backdrop-filter]:bg-card/40"
		>
			<div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-primary/0 to-primary/10" />
			<div className="relative flex flex-col">
				<span className="text-3xl font-semibold tracking-tight text-foreground">
					{value}
					<span className="text-primary/80">{suffix}</span>
				</span>
				<span className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
					{label}
				</span>
			</div>
		</motion.div>
	)
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.55, delay: index * 0.05 }}
			className="group relative rounded-xl border border-border/60 bg-gradient-to-br from-background/80 via-background/60 to-background/50 p-5 backdrop-blur-md"
		>
			<div className="mb-3 flex items-center gap-3">
				<div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-card/70 text-primary shadow-inner">
					{pillar.icon}
				</div>
				<h3 className="text-sm font-semibold tracking-tight">{pillar.title}</h3>
			</div>
			<p className="text-xs leading-relaxed text-muted-foreground/80">{pillar.body}</p>
			<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
			<div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity group-hover:opacity-100 [background:radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.25),transparent_65%)]" />
		</motion.div>
	)
}

function TimelineTrack() {
	return (
		<div className="relative mt-16">
			<div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />
			<ul className="space-y-10 pl-10">
				{TIMELINE.map((item, i) => (
					<motion.li
						key={item.year}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.55, delay: i * 0.05 }}
						className="relative"
					>
						<div className="absolute -left-[46px] flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-background text-primary shadow-sm">
							{item.icon}
						</div>
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-3">
								<span className="text-xs font-semibold tracking-wide text-primary/80">
									{item.year}
								</span>
								<h4 className="text-sm font-medium tracking-tight text-foreground">
									{item.heading}
								</h4>
							</div>
							<p className="text-xs leading-relaxed text-muted-foreground/80">
								{item.detail}
							</p>
						</div>
					</motion.li>
				))}
			</ul>
		</div>
	)
}

export function AboutSection() {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	return (
		<section id="about" className="relative scroll-mt-20 py-32">
			{/* Background layers */}
			<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute inset-0 bg-grid-small/[0.04] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,hsl(var(--primary)/0.18),transparent_70%)]" />
			</div>
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mx-auto mb-20 flex max-w-3xl flex-col items-center text-center"
				>
					<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground backdrop-blur">
						<User className="h-3.5 w-3.5 text-primary" />
						<span>About</span>
						<Target className="h-3.5 w-3.5 text-primary" />
					</div>
					<h2 className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
						Crafting resilient systems & intelligent product experiences
					</h2>
					<p className="mt-6 max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
						I engineer <span className="text-foreground">product velocity</span> and
						<span className="text-foreground"> durable foundations</span>. Blending full‑stack depth, applied AI, and a strong sense of UX tactility—so teams ship faster without trading away quality.
					</p>
				</motion.div>

				<div className="grid gap-14 lg:grid-cols-5">
					{/* Avatar / Visual */}
					<div className="relative order-2 flex justify-center lg:order-1 lg:col-span-2">
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="group relative"
						>
							<div className="absolute inset-0 -z-10 animate-pulse rounded-[2rem] bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-2xl" />
							<Card className="relative overflow-hidden rounded-2xl border-border/70 bg-card/70 p-6 backdrop-blur supports-[backdrop-filter]:bg-card/50">
								<div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-xl">
									<Avatar className="h-60 w-60 border border-border/50 shadow-inner">
										<AvatarImage src="https://github.com/himadrikaran.png" alt="@himadrikaran" />
										<AvatarFallback>HK</AvatarFallback>
									</Avatar>
									<motion.div
										initial={{ rotate: 0 }}
										animate={mounted ? { rotate: 360 } : {}}
										transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
										className="pointer-events-none absolute -inset-4 rounded-2xl border border-primary/30"
										style={{ maskImage: "radial-gradient(circle at 50% 50%, black 55%, transparent 60%)" }}
									/>
								</div>
								<div className="mt-8 grid grid-cols-2 gap-4">
									{metrics.map((m) => (
										<MetricCard key={m.label} value={m.value} label={m.label} suffix={m.suffix} />
									))}
								</div>
							</Card>
						</motion.div>
					</div>

					{/* Narrative + Pillars + Timeline */}
					<div className="order-1 flex flex-col gap-12 lg:order-2 lg:col-span-3">
						<div className="grid gap-6 md:grid-cols-2">
							{PILLARS.map((p, i) => (
								<PillarCard key={p.title} pillar={p} index={i} />
							))}
						</div>
						<Card className="relative overflow-hidden border-border/70 bg-card/70 p-8 backdrop-blur supports-[backdrop-filter]:bg-card/50">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.15),transparent_65%)]" />
							<div className="relative flex flex-col gap-6">
								<div className="flex flex-wrap items-center gap-3">
									<div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-primary">
										<Rocket className="h-3.5 w-3.5" />
										<span>Trajectory</span>
									</div>
									<div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[10px] font-medium tracking-wide text-muted-foreground">
										<Code className="h-3.5 w-3.5" />
										<span>Evolution</span>
									</div>
								</div>
								<p className="text-sm leading-relaxed text-muted-foreground">
									Each year I intentionally layer new depth—whether platform scaling, developer experience optimization, or applied AI. I value shipping <span className="text-foreground">measurable impact</span> and cultivating healthy engineering cultures where quality & speed reinforce each other.
								</p>
								<TimelineTrack />
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	)
}
