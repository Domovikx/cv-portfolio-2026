import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/800.css'
import '@fontsource/montserrat/900.css'
import './styles/tokens.css'
import './styles/global.css'
import App from './App'
import { initEasterEgg } from './easter-egg'
import { AppProviders } from './providers'

initEasterEgg()

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
