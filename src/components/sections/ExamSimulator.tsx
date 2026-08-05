import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, RotateCcw, Send } from 'lucide-react'

// Preguntas de ejemplo
const mockQuestions = [
  {
    id: 1,
    text: "Si un tren viaja a 80 km/h, ¿cuánto tiempo tardará en recorrer 200 km?",
    options: ["1.5 horas", "2.5 horas", "3 horas", "2 horas"],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "¿Cuál es el resultado de la operación: (1/2) + (1/4)?",
    options: ["2/6", "3/4", "1/8", "2/8"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "Resuelve para x: 2x + 6 = 14",
    options: ["x = 2", "x = 4", "x = 6", "x = 8"],
    correctAnswer: 1
  }
]

// Aquí le decimos que reciba el nombre de la universidad
export function ExamSimulator({ uniName }: { uniName: string }) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return
    setAnswers({ ...answers, [questionId]: optionIndex })
  }

  const score = mockQuestions.filter(q => answers[q.id] === q.correctAnswer).length
  const totalQuestions = mockQuestions.length
  const passingScore = Math.ceil(totalQuestions * 0.7)

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 w-full">
      
      {!isSubmitted ? (
        <>
          {/* Aquí usamos el nombre de la universidad */}
          <h1 className="text-3xl font-bold text-white mb-2">Examen {uniName}</h1>
          <p className="text-zinc-400 mb-8">Selecciona la respuesta correcta. Al finalizar, presiona "Enviar Examen".</p>
          
          <div className="space-y-6">
            {mockQuestions.map((q, index) => (
              <Card key={q.id} className="bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-emerald-400">Pregunta {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white mb-4">{q.text}</p>
                  <div className="grid grid-cols-1 gap-3">
                    {q.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(q.id, idx)}
                        className={`text-left px-4 py-3 rounded-lg border transition-all ${
                          answers[q.id] === idx 
                            ? 'bg-emerald-500/20 border-emerald-500 text-white' 
                            : 'bg-zinc-950 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" onClick={() => setIsSubmitted(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
              <Send className="w-4 h-4 mr-2" />
              Enviar Examen
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-12">
            <div className="inline-block bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
              <h1 className="text-2xl text-zinc-400 mb-2">Tu puntaje es:</h1>
              <div className={`text-6xl font-bold mb-4 ${score >= passingScore ? 'text-emerald-400' : 'text-red-400'}`}>
                {score} / {totalQuestions}
              </div>
              <p className={`font-semibold ${score >= passingScore ? 'text-emerald-400' : 'text-red-400'}`}>
                {score >= passingScore ? '✅ ¡Felicidades, aprobaste!' : '❌ No aprobaste. Sigue practicando.'}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">Revisión de Respuestas</h2>
          
          <div className="space-y-6">
            {mockQuestions.map((q, index) => {
              const userAnswer = answers[q.id]
              const isCorrect = userAnswer === q.correctAnswer

              return (
                <Card key={q.id} className={`bg-zinc-900/80 backdrop-blur-sm border-2 ${isCorrect ? 'border-emerald-500/50' : 'border-red-500/50'}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                      <span className="text-zinc-400">Pregunta {index + 1}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white mb-4">{q.text}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, idx) => {
                        let bgClass = 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        
                        if (idx === q.correctAnswer) {
                          bgClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        } else if (idx === userAnswer && !isCorrect) {
                          bgClass = 'bg-red-500/20 border-red-500 text-red-300'
                        }

                        return (
                          <div key={idx} className={`px-4 py-2 rounded-lg border flex items-center justify-between ${bgClass}`}>
                            <span>{opt}</span>
                            {idx === q.correctAnswer && <span className="text-xs font-bold">CORRECTA</span>}
                            {idx === userAnswer && !isCorrect && <span className="text-xs font-bold">TU RESPUESTA</span>}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" variant="outline" onClick={() => { setIsSubmitted(false); setAnswers({}) }} className="bg-transparent border-zinc-700 text-white hover:bg-zinc-900 font-semibold">
              <RotateCcw className="w-4 h-4 mr-2" />
              Intentar de nuevo
            </Button>
          </div>
        </>
      )}
    </div>
  )
}