import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function AdminDashboard() {
  const [questions, setQuestions] = useState<any[]>([])
  
  // UsamosRefs para que no se congele
  const textRef = useRef<HTMLInputElement>(null)
  const opt1Ref = useRef<HTMLInputElement>(null)
  const opt2Ref = useRef<HTMLInputElement>(null)
  const opt3Ref = useRef<HTMLInputElement>(null)
  const opt4Ref = useRef<HTMLInputElement>(null)
  const correctRef = useRef<HTMLSelectElement>(null)
  const uniRef = useRef<HTMLSelectElement>(null)
  const explanationRef = useRef<HTMLTextAreaElement>(null)
  const timeRef = useRef<HTMLSelectElement>(null)

  const fetchQuestions = async () => {
    const { data } = await supabase.from('questions').select('*').order('created_at', { ascending: false })
    if (data) setQuestions(data)
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const saveQuestion = async () => {
    const newQuestion = {
      text: textRef.current?.value,
      option1: opt1Ref.current?.value,
      option2: opt2Ref.current?.value,
      option3: opt3Ref.current?.value,
      option4: opt4Ref.current?.value,
      correct_answer: Number(correctRef.current?.value),
      university: uniRef.current?.value,
      explanation: explanationRef.current?.value,
      time_limit: Number(timeRef.current?.value)
    }

    if (!newQuestion.text || !newQuestion.option1) {
      alert('Por favor llena al menos la pregunta y la opción 1')
      return
    }

    const { error } = await supabase.from('questions').insert([newQuestion])

    if (error) {
      alert('Error al guardar: ' + error.message)
    } else {
      alert('¡Pregunta guardada con éxito!')
      if(textRef.current) textRef.current.value = ''
      if(opt1Ref.current) opt1Ref.current.value = ''
      if(opt2Ref.current) opt2Ref.current.value = ''
      if(opt3Ref.current) opt3Ref.current.value = ''
      if(opt4Ref.current) opt4Ref.current.value = ''
      if(explanationRef.current) explanationRef.current.value = ''
      fetchQuestions()
    }
  }

  const deleteQuestion = async (id: number) => {
    if (confirm('¿Seguro que quieres borrar esta pregunta?')) {
      await supabase.from('questions').delete().eq('id', id)
      fetchQuestions()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl text-white font-bold mb-8">Panel de Administración</h1>
      
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mb-8">
        <input 
          ref={textRef}
          placeholder="Escribe tu pregunta aquí..."
          className="w-full bg-black text-white p-3 rounded mb-4 border border-zinc-700"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input ref={opt1Ref} placeholder="Opción 1" className="w-full bg-black text-white p-3 rounded border border-zinc-700" />
          <input ref={opt2Ref} placeholder="Opción 2" className="w-full bg-black text-white p-3 rounded border border-zinc-700" />
          <input ref={opt3Ref} placeholder="Opción 3" className="w-full bg-black text-white p-3 rounded border border-zinc-700" />
          <input ref={opt4Ref} placeholder="Opción 4" className="w-full bg-black text-white p-3 rounded border border-zinc-700" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <select ref={correctRef} className="w-full bg-black text-white p-3 rounded border border-zinc-700">
            <option value={0}>Opción 1 correcta</option>
            <option value={1}>Opción 2 correcta</option>
            <option value={2}>Opción 3 correcta</option>
            <option value={3}>Opción 4 correcta</option>
          </select>

          <select ref={uniRef} className="w-full bg-black text-white p-3 rounded border border-zinc-700">
            <option value="EPN">Examen EPN</option>
            <option value="ESPE">Examen ESPE</option>
            <option value="UCE">Examen UCE</option>
          </select>

          <select ref={timeRef} className="w-full bg-black text-white p-3 rounded border border-zinc-700">
            <option value={10}>10 segundos</option>
            <option value={20}>20 segundos</option>
            <option value={30}>30 segundos</option>
            <option value={60}>60 segundos</option>
          </select>
        </div>

        <textarea 
          ref={explanationRef}
          placeholder="Escribe aquí la explicación de la respuesta..."
          className="w-full bg-black text-white p-3 rounded mb-4 border border-zinc-700 h-24"
        ></textarea>

        <button onClick={saveQuestion} className="bg-emerald-500 text-black font-bold p-3 rounded w-full">
          GUARDAR PREGUNTA EN INTERNET
        </button>
      </div>

      <h2 className="text-2xl text-white font-bold mb-4">Preguntas Guardadas: {questions.length}</h2>
      
      {questions.map(q => (
        <div key={q.id} className="bg-zinc-800 p-4 rounded mb-4 flex justify-between items-start break-words">
          <div className="mr-4">
            <div className="flex gap-2 mb-2">
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded font-bold">{q.university}</span>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-bold">⏱ {q.time_limit || 30} seg</span>
            </div>
            <p className="text-white font-bold mt-2">{q.text}</p>
            <p className="text-zinc-400 text-sm mt-1">
              1: {q.option1} | 2: {q.option2} | 3: {q.option3} | 4: {q.option4} (Correcta: {q.correct_answer + 1})
            </p>
            {q.explanation && (
              <p className="text-zinc-500 text-xs mt-2 italic">Explicación: {q.explanation}</p>
            )}
          </div>
          <button onClick={() => deleteQuestion(q.id)} className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/40 flex-shrink-0">
            Borrar
          </button>
        </div>
      ))}
    </div>
  )
}