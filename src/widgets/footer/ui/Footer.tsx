import { useTranslation } from 'react-i18next'

import { profile } from '@/entities/profile'
import { site } from '@/shared/config'
import { Container } from '@/shared/ui'

import styles from './Footer.module.css'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p>{t('footer.copyright')}</p>
        <p>{t('footer.madeWith')}</p>
        <a className={styles.github} href={site.repoUrl} target="_blank" rel="noreferrer">
          {profile.github.replace('https://', '')}
        </a>
      </Container>
    </footer>
  )
}
