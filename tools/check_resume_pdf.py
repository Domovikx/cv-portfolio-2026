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

LANGS = sys.argv[1:] or ['ru', 'en', 'de', 'zh']

for lang in LANGS:
    path = f'{RESUME_DIR}/resume-{lang}.pdf'
    reader = pypdf.PdfReader(path)
    pdf = pdfium.PdfDocument(path)
    print(f'=== {lang}: {len(reader.pages)} страниц ===')

    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ''
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

    pdf.close()

print('\nГотово. Ожидаемо: 2 страницы, обе с отступом ~28px, разрывы по границам секций.')