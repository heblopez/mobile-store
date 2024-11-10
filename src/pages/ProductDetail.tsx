import { useEffect, useRef, useState } from 'react'
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
  const [productData, setProductData] = useState<ProductData>({} as ProductData)

  const colorRef = useRef<HTMLSelectElement>(null)
  const storageRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    fetch(`https://itx-frontend-test.onrender.com/api/product/${id}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Error fetching product details')
        }
      })
      .then(data => setProductData(data))
      .catch(err => console.error(err))
  }, [id])

  if (Object.keys(productData).length === 0)
    return <Loader className='animate-spin w-12 h-12 absolute top-1/2 left-1/2 text-indigo-500' />

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

  function addToCart() {
    const timestamp = localStorage.getItem('timestamp')
    if (timestamp && Date.now() - Number(timestamp) > 1000 * 60 * 60) {
      localStorage.removeItem('timestamp')
      localStorage.removeItem('cart')
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')

    const dataToSend = {
      id,
      model,
      colorCode: colorRef.current?.value,
      storageCode: storageRef.current?.value
    }
    console.log(dataToSend)
    fetch(`https://itx-frontend-test.onrender.com/api/cart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Error adding product to cart')
        }
      })
      .then(res => {
        const timestampLocal = localStorage.getItem('timestamp')
        if (!timestampLocal) {
          localStorage.setItem('timestamp', JSON.stringify(Date.now()))
        }
        const updatedCart = [...cart, dataToSend]
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        console.log('res', res)
      })
      .catch(err => console.error(err))
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

              <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
                <div className='space-y-2 w-full'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-indigo-100'>
                    Color
                  </label>
                  <div className='relative'>
                    <select
                      ref={colorRef}
                      className='appearance-none bg-indigo-50 dark:bg-indigo-900 px-4 py-2 w-full rounded-lg border-gray-300 shadow-lg focus:ring-2 focus:ring-indigo-500'
                    >
                      {colors.map(color => (
                        <option key={color.code} value={color.code}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className='absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-50 pointer-events-none' />
                  </div>
                </div>

                <div className='space-y-2 w-full'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-indigo-100'>
                    Storage
                  </label>
                  <div className='relative'>
                    <select
                      ref={storageRef}
                      className='appearance-none bg-indigo-50 dark:bg-indigo-900 p-2 w-full rounded-lg border-gray-300 shadow-lg focus:ring-2 focus:ring-indigo-500'
                    >
                      {storages.map(storage => (
                        <option key={storage.code} value={storage.code}>
                          {storage.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className='absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-50 pointer-events-none' />
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-center xs:flex-row xs:justify-center gap-4 sm:gap-8 pt-3'>
                <Link
                  to='/'
                  className='w-full max-w-48 justify-self-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:bg-blue-700 hover:opacity-80 text-white font-medium rounded-lg flex items-center justify-center gap-2'
                >
                  <ArrowBigLeftIcon className='w-4 h-4' />
                  Volver al listado
                </Link>
                <button
                  className='w-full max-w-48 justify-self-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:bg-blue-700 hover:opacity-80 text-white font-medium rounded-lg flex items-center justify-center gap-2'
                  onClick={addToCart}
                >
                  <ShoppingCartIcon className='w-4 h-4' />
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
