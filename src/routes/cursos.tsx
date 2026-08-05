import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar'
import { MobileNav } from '@/components/layout/MobileNav'
import { LiquidBackground } from '@/components/shared/LiquidBackground'
import { ExamSimulator } from '@/components/sections/ExamSimulator'

export const Route = createFileRoute('/cursos')({
  component: CursosPage,
})

function CursosPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-black overflow-hidden">
      <LiquidBackground />
      <Navbar />
      
      <div className="flex flex-1 items-start justify-center w-full">
        <ExamSimulator />
      </div>

      <MobileNav />
    </main>
  )
}