import type { Lang } from '@/shared/config'

import de from './resume/resume-de.pdf'
import en from './resume/resume-en.pdf'
import ru from './resume/resume-ru.pdf'
import zh from './resume/resume-zh.pdf'

export const resumeFiles: Record<Lang, string> = { ru, en, de, zh }
