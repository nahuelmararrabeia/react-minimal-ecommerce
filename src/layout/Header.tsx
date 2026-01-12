import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBag, Search, Moon, Sun, Laptop } from 'lucide-react'
import { useCart } from '@/state/cartStore'
import { useTheme } from '@/state/theme'
import { cn } from '@/lib/cn'

export function Header() {
  const cart = useCart()
  const { theme, resolved, setTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            <span className="text-sm font-black">M</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Minimal Store</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Headless e‑commerce</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" end className={({ isActive }) => cn('btn-ghost', isActive && 'bg-slate-100 dark:bg-slate-800')}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => cn('btn-ghost', isActive && 'bg-slate-100 dark:bg-slate-800')}>Products</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button className="btn-outline hidden md:inline-flex" onClick={() => navigate('/products')} aria-label="Browse products">
            <Search className="h-4 w-4" /> Browse
          </button>

          <div className="relative">
            <select className={cn('input w-[130px] cursor-pointer appearance-none pr-9 text-xs')} value={theme} onChange={(e)=>setTheme(e.target.value as any)} aria-label="Theme">
              <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              {theme==='system'?<Laptop className="h-4 w-4" />:resolved==='dark'?<Moon className="h-4 w-4" />:<Sun className="h-4 w-4" />}
            </div>
          </div>

          <button className="btn-primary relative" onClick={cart.toggle} aria-label="Open cart">
            <ShoppingBag className="h-4 w-4" /><span className="hidden sm:inline">Cart</span>
            {cart.count()>0 && <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-bold text-slate-900 shadow dark:bg-slate-900 dark:text-white">{cart.count()}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}
