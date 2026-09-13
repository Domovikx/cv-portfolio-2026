import { cn } from '@/shared/lib'

import styles from './SectionTitle.module.css'

export type SectionTitleProps = {
  title: string
  subtitle?: string
  className?: string
}

export const SectionTitle = ({ title, subtitle, className }: SectionTitleProps) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  )
}
