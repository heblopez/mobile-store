import { ArrowBigLeftIcon, ShoppingCartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ActionButtons({ addToCart }: { addToCart: () => void }) {
  return (
    <div className='flex flex-col items-center xs:flex-row xs:justify-center gap-4 sm:gap-8 pt-3'>
      <Link
        to='/'
        className='w-full max-w-48 justify-self-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:bg-blue-700 hover:opacity-80 text-white font-medium rounded-lg flex items-center justify-center gap-2'
      >
        <ArrowBigLeftIcon className='w-4 h-4' />
        Back to list
      </Link>
      <button
        className='w-full max-w-48 justify-self-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:bg-blue-700 hover:opacity-80 text-white font-medium rounded-lg flex items-center justify-center gap-2'
        onClick={addToCart}
      >
        <ShoppingCartIcon className='w-4 h-4' />
        Add to cart
      </button>
    </div>
  )
}
