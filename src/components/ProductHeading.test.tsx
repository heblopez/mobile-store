import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ProductHeading } from './ProductHeading'
import { ProductData } from '@/types'

describe('ProductHeading Component', () => {
  const productData = {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 14',
    price: '999',
    imgUrl: 'https://example.com/image.jpg'
  }

  it('renders the product model and price', () => {
    render(
      <BrowserRouter>
        <ProductHeading productData={productData as ProductData} />
      </BrowserRouter>
    )

    const productModel = screen.getByText(productData.model)
    const productPrice = screen.getByText(`$ ${Number(productData.price).toFixed(2)}`)

    expect(productModel).toBeInTheDocument()
    expect(productPrice).toBeInTheDocument()
  })

  it('renders random review count with stars icons for rating', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => 0.5)

    const { container } = render(
      <BrowserRouter>
        <ProductHeading productData={productData as ProductData} />
      </BrowserRouter>
    )

    const stars = container.querySelectorAll('.lucide-star')
    const reviewCount = screen.getByText(new RegExp(`(${Math.round(Math.random() * 128)}) reviews`))

    expect(stars.length).toBeGreaterThan(0)
    expect(reviewCount).toBeInTheDocument()

    vi.restoreAllMocks()
  })
})
