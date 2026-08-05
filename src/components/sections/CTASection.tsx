import { Button } from '@/components/ui/button'
import { MotionWrapper } from '@/components/shared/MotionWrapper'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
<section className="py-24 lg:py-32 bg-transparent text-white">      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <MotionWrapper delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                ¿Listo para empezar tu próximo proyecto o mejorar tus notas?
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
                Escríbeme al WhatsApp o mándame un correo. Te responderé en menos de 24 horas. Hagamos que tu negocio crezca o que apruebes ese examen.
              </p>
              
              {/* Botón de WhatsApp */}
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold group">
                <a href="https://wa.me/593979678105?text=Hola%20Profe%20José,%20quiero%20más%20información%20sobre%20tus%20servicios." target="_blank" rel="noopener noreferrer">
                  Contáctame por WhatsApp
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              {/* Texto con el correo alternativo */}
              <p className="text-xs text-zinc-500 mt-6">
                O si prefieres, escríbeme a: <a href="mailto:michaobilux@gmail.com" className="text-indigo-400 hover:underline">michaobilux@gmail.com</a>
              </p>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}