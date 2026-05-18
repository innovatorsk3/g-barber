// @ts-nocheck
import React from 'react'
import { SectionLabel } from '@/shared/components/SectionLabel'
import data from '../data/careers.json'

export default function BenefitsSection() {
  return (
    <section className="px-5 sm:px-8 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionLabel kicker="Quyền lợi" title={<>Vì sao chọn <span className="italic font-light text-gold">làm tại <span className="text-brand">G?</span></span></>}/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {data.perks.map((p, i) => (
            <div key={p.k} className="anim-up p-6 rounded-2xl bg-zinc-800/60 border border-white/[0.06] hover:border-gold/40 transition-all" style={{ animationDelay: `${0.04 * i}s` }}>
              <div className="font-display text-gold text-3xl italic leading-none mb-3">0{i + 1}</div>
              <h3 className="font-display text-lg text-zinc-50 leading-snug">{p.k}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
