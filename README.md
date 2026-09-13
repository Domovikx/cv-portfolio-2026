# cv-portfolio-2026

CV-портфолио фронтенд-разработчика **Ильи Ивановского** (GitHub: DomovikX) —
живой проект, показывающий стек и подход к работе. Визуальный язык вдохновлён
сайтом карьеры Альфа-Банка (палитра, скругления, анимации) — без брендовых
элементов.

**Ссылка: https://domovikx.github.io/cv-portfolio-2026/**

## Стек

| Слой        | Технологии                                                                  |
| ----------- | --------------------------------------------------------------------------- |
| UI          | React 19, TypeScript 6 (strict), Vite 8, CSS Modules + дизайн-токены        |
| Архитектура | Feature-Sliced Design (проверка steiger, `npm run fsd:check`)               |
| Качество    | oxlint, Prettier 3, Husky + lint-staged                                     |
| Тесты       | Vitest, React Testing Library, jsdom, @testing-library/jest-dom             |
| i18n        | react-i18next: ru (источник истины), zh, en, de — зеркала (parity-тест)     |
| Данные      | Redux Toolkit / RTK Query (GitHub API, форма отклика), аудио-приветствие    |
| PDF         | `tools/make_resume_pdf.mts` (Node + Playwright, 4 языка, A4 цветная печать) |
| Деплой      | GitHub Actions → GitHub Pages                                               |

## Запуск

```bash
npm install
npm run dev       # dev-сервер → http://localhost:5173/cv-portfolio-2026/
npm run check     # lint + format:check + fsd:check + test + build (перед коммитом)
npm run fsd:check # проверка архитектуры FSD
npm run fsd:watch # FSD-проверка в watch-режиме
npm test          # тесты (Vitest)
npm run make:resume  # перегенерация PDF-резюме на 4 языках
npm run deploy    # локальный деплой на ветку gh-pages
```

> Локальный адрес содержит `/cv-portfolio-2026/` — такой же `base`, как на
> GitHub Pages (иначе собранные ссылки разъедутся).

## Возможности

- **Голосовое приветствие** — аудио-плеер в hero: 4 языка (ru/zh/en/de),
  сгенерировано через CosyVoice (клонирование голоса, эмоции)
- **RTK Query демо** — живой список репозиториев GitHub API (query + кэш) и
  форма «Откликнуться» (mutation, валидация, состояния)
- **Пасхалка** — стилизованный вывод в консоль + `window.__cv.stats()`
- **PDF-резюме** — скачивается на текущем языке интерфейса

## Структура

```
src/
  app/        провайдеры, глобальные стили, точка входа, пасхалка
  pages/      страницы (home)
  widgets/    header, hero, about, stack, experience, education, projects, contacts, footer
  features/   language-switcher, respond-form, github-repos, voice-intro
  entities/   profile, skill, experience, project (данные CV)
  shared/     config (i18n, site), api (RTK Query), lib (cn, useCvTranslation), ui (микро-UI-kit)
locales/      ru.json (источник истины), zh.json, en.json, de.json
tools/        make_resume_pdf.mts (генератор PDF, Playwright)
tests/        components (рендер-тесты), tools (интегритет данных/переводов)
```

## Деплой

`push` в `main` → GitHub Actions собирает и публикует на GitHub Pages.
Локально: `npm run deploy` (ветка gh-pages).

## Правила проекта

- Коммиты и пуш — только по явной просьбе; коммиты оформляются через скил
  `git-commit` (Conventional Commits)
- Тесты/`npm run check` — только перед коммитом
- Новый ключ перевода добавляется во ВСЕ локали (иначе упадёт parity-тест)
