// @ts-nocheck
import React from 'react'
import { Btn } from '@/shared/components/Btn'
import { Check, ArrowUR } from '@/shared/icons'

export default function CourseCard({ c, i }: any) {
  return (
    <article
      className="anim-up group grid md:grid-cols-12 gap-0 bg-zinc-800/50 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-500"
      style={{ animationDelay: `${0.06 * i}s` }}>
      <div className="md:col-span-4 relative aspect-[4/3] md:aspect-auto overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105" style={{ backgroundImage: `url(${c.img})`, filter: 'grayscale(15%)' }}/>
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/85 via-zinc-950/30 to-transparent md:bg-gradient-to-r"/>
        <div className="absolute top-5 left-5">
          <span className="font-display text-gold text-3xl italic leading-none">0{i + 1}</span>
        </div>
        <div className="absolute bottom-5 left-5">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold font-semibold">{c.level}</div>
          <div className="font-display text-2xl text-white mt-1">{c.weeks}</div>
        </div>
      </div>
      <div className="md:col-span-8 p-6 sm:p-8 flex flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl sm:text-3xl text-zinc-50 leading-tight">{c.name}</h3>
          <div className="font-display text-gold text-xl sm:text-2xl whitespace-nowrap">{c.price}</div>
        </div>
        <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{c.desc}</p>
        <ul className="mt-5 grid sm:grid-cols-2 gap-2.5">
          {c.units.map((u: string) => (
            <li key={u} className="flex items-start gap-2.5 text-[13px] text-zinc-300">
              <Check size={14} className="text-gold mt-0.5 flex-shrink-0"/>{u}
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between gap-3">
          <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">Khai giảng hàng tháng</span>
          <Btn size="sm" icon={<ArrowUR size={13}/>}>Đăng ký</Btn>
        </div>
      </div>
    </article>
  )
}
