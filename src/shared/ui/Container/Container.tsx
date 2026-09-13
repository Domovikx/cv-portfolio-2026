import type { PropsWithChildren } from 'react'

import { cn } from '@/shared/lib'

import styles from './Container.module.css'

export type ContainerProps = PropsWithChildren<{
  className?: string
}>

export const Container = ({ className, children }: ContainerProps) => {
  return <div className={cn(styles.container, className)}>{children}</div>
}
