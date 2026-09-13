import { describe, expect, it } from 'vitest'

import de from '../../locales/de.json'
import en from '../../locales/en.json'
import ru from '../../locales/ru.json'
import zh from '../../locales/zh.json'

const LOCALES = { ru, en, de, zh } as const

type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }

const toJsonValue = (value: unknown): JsonValue => {
  return value as JsonValue
}

const flattenKeys = (value: unknown, prefix = ''): string[] => {
  const obj = toJsonValue(value)

  if (Array.isArray(obj)) {
    return obj.flatMap((item, index) => flattenKeys(item, `${prefix}.${index}`))
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).flatMap(([key, child]) =>
      flattenKeys(child, prefix ? `${prefix}.${key}` : key),
    )
  }

  return prefix ? [prefix] : []
}

const collectLeafValues = (value: unknown, result: string[] = []): string[] => {
  const obj = toJsonValue(value)

  if (Array.isArray(obj)) {
    for (const item of obj) collectLeafValues(item, result)
  } else if (obj !== null && typeof obj === 'object') {
    for (const child of Object.values(obj)) collectLeafValues(child, result)
  } else if (typeof obj === 'string') {
    result.push(obj)
  }

  return result
}

describe('i18n parity (обратный перевод между всеми локалями)', () => {
  const names = Object.keys(LOCALES)
  const keySets = Object.fromEntries(
    Object.entries(LOCALES).map(([name, data]) => [name, flattenKeys(data).sort()]),
  )

  it('все локали имеют одинаковый набор ключей', () => {
    const reference = keySets.ru
    for (const name of names) {
      expect(keySets[name], `локаль ${name}`).toEqual(reference)
    }
  })

  it('ни в одной локали нет пустых переводов', () => {
    for (const [name, data] of Object.entries(LOCALES)) {
      const empty = collectLeafValues(data).filter((value) => value.trim() === '')
      expect(empty, `локаль ${name}`).toEqual([])
    }
  })
})
