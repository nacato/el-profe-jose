import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Loader2, Timer } from 'lucide-react'

interface Question {
  id: number
  text: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct_answer: number
  explanation: string
  time_limit: number
  options: string[]
}

// Sonidos SOLO para acierto, error o tiempo agotado
const playSound = (type: 'correct' | 'wrong' | 'timeout') => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'correct') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } else if (type === 'wrong') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(196, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.4);
    } else if (type === 'timeout') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(146.83, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.6);
    }
  } catch (e) {
    console.log("Audio no permitido todavía");
  }
}

export function ExamSimulator({ uniName }: { uniName: string }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await supabase.from('questions').select('*').eq('university', uniName)
      if (data) {
        const formattedQuestions = data.map(q => ({
          ...q,
          options: [q.option1, q.option2, q.option3, q.option4]
        }))
        setQuestions(formattedQuestions as Question[])
      }
      setLoading(false)
    }
    fetchQuestions()
  }, [uniName])

  useEffect(() => {
    if (questions.length > 0 && !isFinished && selectedOption === null) {
      const currentQ = questions[currentIndex]
      setTimeLeft(currentQ.time_limit || 30)
      
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const next = prev - 1
          if (next <= 0) {
            if (timerRef.current) clearInterval(timerRef.current)
            handleAnswer(-1, true) // Tiempo agotado
            return 0
          }
          return next
        })
      }, 1000)

      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [currentIndex, questions, isFinished, selectedOption])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#020617]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#020617] px-6">
        <div className="text-center">
          <p className="text-slate-500 py-8 px-8 border border-dashed border-slate-700 rounded-lg max-w-md text-sm sm:text-base">
            Aún no hay preguntas cargadas para el examen de {uniName}.
          </p>
        </div>
      </div>
    )
  }

  if (isFinished) {
    const passed = score >= Math.ceil(questions.length * 0.7)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#020617] px-4 sm:px-6">
        <div className="bg-[#0f172a]/80 border border-cyan-800/50 rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(34,211,238,0.2)] text-center max-w-lg w-full backdrop-blur-sm">
          <h1 className="text-xl sm:text-2xl text-slate-400 mb-2">Examen Finalizado</h1>
          <div className={`text-5xl sm:text-7xl font-bold mb-6 ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
            {score} / {questions.length}
          </div>
          <p className={`font-semibold mb-8 text-base sm:text-lg ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
            {passed ? '✅ ¡Felicidades, aprobaste!' : '❌ No aprobaste. Sigue practicando.'}
          </p>
          <button 
            onClick={() => { setCurrentIndex(0); setSelectedOption(null); setScore(0); setIsFinished(false) }}
            className="bg-cyan-500 text-white font-bold px-6 sm:px-8 py-3 rounded-lg hover:bg-cyan-400 inline-flex items-center shadow-[0_0_20px_rgba(34,211,238,0.4)] text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const isAnswered = selectedOption !== null

  const handleAnswer = (idx: number, isTimeout = false) => {
    if (isAnswered) return
    if (timerRef.current) clearInterval(timerRef.current)
    
    setSelectedOption(idx)
    
    if (idx === currentQuestion.correct_answer) {
      setScore(score + 1)
      playSound('correct')
    } else {
      playSound(isTimeout ? 'timeout' : 'wrong')
    }
  }

  // FUNCIÓN PARA PASAR A LA SIGUIENTE MANUALMENTE
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
    } else {
      setIsFinished(true)
    }
  }

  const timePercent = (timeLeft / (currentQuestion.time_limit || 30)) * 100

  return (
    <div className="flex flex-col justify-center min-h-screen bg-[#020617] py-10 sm:py-12 px-4 w-full">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl text-cyan-400 font-bold mb-4 sm:mb-6 tracking-wider uppercase">Examen {uniName}</h1>
          
          <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm">Pregunta {currentIndex + 1} de {questions.length}</p>
        </div>

        <div className="bg-[#0f172a]/80 border border-cyan-800/30 rounded-xl sm:rounded-2xl p-5 sm:p-8 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          
          <div className="flex flex-col items-center justify-center mb-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-lg sm:text-xl font-bold ${timeLeft <= 5 ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : 'bg-slate-800 border-slate-700 text-cyan-400'}`}>
              <Timer className="w-5 h-5" />
              {timeLeft}s
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
              <div className={`h-1.5 rounded-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? 'bg-red-500' : 'bg-cyan-500'}`} style={{ width: `${timePercent}%` }}></div>
            </div>
          </div>

          <p className="text-base sm:text-xl text-white font-semibold mb-6 sm:mb-8 text-center break-words">
            {currentQuestion.text}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentQuestion.options.map((opt, idx) => {
              let bgClass = 'bg-[#1e293b] border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800/50'
              
              if (isAnswered) {
                if (idx === currentQuestion.correct_answer) {
                  bgClass = 'bg-emerald-500/30 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                } else if (idx === selectedOption) {
                  bgClass = 'bg-orange-500/30 border-orange-400 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                } else {
                  bgClass = 'bg-[#1e293b] border-slate-800 text-slate-500 opacity-50'
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`px-3 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl border transition-all break-words flex items-center gap-3 sm:gap-4 text-left ${bgClass}`}
                >
                  <span className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold flex-shrink-0 ${
                    isAnswered && idx === currentQuestion.correct_answer ? 'bg-emerald-500 text-white' : 
                    isAnswered && idx === selectedOption ? 'bg-orange-500 text-white' : 
                    'bg-slate-700 text-cyan-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  
                  <span className="flex-1 text-sm sm:text-base">{opt}</span>
                  
                  {isAnswered && idx === currentQuestion.correct_answer && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 flex-shrink-0 ml-1" />}
                  {isAnswered && idx === selectedOption && idx !== currentQuestion.correct_answer && <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300 flex-shrink-0 ml-1" />}
                </button>
              )
            })}
          </div>

          {/* EXPLICACIÓN Y BOTÓN SIGUIENTE */}
          {isAnswered && (
            <div className={`mt-6 p-4 sm:p-5 rounded-lg sm:rounded-xl border ${selectedOption === currentQuestion.correct_answer ? 'bg-emerald-950/40 border-emerald-800' : 'bg-red-950/40 border-red-800'}`}>
              <h3 className={`font-bold mb-2 sm:mb-3 flex items-center gap-2 text-base sm:text-lg ${selectedOption === currentQuestion.correct_answer ? 'text-emerald-400' : 'text-red-400'}`}>
                {selectedOption === currentQuestion.correct_answer ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
                <span className="break-words">
                  {selectedOption === currentQuestion.correct_answer ? '¡Respuesta Correcta!' : selectedOption === -1 ? '¡Se acabó el tiempo!' : 'Respuesta Incorrecta'}
                </span>
              </h3>

              {selectedOption !== currentQuestion.correct_answer && (
                <p className="text-slate-200 text-xs sm:text-sm break-words mb-2">
                  <span className="font-bold text-emerald-400">La respuesta correcta era:</span> {currentQuestion.options[currentQuestion.correct_answer]}
                </p>
              )}

              <p className="text-slate-300 text-xs sm:text-sm break-words mb-4">
                <span className="font-bold text-white">Por qué:</span> {currentQuestion.explanation || 'No hay explicación proporcionada.'}
              </p>
              
              {/* BOTÓN VISIBLE PARA PASAR A LA SIGUIENTE */}
              <div className="flex justify-end mt-4">
                <button 
                  onClick={handleNext}
                  className="bg-cyan-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-cyan-400 inline-flex items-center shadow-[0_0_20px_rgba(34,211,238,0.4)] text-sm sm:text-base"
                >
                  {currentIndex === questions.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}