// @ts-nocheck
import React from 'react'
import { Btn } from '@/shared/components/Btn'
import { Arrow, Pin, Clock } from '@/shared/icons'

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden grain pt-16 sm:pt-20">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/assets/team/1.jpg)",
            filter: "grayscale(35%) contrast(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/85 via-zinc-950/60 to-zinc-900" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand/15 to-transparent mix-blend-screen" />
      </div>
      <div className="relative z-10 max-w-6xl w-full px-6 sm:px-8 py-20">
        <div className="anim-up inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-zinc-300">
            From Heart to Hair · Tóc Đẹp Từ Tâm
          </span>
        </div>
        <h1 className="anim-up d1 font-display font-medium text-zinc-50 leading-[0.95] text-[clamp(3.4rem,15vw,8rem)]">
          <span className="text-brand">G</span>
          <span className="text-zinc-100"> ·</span>
          <span className="block">
            Barber<span className="text-brand">·</span>shop
          </span>
        </h1>
        <p className="anim-up d2 mt-7 max-w-md text-zinc-300 text-[0.98rem] sm:text-base leading-relaxed">
          Không chỉ là tiệm cắt tóc — mà còn là nơi gặp gỡ và trò chuyện. Chúng
          tôi kết hợp cổ điển & hiện đại để bạn có mái tóc đúng với ý mình nhất.
        </p>
        <div className="anim-up d3 mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Btn variant="primary" size="lg" as="a" href="tel:0947947168">
            Gọi Ngay <Arrow size={14} />
          </Btn>
          <Btn variant="outline" size="lg" as="a" href="#dichvu">
            Khám Phá Dịch Vụ
          </Btn>
        </div>
        <div className="anim-up d4 mt-14 sm:mt-16 flex items-center gap-5 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          <span className="flex items-center gap-2">
            <Pin size={13} className="text-brand" /> 3 chi nhánh
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="flex items-center gap-2">
            <Clock size={13} className="text-brand" /> 8:00 – 21:00
          </span>
        </div>
      </div>
    </section>
  );
}
