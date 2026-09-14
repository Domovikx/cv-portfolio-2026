import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { profile } from '@/entities/profile'
import { LanguageSwitcher } from '@/features/language-switcher'
import { ThemeToggle } from '@/features/theme-toggle'
import { SECTION_IDS } from '@/shared/config'
import type { SectionId } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Button, Container } from '@/shared/ui'

import styles from './Header.module.css'

const NAV_KEYS: readonly SectionId[] = [
  SECTION_IDS.about,
  SECTION_IDS.stack,
  SECTION_IDS.experience,
  SECTION_IDS.education,
  SECTION_IDS.projects,
  SECTION_IDS.contacts,
]

export const Header = () => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = NAV_KEYS.map((key) => document.getElementById(key)).filter(
      (el): el is HTMLElement => el !== null,
    )

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href="#main">
        {t('header.skipToContent')}
      </a>
      <Container className={styles.inner}>
        <a href="#top" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoMark}>И</span>
          <span className={styles.logoText}>{profile.name}</span>
        </a>
        <nav className={styles.nav} aria-label="Main" data-testid="nav">
          {NAV_KEYS.map((key) => (
            <a
              key={key}
              className={cn(styles.link, activeSection === key && styles.linkActive)}
              href={`#${key}`}
              aria-current={activeSection === key ? 'true' : undefined}
            >
              {t(`header.nav.${key}`)}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <ThemeToggle />
          <LanguageSwitcher />
          <Button
            href={profile.telegram}
            target="_blank"
            rel="noreferrer"
            className={styles.cta}
            aria-label={t('header.cta')}
          >
            <svg
              className={styles.ctaIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            <span className={styles.ctaText}>{t('header.cta')}</span>
          </Button>
          <button
            type="button"
            className={cn(styles.burger, menuOpen && styles.burgerOpen)}
            aria-label={t('header.menu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </Container>
      {menuOpen ? (
        <nav className={styles.mobileMenu} aria-label="Main">
          {NAV_KEYS.map((key) => (
            <a
              key={key}
              className={cn(styles.mobileLink, activeSection === key && styles.mobileLinkActive)}
              href={`#${key}`}
              onClick={closeMenu}
            >
              {t(`header.nav.${key}`)}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
