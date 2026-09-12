import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '@/app/providers'
import { HomePage } from '@/pages/home'

function renderHome() {
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
  })

  it('renders header nav with all section anchors', () => {
    renderHome()
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(nav).toBeInTheDocument()
    const links: Array<[string, string]> = [
      ['Обо мне', '#about'],
      ['Стек', '#stack'],
      ['Опыт', '#experience'],
      ['Проекты', '#projects'],
      ['Контакты', '#contacts'],
    ]
    for (const [label, href] of links) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  it('renders all CV sections', () => {
    renderHome()
    for (const id of ['about', 'stack', 'experience', 'projects', 'contacts']) {
      expect(document.getElementById(id)).not.toBeNull()
    }
  })

  it('renders project cards with links to GitHub', () => {
    renderHome()
    expect(screen.getAllByRole('link', { name: 'GitHub' }).length).toBeGreaterThanOrEqual(6)
  })

  it('switches language to English and back', async () => {
    const user = userEvent.setup()
    renderHome()

    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frontend Developer')
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'RU' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frontend-разработчик')
  })
})
