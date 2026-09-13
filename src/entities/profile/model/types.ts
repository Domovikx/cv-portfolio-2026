import type { TranslationKey } from '@/shared/config'

export type Profile = {
  name: string
  fullName: string
  roleKey: TranslationKey
  locationKey: TranslationKey
  email: string
  phone: string
  telegram: string
  github: string
}
