import type { TranslationKey } from '@/shared/config'

export type Project = {
  titleKey: TranslationKey
  textKey: TranslationKey
  repoUrl: string
  demoUrl?: string
  tags: string[]
}
