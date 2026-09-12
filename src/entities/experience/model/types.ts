import type { TranslationKey } from '@/shared/config'

export type ExperienceItem = {
  period: string
  roleKey: TranslationKey
  company: string
  textKey: TranslationKey
  tags: string[]
}
