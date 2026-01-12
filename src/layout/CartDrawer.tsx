import React from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/state/cartStore'
import { formatCurrency } from '@/lib/format'

export function CartDrawer() {
  const cart = useCart()
  if (!cart.isOpen) return null

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" onClick={cart.close} />
      <div className="absolute right-0 top-0 h-full w-full max-w-[460px] bg-white p-4 shadow-2xl dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Cart</div>
          <button className="btn-ghost p-2" onClick={cart.close} aria-label="Close cart"><X className="h-4 w-4" /></button>
        </div>

        {cart.items.length === 0 ? (
          <div className="mt-10 text-center">
            <div className="text-sm font-semibold">Your cart is empty</div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">Add something minimal and premium.</div>
            <Link to="/products" className="btn-primary mt-4 inline-flex" onClick={cart.close}>Browse products</Link>
          </div>
        ) : (
          <>
            <div className="mt-4 space-y-3 overflow-auto pr-1" style={{ maxHeight: 'calc(100vh - 220px)' }}>
              {cart.items.map((i) => (
                <div key={i.productId} className="flex gap-3 rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                  <img src={i.image} alt={i.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{i.name}</div>
                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">{formatCurrency(i.price)}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 p-1 dark:border-slate-800">
                        <button className="btn-ghost p-2" onClick={() => cart.setQty(i.productId, i.qty - 1)} aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                        <div className="w-8 text-center text-sm font-medium">{i.qty}</div>
                        <button className="btn-ghost p-2" onClick={() => cart.setQty(i.productId, i.qty + 1)} aria-label="Increase"><Plus className="h-4 w-4" /></button>
                      </div>
                      <button className="btn-ghost p-2" onClick={() => cart.remove(i.productId)} aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">Subtotal</span>
                <span className="font-semibold">{formatCurrency(cart.subtotal())}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-outline flex-1" onClick={cart.clear}>Clear</button>
                <Link to="/checkout" className="btn-primary flex-1 text-center" onClick={cart.close}>Checkout</Link>
              </div>
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">Demo checkout (no real payments).</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
