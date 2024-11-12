import { useCartStore } from '@/store/cartStore'
import { MinusIcon, PlusIcon, TrashIcon, XIcon } from 'lucide-react'

export function Sidebar() {
  const { cart, removeItemFromCart, total, isOpenSidebar, toggleSidebar, updateQuantity } =
    useCartStore()

  if (!isOpenSidebar) return null

  return (
    <aside className='fixed right-0 top-0 h-full w-full z-50'>
      <div
        className='fixed inset-0 bg-black bg-opacity-50 transition-opacity'
        onClick={toggleSidebar}
      />
      <div className='fixed flex flex-col justify-between right-0 top-0 h-full w-full max-w-md bg-slate-50 dark:bg-indigo-950 transform transition-transform duration-300'>
        <div className='flex items-center justify-between px-8 py-4 border-b text-indigo-600 dark:text-indigo-100'>
          <h2 className='text-lg font-semibold'>Your cart:</h2>
          <button
            onClick={toggleSidebar}
            className='p-2 hover:bg-gray-100 dark:hover:bg-indigo-700 rounded-full'
          >
            <XIcon className='w-5 h-5' />
          </button>
        </div>

        <div className='flex flex-col h-full overflow-hidden'>
          <div className='flex flex-col flex-1 overflow-y-auto p-4'>
            {cart.length === 0 ?
              <p className='text-center text-gray-500 dark:text-gray-50 mt-4'>
                You don't have any products in your cart yet
              </p>
            : <div className='space-y-4'>
                {cart.map(item => (
                  <div
                    key={item.id}
                    className='flex items-center gap-4 bg-white dark:bg-indigo-900 p-4 rounded-lg shadow-sm'
                  >
                    <img
                      src={item.imgUrl}
                      alt={`${item.model}-image`}
                      className='w-20 h-20 object-cover rounded-md'
                    />
                    <div className='flex-1'>
                      <h3 className='font-medium'>{item.model}</h3>
                      <p className='text-gray-600 dark:text-indigo-100'>${item.price.toFixed(2)}</p>
                      <div className='flex items-center gap-2 mt-2'>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className='p-1 hover:bg-gray-100 dark:hover:bg-indigo-700 rounded'
                        >
                          <MinusIcon className='w-4 h-4' />
                        </button>
                        <span className='w-8 text-center'>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className='p-1 hover:bg-gray-100 dark:hover:bg-indigo-700 rounded'
                        >
                          <PlusIcon className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => removeItemFromCart(item.id)}
                          className='p-1 hover:bg-gray-100 dark:hover:bg-indigo-700 rounded ml-2'
                        >
                          <TrashIcon className='w-4 h-4 text-red-500' />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>

          <div className='flex flex-col gap-4 border-t p-4 bg-gray-100 dark:bg-indigo-900 mt-auto px-8'>
            <div className='flex w-full justify-between items-center text-slate-700 dark:text-indigo-100'>
              <span className='text-lg font-semibold'>Total:</span>
              <span className='text-xl font-bold '>$ {total.toFixed(2)}</span>
            </div>
            <button
              className='w-full px-6 py-3 bg-indigo-600 text-base font-normal text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer disabled:cursor-not-allowed'
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
