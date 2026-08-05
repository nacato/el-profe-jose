import { Button } from '@/components/ui/button'
import { MotionWrapper } from '@/components/shared/MotionWrapper'
import { LiquidBackground } from '@/components/shared/LiquidBackground'
import { GraduationCap, Code2, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] text-white px-4 py-20 sm:px-6 lg:py-24">
      
      {/* Fondo de Radar Galáctico Verde Oscuro */}
      <LiquidBackground />
      
      {/* Contenedor Centrado */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto gap-5 sm:gap-6">
        
        {/* Tu Foto Centrada */}
        <MotionWrapper delay={0.1}>
          <div className="relative mb-2">
            {/* Anillo de luz esmeralda alrededor de la foto */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.4)] group">
              <img 
                src="/profejose.jpg" 
                alt="El Profe José" 
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </MotionWrapper>

        {/* Etiqueta superior */}
        <MotionWrapper delay={0.2}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 bg-black/40 border border-emerald-500/50 rounded-full text-xs sm:text-sm text-emerald-300 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            Soluciones Académicas, Tecnológicas y Digitales
          </div>
        </MotionWrapper>

        {/* Título Principal */}
        <MotionWrapper delay={0.3}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            El Profe José <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-green-400 bg-clip-text text-transparent"></span>
          </h1>
        </MotionWrapper>

        {/* Subtítulo */}
        <MotionWrapper delay={0.4}>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-tight text-zinc-200">
            Innovación y aprendizaje en un solo lugar
          </h2>
        </MotionWrapper>

        {/* Texto descriptivo */}
        <MotionWrapper delay={0.5}>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light px-2">
            Desarrollo plataformas web de alto nivel, diseño contenido audiovisual, doy soporte técnico experto y enseño matemáticas con excelencia.
          </p>
        </MotionWrapper>

        {/* Botones de Acción */}
        <MotionWrapper delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto mt-2 sm:mt-4 mb-8 sm:mb-10">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold group border border-emerald-300 w-full sm:w-auto text-sm sm:text-base shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              <a href="https://wa.me/593979678105?text=Hola%20Profe%20José,%20vi%20tu%20página%20web%20y%20quiero%20consultar%20sobre%20un%20proyecto%20de%20desarrollo." target="_blank" rel="noopener noreferrer">
                Consultar Proyecto Web
                <Code2 className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </a>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="bg-black/40 border-emerald-500/50 text-emerald-300 hover:bg-emerald-950/40 font-semibold group backdrop-blur-md w-full sm:w-auto text-sm sm:text-base">
              <a href="https://wa.me/593979678105?text=Hola%20Profe%20José,%20quiero%20agendar%20una%20clase%20de%20matemáticas." target="_blank" rel="noopener noreferrer">
                <GraduationCap className="mr-2 w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
                Agendar Clase de Matemáticas
              </a>
            </Button>
          </div>
        </MotionWrapper>

        {/* Tecnologías Abajo */}
        <MotionWrapper delay={0.7}>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-8 text-zinc-500 border-t border-zinc-800/50 pt-6 sm:pt-8 w-full max-w-md">
            <span className="text-xs sm:text-sm text-zinc-600">Tecnologías:</span>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-mono font-semibold">
              <span className="hover:text-emerald-400 transition-colors cursor-pointer">React</span>
              <span className="hover:text-teal-400 transition-colors cursor-pointer">TypeScript</span>
              <span className="hover:text-green-400 transition-colors cursor-pointer">Node.js</span>
              <span className="hover:text-lime-400 transition-colors cursor-pointer">Math</span>
            </div>
          </div>
        </MotionWrapper>

      </div>
    </section>
  )
}