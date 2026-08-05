import { Variants } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
}