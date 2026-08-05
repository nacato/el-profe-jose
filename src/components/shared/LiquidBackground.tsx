import { motion } from 'framer-motion'

// Generamos 50 estrellas con posiciones y parpadeos aleatorios
const stars = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  size: Math.random() * 2 + 1, // Tamaño entre 1px y 3px
  x: Math.random() * 100, // Posición horizontal en %
  y: Math.random() * 100, // Posición vertical en %
  duration: Math.random() * 3 + 2, // Velocidad del parpadeo
  delay: Math.random() * 5 // Retraso inicial
}))

export function LiquidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#01140d] pointer-events-none z-0">
      
      {/* 1. Nebulosas Espaciales (Luces Verdes que se mueven como galaxias) */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-emerald-700/20 rounded-full blur-[120px]"
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-teal-800/20 rounded-full blur-[140px]"
        animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 2. Estrellas (Parpadeando en el espacio) */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-emerald-100 rounded-full"
          style={{ width: star.size, height: star.size, left: `${star.x}%`, top: `${star.y}%` }}
          animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* 3. Estrella Fugaz (Cruza la pantalla de vez en cuando) */}
      <motion.div
        className="absolute top-0 left-0 w-[300px] h-[1.5px] bg-gradient-to-r from-transparent via-emerald-300 to-transparent rounded-full"
        animate={{ x: ['-20vw', '120vw'], y: ['10vh', '60vh'], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 8, ease: "easeIn" }}
      />
    </div>
  )
}