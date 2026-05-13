// @ts-nocheck
import React from 'react'
import { Btn } from '@/shared/components/Btn'
import { Clock, Check, Phone } from '@/shared/icons'
import Tag from './Tag'

export default function ServiceCard({ s, i }: any) {
  return (
    <article
      className="anim-up group relative grid md:grid-cols-12 gap-0 bg-zinc-800/50 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-brand/40 transition-all duration-500"
      style={{ animationDelay: `${0.05 + i * 0.04}s` }}>
      <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105" style={{ backgroundImage: `url(${s.img})` }}/>
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/80 via-zinc-950/20 to-transparent md:bg-gradient-to-r"/>
        <div className="absolute top-4 left-4"><Tag t={s.tag}/></div>
        <div className="absolute bottom-4 left-4 font-display text-brand text-2xl italic">0{i + 1}</div>
      </div>
      <div className="md:col-span-7 p-6 sm:p-8 flex flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl sm:text-3xl text-zinc-50 leading-tight">{s.name}</h3>
          <div className="text-right whitespace-nowrap">
            <div className="font-display text-brand text-xl">{s.price}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 mt-0.5 flex items-center gap-1.5 justify-end">
              <Clock size={11}/> {s.time}
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
        <ul className="mt-5 grid sm:grid-cols-2 gap-2.5">
          {s.includes.map((inc: string) => (
            <li key={inc} className="flex items-start gap-2.5 text-[13px] text-zinc-300">
              <Check size={14} className="text-brand mt-0.5 flex-shrink-0"/>{inc}
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-end">
          <Btn size="sm" variant="primary" as="a" href="tel:0947947168" icon={<Phone size={13}/>}>Gọi Đặt Lịch</Btn>
        </div>
      </div>
    </article>
  )
}
