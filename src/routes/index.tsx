import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { CTASection } from '@/components/sections/CTASection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/layout/Footer'
import { MobileNav } from '@/components/layout/MobileNav'
import { FloatingSocials } from '@/components/layout/FloatingSocials'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-zinc-950">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <MobileNav />
      <FloatingSocials />
    </main>
  )
}