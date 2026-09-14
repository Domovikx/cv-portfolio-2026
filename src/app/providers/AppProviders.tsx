import { useEffect, type PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'

import { profile } from '@/entities/profile'
import { i18n } from '@/shared/config'

import { ReduxProvider } from './ReduxProvider'

const syncDocumentMeta = () => {
  document.documentElement.lang = i18n.language
  document.title = `${profile.name} — ${i18n.t(profile.roleKey as never)}`
  const description = document.querySelector('meta[name="description"]')
  if (description) description.setAttribute('content', i18n.t('meta.description'))
}

export const AppProviders = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    syncDocumentMeta()
    i18n.on('languageChanged', syncDocumentMeta)
    return () => {
      i18n.off('languageChanged', syncDocumentMeta)
    }
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider>{children}</ReduxProvider>
    </I18nextProvider>
  )
}
