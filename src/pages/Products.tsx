import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { Category, Product } from '@/api/types'
import { api } from '@/api/client'
import { Price } from '@/components/Price'
import { Rating } from '@/components/Rating'
import { Search } from 'lucide-react'

const CATEGORIES: Category[] = ['All', 'Essentials', 'Workspace', 'Travel', 'Home']

function ProductCard({ p }: { p: Product }) {
  return (
    <Link to={`/products/${p.id}`} className="group card overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{p.name}</div>
            <div className="mt-1 flex flex-wrap gap-1">
              <span className="badge">{p.category}</span>
              {!p.inStock && <span className="badge">Out of stock</span>}
            </div>
          </div>
          <Price price={p.price} compareAtPrice={p.compareAtPrice} />
        </div>
        <div className="mt-3"><Rating value={p.rating} reviews={p.reviews} /></div>
      </div>
    </Link>
  )
}

export default function ProductsPage() {
  const [sp, setSp] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  const q = sp.get('q') ?? ''
  const category = (sp.get('category') as Category) ?? 'All'
  const sort = (sp.get('sort') as any) ?? 'relevance'

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)
    api.listProducts({ q, category, sort })
      .then((res) => alive && setItems(res))
      .catch((e:any) => alive && setError(e?.message ?? 'Failed to load products'))
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [q, category, sort])

  const stats = useMemo(() => ({ total: items.length, inStock: items.filter(p=>p.inStock).length }), [items])

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(sp)
    if (value) next.set(key, value)
    else next.delete(key)
    setSp(next, { replace: true })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-2xl font-semibold tracking-tight">Products</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {loading ? 'Loading…' : `${stats.total} items • ${stats.inStock} in stock`}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input className="input w-full pl-9 sm:w-[280px]" value={q} onChange={(e) => setParam('q', e.target.value)} placeholder="Search products" />
          </div>
          <button className="btn-outline" onClick={() => setSp(new URLSearchParams(), { replace: true })}>Reset</button>
        </div>
      </div>

      <div className="card p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">Category</label>
            <select className="input mt-1" value={category} onChange={(e) => setParam('category', e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">Sort</label>
            <select className="input mt-1" value={sort} onChange={(e) => setParam('sort', e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="card p-6">
          <div className="text-sm font-semibold">Couldn’t load products.</div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">{error}</div>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="card p-10 text-center">
          <div className="text-sm font-semibold">No products found</div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">Try reset.</div>
        </div>
      )}

      {!error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  )
}
