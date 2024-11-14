import { EyeIcon } from 'lucide-react'
import { Product } from '@/types'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, brand, model, price, imgUrl } = product
  return (
    <div
      key={id}
      className='bg-indigo-50 dark:bg-indigo-950 dark:text-white rounded-lg shadow-md hover:scale-105 transition-transform overflow-hidden pb-2'
    >
      <figure className='relative mb-2 aspect-[160/212] max-h-52 bg-gray-50 dark:bg-indigo-200 w-full'>
        <img
          src={imgUrl}
          alt={`${brand} ${model}`}
          className='absolute pb-2 w-full h-full object-contain transition-transform'
          loading='lazy'
        />
      </figure>
      <div className='p-3'>
        <div className='space-y-3 mb-3'>
          <div className='flex items-center justify-between mx-2'>
            <span className='px-4 py-1.5 bg-blue-200 text-indigo-900 text-xs font-medium rounded-full'>
              {brand}
            </span>
            <span className='text-lg font-medium text-indigo-700 dark:text-indigo-100'>
              ${Number(price).toFixed(2)}
            </span>
          </div>
          <h3 className='text-center text-lg font-bold text-gray-700 dark:text-inherit'>{model}</h3>
        </div>

        <Link
          to={`/product/${id}`}
          className=' w-fit mx-auto bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-80'
          aria-label='View more'
        >
          <EyeIcon className='h-4 w-4' />
          <span className='font-normal text-xs'>View more</span>
        </Link>
      </div>
    </div>
  )
}
