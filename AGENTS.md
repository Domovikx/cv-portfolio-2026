# cv-portfolio-2026 — CV-портфолио фронтенд-разработчика

## Правила для AI-агента

- **НИКОГДА не коммитить и не пушить без явного разрешения пользователя.**
- Не использовать брендовые элементы Альфа-Банка (логотип, шрифтовые знаки).
  Разрешён визуальный язык: палитра, скругления, анимации, сетка.
- Русский язык — источник истины для контента; `locales/ru.json` и
  `locales/en.json` должны иметь одинаковый набор ключей (проверяется тестами
  `tests/tools/i18n-parity.test.ts`).
- Контент CV — в entities (`src/entities/`), тексты — в `locales/`.
  Ключи i18n из данных проверяются тестом `tests/tools/data.test.ts`.

## Стек

- React 19 + TypeScript 6 (strict) + Vite 8
- Линтинг: oxlint (`npm run lint`), формат: Prettier 3 (`npm run format`)
- Архитектура: Feature-Sliced Design, проверка через steiger (`npm run fsd:check`)
- Тесты: Vitest + React Testing Library + jsdom (`npm test`)
- i18n: react-i18next, ru/en, переключатель в шапке
- Стили: CSS Modules + дизайн-токены (`src/app/styles/tokens.css`), микро-UI-kit (`src/shared/ui`)

## Структура (FSD)

```
src/
  app/        провайдеры, глобальные стили, точка входа, пасхалка (easter-egg)
  pages/      страницы (home)
  widgets/    блоки страницы: header, hero, about, stack, experience, projects, contacts, footer
  features/   language-switcher, respond-form (RTK Query mutation), github-repos (RTK Query query), voice-intro (аудио-приветствие)
  entities/   данные CV: profile, skill, experience, project
  shared/     config (i18n, site), api (RTK Query), lib (cn, useCvTranslation), ui (Button, Chip, Card, Container, Modal, Section, SectionTitle)
locales/      ru.json (источник истины), en.json, de.json
tests/        tests/components (рендер), tests/tools (интегритет данных и переводов)
```

Импорт между слоями только вниз: app → pages → widgets → features → entities → shared.
Public API модуля — только через `index.ts`.

## Команды

```bash
npm run dev          # dev-сервер
npm run check        # lint + format:check + fsd:check + test + build
npm run fsd:check    # проверка архитектуры FSD
npm run fsd:watch    # FSD-проверка в watch-режиме (при разработке)
npm test             # тесты (Vitest)
npm run deploy       # локальный деплой на gh-pages ветку
```

## Деплой

GitHub Actions (`.github/workflows/deploy.yml`) собирает и публикует на
GitHub Pages при пуше в main. Итоговая ссылка:
https://domovikx.github.io/cv-portfolio-2026/

## Данные

Имя: Илья Ивановский (полное ФИО — в `profile.fullName`, в UI не выводится).
Git: DomovikX / domovikx@gmail.com. Реальные ссылки на проекты — в
`src/entities/project/model/projects.ts`. Если добавил новый ключ перевода —
он должен появиться в ОБОИХ локалях, иначе упадёт тест parity.

## PDF-резюме

`src/entities/profile/model/resume.pdf` — генерируется скриптом
`tools/make_resume_pdf.py` (fpdf2, кириллица через Arial). После правки
контента CV перегенерируй: `python tools/make_resume_pdf.py` (нужен
`python -m pip install fpdf2`).
