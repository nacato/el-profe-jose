import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar'
import { MobileNav } from '@/components/layout/MobileNav'
import { LiquidBackground } from '@/components/shared/LiquidBackground'
import { UniversitySelector } from '@/components/sections/UniversitySelector'
import { ExamSimulator } from '@/components/sections/ExamSimulator'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/simulador')({
  component: SimulatorPage,
})

function SimulatorPage() {
  // Aquí guardamos qué universidad eligió el alumno
  const [selectedUni, setSelectedUni] = useState<string | null>(null)

  return (
    <main className="relative flex min-h-screen flex-col bg-black overflow-hidden">
      <LiquidBackground />
      <Navbar />
      
      <div className="flex flex-1 items-start justify-center w-full pt-10">
        {!selectedUni ? (
          // Si no ha elegido, mostramos las tarjetas
          <UniversitySelector onSelect={(uni) => setSelectedUni(uni)} />
        ) : (
          // Si ya eligió, mostramos el examen y un botón para volver
          <div className="w-full max-w-4xl mx-auto px-6 py-12">
            <Button 
              variant="outline" 
              onClick={() => setSelectedUni(null)} 
              className="mb-8 bg-transparent border-zinc-700 text-white hover:bg-zinc-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Universidades
            </Button>
            <ExamSimulator uniName={selectedUni} />
          </div>
        )}
      </div>

      <MobileNav />
    </main>
  )
}