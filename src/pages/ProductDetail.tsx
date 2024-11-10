import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowBigLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  Loader,
  ShoppingCartIcon,
  Star
} from 'lucide-react'
import Header from '@/components/Header'
import { ProductData } from '@/types'

export default function ProductDetail() {
  const { id } = useParams()

  const [productData, setProductData] = useState<ProductData>({} as unknown as ProductData)

  useEffect(() => {
    fetch(`https://itx-frontend-test.onrender.com/api/product/${id}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error(err))
  }, [id])

  if (Object.keys(productData).length === 0)
    return <Loader className='w-12 h-12 absolute top-1/2 left-1/2' />

  const { model, imgUrl, options } = productData
  const { colors, storages } = options

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
        <section className='mx-auto px-4 py-6 sm:px-6 xl:px-0 text-gray-900 dark:text-white'>
          <div className=' bg-slate-50 dark:bg-indigo-950 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 p-8 rounded-2xl shadow-lg overflow-hidden'>
            <div className='flex items-center'>
              <figure className='rounded-xl overflow-hidden aspect-square h-auto max-h-72 dark:bg-indigo-950 w-full'>
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
                <h2 className='text-3xl font-bold'>{model}</h2>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center'>
                    {[...Array(Math.ceil(Math.random() * 5))].map((_, i) => (
                      <Star key={`star-${i}`} className='w-5 h-5 text-yellow-400 fill-current' />
                    ))}
                  </div>
                  <span className='text-sm text-gray-600 dark:text-indigo-200'>
                    ({Math.round(Math.random() * 128)} reviews)
                  </span>
                </div>
                <p className='text-2xl font-bold'>{`$ ${Number(productData.price).toFixed(2)}`}</p>
              </div>

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

              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-indigo-100'>
                    Color
                  </label>
                  <div className='relative'>
                    <select className='appearance-none bg-indigo-50 dark:bg-indigo-900 px-4 py-2 w-full rounded-lg border-gray-300 shadow-lg focus:ring-2 focus:ring-indigo-500'>
                      {colors.map(color => (
                        <option key={color.code} value={color.code}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className='absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-50 pointer-events-none' />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-indigo-100'>
                    Storage
                  </label>
                  <div className='relative'>
                    <select className='appearance-none bg-indigo-50 dark:bg-indigo-900 p-2 w-full rounded-lg border-gray-300 shadow-lg focus:ring-2 focus:ring-indigo-500'>
                      {storages.map(storage => (
                        <option key={storage.code} value={storage.code}>
                          {storage.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className='absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-50 pointer-events-none' />
                  </div>
                </div>

                <div className='flex justify-around gap-2 pt-4'>
                  <Link
                    to='/'
                    className='w-full max-w-48 justify-self-center py-3 px-5 bg-gradient-to-r from-indigo-600 to-blue-500 hover:bg-blue-700 hover:opacity-80 text-white font-medium rounded-lg flex items-center justify-center gap-2'
                  >
                    <ArrowBigLeftIcon className='w-4 h-4' />
                    Volver al listado
                  </Link>
                  <button className='w-full max-w-48 justify-self-center py-3 px-5 bg-gradient-to-r from-indigo-600 to-blue-500 hover:bg-blue-700 hover:opacity-80 text-white font-medium rounded-lg flex items-center justify-center gap-2'>
                    <ShoppingCartIcon className='w-4 h-4' />
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
