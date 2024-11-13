import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import { ActionButtons } from './ActionButtons'
import '@testing-library/jest-dom'

describe('ActionButtons Component', () => {
  it('renders the link to Home with the correct text and icon', () => {
    const addToCart = vi.fn()
    render(
      <BrowserRouter>
        <ActionButtons addToCart={addToCart} />
      </BrowserRouter>
    )

    const homeLink = screen.getByRole('link', { name: /Back to list/ })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute('href')).toBe('/')
  })

  it('renders the Add to Cart button and calls addToCart on click', () => {
    const addToCart = vi.fn()

    render(
      <BrowserRouter>
        <ActionButtons addToCart={addToCart} />
      </BrowserRouter>
    )

    const addToCartButton = screen.getByRole('button', { name: /Add to cart/ })
    expect(addToCartButton).toBeInTheDocument()

    fireEvent.click(addToCartButton)
    expect(addToCart).toHaveBeenCalledTimes(1)
  })
})
