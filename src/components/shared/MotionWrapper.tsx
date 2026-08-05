import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { fadeInUpVariants } from '@/types'

interface MotionWrapperProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function MotionWrapper({ children, delay = 0, className }: MotionWrapperProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}