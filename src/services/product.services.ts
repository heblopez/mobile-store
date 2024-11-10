import { BASE_URL } from '@/config'
import { Product, ProductData } from '@/types'

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/product`)
    if (!res.ok) {
      throw new Error('Error fetching products')
    }
    return await res.json()
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getProductDetails(id: string): Promise<ProductData> {
  try {
    const res = await fetch(`${BASE_URL}/api/product/${id}`)
    if (!res.ok) {
      throw new Error('Error fetching product details')
    }
    return await res.json()
  } catch (err) {
    console.error(err)
    return {} as ProductData
  }
}
