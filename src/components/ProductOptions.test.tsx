import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ProductOptions } from './ProductOptions'
import React from 'react'

describe('ProductOptions Component', () => {
  const colors = [
    { code: 1, name: 'Blue' },
    { code: 2, name: 'Red' },
    { code: 3, name: 'Green' }
  ]

  const storages = [
    { code: 1, name: '32GB' },
    { code: 2, name: '64GB' }
  ]

  const colorRef = React.createRef<HTMLSelectElement>()
  const storageRef = React.createRef<HTMLSelectElement>()

  it('renders the product color and storage selects', () => {
    render(
      <BrowserRouter>
        <ProductOptions
          colors={colors}
          storages={storages}
          colorRef={colorRef}
          storageRef={storageRef}
        />
      </BrowserRouter>
    )

    const colorSelect = screen.getByRole('combobox', { name: /color/ })
    const storageSelect = screen.getByRole('combobox', { name: /storage/ })

    expect(colorSelect).toBeInTheDocument()
    expect(storageSelect).toBeInTheDocument()
  })

  it('renders the options for each select', () => {
    render(
      <BrowserRouter>
        <ProductOptions
          colors={colors}
          storages={storages}
          colorRef={colorRef}
          storageRef={storageRef}
        />
      </BrowserRouter>
    )

    const redColorOption = screen.getByRole('option', { name: /Red/ })
    const blueColorOption = screen.getByRole('option', { name: /Blue/ })
    const greenColorOption = screen.getByRole('option', { name: /Green/ })
    const $32GBOption = screen.getByRole('option', { name: /32GB/ })
    const $64GBOption = screen.getByRole('option', { name: /64GB/ })

    expect(redColorOption).toBeInTheDocument()
    expect(blueColorOption).toBeInTheDocument()
    expect(greenColorOption).toBeInTheDocument()
    expect($32GBOption).toBeInTheDocument()
    expect($64GBOption).toBeInTheDocument()
  })
})
