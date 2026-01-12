export const formatCurrency = (v:number,c='USD')=>new Intl.NumberFormat(undefined,{style:'currency',currency:c}).format(v)
