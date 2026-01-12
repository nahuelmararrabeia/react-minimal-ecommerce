import React from 'react'
import { formatCurrency } from '@/lib/format'
export function Price({ price, compareAtPrice }: { price: number; compareAtPrice?: number }) {
  return (
    <div className="flex items-baseline gap-2">
      <div className="text-sm font-semibold">{formatCurrency(price)}</div>
      {compareAtPrice && compareAtPrice > price && (
        <div className="text-xs text-slate-400 line-through">{formatCurrency(compareAtPrice)}</div>
      )}
    </div>
  )
}
