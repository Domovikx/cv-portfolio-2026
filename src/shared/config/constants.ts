export const STORAGE_KEYS = {
  theme: 'cv-portfolio-2026:theme',
  lang: 'cv-portfolio-2026:lang',
} as const

export const RESUME_FILE = {
  prefix: 'Ivanovsky-Ilya-',
  ext: '.pdf',
} as const

export const SNACKBAR_HIDE_MS = 10000

export const SECTION_IDS = {
  about: 'about',
  stack: 'stack',
  experience: 'experience',
  education: 'education',
  projects: 'projects',
  contacts: 'contacts',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]
