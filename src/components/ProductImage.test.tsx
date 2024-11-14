import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ProductImage } from './ProductImage'

describe('ProductImage Component', () => {
  it('renders the product image', () => {
    const imgUrl = 'https://example.com/image.jpg'

    render(
      <BrowserRouter>
        <ProductImage imgUrl={imgUrl} />
      </BrowserRouter>
    )

    const productImage = screen.getByRole('img', { name: 'Product Image' })
    expect(productImage).toBeInTheDocument()
    expect(productImage.getAttribute('src')).toBe(imgUrl)
  })
})
