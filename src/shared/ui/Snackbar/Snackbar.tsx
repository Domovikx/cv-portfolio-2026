import { useEffect, useRef, useState } from 'react'

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
  autoHideMs = 6000,
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
    </output>
  )
}
