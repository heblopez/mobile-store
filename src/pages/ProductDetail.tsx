import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'lucide-react'
import Header from '@/components/Header'
import { ProductSpecs } from '@/components/ProductSpecs'
import { ProductOptions } from '@/components/ProductOptions'
import { ProductHeading } from '@/components/ProductHeading'
import { ProductImage } from '@/components/ProductImage'
import { ActionButtons } from '@/components/ActionButtons'
import { getProductDetails } from '@/services/product.services'
import { addToCart } from '@/services/cart.services'
import { CartItem, ProductData } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { Sidebar } from '@/components/Sidebar'

export default function ProductDetail() {
  const { id } = useParams()
  const [productData, setProductData] = useState<ProductData>({} as ProductData)

  const colorRef = useRef<HTMLSelectElement>(null)
  const storageRef = useRef<HTMLSelectElement>(null)

  const { addItemToCart } = useCartStore()

  useEffect(() => {
    if (id) {
      getProductDetails(id).then(data => setProductData(data))
    }
  }, [id])

  if (Object.keys(productData).length === 0)
    return <Loader className='animate-spin w-12 h-12 absolute top-1/2 left-1/2 text-indigo-500' />

  const { model, price, imgUrl, options } = productData
  const { colors, storages } = options

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: model || 'Product Detail', href: '' }
  ]

  function handleAddToCart() {
    // const timestamp = localStorage.getItem('timestamp')
    // if (timestamp && Date.now() - Number(timestamp) > 1000 * 60 * 60) {
    //   localStorage.removeItem('timestamp')
    //   localStorage.removeItem('cart')
    // }

    const dataToSend = {
      id,
      model,
      price: Number(price),
      imgUrl,
      colorCode: colorRef.current?.value,
      storageCode: storageRef.current?.value
    }
    console.log('added item: ', dataToSend)

    addItemToCart(dataToSend as CartItem)

    // addToCart(dataToSend).then(res => {
    //   const timestampLocal = localStorage.getItem('timestamp')
    //   if (!timestampLocal) {
    //     localStorage.setItem('timestamp', JSON.stringify(Date.now()))
    //   }
    //   const updatedCart = [...cart, dataToSend]
    //   localStorage.setItem('cart', JSON.stringify(updatedCart))
    //   console.log('res from api: ', res)
    // })
  }

  return (
    <>
      <Header links={breadcrumbs} />
      <Sidebar />
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
              <ActionButtons addToCart={handleAddToCart} />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
