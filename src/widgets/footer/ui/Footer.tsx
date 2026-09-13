import { useTranslation } from 'react-i18next'

import { profile } from '@/entities/profile'
import { site } from '@/shared/config'
import { Container } from '@/shared/ui'

import styles from './Footer.module.css'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p>{t('footer.copyright')}</p>
        <p>{t('footer.madeWith')}</p>
        <div className={styles.links}>
          <a className={styles.link} href={profile.github} target="_blank" rel="noreferrer">
            github.com/DomovikX
          </a>
          <a className={styles.link} href={profile.stackoverflow} target="_blank" rel="noreferrer">
            stackoverflow.com/users/10356832
          </a>
          <a className={styles.link} href={site.repoUrl} target="_blank" rel="noreferrer">
            {t('footer.sourceCode')}
          </a>
        </div>
      </Container>
    </footer>
  )
}
