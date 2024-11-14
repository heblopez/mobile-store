import { OptionDetail } from '@/types'
import { ChevronDownIcon } from 'lucide-react'

interface ProductOptionsProps {
  colors: OptionDetail[]
  storages: OptionDetail[]
  colorRef: React.RefObject<HTMLSelectElement>
  storageRef: React.RefObject<HTMLSelectElement>
}

export function ProductOptions({ colors, storages, colorRef, storageRef }: ProductOptionsProps) {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
      <div className='space-y-2 w-full'>
        <label className='block text-sm font-medium text-gray-700 dark:text-indigo-100'>
          Color
        </label>
        <div className='relative'>
          <select
            aria-label='color-select'
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
            aria-label='storage-select'
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
  )
}
