import { ShoppingCartIcon, SmartphoneIcon } from 'lucide-react'
import Breadcrumbs from './Breadcrumbs'
import { Link } from 'react-router-dom'

interface HeaderProps {
  links: { label: string; href: string }[]
}

export default function Header({ links }: HeaderProps) {
  return (
    <>
      <header className='fixed top-0 left-0 right-0 bg-white dark:bg-indigo-950 px-5 pt-4 pb-2 shadow-md z-20'>
        <div className='flex justify-between items-center hover:opacity-90'>
          <Link
            to='/'
            className='flex items-center space-x-3 cursor-pointer bg-gradient-to-r from-indigo-600 to-blue-400 text-transparent bg-clip-text'
          >
            <SmartphoneIcon className='h-6 w-6 text-indigo-600 dark:text-white' />
            <h1 className='text-2xl font-bold'>Mobile Store</h1>
          </Link>
          <ShoppingCartIcon className='h-6 w-6 text-indigo-600 dark:text-inherit cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-50' />
        </div>
        <Breadcrumbs links={links} />
      </header>
      <div className='h-24'></div>
    </>
  )
}
