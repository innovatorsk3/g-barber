// @ts-nocheck
import React from 'react'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { Heart, Eye, Sparkle } from '@/shared/icons'
import data from '../data/home.json'

const ICON_MAP: any = { heart: Heart, eye: Eye, sparkle: Sparkle }

export default function WhySection() {
  return (
    <section className="relative bg-zinc-900 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <SectionLabel kicker="Tại sao chọn G?" title={<>Ba lý do để <span className="italic text-gold">quay lại</span>.</>} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {data.usp.map((u, i) => {
            const Icon = ICON_MAP[u.iconKey]
            return (
              <div key={u.title} className="group relative p-7 sm:p-8 rounded-2xl bg-zinc-800/60 border border-white/[0.06] hover:border-gold/40 hover:bg-zinc-800 transition-all duration-500">
                <div className="absolute top-7 right-7 font-display text-zinc-700 text-3xl italic">0{i + 1}</div>
                <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-white transition-all">
                  {Icon && <Icon size={20}/>}
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-zinc-50 leading-snug">{u.title}</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{u.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
