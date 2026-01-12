import type { Category } from './types'
import { products } from './mockData'
const sleep = (ms:number)=>new Promise(r=>setTimeout(r,ms))
const jitter = ()=>Math.floor(Math.random()*300)+180

export type ProductListParams = { q?: string; category?: Category; sort?: 'relevance'|'price-asc'|'price-desc' }

export const api = {
  async listProducts(params: ProductListParams = {}) {
    await sleep(jitter())
    let items = products.slice()
    const q = params.q?.trim().toLowerCase()
    if (q) items = items.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t=>t.includes(q)))
    if (params.category && params.category !== 'All') items = items.filter(p => p.category === params.category)
    if (params.sort === 'price-asc') items.sort((a,b)=>a.price-b.price)
    else if (params.sort === 'price-desc') items.sort((a,b)=>b.price-a.price)
    else items.sort((a,b)=>Number(b.inStock)-Number(a.inStock))
    return items
  },
  async getProduct(id: string) {
    await sleep(jitter())
    const p = products.find(x=>x.id===id)
    if (!p) throw new Error('Product not found')
    return p
  }
}
