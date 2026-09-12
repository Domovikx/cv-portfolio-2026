import { useTranslation } from 'react-i18next'

import { profile } from '@/entities/profile'
import { LanguageSwitcher } from '@/features/language-switcher'
import { Button, Container } from '@/shared/ui'

import styles from './Header.module.css'

const NAV_KEYS = ['about', 'stack', 'experience', 'projects', 'contacts'] as const

export function Header() {
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a href="#top" className={styles.logo}>
          <span className={styles.logoMark}>D</span>
          <span>{profile.name}</span>
        </a>
        <nav className={styles.nav} aria-label="Main">
          {NAV_KEYS.map((key) => (
            <a key={key} className={styles.link} href={`#${key}`}>
              {t(`header.nav.${key}`)}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <LanguageSwitcher />
          <Button href="#contacts">{t('header.cta')}</Button>
        </div>
      </Container>
    </header>
  )
}
