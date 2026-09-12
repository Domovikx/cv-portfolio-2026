import { describe, expect, it } from 'vitest'

import en from '../../locales/en.json'
import ru from '../../locales/ru.json'

type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }

function toJsonValue(value: unknown): JsonValue {
  return value as JsonValue
}

function flattenKeys(value: unknown, prefix = ''): string[] {
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

function collectLeafValues(value: unknown, result: string[] = []): string[] {
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

describe('i18n parity (обратный перевод en ↔ ru)', () => {
  it('en has exactly the same key set as ru', () => {
    expect(flattenKeys(en).sort()).toEqual(flattenKeys(ru).sort())
  })

  it('ru has no empty translations', () => {
    const empty = collectLeafValues(ru).filter((value) => value.trim() === '')
    expect(empty).toEqual([])
  })

  it('en has no empty translations', () => {
    const empty = collectLeafValues(en).filter((value) => value.trim() === '')
    expect(empty).toEqual([])
  })
})
