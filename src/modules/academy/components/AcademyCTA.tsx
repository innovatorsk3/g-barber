// @ts-nocheck
import React from 'react'
import { Btn } from '@/shared/components/Btn'
import { Eyebrow } from '@/shared/components/Eyebrow'
import { Phone } from '@/shared/icons'

export default function AcademyCTA() {
  return (
    <section className="px-5 sm:px-8 pb-20">
      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-zinc-800 border border-white/[0.06]">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(assets/gallery/6.jpg)', filter: 'grayscale(40%)' }}/>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/30"/>
        <div className="relative px-6 sm:px-12 py-12 sm:py-16 max-w-2xl">
          <Eyebrow>Khai giảng tháng 6 · Còn 8 chỗ</Eyebrow>
          <h3 className="mt-4 font-display text-3xl sm:text-5xl text-white leading-tight">
            Bắt đầu sự nghiệp<span className="block italic font-light text-brand">Barber hôm nay</span>
          </h3>
          <p className="mt-4 text-zinc-300 text-sm max-w-md">Đăng ký tư vấn miễn phí, nhận lộ trình học cá nhân hoá cho bạn.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Btn icon={<Phone size={12}/>}>Tư vấn miễn phí</Btn>
            <Btn variant="outline">Tải brochure</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
