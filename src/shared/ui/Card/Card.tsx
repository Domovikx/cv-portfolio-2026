import type { PropsWithChildren } from 'react'

import { cn } from '@/shared/lib'

import styles from './Card.module.css'

export type CardProps = PropsWithChildren<{
  variant?: 'white' | 'gray'
  className?: string
}>

export const Card = ({ variant = 'white', className, children }: CardProps) => {
  return (
    <div className={cn(styles.card, variant === 'gray' && styles.gray, className)}>{children}</div>
  )
}
