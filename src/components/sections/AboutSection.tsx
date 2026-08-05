import { MotionWrapper } from '@/components/shared/MotionWrapper'
import { CheckCircle2 } from 'lucide-react'

export function AboutSection() {
  return (
<section id="sobre-mi" className="py-24 lg:py-32 bg-transparent text-white border-t border-zinc-900">      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Texto */}
        <MotionWrapper delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Tu socio estratégico en el mundo digital y académico
          </h2>
          <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
            No solo ofrezco servicios; ofrezco soluciones integrales. Combino la lógica estructural de las matemáticas con la creatividad del diseño audiovisual y la precisión del desarrollo Full-Stack.
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-400 mt-1 flex-shrink-0" />
              <span className="text-zinc-300"><strong className="text-white">Experiencia Comprobada:</strong> Años resolviendo problemas técnicos y académicos complejos.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-400 mt-1 flex-shrink-0" />
              <span className="text-zinc-300"><strong className="text-white">Metodología Clara:</strong> Desde el análisis hasta la implementación, paso a paso.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-400 mt-1 flex-shrink-0" />
              <span className="text-zinc-300"><strong className="text-white">Soporte Continuo:</strong> No te dejo solo tras entregar el proyecto o la clase.</span>
            </li>
          </ul>
        </MotionWrapper>

        {/* Tarjeta visual de estadísticas */}
        <MotionWrapper delay={0.3}>
          <div className="relative bg-gradient-to-br from-indigo-600/20 to-cyan-500/10 border border-zinc-800 rounded-2xl p-8 min-h-[300px] flex flex-col justify-center backdrop-blur-sm">
            <div className="relative z-10 text-center">
              <h3 className="text-5xl font-bold text-indigo-400 mb-2">100%</h3>
              <p className="text-lg text-zinc-300 mb-8">Compromiso con tu éxito</p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><div className="text-2xl font-bold text-white">Web</div><div className="text-xs text-zinc-500">Desarrollo</div></div>
                <div><div className="text-2xl font-bold text-white">Math</div><div className="text-xs text-zinc-500">Académico</div></div>
                <div><div className="text-2xl font-bold text-white">IT</div><div className="text-xs text-zinc-500">Soporte</div></div>
              </div>
            </div>
          </div>
        </MotionWrapper>

      </div>
    </section>
  )
}