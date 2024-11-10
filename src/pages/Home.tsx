import { useEffect, useState } from 'react'
import { Product } from '@/types'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import ProductCard from '@/components/ProductCard'
import { Loader } from 'lucide-react'
import { getProducts } from '@/services/product.services'

const breadcrumbs = [{ label: 'Home', href: '/' }]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts().then(data => setProducts(data))
  }, [])

  return (
    <>
      <Header links={breadcrumbs} />
      <main className='w-full'>
        <SearchBar className='xs:hidden' />
        <section className='px-4 mb-2 flex items-center justify-between gap-4 xl:px-0'>
          <h1 className='text-3xl font-bold w-1/2'>Home</h1>
          <SearchBar className='hidden xs:block' />
        </section>
        <section className='p-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 md:gap-12 xl:px-0'>
          {products.length === 0 ?
            <Loader className='animate-spin w-12 h-12 absolute top-1/2 left-1/2 text-indigo-500' />
          : products.map(product => <ProductCard key={product.id} product={product} />)}
        </section>
      </main>
    </>
  )
}
