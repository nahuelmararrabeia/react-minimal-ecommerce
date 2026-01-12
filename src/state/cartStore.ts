import { create } from 'zustand'
import { storage } from '@/lib/storage'
import type { Product } from '@/api/types'

export type CartItem = { productId: string; name: string; price: number; image: string; qty: number }
type CartState = {
  items: CartItem[]
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  add: (p: Product, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  subtotal: () => number
  count: () => number
}
const KEY = 'mec.cart.v1'

export const useCart = create<CartState>((set, get) => ({
  items: storage.get<CartItem[]>(KEY, []),
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set(s => ({ isOpen: !s.isOpen })),
  add: (p, qty=1) => {
    const items = get().items.slice()
    const idx = items.findIndex(i=>i.productId===p.id)
    if (idx>=0) items[idx] = { ...items[idx], qty: Math.min(99, items[idx].qty + qty) }
    else items.unshift({ productId:p.id, name:p.name, price:p.price, image:p.images[0], qty })
    storage.set(KEY, items); set({ items, isOpen: true })
  },
  setQty: (id, qty) => {
    const q = Math.max(1, Math.min(99, qty))
    const items = get().items.map(i=>i.productId===id?{...i, qty:q}:i)
    storage.set(KEY, items); set({ items })
  },
  remove: (id) => {
    const items = get().items.filter(i=>i.productId!==id)
    storage.set(KEY, items); set({ items })
  },
  clear: () => { storage.set(KEY, []); set({ items: [] }) },
  subtotal: () => get().items.reduce((s,i)=>s+i.price*i.qty,0),
  count: () => get().items.reduce((s,i)=>s+i.qty,0)
}))
