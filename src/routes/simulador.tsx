import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '@/lib/supabaseClient'
import { Navbar } from '@/components/layout/Navbar'
import { MobileNav } from '@/components/layout/MobileNav'
import { ExamSimulator } from '@/components/sections/ExamSimulator'
import { Building2, FileText, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/simulador')({
  component: SimulatorPage,
})

function SimulatorPage() {
  const [universities, setUniversities] = useState<any[]>([])
  const [selectedUni, setSelectedUni] = useState<any | null>(null)
  const [exams, setExams] = useState<any[]>([])
  const [selectedExam, setSelectedExam] = useState<any | null>(null)
  const [loadingExams, setLoadingExams] = useState(false)

  useEffect(() => {
    const fetchUnis = async () => {
      const { data } = await supabase.from('universities').select('*')
      if (data) setUniversities(data)
    }
    fetchUnis()
  }, [])

  useEffect(() => {
    if (selectedUni) {
      setLoadingExams(true)
      const fetchExams = async () => {
        const { data } = await supabase.from('exams').select('*').eq('university_id', selectedUni.id)
        if (data) setExams(data)
        setLoadingExams(false)
      }
      fetchExams()
    }
  }, [selectedUni])

  if (selectedExam && selectedUni) {
    return (
      <main className="relative flex min-h-screen flex-col bg-slate-50">
        <Navbar />
        <div className="pt-20 w-full flex-1">
          <ExamSimulator uniName={selectedUni.short_name} examId={selectedExam.id} examName={selectedExam.name} />
        </div>
        <MobileNav />
      </main>
    )
  }

  if (selectedUni) {
    return (
      <main className="relative flex min-h-screen flex-col bg-slate-50">
        <Navbar />
        <div className="pt-24 pb-12 px-4 w-full flex flex-col items-center">
          <div className="max-w-3xl w-full">
            <button onClick={() => setSelectedUni(null)} className="mb-8 flex items-center gap-2 text-[#002A5C] font-medium hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Volver a Universidades
            </button>
            
            <h1 className="text-3xl text-[#002A5C] font-bold mb-2 uppercase tracking-wide text-center">Exámenes {selectedUni.short_name}</h1>
            <p className="text-slate-500 mb-10 text-center">Selecciona el cuestionario que deseas practicar.</p>

            {loadingExams ? (
              <p className="text-center text-slate-500">Cargando exámenes...</p>
            ) : exams.length === 0 ? (
              <p className="text-center text-slate-500">Aún no hay exámenes cargados para {selectedUni.short_name}.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exams.map(exam => (
                  <div 
                    key={exam.id} 
                    onClick={() => setSelectedExam(exam)}
                    className="bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#002A5C] transition-all rounded-lg p-6 cursor-pointer flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#002A5C] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">{exam.name}</h2>
                      <p className="text-sm text-slate-500">Examen de práctica</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <MobileNav />
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <div className="pt-24 pb-12 px-4 w-full flex flex-col items-center">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl text-[#002A5C] font-bold mb-2 uppercase tracking-wide text-center">Simulador de Universidades</h1>
          <p className="text-slate-500 mb-10 text-center">Selecciona la institución a la que deseas postular.</p>

          {universities.length === 0 ? (
            <p className="text-center text-slate-500">Aún no hay universidades cargadas en el sistema. Ve al panel de Admin.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {universities.map(uni => (
                <div 
                  key={uni.id} 
                  onClick={() => setSelectedUni(uni)}
                  className="bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#002A5C] transition-all rounded-lg p-8 cursor-pointer flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#002A5C]/10 flex items-center justify-center mb-4">
                    <Building2 className="w-8 h-8 text-[#002A5C]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#002A5C]">{uni.short_name}</h2>
                  <p className="text-sm text-slate-500 mt-1">{uni.full_name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <MobileNav />
    </main>
  )
}