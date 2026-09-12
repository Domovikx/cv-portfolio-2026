import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button, Chip, SectionTitle } from '@/shared/ui'

describe('shared UI kit', () => {
  it('Button renders as anchor when href is passed', () => {
    render(<Button href="#contacts">Связаться</Button>)
    const link = screen.getByRole('link', { name: 'Связаться' })
    expect(link).toHaveAttribute('href', '#contacts')
    expect(link).toHaveClass(/red/)
  })

  it('Button renders as button when href is absent', () => {
    render(<Button>Нажать</Button>)
    expect(screen.getByRole('button', { name: 'Нажать' })).toBeInTheDocument()
  })

  it('Chip renders its text', () => {
    render(<Chip>React</Chip>)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('SectionTitle renders title and optional subtitle', () => {
    render(<SectionTitle title="Заголовок" subtitle="Подзаголовок" />)
    expect(screen.getByRole('heading', { level: 2, name: 'Заголовок' })).toBeInTheDocument()
    expect(screen.getByText('Подзаголовок')).toBeInTheDocument()
  })
})
