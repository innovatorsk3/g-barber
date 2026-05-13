// @ts-nocheck
import React from 'react'
import data from '../data/services.json'

export default function ServiceFAQ() {
  return (
    <section className="bg-zinc-900 border-y border-white/5 px-5 sm:px-8 py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {data.faq.map(f => (
          <div key={f.k}>
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand font-semibold mb-2.5">{f.k}</div>
            <p className="text-sm text-zinc-300 leading-relaxed">{f.v}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
