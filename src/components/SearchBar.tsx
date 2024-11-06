import { SearchIcon } from 'lucide-react'
import { useState } from 'react'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div className='flex relative w-full max-w-md my-3 items-center bg-slate-100 dark:bg-slate-800 rounded-lg'>
      <input
        type='text'
        placeholder='Search by brand or model...'
        className='w-full pl-4 py-2 bg-transparent text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg'
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className='absolute right-0 bg-indigo-600 text-white rounded-lg px-3 py-2'>
        <SearchIcon className='h-5 w-5' />
      </button>
    </div>
  )
}
