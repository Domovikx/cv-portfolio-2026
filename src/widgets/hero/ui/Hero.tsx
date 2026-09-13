import { useTranslation } from 'react-i18next'

import { profile, resumeFiles } from '@/entities/profile'
import { VoiceIntro } from '@/features/voice-intro'
import type { Lang } from '@/shared/config'
import { Button, Chip, Container } from '@/shared/ui'

import portrait from './portrait.webp'
import styles from './Hero.module.css'

export const Hero = () => {
  const { t, i18n } = useTranslation()
  const chips = t('hero.chips', { returnObjects: true }) as string[]
  const lang = i18n.language as Lang

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.blobs} aria-hidden="true">
        <div className={styles.blobPurple} />
        <div className={styles.blobRed} />
      </div>
      <Container className={styles.content}>
        <div className={styles.textBlock}>
          <p className={styles.greeting}>
            {t('hero.greeting')} <VoiceIntro />
          </p>
          <h1 className={styles.title} data-testid="hero-title">
            {t('hero.roleMain')} <span className={styles.titleAccent}>{t('hero.roleAccent')}</span>
          </h1>
          <p className={styles.subtitle}>{t('hero.subtitle')}</p>
          <div className={styles.chips}>
            {chips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
          <div className={styles.actions}>
            <Button
              href={profile.telegram}
              size="l"
              className={styles.actionBtn}
              target="_blank"
              rel="noreferrer"
            >
              {t('hero.ctaPrimary')}
            </Button>
            <Button
              href={resumeFiles[lang]}
              variant="white"
              size="l"
              className={styles.actionBtn}
              download={`Ivanovsky-Ilya-${lang}.pdf`}
            >
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
              {t('contacts.resumeCta')}
            </Button>
            <Button href="#projects" variant="ghost" size="l" className={styles.actionBtn}>
              {t('hero.ctaSecondary')}
            </Button>
          </div>
        </div>
        <img className={styles.portrait} src={portrait} alt={t('hero.photoAlt')} />
      </Container>
    </section>
  )
}
