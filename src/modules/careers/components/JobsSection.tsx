// @ts-nocheck
import React, { useState } from 'react'
import { SectionLabel } from '@/shared/components/SectionLabel'
import RoleCard from './RoleCard'
import data from '../data/careers.json'

export default function JobsSection() {
  const [dept, setDept] = useState('Tất cả')
  const depts = ['Tất cả', ...new Set(data.roles.map(r => r.dept))]
  const filtered = dept === 'Tất cả' ? data.roles : data.roles.filter(r => r.dept === dept)

  return (
    <section className="bg-zinc-900 border-y border-white/5 px-5 sm:px-8 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <SectionLabel kicker="Vị trí đang tuyển" title={<>5 vị trí <span className="italic font-light text-brand">đang mở</span></>}/>
          <div className="flex flex-wrap gap-2">
            {depts.map(d => (
              <button key={d} onClick={() => setDept(d)}
                className={`text-[10px] uppercase tracking-[0.18em] font-semibold px-4 py-2 rounded-full border transition-all ${
                  dept === d ? 'bg-brand border-brand text-white' : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                }`}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((r, i) => <RoleCard key={r.title} r={r} i={i}/>)}
        </div>
      </div>
    </section>
  )
}
