import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/state/cartStore'
import { formatCurrency } from '@/lib/format'
import { useToast } from '@/components/Toast'

export default function CheckoutPage() {
  const cart = useCart()
  const nav = useNavigate()
  const toast = useToast()

  const subtotal = cart.subtotal()
  const shipping = subtotal > 60 ? 0 : (cart.items.length ? 6 : 0)
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const [name, setName] = useState('Nahuel')
  const [email, setEmail] = useState('you@company.com')
  const [address, setAddress] = useState('Street 123')
  const [loading, setLoading] = useState(false)
  const canPlace = useMemo(() => cart.items.length > 0 && name.trim() && email.includes('@') && address.trim(), [cart.items.length, name, email, address])

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault()
    if (!canPlace) return
    setLoading(true)
    await new Promise((r)=>setTimeout(r, 600))
    cart.clear()
    toast.push({ type: 'success', title: 'Order placed', description: 'Demo confirmation' })
    nav('/checkout/success', { replace: true })
  }

  if (cart.items.length === 0) {
    return (
      <div className="card p-10 text-center">
        <div className="text-sm font-semibold">Your cart is empty</div>
        <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">Add products before checkout.</div>
        <Link className="btn-primary mt-4 inline-flex" to="/products">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="card p-6 lg:col-span-2">
        <div className="text-xl font-semibold tracking-tight">Checkout</div>
        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Demo checkout UI (no real payments).</div>

        <form className="mt-6 grid gap-3 md:grid-cols-2" onSubmit={placeOrder}>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">Full name</label>
            <input className="input mt-1" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">Email</label>
            <input className="input mt-1" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">Address</label>
            <input className="input mt-1" value={address} onChange={(e)=>setAddress(e.target.value)} />
          </div>

          <div className="md:col-span-2 mt-2 flex flex-col gap-2 sm:flex-row">
            <Link className="btn-outline flex-1 text-center" to="/products">Continue shopping</Link>
            <button className="btn-primary flex-1" disabled={!canPlace || loading}>
              {loading ? 'Placing order…' : `Place order • ${formatCurrency(total)}`}
            </button>
          </div>
        </form>
      </div>

      <aside className="card p-6">
        <div className="text-sm font-semibold">Order summary</div>
        <div className="mt-4 space-y-3">
          {cart.items.map((i)=>(
            <div key={i.productId} className="flex items-center gap-3">
              <img src={i.image} alt={i.name} className="h-12 w-12 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{i.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Qty {i.qty}</div>
              </div>
              <div className="text-sm font-semibold">{formatCurrency(i.price*i.qty)}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
          <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Subtotal</span><span className="font-semibold">{formatCurrency(subtotal)}</span></div>
          <div className="mt-2 flex justify-between"><span className="text-slate-600 dark:text-slate-300">Shipping</span><span className="font-semibold">{shipping==0?'Free':formatCurrency(shipping)}</span></div>
          <div className="mt-2 flex justify-between"><span className="text-slate-600 dark:text-slate-300">Tax</span><span className="font-semibold">{formatCurrency(tax)}</span></div>
          <div className="mt-3 flex justify-between text-base"><span className="font-semibold">Total</span><span className="font-black">{formatCurrency(total)}</span></div>
        </div>
      </aside>
    </div>
  )
}
