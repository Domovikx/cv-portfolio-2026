import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ['./src/**'],
    rules: {
      'fsd/no-public-api-sidestep': 'error',
      // CV-лендинг: виджеты-секции используются один раз — это нормально
      'fsd/insignificant-slice': 'off',
      // "providers" — канонический сегмент app-слоя FSD
      'fsd/segments-by-purpose': 'off',
    },
  },
])
