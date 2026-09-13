import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/shared/lib'

import styles from './Button.module.css'

type ButtonBaseProps = {
  variant?: 'red' | 'white' | 'ghost'
  size?: 'm' | 'l'
  className?: string
  children: ReactNode
}

type ButtonAsLinkProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps

const SIZE_CLASS: Record<NonNullable<ButtonBaseProps['size']>, string> = {
  m: styles.sizeM,
  l: styles.sizeL,
}

export const Button = ({
  variant = 'red',
  size = 'm',
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classes = cn(styles.button, styles[variant], SIZE_CLASS[size], className)

  if (rest.href) {
    const { href, ...anchorProps } = rest as ButtonAsLinkProps
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
