import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ProductSpecs } from './ProductSpecs'
import { ProductData } from '@/types'

describe('ProductSpecs Component', () => {
  const productData = {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 14',
    price: '999',
    cpu: 'A12',
    ram: '16GB',
    os: 'iOS 16.1',
    displayResolution: '1080p',
    battery: '3000mAh',
    primaryCamera: '12MP',
    secondaryCmera: '8MP',
    dimentions: '160x100x9mm',
    weight: '199g'
  }

  it('renders the product specs', () => {
    render(
      <BrowserRouter>
        <ProductSpecs productData={productData as unknown as ProductData} />
      </BrowserRouter>
    )

    const cpu = screen.getByText(productData.cpu)
    const ram = screen.getByText(productData.ram)
    const os = screen.getByText(productData.os)
    const displayResolution = screen.getByText(productData.displayResolution)
    const battery = screen.getByText(productData.battery)
    const primaryCamera = screen.getByText(productData.primaryCamera)
    const secondaryCmera = screen.getByText(productData.secondaryCmera)
    const dimentions = screen.getByText(productData.dimentions)
    const weight = screen.getByText(productData.weight)

    expect(cpu).toBeInTheDocument()
    expect(ram).toBeInTheDocument()
    expect(os).toBeInTheDocument()
    expect(displayResolution).toBeInTheDocument()
    expect(battery).toBeInTheDocument()
    expect(primaryCamera).toBeInTheDocument()
    expect(secondaryCmera).toBeInTheDocument()
    expect(dimentions).toBeInTheDocument()
    expect(weight).toBeInTheDocument()
  })
})
