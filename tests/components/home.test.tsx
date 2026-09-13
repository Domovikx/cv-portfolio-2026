import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '@/app/providers'
import { HomePage } from '@/pages/home'

const renderHome = () => {
  return render(
    <AppProviders>
      <HomePage />
    </AppProviders>,
  )
}

describe('HomePage', () => {
  it('renders hero role heading', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frontend-разработчик')
    expect(screen.getByText('Илья Ивановский')).toBeInTheDocument()
  })

  it('renders header nav with all section anchors', () => {
    renderHome()
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(nav).toBeInTheDocument()
    const links: Array<[string, string]> = [
      ['Обо мне', '#about'],
      ['Стек', '#stack'],
      ['Опыт', '#experience'],
      ['Образование', '#education'],
      ['Проекты', '#projects'],
      ['Контакты', '#contacts'],
    ]
    for (const [label, href] of links) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  it('renders all CV sections', () => {
    renderHome()
    for (const id of ['about', 'stack', 'experience', 'education', 'projects', 'contacts']) {
      expect(document.getElementById(id)).not.toBeNull()
    }
  })

  it('renders project cards with links to GitHub', () => {
    renderHome()
    expect(screen.getAllByRole('link', { name: 'GitHub' }).length).toBeGreaterThanOrEqual(4)
  })

  it('resume buttons are present, enabled and download a PDF', () => {
    renderHome()
    const resumeButtons = screen.getAllByTestId('resume-download')
    expect(resumeButtons.length).toBeGreaterThanOrEqual(2)
    for (const button of resumeButtons) {
      expect(button).toHaveAccessibleName('Скачать резюме (PDF)')
      expect(button).toBeEnabled()
    }
  })

  it('opens respond form modal with validation', async () => {
    const user = userEvent.setup()
    renderHome()

    await user.click(screen.getByRole('button', { name: 'Откликнуться' }))
    const dialog = document.querySelector('dialog')
    expect(dialog).not.toBeNull()
    expect(screen.getByLabelText('Имя')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Отправить' }))
    expect(screen.getAllByText('Обязательное поле').length).toBeGreaterThanOrEqual(3)

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders voice intro player in hero', () => {
    renderHome()
    expect(screen.getByTestId('voice-intro')).toBeInTheDocument()
  })

  it('switches language to English, German, Chinese and back', async () => {
    const user = userEvent.setup()
    renderHome()

    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frontend Developer')
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'DE' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frontend-Entwickler')
    expect(screen.getByRole('link', { name: 'Über mich' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'ZH' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('前端开发工程师')
    expect(screen.getByRole('link', { name: '关于我' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'RU' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frontend-разработчик')
  })
})
