import { CART_EXPIRATION_TIME, CART_KEY, CART_TIMESTAMP_KEY } from '@/config'
import { CartItem } from '@/types'
import { create } from 'zustand'

interface CartStore {
  cart: CartItem[]
  addItemToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeItemFromCart: (productId: string) => void
  total: number
  isOpenSidebar: boolean
  toggleSidebar: () => void
  updateQuantity: (productId: string, quantity: number) => void
}

function isCartExpired() {
  const timestamp = localStorage.getItem(CART_TIMESTAMP_KEY)
  return timestamp ? Date.now() - Number(timestamp) > CART_EXPIRATION_TIME : true
}

function getInitialCart(): CartItem[] {
  const cart = localStorage.getItem(CART_KEY)
  if (cart && isCartExpired()) {
    localStorage.removeItem(CART_KEY)
    localStorage.removeItem(CART_TIMESTAMP_KEY)
    return []
  }
  return cart ? JSON.parse(cart) : []
}

function getInitialTotal() {
  const cart = getInitialCart()
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function saveCartToLocal(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  if (!localStorage.getItem(CART_TIMESTAMP_KEY))
    localStorage.setItem(CART_TIMESTAMP_KEY, JSON.stringify(Date.now()))
}

export const useCartStore = create<CartStore>(set => ({
  cart: getInitialCart(),
  addItemToCart: newItem => {
    if (isCartExpired()) {
      localStorage.removeItem(CART_KEY)
      localStorage.removeItem(CART_TIMESTAMP_KEY)
      set({ cart: [], total: 0 })
    }
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
        cart: updatedCart,
        total: updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    })
  },
  removeItemFromCart: productId =>
    set(state => {
      const updatedCart = state.cart.filter(item => item.id !== productId)

      saveCartToLocal(updatedCart)

      return {
        cart: updatedCart,
        total: updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    }),
  total: getInitialTotal(),
  isOpenSidebar: false,
  toggleSidebar: () => set(state => ({ isOpenSidebar: !state.isOpenSidebar })),
  updateQuantity: (productId, quantity) =>
    set(state => {
      const updatedCart = state.cart
        .map(item => (item.id === productId ? { ...item, quantity: Math.max(quantity, 0) } : item))
        .filter(item => item.quantity > 0)

      saveCartToLocal(updatedCart)

      return {
        cart: updatedCart,
        total: updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    })
}))
