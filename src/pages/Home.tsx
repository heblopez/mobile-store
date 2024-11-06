import Header from '@/components/Header'

const breadcrumbs = [{ label: 'Home', href: '/' }]

export default function Home() {
  return (
    <>
      <Header links={breadcrumbs} />
      <h1 className='text-3xl font-bold'>Home</h1>
      <p>This is the home page</p>
    </>
  )
}
