// @ts-nocheck
import React from 'react'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { Clock, Pin, ArrowUR } from '@/shared/icons'
import data from '../data/home.json'

export default function BranchesSection() {
  return (
    <section id="branches" className="relative bg-zinc-950 py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 sm:mb-14">
          <SectionLabel kicker="Hệ Thống · 3 Chi Nhánh" title={<>Ghé <span className="italic text-brand">địa chỉ</span> gần bạn</>} body="Mở cửa cả tuần · 8:00 – 21:00 · Hotline 0947 947 168" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {data.branches.map((b) => (
            <article key={b.id} className="group rounded-2xl bg-zinc-900 border border-white/[0.06] overflow-hidden hover:border-brand/40 hover:-translate-y-1 transition-all duration-500">
              <div className="relative h-44 sm:h-48">
                <div className="absolute inset-0 bg-cover bg-center grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: `url(${b.img})` }}/>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent"/>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/70 backdrop-blur-sm border border-white/10 text-[10px] uppercase tracking-[0.28em] text-zinc-200">CS 0{b.id}</span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-lg sm:text-xl text-zinc-50 leading-tight">{b.name}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed flex items-start gap-2">
                  <Pin size={13} className="mt-0.5 flex-shrink-0 text-brand"/>{b.addr}
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1.5"><Clock size={12}/> 8:00 – 21:00</span>
                  <a href="#" className="text-[11px] uppercase tracking-[0.28em] text-zinc-400 hover:text-brand flex items-center gap-1.5 transition-colors">Bản đồ <ArrowUR size={11}/></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
