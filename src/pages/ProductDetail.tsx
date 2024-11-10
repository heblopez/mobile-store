import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'lucide-react'
import Header from '@/components/Header'
import { ProductSpecs } from '@/components/ProductSpecs'
import { ProductOptions } from '@/components/ProductOptions'
import { ProductHeading } from '@/components/ProductHeading'
import { ProductImage } from '@/components/ProductImage'
import { ActionButtons } from '@/components/ActionButtons'
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
            <ProductImage imgUrl={imgUrl} />
            <div className='space-y-6'>
              <ProductHeading productData={productData} />
              <ProductSpecs productData={productData} />
              <ProductOptions
                colors={colors}
                storages={storages}
                colorRef={colorRef}
                storageRef={storageRef}
              />
              <ActionButtons addToCart={addToCart} />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
