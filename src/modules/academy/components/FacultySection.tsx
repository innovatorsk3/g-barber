// @ts-nocheck
import React from 'react'
import { SectionLabel } from '@/shared/components/SectionLabel'
import data from '../data/academy.json'

export default function FacultySection() {
  const members = [...data.faculty, data.faculty[0], data.faculty[1]]
  return (
    <section className="bg-zinc-900 border-y border-white/5 px-5 sm:px-8 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionLabel
          kicker="Đội ngũ giảng viên"
          title={<>Học từ <span className="italic font-light text-brand">Master Barber thực chiến</span></>}
          body="Giảng viên đều là Master Barber với hơn 10 năm kinh nghiệm tại các tiệm hàng đầu Sài Gòn."
        />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {members.map((m, i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.06]">
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105" style={{ backgroundImage: `url(${m.img})` }}/>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent"/>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-[9px] uppercase tracking-[0.22em] text-brand font-semibold">{m.role}</div>
                <h3 className="font-display text-base sm:text-lg text-white leading-tight mt-1">{m.name}</h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">{m.years} kinh nghiệm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
