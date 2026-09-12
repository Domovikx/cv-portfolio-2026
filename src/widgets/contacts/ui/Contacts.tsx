import { useTranslation } from 'react-i18next'

import { profile } from '@/entities/profile'
import { Button, Container, Section } from '@/shared/ui'

import styles from './Contacts.module.css'

export function Contacts() {
  const { t } = useTranslation()

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
          <Button href={`mailto:${profile.email}`} size="l">
            {t('contacts.emailCta')}
          </Button>
          <Button href={profile.github} variant="ghost" size="l" target="_blank" rel="noreferrer">
            {t('contacts.githubCta')}
          </Button>
          <Button
            href={profile.resumeUrl}
            variant="white"
            size="l"
            download="Ivanovsky-Ilya-resume.pdf"
          >
            {t('contacts.resumeCta')}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
