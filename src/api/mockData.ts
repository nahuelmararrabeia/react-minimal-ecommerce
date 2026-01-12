import type { Product } from './types'
const img = (a: string, b: string, label: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/></linearGradient></defs>
  <rect width="1200" height="900" fill="url(#g)"/>
  <text x="120" y="220" font-family="Inter, ui-sans-serif, system-ui" font-size="58" fill="rgba(255,255,255,0.92)" font-weight="800">${label}</text>
  <text x="120" y="290" font-family="Inter, ui-sans-serif, system-ui" font-size="24" fill="rgba(255,255,255,0.78)">Minimal • Premium • Headless ready</text>
  </svg>`)
export const products: Product[] = [
  { id:'p-aurora-mug', name:'Aurora Ceramic Mug', description:'Matte finish mug for daily focus. Dishwasher safe. 350ml.', category:'Essentials', price:18, compareAtPrice:24, rating:4.7, reviews:142, inStock:true, images:[img('#0f172a','#334155','Aurora Mug')], tags:['matte','ceramic','daily'] },
  { id:'p-atom-notebook', name:'Atom Notebook A5', description:'Premium paper. Dot grid. Soft-touch cover.', category:'Workspace', price:22, rating:4.8, reviews:98, inStock:true, images:[img('#020617','#475569','Atom Notebook')], tags:['workspace','paper','a5'] },
  { id:'p-studio-tote', name:'Studio Tote Bag', description:'Minimal tote with reinforced handles. Fits a 16" laptop.', category:'Travel', price:34, rating:4.6, reviews:61, inStock:true, images:[img('#0f172a','#a855f7','Studio Tote')], tags:['travel','bag','laptop'] },
  { id:'p-zen-candle', name:'Zen Candle — Cedar', description:'Clean burn. Subtle cedar scent. Calm living spaces.', category:'Home', price:28, rating:4.5, reviews:77, inStock:false, images:[img('#020617','#94a3b8','Zen Candle')], tags:['home','cedar','relax'] },
  { id:'p-axis-bottle', name:'Axis Steel Bottle', description:'Insulated steel bottle. Keeps drinks cold for 24h.', category:'Essentials', price:29, compareAtPrice:36, rating:4.7, reviews:215, inStock:true, images:[img('#0f172a','#06b6d4','Axis Bottle')], tags:['steel','insulated','24h'] },
  { id:'p-line-deskmat', name:'Line Desk Mat', description:'Soft desk mat with anti-slip base.', category:'Workspace', price:26, rating:4.6, reviews:53, inStock:true, images:[img('#020617','#64748b','Desk Mat')], tags:['workspace','desk','mat'] }
]
