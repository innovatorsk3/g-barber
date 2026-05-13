// @ts-nocheck
import React from 'react'

export default function ProductCard({ p, i }: any) {
  return (
    <article
      className="anim-up group flex flex-col bg-zinc-800/50 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-brand/40 hover:shadow-card-lift transition-all duration-500"
      style={{ animationDelay: `${0.04 * i}s` }}>
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105" style={{ backgroundImage: `url(${p.img})`, filter: 'saturate(0.85)' }}/>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent"/>
        {p.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand/90 text-white text-[9px] font-semibold tracking-[0.18em] uppercase backdrop-blur">
            {p.tag}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="text-[9px] uppercase tracking-[0.22em] text-brand font-semibold mb-1.5">{p.cat}</div>
        <h3 className="font-display text-lg text-zinc-50 leading-tight">{p.name}</h3>
        <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed flex-grow">{p.sub}</p>
        <div className="mt-4 pt-4 border-t border-white/5 flex items-end justify-between gap-3">
          <div>
            <div className="font-display text-brand text-lg leading-none">{p.price}</div>
            <div className="text-[10px] text-zinc-500 mt-1 uppercase tracking-[0.14em]">Dùng tại G</div>
          </div>
          <a href="tel:0947947168" className="h-10 px-4 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.16em] text-zinc-200 hover:bg-brand hover:border-brand hover:text-white transition-all inline-flex items-center">
            Liên hệ
          </a>
        </div>
      </div>
    </article>
  )
}
