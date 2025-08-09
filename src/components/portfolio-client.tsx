"use client"

import { Header } from "./header"
import { HeroSection } from "./hero-section"
import { ProjectsSection } from "./projects-section"
import { SkillsSection } from "./skills-section"
import { AboutSection } from "./about-section"
import { ContactSection } from "./contact-section"
import { Footer } from "./footer"

export default function PortfolioClient() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
