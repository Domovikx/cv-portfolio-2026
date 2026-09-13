import type { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'

import { i18n } from '@/shared/config'

import { ReduxProvider } from './ReduxProvider'

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider>{children}</ReduxProvider>
    </I18nextProvider>
  )
}
