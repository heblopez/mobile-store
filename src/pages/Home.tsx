import { useEffect, useState } from 'react'
import { Product } from '@/types'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import ProductCard from '@/components/ProductCard'
import { Loader, SearchCheck } from 'lucide-react'
import { getProducts } from '@/services/product.services'
import { Sidebar } from '@/components/Sidebar'

const breadcrumbs = [{ label: 'Home', href: '.' }]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    getProducts().then(data => setProducts(data))
  }, [])

  const filteredProducts = products.filter(
    product =>
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Header links={breadcrumbs} />
      <Sidebar />
      <main className='w-full'>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} className='xs:hidden' />
        <section className='px-4 mb-2 flex items-center justify-between gap-4 xl:px-0'>
          <h1 className='text-3xl font-bold w-1/2'>Home</h1>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            className='hidden xs:block'
          />
        </section>
        <section className='p-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 md:gap-12 xl:px-0'>
          {products.length === 0 ?
            <Loader className='animate-spin w-12 h-12 absolute top-1/2 left-1/2 text-indigo-500' />
          : filteredProducts.length === 0 ?
            <div className='flex justify-center items-center col-span-2 gap-2'>
              <SearchCheck className='w-4 h-12' />
              <p className='w-full'>No se encontraron productos que coincidan con tu búsqueda...</p>
            </div>
          : filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </section>
      </main>
    </>
  )
}
