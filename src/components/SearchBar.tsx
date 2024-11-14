import { SearchIcon } from 'lucide-react'

interface SearchBarProps {
  className?: string
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

export default function SearchBar({ className, searchTerm, setSearchTerm }: SearchBarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div
      className={`flex relative w-auto max-w-md xs:w-full mx-4 xs:mx-0 my-3 items-center bg-slate-100 dark:bg-slate-800 rounded-lg ${className}`}
    >
      <input
        type='text'
        placeholder='Search by brand or model...'
        className='w-full px-4 py-2 bg-transparent text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg'
        value={searchTerm}
        onChange={handleSearch}
        aria-label='search-input'
      />
      <button className='absolute right-0 bg-indigo-600 text-white rounded-lg px-3 py-2'>
        <SearchIcon className='h-5 w-5' />
      </button>
    </div>
  )
}
