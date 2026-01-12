import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { storage } from '@/lib/storage'

type Theme = 'light' | 'dark' | 'system'
type Ctx = { theme: Theme; resolved: 'light'|'dark'; setTheme:(t:Theme)=>void }
const ThemeContext = createContext<Ctx|null>(null)
const KEY = 'mec.theme.v1'
const getSystem = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') as 'light'|'dark'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => storage.get(KEY, 'system' as Theme))
  const [resolved, setResolved] = useState<'light'|'dark'>(() => (theme==='system'?getSystem():theme))
  useEffect(() => {
    const next = theme==='system'?getSystem():theme
    setResolved(next)
    storage.set(KEY, theme)
    document.documentElement.classList.toggle('dark', next==='dark')
  }, [theme])
  const value = useMemo(() => ({ theme, resolved, setTheme }), [theme, resolved])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
