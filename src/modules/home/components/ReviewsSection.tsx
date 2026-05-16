// @ts-nocheck
import React from 'react'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { Star } from '@/shared/icons'
import data from '../data/home.json'

export default function ReviewsSection() {
  return (
    <section className="relative bg-zinc-900 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 font-display text-[18rem] sm:text-[26rem] text-white/[0.03] leading-none pointer-events-none select-none">"</div>
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12 sm:mb-14">
          <SectionLabel center kicker="Khách Hàng Nói Về G" title={<>Đánh giá <span className="italic text-gold">thật</span>, từ khách thật.</>} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {data.reviews.map((r, i) => (
            <figure key={r.name} className="relative p-6 sm:p-7 rounded-2xl bg-zinc-800/50 border border-white/[0.06] hover:border-gold/30 transition-all">
              <div className="flex gap-0.5 text-gold mb-4">
                {[0, 1, 2, 3, 4].map(s => <Star key={s} size={14}/>)}
              </div>
              <blockquote className="font-display italic text-[1.05rem] sm:text-[1.15rem] text-zinc-100 leading-snug">"{r.text}"</blockquote>
              <figcaption className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.28em] text-zinc-400 font-semibold">{r.name}</span>
                <span className="text-[10px] text-zinc-600 font-mono">— G.{2026 - i}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
