import { CART_EXPIRATION_TIME, CART_KEY, CART_TIMESTAMP_KEY } from '@/config'
import { CartItem } from '@/types'
import { create } from 'zustand'

interface CartStore {
  cart: CartItem[]
  addItemToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeItemFromCart: (productId: string) => void
  total: number
}

function getInitialCart() {
  const cart = localStorage.getItem(CART_KEY)
  const timestamp = localStorage.getItem(CART_TIMESTAMP_KEY)
  if (cart && timestamp && Date.now() - Number(timestamp) > CART_EXPIRATION_TIME) {
    localStorage.removeItem(CART_KEY)
    localStorage.removeItem(CART_TIMESTAMP_KEY)
    return []
  }
  return cart ? JSON.parse(cart) : []
}

function saveCartToLocal(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: getInitialCart(),
  addItemToCart: newItem =>
    set(state => {
      const existingItem = state.cart.find(item => item.id === newItem.id)
      let updatedCart

      if (existingItem) {
        updatedCart = state.cart.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        updatedCart = [...state.cart, { ...newItem, quantity: 1 }]
      }

      saveCartToLocal(updatedCart)
      return {
        cart: updatedCart
      }
    }),
  removeItemFromCart: productId =>
    set(state => {
      const updatedCart = state.cart.filter(item => item.id !== productId)

      saveCartToLocal(updatedCart)

      return {
        cart: updatedCart
      }
    }),
  get total() {
    return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }
}))
