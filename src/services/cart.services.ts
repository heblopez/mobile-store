import { BASE_URL } from '@/config'
import { CartItem } from '@/types'

export async function addToCart(dataToSend: CartItem): Promise<{ count: number }> {
  try {
    const res = await fetch(`${BASE_URL}/api/cart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    if (!res.ok) {
      throw new Error('Error adding product to cart')
    }
    return (await res.json()) as { count: number }
  } catch (err) {
    console.error(err)
    return { count: 0 }
  }
}
