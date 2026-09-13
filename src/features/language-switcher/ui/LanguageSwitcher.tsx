import { useTranslation } from 'react-i18next'

import { LANGS, setLang } from '@/shared/config'
import type { Lang } from '@/shared/config'
import { cn } from '@/shared/lib'

import styles from './LanguageSwitcher.module.css'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage as Lang

  return (
    <div className={styles.switcher}>
      {LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          className={cn(styles.item, current === lang && styles.active)}
          data-testid={`lang-${lang}`}
          onClick={() => setLang(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
