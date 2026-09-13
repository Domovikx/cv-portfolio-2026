import { useEffect, useRef } from 'react'
import type { KeyboardEvent, MouseEvent, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/shared/lib'

import styles from './Modal.module.css'

export type ModalProps = PropsWithChildren<{
  open: boolean
  title: string
  onClose: () => void
  className?: string
  dataTestId?: string
}>

export const Modal = ({ open, title, onClose, className, dataTestId, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !open) return

    if (typeof dialog.showModal === 'function') {
      dialog.showModal()
    } else {
      dialog.setAttribute('open', '')
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)

    return () => {
      dialog.removeEventListener('close', handleClose)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') onClose()
  }

  return createPortal(
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- клик по подложке dialog, клавиатура обработана onKeyDown
    <dialog
      ref={dialogRef}
      className={cn(styles.modal, className)}
      data-testid={dataTestId}
      aria-label={title}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          data-testid="modal-close"
          onClick={onClose}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className={styles.scroll}>{children}</div>
    </dialog>,
    document.body,
  )
}
