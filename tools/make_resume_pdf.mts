/* oxlint-disable no-await-in-loop -- последовательная генерация PDF по языкам */
/**
 * Генератор PDF-резюме на 4 языках (ru/en/de/zh).
 * Playwright + Chromium, HTML-шаблон с дизайн-токенами сайта.
 * Запуск: node tools/make_resume_pdf.mts
 */
import { readFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

import { profile } from '../src/entities/profile/model/profile.ts'
import { experienceItems } from '../src/entities/experience/model/experience.ts'
import { projects } from '../src/entities/project/model/projects.ts'
import { skillGroups } from '../src/entities/skill/model/skills.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LANGS = ['ru', 'en', 'de', 'zh'] as const

// Имя в PDF по языку: кириллица для ru, латиница/транслит для остальных
const FULL_NAME_BY_LANG: Record<(typeof LANGS)[number], string> = {
  ru: profile.fullName,
  en: 'Ilya Ivanovsky',
  de: 'Ilya Ivanovsky',
  zh: '伊利亚·伊万诺夫斯基',
}

const locales = Object.fromEntries(
  LANGS.map((lang) => [
    lang,
    JSON.parse(readFileSync(join(ROOT, `locales/${lang}.json`), 'utf-8')),
  ]),
) as Record<(typeof LANGS)[number], Record<string, unknown>>

type Json = Record<string, unknown>

const getByPath = (obj: Json, path: string): unknown =>
  path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Json)) return (acc as Json)[key]
    return undefined
  }, obj)

const t = (lang: string, key: string): string =>
  String(getByPath(locales[lang as keyof typeof locales], key) ?? key)

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const fontFace = (subset: string, weight: number, range: string): string => {
  const file = join(
    ROOT,
    `node_modules/@fontsource/montserrat/files/montserrat-${subset}-${weight}-normal.woff2`,
  )
  const b64 = readFileSync(file).toString('base64')
  return `@font-face{font-family:'Montserrat PDF';font-style:normal;font-weight:${weight};font-display:swap;src:url(data:font/woff2;base64,${b64}) format('woff2');unicode-range:${range}}`
}

