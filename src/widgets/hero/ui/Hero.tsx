import { useTranslation } from 'react-i18next'

import { profile } from '@/entities/profile'
import { ResumeDownloadButton } from '@/features/resume-download'
import { VoiceIntro } from '@/features/voice-intro'
import { SECTION_IDS } from '@/shared/config'
import { Button, Chip, Container } from '@/shared/ui'

import portrait from './portrait.webp'
import styles from './Hero.module.css'

export const Hero = () => {
  const { t } = useTranslation()
  const chips = t('hero.chips', { returnObjects: true }) as string[]

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
            <ResumeDownloadButton size="l" variant="white" className={styles.actionBtn} />
            <Button
              href={`#${SECTION_IDS.projects}`}
              variant="ghost"
              size="l"
              className={styles.actionBtn}
            >
              {t('hero.ctaSecondary')}
            </Button>
          </div>
        </div>
        <img
          className={styles.portrait}
          src={portrait}
          alt={t('hero.photoAlt')}
          decoding="async"
          fetchPriority="high"
        />
      </Container>
    </section>
  )
}
