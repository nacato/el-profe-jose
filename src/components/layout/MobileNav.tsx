import { Home, LayoutGrid, Calculator, Phone } from 'lucide-react'

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-4 h-16">
        <a href="/" className="flex flex-col items-center justify-center gap-1 text-[#002A5C]">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Inicio</span>
        </a>
        <a href="/#servicios" className="flex flex-col items-center justify-center gap-1 text-slate-500 active:text-[#002A5C] active:scale-95 transition-all">
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Servicios</span>
        </a>
        <a href="/simulador" className="flex flex-col items-center justify-center gap-1 text-slate-500 active:text-[#002A5C] active:scale-95 transition-all">
          <Calculator className="w-5 h-5" />
          <span className="text-[10px] font-medium">Sim. App</span>
        </a>
        <a href="/#contacto" className="flex flex-col items-center justify-center gap-1 text-slate-500 active:text-[#002A5C] active:scale-95 transition-all">
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium">Contacto</span>
        </a>
      </div>
    </nav>
  )
}