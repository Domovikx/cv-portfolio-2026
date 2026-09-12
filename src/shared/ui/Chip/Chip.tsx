import type { ReactNode } from 'react'

import { cn } from '@/shared/lib'

import styles from './Chip.module.css'

export type ChipProps = {
  children: ReactNode
  className?: string
}

export function Chip({ children, className }: ChipProps) {
  return <span className={cn(styles.chip, className)}>{children}</span>
}
