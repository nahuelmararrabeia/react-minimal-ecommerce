export type Category = 'All' | 'Essentials' | 'Workspace' | 'Travel' | 'Home'
export type Product = {
  id: string
  name: string
  description: string
  category: Exclude<Category, 'All'>
  price: number
  compareAtPrice?: number
  rating: number
  reviews: number
  inStock: boolean
  images: string[]
  tags: string[]
}
