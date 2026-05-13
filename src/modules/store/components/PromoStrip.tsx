// @ts-nocheck
import React from 'react'
import data from '../data/products.json'

export default function PromoStrip() {
  return (
    <section className="px-5 sm:px-8 -mt-8 sm:-mt-10 relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
        {data.promoStats.map(s => (
          <div key={s.l} className="bg-zinc-900 px-3 py-5 sm:px-6 sm:py-6 text-center">
            <div className="font-display text-lg sm:text-2xl text-brand">{s.n}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
