import '@testing-library/jest-dom/vitest'
import { beforeEach } from 'vitest'

import { DEFAULT_LANG, i18n } from '@/shared/config'

beforeEach(() => {
  localStorage.clear()
  void i18n.changeLanguage(DEFAULT_LANG)
})
