// @ts-nocheck
import React from 'react'
import { Link } from 'react-router-dom'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { ArrowUR, Scissor, Bottle, Cap, Hands } from '@/shared/icons'
import data from '../data/home.json'

const ICON_MAP: any = { scissor: Scissor, bottle: Bottle, cap: Cap, hands: Hands }

export default function GatewaySection() {
  return (
    <section className="relative bg-zinc-900 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
      <div className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-3xl"/>
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12 sm:mb-16">
          <SectionLabel kicker="Khám Phá · Explore" title={<>Tất cả về <span className="text-brand italic">G</span></>} />
          <p className="text-zinc-400 text-[0.95rem] max-w-sm">Bốn lối vào — chọn một để bắt đầu hành trình.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {data.gateways.map((g) => {
            const Icon = ICON_MAP[g.iconKey]
            return (
              <Link key={g.title} to={g.to}
                className="group relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.06] bg-zinc-800 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-lift">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${g.img})`, filter: 'grayscale(40%)' }}/>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/20"/>
                <div className="absolute inset-0 bg-gradient-to-t from-gold/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                <div className="relative h-full p-4 sm:p-5 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur flex items-center justify-center text-zinc-100 group-hover:bg-gold group-hover:border-gold transition-all">
                      {Icon && <Icon size={16}/>}
                    </div>
                    <span className="font-display text-[11px] sm:text-xs italic text-zinc-500">{g.kicker}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-white leading-tight">{g.title}</h3>
                    <p className="mt-1.5 text-[11px] sm:text-xs text-zinc-300 leading-relaxed">{g.desc}</p>
                    <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-300 group-hover:text-white">
                      <span>Khám phá</span>
                      <ArrowUR size={12} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
