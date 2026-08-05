import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { MotionWrapper } from '@/components/shared/MotionWrapper'
import { Code2, Video, Wrench, GraduationCap } from 'lucide-react'
import { ServiceCardProps } from '@/types'

const services: ServiceCardProps[] = [
  {
    title: "Desarrollo Web",
    description: "Plataformas a medida, E-commerce y aplicaciones.",
    icon: Code2,
    features: ["Front-end UI/UX", "Back-end y Bases de datos", "SEO y Velocidad"]
  },
  {
    title: "Diseño y Publicidad",
    description: "Contenido audiovisual que capta la atención y vende.",
    icon: Video,
    features: ["Videos para Reels/TikTok", "Diseño de Afiches", "Identidad de marca"]
  },
  {
    title: "Soporte Técnico IT",
    description: "Mantenimiento preventivo y correctivo de equipos.",
    icon: Wrench,
    features: ["Optimización de sistemas", "Configuración de redes", "Soporte remoto"]
  },
  {
    title: "Soluciones Académicas",
    description: "Clases de matemáticas y nivelación escolar.",
    icon: GraduationCap,
    features: ["Clases particulares", "Nivelación escolar", "Tareas dirigidas"]
  }
]

export function ServicesSection() {
  return (
  <section id="servicios" className="relative py-24 lg:py-32 pb-32 md:pb-32 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <MotionWrapper delay={0.1} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Soluciones a Medida para Cada Necesidad
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Combino la lógica estructural de las matemáticas con la creatividad del diseño y el desarrollo Full-Stack.
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <MotionWrapper key={service.title} delay={0.2 + index * 0.1}>
                <Card className="h-full bg-zinc-900 border-zinc-800 hover:border-indigo-600 hover:-translate-y-2 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                    <CardDescription className="text-zinc-400">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-sm text-zinc-300 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </MotionWrapper>
            )
          })}
        </div>

      </div>
    </section>
  )
}