import { CheckIcon } from 'lucide-react'
import { ProductData } from '@/types'

const specsKeys = [
  'brand',
  'model',
  'price',
  'cpu',
  'ram',
  'os',
  'displayResolution',
  'battery',
  'primaryCamera',
  'secondaryCmera',
  'dimentions',
  'weight'
]

function camelCaseToCapitalized(str: string) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

export function ProductSpecs({ productData }: { productData: ProductData }) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Description / Specs:</h3>

      <ul className='list-none list-inside space-y-1 text-gray-600 dark:text-indigo-100'>
        {Object.entries(productData)
          .filter(([key, _value]) => specsKeys.includes(key))
          .map(([key, value]) => (
            <li key={key} className='flex items-center space-x-2'>
              <CheckIcon className='w-4 h-4 text-green-600 dark:text-green-300' />
              <p>
                <strong>{camelCaseToCapitalized(key)}: </strong>
                {typeof value === 'string' ? value : value.join(' ')}
              </p>
            </li>
          ))}
      </ul>
    </div>
  )
}
