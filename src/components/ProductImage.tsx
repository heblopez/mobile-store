export function ProductImage({ imgUrl }: { imgUrl: string }) {
  return (
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
  )
}
