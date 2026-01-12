import React from 'react'
import { Link } from 'react-router-dom'
export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 text-sm text-slate-600 dark:text-slate-300 md:flex-row md:items-center md:justify-between">
        <div><span className="font-medium text-slate-900 dark:text-white">Minimal Store</span> — portfolio-grade headless e-commerce.</div>
        <div className="flex items-center gap-4">
          <Link to="/products" className="link">Products</Link>
          <a className="link" href="https://www.upwork.com" target="_blank" rel="noreferrer">Upwork</a>
        </div>
      </div>
    </footer>
  )
}
