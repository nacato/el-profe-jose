import { MotionWrapper } from '@/components/shared/MotionWrapper'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function ContactSection() {
  return (
<section id="contacto" className="py-24 lg:py-32 bg-transparent text-white border-t border-zinc-900">      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <MotionWrapper delay={0.1} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Hablemos de tu proyecto o clase
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Estoy disponible para resolver tus dudas. Elige el medio que más te guste:
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          
          {/* Tarjeta de WhatsApp */}
          <MotionWrapper delay={0.2}>
            <a href="https://wa.me/593979678105?text=Hola%20Profe%20José,%20vi%20tu%20página%20web." target="_blank" rel="noopener noreferrer" className="block h-full">
              <Card className="h-full bg-zinc-900 border-zinc-800 hover:border-green-500 hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <MessageCircle className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
                  <p className="text-zinc-400 text-sm mb-3">Respuesta inmediata</p>
                  <span className="text-green-400 font-mono text-sm">0979678105</span>
                </CardContent>
              </Card>
            </a>
          </MotionWrapper>

          {/* Tarjeta de Teléfono (Llamada directa) */}
          <MotionWrapper delay={0.3}>
            <a href="tel:+593979678105" className="block h-full">
              <Card className="h-full bg-zinc-900 border-zinc-800 hover:border-indigo-500 hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Phone className="w-7 h-7 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Llamada Directa</h3>
                  <p className="text-zinc-400 text-sm mb-3">Agenda una llamada</p>
                  <span className="text-indigo-400 font-mono text-sm">0979678105</span>
                </CardContent>
              </Card>
            </a>
          </MotionWrapper>

          {/* Tarjeta de Correo Electrónico */}
          <MotionWrapper delay={0.4}>
            <a href="mailto:michaobilux@gmail.com" className="block h-full">
              <Card className="h-full bg-zinc-900 border-zinc-800 hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                    <Mail className="w-7 h-7 text-cyan-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Correo</h3>
                  <p className="text-zinc-400 text-sm mb-3">Para propuestas largas</p>
                  <span className="text-cyan-400 font-mono text-sm break-all">michaobilux@gmail.com</span>
                </CardContent>
              </Card>
            </a>
          </MotionWrapper>

        </div>
      </div>
    </section>
  )
}