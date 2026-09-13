import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { profile, resumeFiles } from '@/entities/profile'
import { RespondForm } from '@/features/respond-form'
import type { Lang } from '@/shared/config'
import { Button, Container, Section } from '@/shared/ui'

import styles from './Contacts.module.css'

export const Contacts = () => {
  const { t, i18n } = useTranslation()
  const [respondOpen, setRespondOpen] = useState(false)
  const lang = i18n.language as Lang

  return (
    <Section id="contacts" variant="gray">
      <Container className={styles.content}>
        <h2 className={styles.title}>{t('contacts.title')}</h2>
        <p className={styles.text}>{t('contacts.text')}</p>
        <span className={styles.availability}>
          <span className={styles.dot} aria-hidden="true" />
          {t('contacts.availability')}
        </span>
        <div className={styles.actions}>
          <Button size="l" data-testid="respond-open" onClick={() => setRespondOpen(true)}>
            {t('contacts.respondCta')}
          </Button>
          <Button href={profile.telegram} size="l" variant="ghost" target="_blank" rel="noreferrer">
            {t('contacts.telegramCta')}
          </Button>
          {profile.phone ? (
            <span className={styles.phone} title={t('contacts.phoneHint')}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2z" />
              </svg>
              {profile.phone}
            </span>
          ) : null}
          <Button href={`mailto:${profile.email}`} variant="ghost" size="l">
            {t('contacts.emailCta')}
          </Button>
          <Button href={profile.github} variant="ghost" size="l" target="_blank" rel="noreferrer">
            {t('contacts.githubCta')}
          </Button>
          <Button
            href={resumeFiles[lang]}
            variant="white"
            size="l"
            download={`Ivanovsky-Ilya-${lang}.pdf`}
          >
            {t('contacts.resumeCta')}
          </Button>
        </div>
      </Container>
      <RespondForm open={respondOpen} onClose={() => setRespondOpen(false)} />
    </Section>
  )
}
