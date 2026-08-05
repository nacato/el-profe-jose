import { Button } from '@/components/ui/button'
import { GraduationCap } from 'lucide-react'

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-emerald-400" />
          <a href="/" className="font-bold text-white hidden sm:block hover:text-emerald-400 transition-colors">
            El Profe José
          </a>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <a href="/#servicios" className="hover:text-emerald-400 transition-colors">Servicios</a>
          <a href="/cursos" className="hover:text-emerald-400 transition-colors">Cursos</a>
          <a href="/#contacto" className="hover:text-emerald-400 transition-colors">Contacto</a>
        </nav>

        <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <a href="https://wa.me/593979678105?text=Hola%20Profe%20José,%20me%20gustaría%20obtener%20más%20información%20sobre%20tus%20servicios." target="_blank" rel="noopener noreferrer">
            Contáctame
          </a>
        </Button>
      </div>
    </header>
  )
}