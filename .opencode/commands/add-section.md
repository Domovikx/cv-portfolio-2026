---
description: Добавить новую секцию-виджет на страницу CV (widgets + pages).
---

Добавь новую секцию CV на главную страницу. Используй скилл cv-content для
текстов. Шаблон виджета:

1. Создай `src/widgets/<name>/ui/<Name>.tsx` + `<Name>.module.css` + `index.ts`
   (виджет использует `Section`, `Container`, `SectionTitle` из `@/shared/ui`).
2. Подключи виджет в `src/pages/home/ui/HomePage.tsx`.
3. Добавь пункт в навигацию `src/widgets/header/ui/Header.tsx`, если нужен
   якорь (id секции = ключ навигации).
4. Тексты добавь в `locales/ru.json` и `locales/en.json` (одинаковые ключи!).
5. Запусти `npm run check` и приведи вывод в порядок.
