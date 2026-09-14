import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import de from '../../../locales/de.json'
import en from '../../../locales/en.json'
import ru from '../../../locales/ru.json'
import zh from '../../../locales/zh.json'

export const LANGS = ['ru', 'zh', 'en', 'de'] as const
export type Lang = (typeof LANGS)[number]

export const DEFAULT_LANG: Lang = 'ru'

import { STORAGE_KEYS } from './constants'

const STORAGE_KEY = STORAGE_KEYS.lang

const getInitialLang = (): Lang => {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
  return LANGS.includes(saved as Lang) ? (saved as Lang) : DEFAULT_LANG
}

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
    de: { translation: de },
    zh: { translation: zh },
  },
  lng: getInitialLang(),
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
})

export const setLang = (lang: Lang): void => {
  localStorage.setItem(STORAGE_KEY, lang)
  void i18n.changeLanguage(lang)
}

type Primitive = string | number | boolean | null

type JoinPath<K extends string | number, P> = P extends string ? `${K}.${P}` : never

type TranslationPaths<T> = T extends Primitive
  ? never
  : T extends readonly unknown[]
    ? `${number}` | JoinPath<number, TranslationPaths<T[number]>>
    : {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | JoinPath<K, TranslationPaths<T[K]>>
          : never
      }[keyof T]

export type TranslationKey = TranslationPaths<typeof ru>

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof ru
    }
  }
}

export { i18n }
