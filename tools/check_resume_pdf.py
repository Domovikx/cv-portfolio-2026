"""Проверка PDF-резюме: количество страниц, отступы сверху, границы секций.

Запуск: python tools/check_resume_pdf.py [lang ...]
Нужно: pip install pypdf pypdfium2
"""
import re
import sys

import pypdf
import pypdfium2 as pdfium

RESUME_DIR = 'src/entities/profile/model/resume'
MM_PX_72DPI = 10 / 25.4 * 72

SECTION_TITLES = {
    'ru': ['О СЕБЕ', 'НАВЫКИ', 'ОПЫТ РАБОТЫ', 'ПРОЕКТЫ', 'ОБРАЗОВАНИЕ'],
    'en': ['ABOUT', 'SKILLS', 'EXPERIENCE', 'PROJECTS', 'EDUCATION'],
    'de': ['ÜBER MICH', 'FÄHIGKEITEN', 'BERUFSERFAHRUNG', 'PROJEKTE', 'BILDUNG'],
    'zh': ['关于我', '技能', '工作经历', '项目', '教育'],
}

# Содержимое, которое ОБЯЗАНО быть в PDF, чтобы не разъехалось с контентом
# сайта (локали/entities). При правке контента — перегенерируй PDF:
# node tools/make_resume_pdf.mts, иначе эта проверка упадёт.
CONTENT_SNIPPETS = {
    'ru': [
        'Ивановский Илья Петрович',
        '2026',
        'ITFB Group',
        'фанфики по Гарри Поттеру',
        'настольные ролевые игры',
    ],
    'en': [
        'Ilya Ivanovsky',
        'ITFB Group',
        'Harry Potter fanfiction',
        'tabletop role-playing games',
    ],
    'de': [
        'Ilya Ivanovsky',
        'ITFB Group',
        'Harry-Potter-Fanfiction',
    ],
    'zh': [
        '伊利亚·伊万诺夫斯基',
        'ITFB Group',
        '哈利·波特同人作品',
    ],
}

LANGS = sys.argv[1:] or ['ru', 'en', 'de', 'zh']

fails = 0

for lang in LANGS:
    path = f'{RESUME_DIR}/resume-{lang}.pdf'
    reader = pypdf.PdfReader(path)
    pdf = pdfium.PdfDocument(path)
    print(f'=== {lang}: {len(reader.pages)} страниц ===')

    full_text = ''
    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ''
        full_text += text
        clean = ' '.join(text.split())

        # отступ сверху: рендер и поиск первого не-белого ряда пикселей
        bmp = pdf[i].render(scale=1.0)
        img = bmp.to_pil()
        w, h = img.size
        px = img.load()
        top_offset = None
        for y in range(h):
            for x in range(0, w, 4):
                r, g, b = px[x, y][:3]
                if r < 245 or g < 245 or b < 245:
                    top_offset = y
                    break
            if top_offset is not None:
                break
        margin_ok = top_offset is not None and top_offset >= MM_PX_72DPI - 3
        print(f'  p{i + 1}: отступ сверху={top_offset}px (норма >= {MM_PX_72DPI:.0f}px)'
              f' {"OK" if margin_ok else "!! БАГ: контент впритык к краю"}')

        # какие заголовки секций попали на страницу
        found = []
        for title in SECTION_TITLES.get(lang, []):
            norm_title = ' '.join(title.split())
            if norm_title in clean or re.sub(r'\s+', '', norm_title) in re.sub(r'\s+', '', clean):
                found.append(title)
        print(f'      секции: {", ".join(found) or "-"}')

    # свежесть контента: PDF не должен отставать от локалей/entities
    # (буквы в PDF могут быть разрежены пробелами — нормализуем оба текста)
    norm_full = re.sub(r'\s+', '', full_text)
    missing = []
    for snippet in CONTENT_SNIPPETS.get(lang, []):
        if re.sub(r'\s+', '', snippet) not in norm_full:
            missing.append(snippet)
    if missing:
        fails += 1
        print(f'  !! ПРОБЛЕМА: PDF устарел — не содержит: {", ".join(missing)}')
        print('      Перегенерируй: node tools/make_resume_pdf.mts')
    else:
        print('  контент свежий: все ключевые фрагменты на месте OK')

    pdf.close()

print('\nГотово. Ожидаемо: 2 страницы, отступы ~28px, свежий контент.')
if fails:
    print(f'!! НАЙДЕНО ПРОБЛЕМ: {fails} — перегенерируй PDF (node tools/make_resume_pdf.mts)')
    sys.exit(1)