---
name: cv-content
description: Редактирование контента CV-портфолио (данные в entities, переводы ru/en в locales). Используй, когда нужно обновить данные профиля, опыт, проекты, стек или тексты секций на обоих языках.
---

# CV Content

## Как устроен контент

- Статичные факты (периоды, ссылки, названия, теги): `src/entities/<slice>/model/<slice>.ts`
- Типы: `src/entities/<slice>/model/types.ts`
- Тексты (заголовки, описания, переводы): `locales/ru.json` (источник истины), `locales/en.json`, `locales/de.json` — зеркала

## Правила при редактировании

1. Структура ключей во ВСЕХ локалях (ru/en/de) должна совпадать 1:1 —
   иначе упадёт `tests/tools/i18n-parity.test.ts`.
2. Каждый ключ, на который ссылается entity (roleKey, textKey, titleKey, nameKey),
   должен существовать во ВСЕХ локалях — проверяет `tests/tools/data.test.ts`.
3. Не переводи «напрасно» теги и названия технологий (React, TypeScript) —
   они одинаковы во всех языках.
4. Новые проекты добавляй в `projects` (массив) с `repoUrl` и опциональным `demoUrl`.
5. Демо-фичи (модалки/RTK Query): ключи `respondForm.*` и `githubRepos.*` тоже
   обязаны быть во всех локалях.

## Проверка после правок

```bash
npm run check
```

## Профиль

Имя/контакты: `src/entities/profile/model/profile.ts`:

- `name`: Илья Ивановский (display name — выводится в UI)
- `fullName`: Ивановский Илья Петрович (для официальных документов/PDF)
- `email`: domovikx@gmail.com
- `phone`: НЕ заполнен — попроси у пользователя номер и добавь (кнопка появится сама)
- `telegram`: https://t.me/Domovikx (основной канал связи)
- `github`: https://github.com/DomovikX
- `resumeUrl`: генерится из `resume.pdf`, не менять вручную
