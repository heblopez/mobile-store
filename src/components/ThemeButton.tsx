import { MoonIcon, SunIcon } from 'lucide-react'
import { useDarkMode } from '@/hooks/useDarkMode'

export default function ThemeButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      className='p-2 rounded-full hover:bg-gray-100  dark:hover:bg-indigo-900'
      aria-label={isDarkMode ? 'Current theme: dark' : 'Current theme: light'}
    >
      <div
        className={`transform transition-transform duration-500 ${isDarkMode ? 'rotate-180' : 'rotate-0'}`}
      >
        {isDarkMode ?
          <MoonIcon size={24} className='text-indigo-600 dark:text-inherit' />
        : <SunIcon size={24} className='text-indigo-600 dark:text-inherit' />}
      </div>
    </button>
  )
}
