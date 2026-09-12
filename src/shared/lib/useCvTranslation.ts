import { useTranslation } from 'react-i18next'

import type { TranslationKey } from '@/shared/config'

export function useCvTranslation(): (key: TranslationKey) => string {
  const { t } = useTranslation()
  return (key) => t(key as never)
}
