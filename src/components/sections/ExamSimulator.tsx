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

export function ExamSimulator({ uniName, examId, examName }: { uniName: string, examId: number, examName: string }) {
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
      const { data } = await supabase.from('questions').select('*').eq('exam_id', examId)
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
  }, [examId])

  useEffect(() => {
    if (questions.length > 0 && !isFinished && selectedOption === null) {
      const currentQ = questions[currentIndex]
      setTimeLeft(currentQ.time_limit || 30)
      
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const next = prev - 1
          if (next <= 0) {
            if (timerRef.current) clearInterval(timerRef.current)
            handleAnswer(-1, true)
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
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <Loader2 className="w-8 h-8 text-[#002A5C] animate-spin" />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 px-6 pt-20">
        <div className="text-center bg-white border border-slate-200 shadow-sm rounded-lg max-w-md p-8">
          <p className="text-slate-600 text-sm sm:text-base">
            Aún no hay preguntas cargadas para el examen de {examName} ({uniName}).
          </p>
        </div>
      </div>
    )
  }

  if (isFinished) {
    const passed = score >= Math.ceil(questions.length * 0.7)
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 px-4 sm:px-6 pt-20">
        <div className="bg-white border border-slate-200 shadow-lg rounded-lg p-8 sm:p-10 text-center max-w-lg w-full">
          <h1 className="text-xl sm:text-2xl text-slate-500 mb-2 font-semibold uppercase tracking-wide">Examen Finalizado</h1>
          <div className={`text-5xl sm:text-7xl font-bold mb-6 ${passed ? 'text-[#002A5C]' : 'text-red-600'}`}>
            {score} / {questions.length}
          </div>
          <p className={`font-semibold mb-8 text-base sm:text-lg ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {passed ? '✅ ¡Felicidades, aprobaste!' : '❌ No aprobaste. Sigue practicando.'}
          </p>
          <button 
            onClick={() => { setCurrentIndex(0); setSelectedOption(null); setScore(0); setIsFinished(false) }}
            className="bg-[#002A5C] text-white font-bold px-6 sm:px-8 py-3 rounded-md hover:bg-[#001f47] inline-flex items-center shadow-sm text-sm sm:text-base"
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
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4 w-full">
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-6">
        
        {/* Columna Izquierda: Pregunta y Opciones */}
        <div className="flex-1">
          {/* Barra de tiempo superior estilo Senescyt */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{uniName} - {examName}</p>
              <p className="text-sm text-slate-700 font-bold">Pregunta {currentIndex + 1} de {questions.length}</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden sm:block w-24 bg-slate-200 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? 'bg-red-600' : 'bg-[#F2A900]'}`} style={{ width: `${timePercent}%` }}></div>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded border font-mono text-lg font-bold ${timeLeft <= 5 ? 'bg-red-50 border-red-600 text-red-600 animate-pulse' : 'bg-[#002A5C] border-[#002A5C] text-white'}`}>
                <Timer className="w-5 h-5" />
                {timeLeft}s
              </div>
            </div>
          </div>

          {/* Tarjeta de la Pregunta */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-6 sm:p-8">
            <p className="text-base sm:text-lg text-slate-800 font-semibold mb-8 break-words">
              {currentQuestion.text}
            </p>
            
            {/* Opciones estilo a, b, c, d */}
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((opt, idx) => {
                let bgClass = 'bg-white border-slate-300 text-slate-700 hover:border-[#002A5C] hover:bg-slate-50'
                
                if (isAnswered) {
                  if (idx === currentQuestion.correct_answer) {
                    bgClass = 'bg-green-50 border-green-600 text-green-800'
                  } else if (idx === selectedOption) {
                    bgClass = 'bg-red-50 border-red-600 text-red-800'
                  } else {
                    bgClass = 'bg-white border-slate-200 text-slate-400 opacity-60'
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={isAnswered}
                    className={`w-full px-5 py-3 rounded-md border transition-all break-words flex items-center gap-4 shadow-sm ${bgClass}`}
                  >
                    <span className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold flex-shrink-0 ${
                      isAnswered && idx === currentQuestion.correct_answer ? 'bg-green-600 text-white' : 
                      isAnswered && idx === selectedOption ? 'bg-red-600 text-white' : 
                      'bg-[#002A5C] text-white'
                    }`}>
                      {String.fromCharCode(97 + idx)} {/* a, b, c, d */}
                    </span>
                    
                    <span className="flex-1 text-sm sm:text-base text-left">{opt}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Mapa de Preguntas (Estilo Senescyt) - Oculto en móviles */}
        <aside className="hidden lg:block w-64">
          <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-6 sticky top-24">
            <h3 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Mapa de Preguntas</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, idx) => {
                let numClass = 'bg-slate-100 text-slate-500 border-slate-200'
                
                if (idx === currentIndex) {
                  numClass = 'bg-[#002A5C] text-white border-[#002A5C] ring-2 ring-[#F2A900] ring-offset-1'
                } else if (idx < currentIndex) {
                  numClass = 'bg-green-100 text-green-600 border-green-200'
                }

                return (
                  <div key={idx} className={`w-10 h-10 flex items-center justify-center rounded border text-sm font-bold ${numClass}`}>
                    {idx + 1}
                  </div>
                )
              })}
            </div>
            <div className="mt-6 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#002A5C] rounded"></div> Actual</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div> Respondida</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-slate-100 border border-slate-200 rounded"></div> Pendiente</div>
            </div>
          </div>
        </aside>
      </div>

      {/* VENTANITA FLOTANTE (MODAL) PARA LA EXPLICACIÓN */}
      {isAnswered && (
        <div className="fixed inset-0 z-50 bg-[#002A5C]/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div className={`bg-white shadow-2xl rounded-xl max-w-2xl w-full overflow-hidden border-t-8 ${selectedOption === currentQuestion.correct_answer ? 'border-green-600' : 'border-red-600'}`}>
            
            <div className="p-6 sm:p-8 text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${selectedOption === currentQuestion.correct_answer ? 'bg-green-100' : 'bg-red-100'}`}>
                {selectedOption === currentQuestion.correct_answer ? <CheckCircle className="w-10 h-10 text-green-600" /> : <XCircle className="w-10 h-10 text-red-600" />}
              </div>

              <h3 className={`font-bold mb-4 text-xl sm:text-2xl ${selectedOption === currentQuestion.correct_answer ? 'text-green-700' : 'text-red-700'}`}>
                {selectedOption === currentQuestion.correct_answer ? '¡Respuesta Correcta!' : selectedOption === -1 ? '¡Se acabó el tiempo!' : 'Respuesta Incorrecta'}
              </h3>

              {selectedOption !== currentQuestion.correct_answer && (
                <div className="bg-slate-50 rounded-lg p-4 mb-4 text-left">
                  <p className="text-slate-700 text-sm break-words flex">
                    <span className="font-bold text-[#002A5C] mr-1">Correcta:</span> 
                    <span>{currentQuestion.options[currentQuestion.correct_answer]}</span>
                  </p>
                </div>
              )}

              <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
                <p className="text-slate-600 text-sm break-words flex">
                  <span className="font-bold text-[#002A5C] mr-1">Por qué:</span> 
                  <span>{currentQuestion.explanation || 'No hay explicación proporcionada.'}</span>
                </p>
              </div>
              
              <button 
                onClick={handleNext}
                className="w-full bg-[#002A5C] text-white font-bold px-8 py-3 rounded-md hover:bg-[#001f47] inline-flex justify-center items-center shadow-sm text-base"
              >
                {currentIndex === questions.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}