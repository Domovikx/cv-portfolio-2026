---
name: cv-content
description: Редактирование контента CV-портфолио (данные в entities, переводы ru/en в locales). Используй, когда нужно обновить данные профиля, опыт, проекты, стек или тексты секций на обоих языках.
---

# CV Content

## Как устроен контент

- Статичные факты (периоды, ссылки, названия, теги): `src/entities/<slice>/model/<slice>.ts`
- Типы: `src/entities/<slice>/model/types.ts`
- Тексты (заголовки, описания, переводы): `locales/ru.json` (источник истины) и `locales/en.json` (зеркало)

## Правила при редактировании

1. Структура ключей в `ru.json` и `en.json` должна совпадать 1:1 —
   иначе упадёт `tests/tools/i18n-parity.test.ts`.
2. Каждый ключ, на который ссылается entity (roleKey, textKey, titleKey, nameKey),
   должен существовать в ОБОИХ локалях — проверяет `tests/tools/data.test.ts`.
3. Не переводи «напрасно» теги и названия технологий (React, TypeScript) —
   они одинаковы в обоих языках.
4. Новые проекты добавляй в `projects` (массив) с `repoUrl` и опциональным `demoUrl`.

## Проверка после правок

```bash
npm run check
```

## Профиль

Имя/контакты: `src/entities/profile/model/profile.ts`:

- `name`: Илья Ивановский (display name — выводится в UI)
- `fullName`: Ивановский Илья Петрович (для официальных документов/PDF)
- `email`: domovikx@gmail.com
- `github`: https://github.com/DomovikX
- `resumeUrl`: замени `#` на реальную ссылку на PDF-резюме
