// @ts-nocheck
import React from 'react'
import { Link } from 'react-router-dom'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { Btn } from '@/shared/components/Btn'
import { Clock, Arrow } from '@/shared/icons'
import data from '../data/home.json'

export default function FeaturedSection() {
  return (
    <section id="dichvu" className="relative bg-zinc-950 py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-14">
          <SectionLabel center kicker="Dịch Vụ Nổi Bật · Featured"
            title={<>Được khách hàng <span className="italic text-gold">yêu thích</span> nhất</>}
            body="Ba dịch vụ được book nhiều nhất tháng này." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {data.featured.map((s, i) => (
            <article key={s.name} className="group relative flex flex-col rounded-2xl bg-zinc-900 border border-white/[0.06] overflow-hidden hover:border-gold/40 transition-all duration-500 hover:-translate-y-1.5">
              <div className="aspect-[5/4] relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${s.img})`, filter: 'grayscale(15%)' }}/>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"/>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold/90 text-white text-[9px] font-semibold tracking-[0.18em] uppercase backdrop-blur">{s.tag}</span>
                <span className="absolute bottom-3 right-3 font-display text-xl text-gold">0{i + 1}</span>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-baseline justify-between gap-3 min-h-[3.6rem]">
                  <h3 className="font-display text-xl sm:text-[1.4rem] text-zinc-50 leading-tight">{s.name}</h3>
                  <span className="font-display text-gold text-base whitespace-nowrap">{s.price}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed flex-grow">{s.blurb}</p>
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] uppercase tracking-[0.28em]">
                  <span className="text-zinc-500 flex items-center gap-1.5"><Clock size={12}/> ~ 45 phút</span>
                  <span className="text-zinc-500">{s.tag}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 sm:mt-14 text-center">
          <Btn variant="outline" size="md" as={Link} to="/dich-vu">Xem toàn bộ dịch vụ & bảng giá <Arrow size={13}/></Btn>
        </div>
      </div>
    </section>
  )
}
