import { LANGS, i18n } from '@/shared/config'

declare global {
  interface Window {
    __cv?: {
      stats: () => Record<string, unknown>
      stack: () => readonly string[]
      langs: () => readonly string[]
    }
  }
}

const logCv = () => {
  console.log(
    '%c CV PORTFOLIO 2026 %c привет! ',
    'background:#ef3124;color:#fff;font-weight:700;padding:4px 10px;border-radius:4px 0 0 4px;',
    'background:#2c2c2c;color:#fff;padding:4px 10px;border-radius:0 4px 4px 0;',
  )
  console.log(
    '%cЭто живое портфолио, а не статичная страница:\nReact 19 · TypeScript · Vite · Feature-Sliced Design · RTK Query · i18n (ru/en/de)\nКод открыт: https://github.com/DomovikX/cv-portfolio-2026\n\nПопробуй window.__cv.stats() — покажу, из чего собран этот сайт.',
    'color:#555;font-size:12px;line-height:1.6;',
  )
}

const stats = (): Record<string, unknown> => {
  return {
    sections: document.querySelectorAll('section').length,
    buttons: document.querySelectorAll('button').length,
    links: document.querySelectorAll('a').length,
    images: document.querySelectorAll('img').length,
    language: i18n.language,
    rendered: 'React 19 (virtual DOM)',
  }
}

export const initEasterEgg = (): void => {
  if (typeof window === 'undefined' || window.__cv) return
  window.__cv = {
    stats,
    stack: () => ['React 19', 'TypeScript', 'Vite', 'RTK Query', 'Feature-Sliced Design'],
    langs: () => LANGS,
  }
  logCv()
}
