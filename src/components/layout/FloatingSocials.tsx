import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Share2 } from 'lucide-react'

export function FloatingSocials() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <>
      {/* 1. VERSIÓN ESCRITORIO: Botones laterales flotantes */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
        <a 
          href="https://wa.me/593979678105?text=Hola%20Profe%20José,%20vi%20tu%20página%20web." 
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-green-500/30"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <a 
          href="https://www.tiktok.com/@profe.josse" 
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white border border-zinc-700 hover:scale-110 transition-all duration-300 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.2-1.83.13-3.67-.37-5.19-1.45-2.07-1.43-3.32-3.85-3.27-6.36.01-1.15.27-2.29.75-3.33.01 2.04.72 4.09 2.12 5.55 1.13 1.23 2.76 1.96 4.39 1.94.6-.01 1.19-.12 1.75-.32 1.66-.59 2.94-2.15 3.1-3.91.01-1.41.01-2.83 0-4.24.01-3.63 0-7.26.01-10.89z"/>
          </svg>
        </a>
        <a 
          href="https://www.facebook.com/mycol.nacato" 
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1877F2] text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"/>
          </svg>
        </a>
      </div>

      {/* 2. VERSIÓN MÓVIL: Botón "Síguenos en redes" que abre la Hoja Inferior */}
      
      {/* Botón tipo pastilla (solo móvil) */}
      <button 
        onClick={() => setIsSheetOpen(true)}
        className="md:hidden fixed bottom-24 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-bold shadow-2xl shadow-green-500/40 active:scale-95 transition-transform"
      >
        <Share2 className="w-5 h-5" />
        <span className="text-sm">Síguenos en redes</span>
      </button>

      {/* El Bottom Sheet (La ventana que sube desde abajo) */}
      <AnimatePresence>
        {isSheetOpen && (
          <>
            {/* Fondo oscuro semitransparente */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50" 
            />
            
            {/* La Hoja que sube */}
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 rounded-t-3xl border-t border-zinc-800 p-6 pb-10"
            >
              {/* Barra superior de arrastre */}
              <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-6"></div>
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Conecta conmigo</h3>
                <button onClick={() => setIsSheetOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Tarjeta WhatsApp */}
                <a href="https://wa.me/593979678105?text=Hola%20Profe%20José,%20vi%20tu%20página%20web." target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white flex-shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">WhatsApp</p>
                    <p className="text-zinc-400 text-sm">Escríbeme directamente</p>
                  </div>
                </a>

                {/* Tarjeta TikTok */}
                <a href="https://www.tiktok.com/@profe.josse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-black border border-zinc-600 flex items-center justify-center text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.2-1.83.13-3.67-.37-5.19-1.45-2.07-1.43-3.32-3.85-3.27-6.36.01-1.15.27-2.29.75-3.33.01 2.04.72 4.09 2.12 5.55 1.13 1.23 2.76 1.96 4.39 1.94.6-.01 1.19-.12 1.75-.32 1.66-.59 2.94-2.15 3.1-3.91.01-1.41.01-2.83 0-4.24.01-3.63 0-7.26.01-10.89z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">TikTok</p>
                    <p className="text-zinc-400 text-sm">@profe.josse</p>
                  </div>
                </a>

                {/* Tarjeta Facebook */}
                <a href="https://www.facebook.com/mycol.nacato" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Facebook</p>
                    <p className="text-zinc-400 text-sm">/mycol.nacato</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}