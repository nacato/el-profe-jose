import { Home, LayoutGrid, Calculator, Phone } from 'lucide-react'

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4 h-16">
        <a href="/" className="flex flex-col items-center justify-center gap-1 text-emerald-400">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Inicio</span>
        </a>
        <a href="/#servicios" className="flex flex-col items-center justify-center gap-1 text-zinc-400 active:text-emerald-400 active:scale-95 transition-all">
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Servicios</span>
        </a>
        <a href="/simulador" className="flex flex-col items-center justify-center gap-1 text-zinc-400 active:text-emerald-400 active:scale-95 transition-all">
          <Calculator className="w-5 h-5" />
          <span className="text-[10px] font-medium">Simulador U</span>
        </a>
        <a href="/#contacto" className="flex flex-col items-center justify-center gap-1 text-zinc-400 active:text-emerald-400 active:scale-95 transition-all">
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium">Contacto</span>
        </a>
      </div>
    </nav>
  )
}