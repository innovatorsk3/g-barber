// @ts-nocheck
import React from 'react'
import { Btn } from '@/shared/components/Btn'
import { Eyebrow } from '@/shared/components/Eyebrow'
import { Phone, Clock, Pin } from '@/shared/icons'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-900"/>
      <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20" style={{ backgroundImage: 'url(/assets/team/2.jpg)' }}/>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent"/>
      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-24 sm:py-32 text-center">
        <Eyebrow className="whitespace-nowrap"><span className="text-gold/90 uppercase">LAST CALL · THE CHAIR IS WAITING</span></Eyebrow>
        <h2 className="mt-5 font-display font-medium leading-[0.95] text-[clamp(2.8rem,10vw,6rem)] text-white">
          Sẵn Sàng<span className="block italic font-light text-white/80">Thay Đổi?</span>
        </h2>
        <p className="mt-6 max-w-md mx-auto text-white/85 leading-relaxed">Gọi ngay — barber của bạn đang chờ.</p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Btn variant="primary" size="lg" as="a" href="tel:0947947168" icon={<Phone size={13}/>}>Gọi Ngay</Btn>
          <Btn variant="outline" size="lg" className="!border-white/40 hover:!bg-white/10" as="a" href="tel:0947947168">0947 947 168</Btn>
        </div>
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[11px] uppercase tracking-[0.28em] text-white/70">
          <span className="flex items-center gap-2"><Clock size={12}/> 8:00 – 21:00</span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/40"/>
          <span className="flex items-center gap-2"><Pin size={12}/> 3 chi nhánh · HCM & Bình Dương</span>
        </div>
      </div>
    </section>
  )
}
