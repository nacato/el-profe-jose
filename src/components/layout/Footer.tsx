import { GraduationCap, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer id="contacto" className="bg-zinc-950 border-t border-zinc-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            <span className="font-bold text-lg">El Profe José</span>
          </div>
          <p className="text-zinc-400 text-sm">
            Tu aliado estratégico en el aula y en la web.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Servicios</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>Desarrollo Web Full-Stack</li>
            <li>Diseño y Publicidad</li>
            <li>Soporte Técnico IT</li>
            <li>Clases de Matemáticas</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" /> michaobilux@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-400" /> 0979678105
            </li>
          </ul>
        </div>

      </div>
      
      <div className="mt-12 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} El Profe José. Todos los derechos reservados.
      </div>
    </footer>
  )
}