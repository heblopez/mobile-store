import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import SearchBar from './SearchBar'

describe('SearchBar Component', () => {
  const handleSearch = vi.fn()

  it('renders the search input with icon', () => {
    const { container } = render(
      <BrowserRouter>
        <SearchBar searchTerm='test' setSearchTerm={handleSearch} />
      </BrowserRouter>
    )

    const searchInput = screen.getByRole('textbox', { name: 'search-input' })
    const searchIcon = container.querySelector('.lucide-search')

    expect(searchInput).toBeInTheDocument()
    expect(searchIcon).toBeInTheDocument()
    expect(searchInput.getAttribute('value')).toBe('test')
  })

  it('calls the handleSearch function when the search input changes', () => {
    render(
      <BrowserRouter>
        <SearchBar searchTerm='test' setSearchTerm={handleSearch} />
      </BrowserRouter>
    )

    const searchInput = screen.getByRole('textbox', { name: 'search-input' })
    fireEvent.change(searchInput, { target: { value: 'new input test' } })
    expect(handleSearch).toHaveBeenCalledWith('new input test')
  })
})
