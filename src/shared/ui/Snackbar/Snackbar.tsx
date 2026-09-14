import { useEffect, useRef, useState } from 'react'

import { SNACKBAR_HIDE_MS } from '@/shared/config'

import styles from './Snackbar.module.css'

export type SnackbarProps = {
  open: boolean
  message: string
  actionLabel?: string
  onAction?: () => void
  onClose: () => void
  autoHideMs?: number
}

const RING_CIRCUMFERENCE = 88

export const Snackbar = ({
  open,
  message,
  actionLabel,
  onAction,
  onClose,
  autoHideMs = SNACKBAR_HIDE_MS,
}: SnackbarProps) => {
  // Стабильный onClose: таймер авто-скрытия не перезапускается при рендерах родителя
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  // Остаток времени 0..1 — единый источник правды и для таймера, и для кольца:
  // кольцо гарантированно заканчивает ровно тогда, когда снекбар закрывается.
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    if (!open || autoHideMs <= 0) return

    const start = Date.now()

    const tick = window.setInterval(() => {
      setProgress(Math.max(0, 1 - (Date.now() - start) / autoHideMs))
    }, 50)

    const timer = window.setTimeout(() => onCloseRef.current(), autoHideMs)

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(timer)
    }
  }, [open, autoHideMs])

  if (!open) return null

  const dashOffset = RING_CIRCUMFERENCE * (1 - progress)
  const secondsLeft = Math.max(1, Math.ceil((progress * autoHideMs) / 1000))

  return (
    <output className={styles.snackbar} data-testid="snackbar">
      <span className={styles.timer} aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28">
          <circle className={styles.timerTrack} cx="16" cy="16" r="14" />
          <circle
            className={styles.timerBar}
            cx="16"
            cy="16"
            r="14"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span className={styles.countdown}>{secondsLeft}</span>
      </span>
      <p className={styles.message}>{message}</p>
      {actionLabel && onAction ? (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
      <button
        type="button"
        className={styles.close}
        aria-label="Close"
        data-testid="snackbar-close"
        onClick={onClose}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </output>
  )
}
