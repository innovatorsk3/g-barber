// @ts-nocheck
import React from 'react'
import { SectionLabel } from '@/shared/components/SectionLabel'
import data from '../data/academy.json'

export default function ProcessSection() {
  return (
    <section className="px-5 sm:px-8 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionLabel kicker="Quy trình đăng ký" title={<>4 bước <span className="italic font-light text-gold">đơn giản</span></>}/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.process.map(p => (
            <div key={p.n} className="relative p-6 rounded-2xl bg-zinc-800/60 border border-white/[0.06] hover:border-gold/40 hover:bg-zinc-800 transition-all">
              <div className="font-display text-gold text-4xl italic leading-none">{p.n}</div>
              <h3 className="mt-4 font-display text-xl text-zinc-50">{p.k}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
