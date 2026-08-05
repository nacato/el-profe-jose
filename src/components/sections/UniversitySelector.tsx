import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, ArrowRight } from 'lucide-react'

// Definimos qué universidades tendremos
const universities = [
  { id: 'epn', name: 'EPN', fullName: 'Escuela Politécnica Nacional', color: 'hover:border-blue-500' },
  { id: 'espe', name: 'ESPE', fullName: 'Escuela Politécnica del Ejército', color: 'hover:border-red-500' },
  { id: 'uce', name: 'UCE', fullName: 'Universidad Central del Ecuador', color: 'hover:border-emerald-500' }
]

// Esta función recibe la orden de abrir el examen cuando alguien hace clic
export function UniversitySelector({ onSelect }: { onSelect: (university: string) => void }) {
  return (
    <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 w-full">
      <h1 className="text-4xl font-bold text-white mb-3 text-center">Simulador de Universidades</h1>
      <p className="text-zinc-400 mb-12 text-center">Selecciona la institución a la que deseas postular para iniciar tu examen de práctica.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {universities.map(uni => (
          <Card 
            key={uni.id} 
            className={`bg-zinc-900/80 border-zinc-800 ${uni.color} cursor-pointer hover:-translate-y-2 transition-all duration-300 group`}
          >
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{uni.name}</h2>
              <p className="text-sm text-zinc-400 mb-6">{uni.fullName}</p>
              <Button 
                onClick={() => onSelect(uni.name)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold w-full"
              >
                Iniciar Examen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}