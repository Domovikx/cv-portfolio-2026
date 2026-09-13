import type { PropsWithChildren } from 'react'

import { cn } from '@/shared/lib'

import styles from './Section.module.css'

export type SectionProps = PropsWithChildren<{
  id?: string
  variant?: 'white' | 'gray'
  className?: string
}>

export const Section = ({ id, variant = 'white', className, children }: SectionProps) => {
  return (
    <section id={id} className={cn(styles.section, variant === 'gray' && styles.gray, className)}>
      {children}
    </section>
  )
}
