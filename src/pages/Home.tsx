import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="card overflow-hidden">
        <div className="grid gap-6 p-6 md:grid-cols-2 md:items-center">
          <div>
            <div className="badge">Minimal premium</div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              A headless e‑commerce frontend that feels production‑ready.
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Product listing, filters, detail page, cart drawer and checkout UI — ideal for Upwork portfolio.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link to="/products" className="btn-primary">Browse products <ArrowRight className="h-4 w-4" /></Link>
              <a className="btn-outline" href="https://www.upwork.com" target="_blank" rel="noreferrer">Hire on Upwork</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-900 to-slate-600 dark:from-slate-700 dark:to-slate-950" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="card w-[86%] p-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">Featured drop</div>
                <div className="mt-2 text-lg font-semibold">Essentials Collection</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Clean silhouettes. Neutral tones.</div>
                <Link to="/products" className="btn-primary mt-4 w-full">Shop now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
