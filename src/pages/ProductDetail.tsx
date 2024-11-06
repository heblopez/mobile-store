import Header from '@/components/Header'
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { name } = useParams()

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: name || 'Product Detail', href: '' }
  ]

  return (
    <>
      <Header links={breadcrumbs} />
      <h1 className='text-3xl font-bold'>Product Detail</h1>
      <p>This is the product detail page</p>
    </>
  )
}
