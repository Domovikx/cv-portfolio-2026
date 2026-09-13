import { useTranslation } from 'react-i18next'

import { profile } from '@/entities/profile'
import { LanguageSwitcher } from '@/features/language-switcher'
import { Button, Container } from '@/shared/ui'

import styles from './Header.module.css'

const NAV_KEYS = ['about', 'stack', 'experience', 'education', 'projects', 'contacts'] as const

export const Header = () => {
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a href="#top" className={styles.logo}>
          <span className={styles.logoMark}>И</span>
          <span className={styles.logoText}>{profile.name}</span>
        </a>
        <nav className={styles.nav} aria-label="Main" data-testid="nav">
          {NAV_KEYS.map((key) => (
            <a key={key} className={styles.link} href={`#${key}`}>
              {t(`header.nav.${key}`)}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <LanguageSwitcher />
          <Button href={profile.telegram} target="_blank" rel="noreferrer">
            {t('header.cta')}
          </Button>
        </div>
      </Container>
    </header>
  )
}
