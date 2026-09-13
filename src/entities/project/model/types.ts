import type { TranslationKey } from '@/shared/config'

export type Project = {
  titleKey: TranslationKey
  textKey: TranslationKey
  year: string
  statusKey: TranslationKey
  repoUrl: string
  demoUrl?: string
  tags: string[]
}
