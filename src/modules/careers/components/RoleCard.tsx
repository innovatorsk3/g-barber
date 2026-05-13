// @ts-nocheck
import React from 'react'
import { Check, Pin, ArrowUR } from '@/shared/icons'

export default function RoleCard({ r, i }: any) {
  return (
    <article
      className="anim-up group relative bg-zinc-800/50 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-brand/40 hover:bg-zinc-800 transition-all duration-500"
      style={{ animationDelay: `${0.05 * i}s` }}>
      <div className="p-6 sm:p-7 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-1">
          <span className="text-[9px] uppercase tracking-[0.22em] text-brand font-semibold">{r.dept}</span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-400 border border-white/10 px-2 py-0.5 rounded-full">{r.type}</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl text-zinc-50 leading-tight mt-2">{r.title}</h3>
        <div className="mt-3 flex items-center gap-4 text-[12px] text-zinc-400">
          <span className="flex items-center gap-1.5"><Pin size={12} className="text-brand"/>{r.base}</span>
          <span className="font-display text-brand text-base">
            {r.salary}<span className="text-[10px] uppercase tracking-[0.14em] text-zinc-500 font-sans ml-1">/tháng</span>
          </span>
        </div>
        <ul className="mt-5 space-y-2 flex-grow">
          {r.bullets.map((b: string) => (
            <li key={b} className="flex items-start gap-2.5 text-[13px] text-zinc-300">
              <Check size={13} className="text-brand mt-0.5 flex-shrink-0"/>{b}
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Đang tuyển</span>
          <a href="#apply" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-brand hover:text-white">
            Ứng tuyển <ArrowUR size={13}/>
          </a>
        </div>
      </div>
    </article>
  )
}
