import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'

describe('ProductCard Component', () => {
  it('renders the product image', () => {
    const product = {
      id: '1',
      brand: 'Apple',
      model: 'iPhone 14',
      price: '999',
      imgUrl: 'https://example.com/image.jpg'
    }

    render(
      <BrowserRouter>
        <ProductCard product={product} />
      </BrowserRouter>
    )

    const productImage = screen.getByRole('img', { name: /iPhone 14/ })
    expect(productImage).toBeInTheDocument()
    expect(productImage.getAttribute('src')).toBe(product.imgUrl)
  })

  it('renders the product brand, model, and price', () => {
    const product = {
      id: '1',
      brand: 'Apple',
      model: 'iPhone 14',
      price: '999',
      imgUrl: 'https://example.com/image.jpg'
    }

    render(
      <BrowserRouter>
        <ProductCard product={product} />
      </BrowserRouter>
    )

    const productBrand = screen.getByText(product.brand)
    const productModel = screen.getByText(product.model)
    const productPrice = screen.getByText(`$${Number(product.price).toFixed(2)}`)

    expect(productBrand).toBeInTheDocument()
    expect(productModel).toBeInTheDocument()
    expect(productPrice).toBeInTheDocument()
  })

  it('renders the View more link', () => {
    const product = {
      id: '1',
      brand: 'Apple',
      model: 'iPhone 14',
      price: '999',
      imgUrl: 'https://example.com/image.jpg'
    }

    render(
      <BrowserRouter>
        <ProductCard product={product} />
      </BrowserRouter>
    )

    const addToCartButton = screen.getByRole('link', { name: /View more/ })
    expect(addToCartButton).toBeInTheDocument()
  })
})
