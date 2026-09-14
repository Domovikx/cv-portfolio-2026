import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/800.css'
import './styles/tokens.css'
import './styles/global.css'
import App from './App'
import { AppProviders } from './providers'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
