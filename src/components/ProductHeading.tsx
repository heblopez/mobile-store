import { Star } from 'lucide-react'
import { ProductData } from '@/types'

export function ProductHeading({ productData }: { productData: ProductData }) {
  return (
    <div className='space-y-2'>
      <h2 className='text-3xl font-bold'>{productData.model}</h2>
      <div className='flex items-center gap-2'>
        <div className='flex items-center'>
          {[...Array(Math.ceil(Math.random() * 5))].map((_, i) => (
            <Star key={`star-${i}`} className='w-5 h-5 text-yellow-400 fill-current' />
          ))}
        </div>
        <span className='text-sm text-gray-600 dark:text-indigo-200'>
          ({Math.ceil(Math.random() * 128)} reviews)
        </span>
      </div>
      <p className='text-2xl font-bold'>{`$ ${Number(productData.price).toFixed(2)}`}</p>
    </div>
  )
}
