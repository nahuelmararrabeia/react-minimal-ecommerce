import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="card mx-auto max-w-[720px] p-10 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
        <CheckCircle2 className="h-6 w-6" />
      </div>
      <div className="mt-4 text-xl font-semibold tracking-tight">Order confirmed</div>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Demo flow. In real projects, integrate Stripe/PayPal or a backend order system.
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link to="/products" className="btn-primary">Continue shopping</Link>
        <Link to="/" className="btn-outline">Back home</Link>
      </div>
    </div>
  )
}
