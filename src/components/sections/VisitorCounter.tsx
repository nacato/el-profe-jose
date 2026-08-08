import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Eye } from 'lucide-react'

export function VisitorCounter() {
  const [visits, setVisits] = useState<number | null>(null)

  useEffect(() => {
    const incrementVisit = async () => {
      const { data, error } = await supabase.rpc('increment_visits')
      
      if (!error && data !== null) {
        setVisits(data)
      } else {
        const { data: stats } = await supabase.from('site_stats').select('visits').eq('id', 1).single()
        if (stats) setVisits(stats.visits)
      }
    }
    
    incrementVisit()
  }, [])

  if (visits === null) return null

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mt-12">
      <Eye className="w-4 h-4 text-emerald-400" />
      <span className="font-mono font-bold text-zinc-300">
        {visits.toLocaleString('es-EC')}
      </span>
      <span>visitas totales</span>
    </div>
  )
}