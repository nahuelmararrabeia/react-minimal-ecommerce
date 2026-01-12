import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '@/api/client'
import type { Product } from '@/api/types'
import { Price } from '@/components/Price'
import { Rating } from '@/components/Rating'
import { useCart } from '@/state/cartStore'
import { useToast } from '@/components/Toast'
import { ChevronLeft } from 'lucide-react'

export default function ProductDetailPage() {
  const { id } = useParams()
  const nav = useNavigate()
  const cart = useCart()
  const toast = useToast()
  const [p, setP] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    api.getProduct(id!).then(setP).catch((e:any)=>setError(e?.message ?? 'Failed to load product'))
  }, [id])

  if (error) {
    return (
      <div className="card p-6">
        <div className="text-sm font-semibold">Couldn’t load product.</div>
        <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">{error}</div>
        <Link to="/products" className="btn-primary mt-4 inline-flex">Back to products</Link>
      </div>
    )
  }

  if (!p) return <div className="card p-6">Loading…</div>

  return (
    <div className="space-y-4">
      <button className="btn-ghost" onClick={() => nav(-1)}><ChevronLeft className="h-4 w-4" /> Back</button>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-950">
            <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="card p-6">
          <div className="badge">{p.category}</div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">{p.name}</h1>
          <div className="mt-2"><Rating value={p.rating} reviews={p.reviews} /></div>
          <div className="mt-4"><Price price={p.price} compareAtPrice={p.compareAtPrice} /></div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{p.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => <span key={t} className="badge">{t}</span>)}
            {!p.inStock && <span className="badge">Out of stock</span>}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:items-end">
            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-200">Quantity</label>
              <input className="input mt-1" value={qty} onChange={(e)=>setQty(Math.max(1, Math.min(99, Number(e.target.value||1))))} inputMode="numeric" />
            </div>
            <button
              className="btn-primary sm:col-span-2"
              disabled={!p.inStock}
              onClick={() => {
                if (!p.inStock) return
                cart.add(p, qty)
                toast.push({ type: 'success', title: 'Added to cart', description: `${p.name} • qty ${qty}` })
              }}
            >
              {p.inStock ? 'Add to cart' : 'Out of stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
