import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import Breadcrumbs from './Breadcrumbs'

describe('Breadcrumbs Component', () => {
  it('renders the Home link with the correct text and icon', () => {
    const { container } = render(
      <BrowserRouter>
        <Breadcrumbs links={[{ label: 'Home', href: '/' }]} />
      </BrowserRouter>
    )

    const homeLink = screen.getByRole('link', { name: /Home/ })
    const homeIcon = container.querySelector('.lucide-house')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute('href')).toBe('/')
    expect(homeIcon).toBeInTheDocument()
  })

  it('renders the label and href for each link', () => {
    const links = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ]

    render(
      <BrowserRouter>
        <Breadcrumbs links={links} />
      </BrowserRouter>
    )

    links.forEach(link => {
      const linkElement = screen.getByRole('link', { name: link.label })
      expect(linkElement).toBeInTheDocument()
      expect(linkElement.getAttribute('href')).toBe(link.href)
    })
  })
})
