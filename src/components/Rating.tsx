import React from 'react'
import { Star } from 'lucide-react'
export function Rating({ value, reviews }: { value: number; reviews: number }) {
  const full = Math.round(value)
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-3.5 w-3.5 ${i < full ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-700'}`} />
        ))}
      </div>
      <span>{value.toFixed(1)}</span>
      <span className="text-slate-400">({reviews})</span>
    </div>
  )
}
