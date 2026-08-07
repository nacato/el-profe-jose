import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function AdminDashboard() {
  const [universities, setUniversities] = useState<any[]>([])
  const [exams, setExams] = useState<any[]>([])
  const [questions, setQuestions] = useState<any[]>([])

  // Refs para Universidades
  const uniShortRef = useRef<HTMLInputElement>(null)
  const uniFullRef = useRef<HTMLInputElement>(null)

  // Refs para Exámenes
  const examUniRef = useRef<HTMLSelectElement>(null)
  const examNameRef = useRef<HTMLInputElement>(null)

  // Refs para Preguntas
  const qExamRef = useRef<HTMLSelectElement>(null)
  const qTextRef = useRef<HTMLInputElement>(null)
  const qOpt1Ref = useRef<HTMLInputElement>(null)
  const qOpt2Ref = useRef<HTMLInputElement>(null)
  const qOpt3Ref = useRef<HTMLInputElement>(null)
  const qOpt4Ref = useRef<HTMLInputElement>(null)
  const qCorrectRef = useRef<HTMLSelectElement>(null)
  const qExplanationRef = useRef<HTMLTextAreaElement>(null)
  const qTimeRef = useRef<HTMLSelectElement>(null)

  const fetchAll = async () => {
    const { data: unis } = await supabase.from('universities').select('*').order('created_at', { ascending: false })
    if (unis) setUniversities(unis)

    const { data: exs } = await supabase.from('exams').select('*, universities(short_name)').order('created_at', { ascending: false })
    if (exs) setExams(exs)

    const { data: qs } = await supabase.from('questions').select('*, exams(name, universities(short_name))').order('created_at', { ascending: false })
    if (qs) setQuestions(qs)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  // --- Funciones de Universidades ---
  const addUni = async () => {
    const short = uniShortRef.current?.value
    const full = uniFullRef.current?.value
    if (!short) return alert('Pon la sigla (ej: EPN)')
    await supabase.from('universities').insert([{ short_name: short.toUpperCase(), full_name: full }])
    if(uniShortRef.current) uniShortRef.current.value = ''
    if(uniFullRef.current) uniFullRef.current.value = ''
    fetchAll()
  }

  const deleteUni = async (id: number) => {
    if (confirm('¿Borrar universidad? Se borrarán también sus exámenes y preguntas.')) {
      await supabase.from('universities').delete().eq('id', id)
      fetchAll()
    }
  }

  // --- Funciones de Exámenes ---
  const addExam = async () => {
    const uniId = examUniRef.current?.value
    const name = examNameRef.current?.value
    if (!uniId || !name) return alert('Selecciona universidad y pon nombre al examen')
    await supabase.from('exams').insert([{ university_id: uniId, name }])
    if(examNameRef.current) examNameRef.current.value = ''
    fetchAll()
  }

  const deleteExam = async (id: number) => {
    if (confirm('¿Borrar examen? Se borrarán también sus preguntas.')) {
      await supabase.from('exams').delete().eq('id', id)
      fetchAll()
    }
  }

  // --- Funciones de Preguntas ---
  const addQuestion = async () => {
    const examId = qExamRef.current?.value
    const text = qTextRef.current?.value
    const opt1 = qOpt1Ref.current?.value
    if (!examId || !text || !opt1) return alert('Selecciona examen y completa la pregunta y opción 1')
    
    await supabase.from('questions').insert([{
      exam_id: examId,
      text,
      option1: opt1,
      option2: qOpt2Ref.current?.value,
      option3: qOpt3Ref.current?.value,
      option4: qOpt4Ref.current?.value,
      correct_answer: Number(qCorrectRef.current?.value),
      explanation: qExplanationRef.current?.value,
      time_limit: Number(qTimeRef.current?.value)
    }])

    if(qTextRef.current) qTextRef.current.value = ''
    if(qOpt1Ref.current) qOpt1Ref.current.value = ''
    if(qOpt2Ref.current) qOpt2Ref.current.value = ''
    if(qOpt3Ref.current) qOpt3Ref.current.value = ''
    if(qOpt4Ref.current) qOpt4Ref.current.value = ''
    if(qExplanationRef.current) qExplanationRef.current.value = ''
    fetchAll()
  }

  const deleteQuestion = async (id: number) => {
    if (confirm('¿Borrar pregunta?')) {
      await supabase.from('questions').delete().eq('id', id)
      fetchAll()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <h1 className="text-3xl text-white font-bold">Panel de Administración</h1>

      {/* SECCIÓN UNIVERSIDADES */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <h2 className="text-xl text-emerald-400 font-bold mb-4">1. Universidades</h2>
        <div className="flex gap-2 mb-4">
          <input ref={uniShortRef} placeholder="Sigla (ej: EPN)" className="w-1/3 bg-black text-white p-2 rounded border border-zinc-700" />
          <input ref={uniFullRef} placeholder="Nombre Completo" className="flex-1 bg-black text-white p-2 rounded border border-zinc-700" />
          <button onClick={addUni} className="bg-emerald-500 text-black font-bold px-4 rounded">Añadir</button>
        </div>
        {universities.map(u => (
          <div key={u.id} className="flex justify-between bg-zinc-800 p-2 rounded mb-2 text-white text-sm">
            <span><b>{u.short_name}</b> - {u.full_name}</span>
            <button onClick={() => deleteUni(u.id)} className="text-red-400 hover:underline">Borrar</button>
          </div>
        ))}
      </div>

      {/* SECCIÓN EXÁMENES */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <h2 className="text-xl text-emerald-400 font-bold mb-4">2. Exámenes</h2>
        <div className="flex gap-2 mb-4">
          <select ref={examUniRef} className="w-1/3 bg-black text-white p-2 rounded border border-zinc-700">
            <option value="">Seleccionar Univ...</option>
            {universities.map(u => <option key={u.id} value={u.id}>{u.short_name}</option>)}
          </select>
          <input ref={examNameRef} placeholder="Nombre del Examen (Ej: Aritmética 2024)" className="flex-1 bg-black text-white p-2 rounded border border-zinc-700" />
          <button onClick={addExam} className="bg-emerald-500 text-black font-bold px-4 rounded">Añadir</button>
        </div>
        {exams.map(e => (
          <div key={e.id} className="flex justify-between bg-zinc-800 p-2 rounded mb-2 text-white text-sm">
            <span><b className="text-cyan-400">{e.universities?.short_name}</b> - {e.name}</span>
            <button onClick={() => deleteExam(e.id)} className="text-red-400 hover:underline">Borrar</button>
          </div>
        ))}
      </div>

      {/* SECCIÓN PREGUNTAS */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <h2 className="text-xl text-emerald-400 font-bold mb-4">3. Preguntas</h2>
        
        <select ref={qExamRef} className="w-full bg-black text-white p-2 rounded border border-zinc-700 mb-2">
          <option value="">Seleccionar Examen...</option>
          {exams.map(e => <option key={e.id} value={e.id}>{e.universities?.short_name} - {e.name}</option>)}
        </select>

        <input ref={qTextRef} placeholder="Pregunta..." className="w-full bg-black text-white p-2 rounded border border-zinc-700 mb-2" />
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input ref={qOpt1Ref} placeholder="Opción 1" className="bg-black text-white p-2 rounded border border-zinc-700" />
          <input ref={qOpt2Ref} placeholder="Opción 2" className="bg-black text-white p-2 rounded border border-zinc-700" />
          <input ref={qOpt3Ref} placeholder="Opción 3" className="bg-black text-white p-2 rounded border border-zinc-700" />
          <input ref={qOpt4Ref} placeholder="Opción 4" className="bg-black text-white p-2 rounded border border-zinc-700" />
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-2">
          <select ref={qCorrectRef} className="bg-black text-white p-2 rounded border border-zinc-700">
            <option value="0">Correcta: Opción 1</option>
            <option value="1">Correcta: Opción 2</option>
            <option value="2">Correcta: Opción 3</option>
            <option value="3">Correcta: Opción 4</option>
          </select>
          <select ref={qTimeRef} className="bg-black text-white p-2 rounded border border-zinc-700">
            <option value="10">10 segundos</option>
            <option value="20">20 segundos</option>
            <option value="30">30 segundos</option>
            <option value="60">60 segundos</option>
          </select>
        </div>

        <textarea ref={qExplanationRef} placeholder="Explicación..." className="w-full bg-black text-white p-2 rounded border border-zinc-700 mb-2 h-20"></textarea>

        <button onClick={addQuestion} className="bg-emerald-500 text-black font-bold p-2 rounded w-full">AÑADIR PREGUNTA</button>

        {questions.map(q => (
          <div key={q.id} className="flex justify-between bg-zinc-800 p-2 rounded mb-2 mt-4 text-white text-sm">
            <div className="mr-2">
              <span className="text-xs text-cyan-400">{q.exams?.universities?.short_name} - {q.exams?.name}</span>
              <p className="text-sm">{q.text}</p>
            </div>
            <button onClick={() => deleteQuestion(q.id)} className="text-red-400 hover:underline">Borrar</button>
          </div>
        ))}
      </div>
    </div>
  )
}