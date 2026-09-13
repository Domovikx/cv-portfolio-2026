import { describe, expect, it } from 'vitest'

import de from '../../locales/de.json'
import en from '../../locales/en.json'
import ru from '../../locales/ru.json'
import { experienceItems } from '@/entities/experience'
import { profile } from '@/entities/profile'
import { projects } from '@/entities/project'
import { skillGroups } from '@/entities/skill'

const LOCALES = { ru, en, de } as const

type RecordValue = { [key: string]: unknown }

function getByPath(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === 'object' && key in (acc as RecordValue)) {
      return (acc as RecordValue)[key]
    }
    return undefined
  }, source)
}

describe('CV data integrity (данные ↔ переводы)', () => {
  it('profile has name, email and links', () => {
    expect(profile.name).toBeTruthy()
    expect(profile.fullName).toContain('Илья')
    expect(profile.fullName).toContain('Ивановский')
    expect(profile.email).toMatch(/@/)
    expect(profile.github).toMatch(/^https:\/\//)
    expect(profile.resumeUrl).toMatch(/\.pdf/)
    for (const locale of Object.values(LOCALES)) {
      expect(typeof getByPath(locale, profile.roleKey)).toBe('string')
    }
  })

  it('every experience item has translated role and text in all locales', () => {
    expect(experienceItems.length).toBeGreaterThanOrEqual(3)
    for (const item of experienceItems) {
      expect(item.period).toBeTruthy()
      expect(item.tags.length).toBeGreaterThan(0)
      for (const key of [item.roleKey, item.textKey]) {
        for (const [name, locale] of Object.entries(LOCALES)) {
          expect(typeof getByPath(locale, key), `${name} missing key: ${key}`).toBe('string')
        }
      }
    }
  })

  it('every project has repo link and translated title in all locales', () => {
    for (const project of projects) {
      expect(project.repoUrl).toMatch(/^https:\/\//)
      for (const key of [project.titleKey, project.textKey]) {
        for (const [name, locale] of Object.entries(LOCALES)) {
          expect(typeof getByPath(locale, key), `${name} missing key: ${key}`).toBe('string')
        }
      }
    }
  })

  it('every skill group has a translated name and non-empty items', () => {
    for (const group of skillGroups) {
      expect(group.items.length).toBeGreaterThan(0)
      for (const [name, locale] of Object.entries(LOCALES)) {
        expect(
          typeof getByPath(locale, group.nameKey),
          `${name} missing key: ${group.nameKey}`,
        ).toBe('string')
      }
    }
  })
})
