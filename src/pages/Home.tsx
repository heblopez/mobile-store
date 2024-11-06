import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'

const breadcrumbs = [{ label: 'Home', href: '/' }]

export default function Home() {
  return (
    <>
      <Header links={breadcrumbs} />
      <SearchBar className='xs:hidden' />
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-3xl font-bold w-1/2'>Home</h1>
        <SearchBar className='hidden xs:block' />
      </div>
      <p>This is the home page</p>
    </>
  )
}
