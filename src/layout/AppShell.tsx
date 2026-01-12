import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { CartDrawer } from './CartDrawer'
import { Footer } from './Footer'
import { ToastProvider } from '@/components/Toast'

export function AppShell() {
  return (
    <ToastProvider>
      <div className="min-h-screen">
        <Header />
        <CartDrawer />
        <main className="mx-auto max-w-[1200px] px-4 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  )
}
