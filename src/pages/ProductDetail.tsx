import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShoppingCartIcon, Star } from 'lucide-react'
import Header from '@/components/Header'
import { ProductData } from '@/types'

export default function ProductDetail() {
  const { id } = useParams()

  const [productData, setProductData] = useState<ProductData>({} as ProductData)

  useEffect(() => {
    fetch(`https://itx-frontend-test.onrender.com/api/product/${id}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error(err))
  }, [id])

  const { model, imgUrl } = productData

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: model || 'Product Detail', href: '' }
  ]

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

  return (
    <>
      <Header links={breadcrumbs} />
      <main className='w-full'>
        <section className='mx-auto p-4 sm:px-6 xl:px-0'>
          <h1 className='text-3xl font-bold'>Product Detail</h1>
        </section>
        <section className='mx-auto px-4 py-6 sm:px-6 xl:px-0'>
          <div className=' bg-slate-50 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 p-8 rounded-2xl shadow-lg overflow-hidden'>
            <div className='flex items-center'>
              <figure className='rounded-xl overflow-hidden aspect-square h-auto max-h-72 dark:bg-indigo-200 w-full'>
                <img
                  src={imgUrl}
                  alt='Product Image'
                  className='w-full h-full object-contain'
                  loading='lazy'
                />
              </figure>
            </div>

            <div className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold text-gray-900'>{model}</h2>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center'>
                    {[...Array(Math.round(Math.random() * 5))].map((_, i) => (
                      <Star key={`star-${i}`} className='w-5 h-5 text-yellow-400 fill-current' />
                    ))}
                  </div>
                  <span className='text-sm text-gray-600'>
                    ({Math.round(Math.random() * 128)} reviews)
                  </span>
                </div>
                <p className='text-2xl font-bold text-gray-900'>{`$ ${Number(productData.price).toFixed(2)}`}</p>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-900'>Description / Specs</h3>

                <ul className='list-disc list-inside space-y-1 text-gray-600'>
                  {Object.entries(productData)
                    .filter(([key, _value]) => specsKeys.includes(key))
                    .map(([key, value]) => (
                      <li key={key}>
                        <span className='font-semibold'>{camelCaseToCapitalized(key)}: </span>
                        {typeof value === 'string' ? value : value.join(' ')}
                      </li>
                    ))}
                </ul>
              </div>
              <button className='w-max justify-self-center py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 hover:bg-blue-700 hover:opacity-80 text-white font-medium rounded-lg flex items-center justify-center gap-3'>
                <ShoppingCartIcon className='w-5 h-5' />
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
