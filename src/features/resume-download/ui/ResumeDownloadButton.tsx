import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { resumeFiles } from '@/entities/profile'
import { RESUME_FILE } from '@/shared/config'
import type { Lang } from '@/shared/config'
import { Button, Snackbar } from '@/shared/ui'
import type { ButtonProps } from '@/shared/ui'

import { downloadFile } from '../lib/downloadFile'
import styles from './ResumeDownloadButton.module.css'

export type ResumeDownloadButtonProps = Pick<ButtonProps, 'size' | 'variant' | 'className'>

type DownloadStatus = 'idle' | 'loading' | 'done' | 'error'

export const ResumeDownloadButton = ({
  size = 'l',
  variant = 'white',
  className,
}: ResumeDownloadButtonProps) => {
  const { t, i18n } = useTranslation()
  const [status, setStatus] = useState<DownloadStatus>('idle')
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)
  const lang = i18n.language as Lang
  const fileUrl = resumeFiles[lang]

  const handleClick = async () => {
    if (status !== 'idle') return
    setStatus('loading')
    try {
      await downloadFile(fileUrl, `${RESUME_FILE.prefix}${lang}${RESUME_FILE.ext}`)
      setStatus('done')
      setSnackbarMessage(t('resumeDownload.success'))
    } catch {
      setStatus('error')
      setSnackbarMessage(t('resumeDownload.error'))
    }
  }

  // Кнопка блокируется до закрытия снекбара (6с) — синхронно с кольцом-таймером
  const handleSnackbarClose = () => {
    setSnackbarMessage(null)
    setStatus('idle')
  }

  const handleOpen = () => {
    window.open(fileUrl, '_blank', 'noopener')
    handleSnackbarClose()
  }

  const isDone = status === 'done'

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        disabled={status !== 'idle'}
        onClick={() => void handleClick()}
        data-testid="resume-download"
      >
        {status === 'loading' ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : status === 'error' ? (
          <svg
            className={styles.errorIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        ) : isDone ? (
          <svg
            className={styles.check}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m7 10 5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
        )}
        {t('contacts.resumeCta')}
      </Button>
      {snackbarMessage !== null ? (
        <Snackbar
          open
          message={snackbarMessage}
          actionLabel={isDone ? t('resumeDownload.open') : undefined}
          onAction={handleOpen}
          onClose={handleSnackbarClose}
        />
      ) : null}
    </>
  )
}
