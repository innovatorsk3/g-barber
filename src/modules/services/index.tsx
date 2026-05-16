// @ts-nocheck
import React from 'react'
import { PageHero } from '@/shared/components/PageHero'
import { SectionLabel } from '@/shared/components/SectionLabel'
import ServiceStats from './components/ServiceStats'
import ServiceCard from './components/ServiceCard'
import ServiceFAQ from './components/ServiceFAQ'
import data from './data/services.json'

export default function Services() {
  return (
    <>
      <PageHero
        kicker="Dịch vụ · Pricelist 2026"
        title={<><span>Bảng Giá</span><span className="block italic font-light text-gold mt-1">Dịch Vụ G</span></>}
        body="Mỗi dịch vụ tại G được thiết kế để mang đến không chỉ kiểu tóc đẹp — mà còn là trải nghiệm thư giãn, nam tính, chỉn chu. Mọi giá đã bao gồm gội đầu và tạo kiểu."
        img="assets/gallery/5.jpg"
      />

      <ServiceStats />

      {/* Bảng giá chính thức */}
      <section className="px-5 sm:px-8 py-14 sm:py-20 bg-zinc-900">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <SectionLabel
              center
              kicker="Bảng Giá · Official 2026"
              title={<>Bảng giá <span className="italic font-light text-gold">chính thức</span></>}
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/assets/price/price.jpg"
              alt="Bảng giá dịch vụ G-Barbershop 2026"
              className="w-full block"
            />
          </div>
          <p className="mt-4 text-center text-[10px] text-zinc-500 uppercase tracking-[0.22em]">
            Cập nhật 2026 · Hotline 0947 947 168
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <SectionLabel
              kicker="Chi tiết dịch vụ"
              title={<>Khám phá từng <span className="italic font-light text-gold">nhóm dịch vụ</span></>}
              body="Bấm vào từng nhóm để xem chi tiết. Gọi 0947 947 168 để được tư vấn thêm."
            />
          </div>
          <div className="grid gap-5 sm:gap-6">
            {data.services.map((s, i) => <ServiceCard key={s.name} s={s} i={i}/>)}
          </div>
        </div>
      </section>

      <ServiceFAQ />
    </>
  )
}
