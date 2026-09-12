# cv-portfolio-2026

CV-портфолио фронтенд-разработчика **Ильи Ивановского** (GitHub: DomovikX) —
живой проект, показывающий стек и подход к работе. Визуальный язык вдохновлён
сайтом карьеры Альфа-Банка (палитра, скругления, анимации) — без брендовых
элементов.

**Ссылка: https://domovikx.github.io/cv-portfolio-2026/**

## Стек

| Слой        | Технологии                                           |
| ----------- | ---------------------------------------------------- |
| UI          | React 19, TypeScript 6 (strict), Vite 8, CSS Modules |
| Архитектура | Feature-Sliced Design (проверка steiger)             |
| Качество    | oxlint, Prettier 3, Husky + lint-staged              |
| Тесты       | Vitest, React Testing Library, jsdom                 |
| i18n        | react-i18next (ru — источник истины, en — зеркало)   |
| Деплой      | GitHub Actions → GitHub Pages                        |

## Запуск

```bash
npm install
npm run dev       # dev-сервер
npm run check     # lint + format:check + fsd:check + test + build
```

## Структура

```
src/
  app/        провайдеры, глобальные стили, точка входа
  pages/      страницы (home)
  widgets/    header, hero, about, stack, experience, projects, contacts, footer
  features/   language-switcher
  entities/   profile, skill, experience, project (данные CV)
  shared/     config (i18n, site), lib (cn), ui (микро-UI-kit)
locales/      ru.json, en.json
tests/        components (рендер-тесты), tools (интегритет данных/переводов)
```

## Деплой

`push` в `main` → GitHub Actions собирает и публикует на GitHub Pages.
Локально: `npm run deploy` (ветка gh-pages).
