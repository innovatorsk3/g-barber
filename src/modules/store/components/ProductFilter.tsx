// @ts-nocheck
import React from 'react'

interface Props {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}

export default function ProductFilter({ categories, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(c => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`text-[10px] uppercase tracking-[0.18em] font-semibold px-4 py-2 rounded-full border transition-all ${
            active === c ? 'bg-brand border-brand text-white' : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
          }`}>
          {c}
        </button>
      ))}
    </div>
  )
}
