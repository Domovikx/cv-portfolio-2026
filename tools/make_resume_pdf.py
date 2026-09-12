#!/usr/bin/env python3
"""Генерация PDF-резюме для CV-портфолио (fpdf2, Arial, кириллица)."""
import os
from fpdf import FPDF

OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'entities', 'profile',
                   'model', 'resume.pdf')
FONT = 'C:/Windows/Fonts/arial.ttf'
FONT_BOLD = 'C:/Windows/Fonts/arialbd.ttf'
RED = (239, 49, 36)
DARK = (44, 44, 44)
GRAY = (100, 100, 100)

pdf = FPDF(format='A4')
pdf.set_auto_page_break(auto=True, margin=14)
pdf.set_margins(16, 9, 16)
pdf.add_font('Arial', '', FONT)
pdf.add_font('Arial', 'B', FONT_BOLD)
pdf.add_page()


def line(w=0, h=0):
    pdf.ln(w)
    pdf.ln(h)


def heading(text, size=14):
    pdf.set_font('Arial', 'B', size)
    pdf.set_text_color(*DARK)
    pdf.cell(0, 7, text, new_x='LMARGIN', new_y='NEXT')
    pdf.set_fill_color(*RED)
    pdf.rect(pdf.get_x(), pdf.get_y() + 0.5, 34, 1.2, 'F')
    pdf.ln(3)


def paragraph(text, size=9.5, color=GRAY, style='', lh=4.2):
    pdf.set_font('Arial', style, size)
    pdf.set_text_color(*color)
    pdf.multi_cell(0, lh, text, new_x='LMARGIN', new_y='NEXT')


# ── Заголовок ──────────────────────────────────────────────────────────────
pdf.set_font('Arial', 'B', 22)
pdf.set_text_color(*DARK)
pdf.cell(0, 10, 'ИЛЬЯ ИВАНОВСКИЙ', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('Arial', 'B', 13)
pdf.set_text_color(*RED)
pdf.cell(0, 7, 'Frontend-разработчик (React + Angular)', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('Arial', '', 9.5)
pdf.set_text_color(*GRAY)
pdf.cell(0, 5.5, 'Москва · удалённая работа | domovikx@gmail.com | github.com/DomovikX',
         new_x='LMARGIN', new_y='NEXT')
pdf.ln(5)

# ── О себе ─────────────────────────────────────────────────────────────────
heading('О СЕБЕ')
paragraph(
    'Фронтенд-разработчик с опытом React и Angular. Строю сложные формы, таблицы, '
    'фильтры и внутренние системы, следую best practices: Feature-Sliced Design, '
    'дизайн-токены, микро-UI-kit, типизация, тесты и CI/CD. Активно использую '
    'AI-инструменты в разработке и прототипировании.'
)
line(4)

# ── Навыки ─────────────────────────────────────────────────────────────────
heading('НАВЫКИ')
pdf.set_font('Arial', '', 9.5)
pdf.set_text_color(*DARK)
pdf.multi_cell(0, 5,
               'Фреймворки: React, Angular, Vue, React Router; '
               'языки: TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS, CSS Modules; '
               'интеграции: REST API, HTTP, OpenAPI/Swagger, Firebase; '
               'инструменты: Vite, Git, GitHub Pages, Figma, Vitest; '
               'AI-инструменты: opencode, LLM (Qwen), voice cloning (TTS).',
               new_x='LMARGIN', new_y='NEXT')
line(4)

# ── Опыт ───────────────────────────────────────────────────────────────────
heading('ОПЫТ')

pdf.set_font('Arial', 'B', 10)
pdf.set_text_color(*DARK)
pdf.cell(0, 5.5, '2023 — 2026', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('Arial', '', 9.5)
pdf.set_text_color(*DARK)
pdf.cell(0, 5.5, 'Интерфейсы и AI-инструменты · pet-проекты, open source',
         new_x='LMARGIN', new_y='NEXT')
paragraph('Локализация и AI-озвучка игры (Ren\'Py, Qwen voice cloning, ~67 тыс. реплик): '
          'инструменты генерации и каталогизации, чистка аудио, автоматизация на Python. '
          'Разработка с помощью opencode и локальных LLM.')
line(4)

pdf.set_font('Arial', 'B', 10)
pdf.set_text_color(*DARK)
pdf.cell(0, 5.5, '2021 — 2023', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('Arial', '', 9.5)
pdf.cell(0, 5.5, 'Frontend-разработчик (self-study) · pet-проекты и курсовая',
         new_x='LMARGIN', new_y='NEXT')
paragraph('Тестовые задания и учебные проекты: приложение на React с Firebase-бэкендом, '
          'курсовая на Angular 8 с роутингом и вёрсткой. Прошёл Rolling Scopes School.')
line(4)

pdf.set_font('Arial', 'B', 10)
pdf.set_text_color(*DARK)
pdf.cell(0, 5.5, '2020 — 2021', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('Arial', '', 9.5)
pdf.cell(0, 5.5, 'Изучение JavaScript · курс Andersen JS Course',
         new_x='LMARGIN', new_y='NEXT')
paragraph('Интенсив по JavaScript: структуры данных, async, DOM, основы React. '
          'Первые проекты: CRM на Vue + Firebase (диплом), магазин на React, '
          'игра на развитие внимания.')
line(4)

# ── Проекты ────────────────────────────────────────────────────────────────
heading('ПРОЕКТЫ')
projects = [
    ('vue_crm — CRM на Vue', 'Авторизация, сложные формы, таблицы, фильтры, CRUD. '
     'Vuex + Vuetify + Firebase. demo: vuecrm200711.web.app'),
    ('angular-nabludenie-by', 'Курсовая на Angular 8: роутинг, вёрстка, работа с данными. '
     'GitHub Pages.'),
    ('react_tz_2021', 'Тестовое задание на React: интеграция с REST-бэкендом, '
     'Firebase Hosting.'),
    ('The Survival of Sarah Rose', 'Русский перевод игры и полная AI-озвучка '
     '~67 тыс. реплик (Ren\'Py, Python, TTS).'),
]
for title, desc in projects:
    pdf.set_font('Arial', 'B', 9.5)
    pdf.set_text_color(*DARK)
    pdf.cell(0, 5, title, new_x='LMARGIN', new_y='NEXT')
    paragraph(desc)
    line(2)
line(2.5)

# ── Образование ────────────────────────────────────────────────────────────
heading('ОБРАЗОВАНИЕ')
paragraph('Rolling Scopes School — курс по JavaScript/TypeScript, 2023.')
paragraph('Andersen JS Course — интенсив по JavaScript, 2020.', lh=4.5)
line(4)

# ── Ссылки ─────────────────────────────────────────────────────────────────
heading('ССЫЛКИ')
pdf.set_font('Arial', '', 9.5)
pdf.set_text_color(*GRAY)
pdf.multi_cell(0, 5,
               'GitHub: github.com/DomovikX | Портфолио: '
               'domovikx.github.io/cv-portfolio-2026 | Почта: domovikx@gmail.com',
               new_x='LMARGIN', new_y='NEXT')

out = os.path.abspath(OUT); print('pages:', len(pdf.pages))
pdf.output(out)
print('saved', out, os.path.getsize(out), 'bytes')