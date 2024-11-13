import '@testing-library/jest-dom'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header Component', () => {
  beforeAll(() => {
    global.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: light)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }))
  })

  it('renders the Home link with the correct text and icon', () => {
    const { container } = render(
      <BrowserRouter>
        <Header links={[{ label: 'Home', href: '/' }]} />
      </BrowserRouter>
    )

    const homeLink = screen.getByRole('link', { name: /Mobile Store/ })
    const homeIcon = container.querySelector('.lucide-smartphone')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute('href')).toBe('/')
    expect(homeIcon).toBeInTheDocument()
  })

  it('renders the dark mode toggle button', () => {
    const { container } = render(
      <BrowserRouter>
        <Header links={[{ label: 'Home', href: '/' }]} />
      </BrowserRouter>
    )

    const darkModeToggleButton = container.querySelector('.lucide-sun')
    expect(darkModeToggleButton).toBeInTheDocument()
  })

  it('renders the shopping cart toggle button', () => {
    const { container } = render(
      <BrowserRouter>
        <Header links={[{ label: 'Home', href: '/' }]} />
      </BrowserRouter>
    )

    const shoppingCartToggleButton = container.querySelector('.lucide-shopping-cart')
    expect(shoppingCartToggleButton).toBeInTheDocument()
  })
})
