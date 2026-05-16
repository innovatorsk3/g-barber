// @ts-nocheck
import React from 'react'
import { Link } from 'react-router-dom'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { Arrow } from '@/shared/icons'
import data from '../data/home.json'

export default function TeamSection() {
  return (
    <section className="relative bg-zinc-950 py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 sm:mb-14">
          <SectionLabel kicker="Đội Ngũ · Master Barbers" title={<>Tâm <span className="italic text-gold">&</span> Tài</>} body="Những bàn tay tỉ mỉ đứng sau từng đường kéo." />
          <Link to="/tuyen-dung" className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-zinc-400 hover:text-gold transition-colors">
            Xem toàn đội <Arrow size={12}/>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {data.team.map((m, i) => (
            <div key={m.name} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.06] group-hover:border-gold/60 transition-all duration-500">
                <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${m.img})` }}/>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"/>
                <span className="absolute top-3 left-3 font-display text-[11px] italic text-zinc-300/80">0{i + 1}</span>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <div className="text-[9px] uppercase tracking-[0.28em] text-gold mb-1">{m.role}</div>
                  <h3 className="font-display text-base sm:text-lg text-white leading-tight">{m.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
