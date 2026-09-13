import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { Lang } from '@/shared/config'

import de from '../assets/intro-de.mp3'
import en from '../assets/intro-en.mp3'
import ru from '../assets/intro-ru.mp3'
import styles from './VoiceIntro.module.css'

const AUDIO: Record<Lang, string> = { ru, en, de }

export const VoiceIntro = () => {
  const { t, i18n } = useTranslation()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState<number | null>(null)
  const lang = i18n.language as Lang

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = AUDIO[lang] ?? AUDIO.ru
    setPlaying(false)
  }, [lang])

  const handleToggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }

    audio.src = AUDIO[lang] ?? AUDIO.ru
    void audio.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    )
  }

  const handleEnded = () => setPlaying(false)

  return (
    <button
      type="button"
      className={`${styles.player}${playing ? ` ${styles.playing}` : ''}`}
      onClick={handleToggle}
      aria-pressed={playing}
      data-testid="voice-intro"
    >
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- голосовое приветствие дублируется текстом на странице (greeting/subtitle) */}
      <audio
        ref={audioRef}
        src={AUDIO[lang] ?? AUDIO.ru}
        onEnded={handleEnded}
        onLoadedMetadata={(event) => setDuration(Math.round(event.currentTarget.duration))}
      />
      <span className={styles.icon} aria-hidden="true">
        {playing ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        )}
      </span>
      <span className={styles.label}>{t('hero.listen')}</span>
      {duration !== null ? (
        <>
          <span aria-hidden="true">·</span>
          <span className={styles.duration}>{duration} с</span>
        </>
      ) : null}
    </button>
  )
}
