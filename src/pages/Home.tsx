import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import { EyeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const breadcrumbs = [{ label: 'Home', href: '/' }]

interface Product {
  id: string
  brand: string
  model: string
  price: string
  imgUrl: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://itx-frontend-test.onrender.com/api/product')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <>
      <Header links={breadcrumbs} />
      <SearchBar className='xs:hidden' />
      <div className='px-4 mb-2 flex items-center justify-between gap-4 xl:px-0'>
        <h1 className='text-3xl font-bold w-1/2'>Home</h1>
        <SearchBar className='hidden xs:block' />
      </div>
      <div className='p-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 md:gap-12 xl:px-0'>
        {products.map(({ id, brand, model, price, imgUrl }) => (
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
                <h3 className='text-center text-lg font-bold text-gray-700 dark:text-inherit'>
                  {model}
                </h3>
              </div>

              <button
                className='mx-auto bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-80 transition-colors'
                aria-label='Add to cart'
              >
                <EyeIcon className='h-4 w-4' />
                <span className='font-light text-xs'>View more</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