const FONTS = [
  fontFace(
    'cyrillic-ext',
    600,
    'U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
  ),
  fontFace('cyrillic', 600, 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'),
  fontFace(
    'latin-ext',
    600,
    'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
  ),
  fontFace(
    'latin',
    600,
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  ),
  fontFace(
    'cyrillic-ext',
    800,
    'U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
  ),
  fontFace('cyrillic', 800, 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'),
  fontFace(
    'latin-ext',
    800,
    'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
  ),
  fontFace(
    'latin',
    800,
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  ),
].join('\n')

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  @page { size: A4; margin: 10mm 13mm; }
  body {
    font-family: 'Montserrat PDF', 'Segoe UI', 'Microsoft YaHei', sans-serif;
    color: #2c2c2c; font-size: 8.4pt; line-height: 1.34;
  }
  .page { width: 100%; }
  .header { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 4.5mm; }
  .header-main h1 { font-weight: 800; font-size: 17pt; letter-spacing: 0.5px; }
  .header-main .role { font-weight: 800; color: #ef3124; font-size: 10.5pt; margin-top: 1mm; }
  .header-main .location { color: #888; font-size: 8.6pt; margin-top: 0.8mm; }
  .header-contacts { text-align: right; font-size: 8.5pt; color: #555; line-height: 1.7; }
  .header-contacts .item { white-space: nowrap; }
  .header-contacts .label { color: #aaa; }
  .rule { height: 3px; background: #ef3124; border-radius: 2px; margin-bottom: 3.5mm; }
  .section-title {
    font-weight: 800; font-size: 9.2pt; text-transform: uppercase; letter-spacing: 1.5px;
    color: #ef3124; margin-bottom: 1.2mm;
  }
  .section-rule { width: 30mm; height: 2px; background: #ef3124; border-radius: 2px; margin-bottom: 2.8mm; }
  .section { margin-bottom: 6.5mm; }
  .summary { color: #444; }
  .skills { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
  .skill-group-title { font-weight: 800; font-size: 8.6pt; margin-bottom: 1.4mm; }
  .chips { display: flex; flex-wrap: wrap; gap: 1.5mm; }
  .chip {
    display: inline-block; padding: 0.5mm 2mm; border: 0.4pt solid #e8e8e8;
    border-radius: 999px; font-size: 7.4pt; color: #444; background: #fff;
  }
  .exp { display: flex; gap: 5mm; margin-bottom: 3.2mm; }
  .exp-period { flex: 0 0 24mm; font-weight: 800; color: #ef3124; font-size: 8pt; padding-top: 0.3mm; }
  .exp-role { font-weight: 800; font-size: 9.5pt; }
  .exp-company { color: #777; font-size: 8.2pt; }
  .exp-text { color: #444; margin-top: 0.7mm; }
  .exp .chips { margin-top: 0.6mm; }
  .projects { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm; break-inside: avoid; }
  .hobby { margin-top: 2.5mm; padding-top: 2mm; border-top: 0.5pt solid #e4e4e4; color: #666; font-size: 7.6pt; line-height: 1.45; }
  .project {
    border: 0.5pt solid #ececec; border-radius: 2.5mm; padding: 2.2mm 2.6mm; background: #fafafa;
  }
  .project-title { font-weight: 800; font-size: 8.4pt; }
  .project-text { color: #444; font-size: 8.1pt; margin-top: 0.8mm; }
  .project-link { color: #ef3124; font-weight: 600; font-size: 7.8pt; display: block; margin-top: 0.6mm; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm; }
  .line { font-size: 8.6pt; color: #444; margin-bottom: 1.1mm; }
  .footer { margin-top: 4mm; border-top: 0.5pt solid #eee; padding-top: 2.5mm; text-align: center; color: #888; font-size: 7.6pt; }
  /* печать: не разрывать блоки между страницами A4 */
  .exp, .project, .skills > div, .two-col > div, .summary, .footer { break-inside: avoid; }
  .section-title, .section-rule, .exp-period { break-after: avoid; }
  .exp-role, .exp-company { break-after: avoid; }
  p, li { orphans: 3; widows: 3; }
  /* явное разделение на две страницы */
  .pagebreak { page-break-before: always; break-before: page; }
`

const chipsHtml = (tags: string[]): string =>
  `<div class="chips">${tags.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join('')}</div>`

const buildHtml = (lang: string): string => {
  const l = locales[lang as keyof typeof locales] as Json
  const role = t(lang, profile.roleKey)
  const location = t(lang, profile.locationKey)
  const langName = { ru: 'RU', en: 'EN', de: 'DE', zh: '中文' }[lang] ?? lang

  const skillsHtml = skillGroups
    .map(
      (group) => `
        <div>
          <div class="skill-group-title">${escapeHtml(t(lang, group.nameKey))}</div>
          ${chipsHtml(group.items)}
        </div>`,
    )
    .join('')

  const expHtml = experienceItems
    .map(
      (item) => `
        <div class="exp">
          <div class="exp-period">${escapeHtml(item.period)}${item.periodKey ? ` — ${escapeHtml(t(lang, item.periodKey))}` : ''}</div>
          <div>
            <div class="exp-role">${escapeHtml(t(lang, item.roleKey))}</div>
            <div class="exp-company">${escapeHtml(item.company)}</div>
            <div class="exp-text">${escapeHtml(t(lang, item.textKey))}</div>
            ${chipsHtml(item.tags)}
          </div>
        </div>`,
    )
    .join('')

  const projectsHtml = projects
    .slice(0, 4)
    .map(
      (project) => `
        <div class="project">
          <div class="project-title">${escapeHtml(t(lang, project.titleKey))}</div>
          <div class="project-text">${escapeHtml(t(lang, project.textKey))}</div>
          ${project.demoUrl ? `<span class="project-link">${escapeHtml(project.demoUrl.replace(/^https?:\/\//, ''))}</span>` : ''}
        </div>`,
    )
    .join('')

  const resumeBlock = l.resume as Json
  const educationHtml = (resumeBlock.educationItems as string[])
    .map((item) => `<div class="line">${escapeHtml(item)}</div>`)
    .join('')
  const languagesHtml = `<div class="line">${(resumeBlock.languages as string[]).map((item) => escapeHtml(item)).join(' · ')}</div>`

  return `<!doctype html>
<html lang="${lang}">
<head><meta charset="utf-8"><style>${FONTS}\n${CSS}</style></head>
<body>
  <div class="page">
    <div class="header">
      <div class="header-main">
        <h1>${escapeHtml(FULL_NAME_BY_LANG[lang])}</h1>
        <div class="role">${escapeHtml(role)}</div>
        <div class="location">${escapeHtml(location)}</div>
      </div>
      <div class="header-contacts">
        <div class="item"><span class="label">${langName}</span></div>
        <div class="item">${escapeHtml(profile.email)}</div>
        ${profile.phone ? `<div class="item">${escapeHtml(profile.phone)}</div>` : ''}
        <div class="item">${escapeHtml(profile.telegram.replace('https://', ''))}</div>
        <div class="item">${escapeHtml(profile.github.replace('https://', ''))}</div>
      </div>
    </div>
    <div class="rule"></div>

    <div class="section">
      <div class="section-title">${escapeHtml(t(lang, 'resume.about'))}</div>
      <div class="section-rule"></div>
      <div class="summary">${escapeHtml(t(lang, 'resume.summary'))}</div>
    </div>

    <div class="section">
      <div class="section-title">${escapeHtml(t(lang, 'resume.skills'))}</div>
      <div class="section-rule"></div>
      <div class="skills">${skillsHtml}</div>
    </div>

    <div class="section">
      <div class="section-title">${escapeHtml(t(lang, 'resume.experience'))}</div>
      <div class="section-rule"></div>
      ${expHtml}
    </div>
  </div>

  <div class="page pagebreak">
    <div class="section">
      <div class="section-title">${escapeHtml(t(lang, 'resume.projects'))}</div>
      <div class="section-rule"></div>
      <div class="projects">${projectsHtml}</div>
      <div class="hobby">${escapeHtml(t(lang, 'projects.hobby'))}</div>
    </div>

    <div class="section">
      <div class="section-title">${escapeHtml(t(lang, 'resume.education'))}</div>
      <div class="section-rule"></div>
      <div class="two-col">
        <div>${educationHtml}</div>
        <div>
          <div class="skill-group-title">${escapeHtml(t(lang, 'resume.languagesTitle'))}</div>
          ${languagesHtml}
        </div>
      </div>
    </div>

    <div class="footer">
      ${escapeHtml(t(lang, 'resume.links'))}: github.com/DomovikX · domovikx.github.io/cv-portfolio-2026 · ${escapeHtml(profile.email)}
    </div>
  </div>
</body></html>`
}

const OUT_DIR = join(ROOT, 'src/entities/profile/model/resume')
mkdirSync(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
for (const lang of LANGS) {
  const page = await browser.newPage()
  await page.setContent(buildHtml(lang), { waitUntil: 'networkidle' })
  await page.pdf({
    path: join(OUT_DIR, `resume-${lang}.pdf`),
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  })
  const kb = Math.round(readFileSync(join(OUT_DIR, `resume-${lang}.pdf`)).length / 1024)
  console.log(`resume-${lang}.pdf — ${kb} KB`)
  await page.close()
}
await browser.close()
console.log('Done:', OUT_DIR)
