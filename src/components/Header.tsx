import { MoonIcon, ShoppingCartIcon, SmartphoneIcon, SunIcon } from 'lucide-react'
import Breadcrumbs from './Breadcrumbs'
import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { useDarkMode } from '@/hooks/useDarkMode'

interface HeaderProps {
  links: { label: string; href: string }[]
}

export default function Header({ links }: HeaderProps) {
  const { cart, toggleSidebar } = useCartStore()

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <>
      <header className='fixed top-0 left-0 right-0 bg-white dark:bg-indigo-950 px-4 pt-4 pb-2 shadow-md z-20'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-between items-center hover:opacity-90'>
            <Link
              to='/'
              className='flex items-center space-x-3 cursor-pointer bg-gradient-to-r from-indigo-600 to-blue-400 text-transparent bg-clip-text'
            >
              <SmartphoneIcon className='h-6 w-6 text-indigo-600 dark:text-white' />
              <h1 className='text-2xl font-bold'>Mobile Store</h1>
            </Link>
            <div className='flex gap-2 w-fit'>
              <button
                onClick={toggleDarkMode}
                className='p-2 rounded-full hover:bg-gray-100  dark:hover:bg-indigo-900'
                aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                <div
                  className={`transform transition-transform duration-500 ${isDarkMode ? 'rotate-180' : 'rotate-0'}`}
                >
                  {isDarkMode ?
                    <MoonIcon size={24} className='text-indigo-600 dark:text-inherit' />
                  : <SunIcon size={24} className='text-indigo-600 dark:text-inherit' />}
                </div>
              </button>
              <button
                className='relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-indigo-900'
                onClick={toggleSidebar}
              >
                <ShoppingCartIcon className='h-6 w-6 text-indigo-600 dark:text-inherit cursor-pointer dark:hover:text-indigo-50' />
                {totalItems > 0 && (
                  <span className='absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
          <Breadcrumbs links={links} />
        </div>
      </header>
      <div className='h-24'></div>
    </>
  )
}
