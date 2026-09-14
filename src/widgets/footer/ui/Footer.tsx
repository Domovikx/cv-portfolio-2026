import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { profile } from '@/entities/profile'
import { site } from '@/shared/config'
import { Container } from '@/shared/ui'

import styles from './Footer.module.css'

const GithubIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
)

const TelegramIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 4.2 2.9 11.7c-.8.3-.8 1.1 0 1.4l4.5 1.6 1.7 5.2c.2.7 1 .9 1.5.4l2.4-2.2 4.4 3.2c.6.4 1.3.1 1.5-.6l3.5-15.5c.2-.9-.7-1.6-1.4-1.2z" />
  </svg>
)

const StackOverflowIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.155z" />
  </svg>
)

const MailIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)

type Social = {
  href: string
  label: string
  icon: ReactNode
}

const SOCIALS: Social[] = [
  { href: profile.telegram, label: 'Telegram', icon: TelegramIcon },
  { href: profile.github, label: 'GitHub', icon: GithubIcon },
  { href: profile.stackoverflow, label: 'Stack Overflow', icon: StackOverflowIcon },
  { href: `mailto:${profile.email}`, label: 'Email', icon: MailIcon },
]

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <a href="#top" className={styles.logo}>
            <span className={styles.logoMark}>И</span>
            <span>{profile.name}</span>
          </a>
          <div className={styles.socials}>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                className={styles.iconButton}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.madeWith')}</p>
          <a className={styles.sourceLink} href={site.repoUrl} target="_blank" rel="noreferrer">
            {t('footer.sourceCode')}
          </a>
        </div>
      </Container>
    </footer>
  )
}
