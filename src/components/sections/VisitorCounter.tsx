import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Eye } from 'lucide-react'

export function VisitorCounter() {
  const [visits, setVisits] = useState<number | null>(null)

  useEffect(() => {
    const incrementVisit = async () => {
      // 1. Primero, leemos el número actual para mostrarlo en pantalla SIEMPRE
      const { data: stats } = await supabase.from('site_stats').select('visits').eq('id', 1).single()
      if (stats) setVisits(Number(stats.visits))

      // 2. Reglas para NO sumar (Excluir al Profe José)
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      
      // Si entras a tu web con "?admin=1" al final, tu PC se marca como admin
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === '1') {
        localStorage.setItem('profejose_admin', 'true');
      }
      const isAdmin = localStorage.getItem('profejose_admin') === 'true';

      // 3. Si NO es localhost y NO es el admin, sumamos +1 SIEMPRE que entren
      if (!isLocalhost && !isAdmin) {
        const { data, error } = await supabase.rpc('increment_visits')
        if (!error && data !== null) {
          setVisits(Number(data))
        }
      }
    }
    
    incrementVisit()
  }, [])

  if (visits === null) return null

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mt-4">
      <Eye className="w-4 h-4 text-emerald-400" />
      <span className="font-mono font-bold text-zinc-300">
        {visits.toLocaleString('es-EC')}
      </span>
      <span>visitas totales</span>
    </div>
  )
}