import type { TranslationKey } from '@/shared/config'

export type Profile = {
  name: string
  roleKey: TranslationKey
  locationKey: TranslationKey
  email: string
  github: string
  resumeUrl: string
}
