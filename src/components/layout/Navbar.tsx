import { Button } from '@/components/ui/button'
import { GraduationCap } from 'lucide-react'
import { useLocation } from '@tanstack/react-router'

export function Navbar() {
  const location = useLocation()
  // Si estamos en la página principal, el menú es oscuro. Si no, es blanco.
  const isHome = location.pathname === '/'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isHome ? 'bg-black/40 border-emerald-900/50' : 'bg-white/90 border-slate-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className={`w-6 h-6 ${isHome ? 'text-emerald-400' : 'text-[#002A5C]'}`} />
          <a href="/" className={`font-bold hidden sm:block transition-colors ${
            isHome ? 'text-white hover:text-emerald-400' : 'text-[#002A5C] hover:text-[#001f47]'
          }`}>
            El Profe José
          </a>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="/#servicios" className={`transition-colors ${isHome ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-[#002A5C]'}`}>Servicios</a>
          <a href="/cursos" className={`transition-colors ${isHome ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-[#002A5C]'}`}>Cursos</a>
          <a href="/simulador" className={`transition-colors ${isHome ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-[#002A5C]'}`}>Simulador Universidades</a>
          <a href="/#contacto" className={`transition-colors ${isHome ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-[#002A5C]'}`}>Contacto</a>
        </nav>

        <Button asChild size="sm" className={`font-bold shadow-sm ${
          isHome ? 'bg-emerald-500 hover:bg-emerald-400 text-black' : 'bg-[#002A5C] hover:bg-[#001f47] text-white'
        }`}>
          <a href="https://wa.me/593979678105?text=Hola%20Profe%20José,%20me%20gustaría%20obtener%20más%20información%20sobre%20tus%20servicios." target="_blank" rel="noopener noreferrer">
            Contáctame
          </a>
        </Button>
      </div>
    </header>
  )
}