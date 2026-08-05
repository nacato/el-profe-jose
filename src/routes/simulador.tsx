import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar'
import { MobileNav } from '@/components/layout/MobileNav'
import { LiquidBackground } from '@/components/shared/LiquidBackground'
import { Button } from '@/components/ui/button'
import { Wrench, ArrowLeft } from 'lucide-react'
import { MotionWrapper } from '@/components/shared/MotionWrapper'

export const Route = createFileRoute('/simulador')({
  component: SimulatorPage,
})

function SimulatorPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-black overflow-hidden">
      <LiquidBackground />
      <Navbar />
      
      <div className="flex flex-1 items-center justify-center px-6 py-24">
        <MotionWrapper delay={0.2} className="relative z-10 text-center max-w-xl bg-zinc-900/50 border border-emerald-500/30 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
            <Wrench className="w-8 h-8 text-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Estamos en <span className="text-emerald-400">Construcción</span> 🚧
          </h1>
          <p className="text-zinc-400 mb-8 text-lg">
            El Simulador de Universidades (EPN) está siendo pulido con tecnología de punta para darte la mejor experiencia. ¡Vuelve muy pronto!
          </p>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
            <a href="/">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Volver al Inicio
            </a>
          </Button>
        </MotionWrapper>
      </div>

      <MobileNav />
    </main>
  )
}