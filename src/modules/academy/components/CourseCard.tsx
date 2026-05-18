// @ts-nocheck
import React from 'react'
import { Btn } from '@/shared/components/Btn'
import { Check, Phone } from '@/shared/icons'

export default function CourseCard({ c, i }: any) {
  return (
    <article
      className="anim-up group relative overflow-hidden rounded-2xl min-h-[580px] md:min-h-[700px]"
      style={{ animationDelay: `${0.06 * i}s` }}
    >
      {/* ── Layer 0: Graduation photo — full-bleed background ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-top transition-transform duration-[8000ms] group-hover:scale-105"
          style={{ backgroundImage: `url(${c.graduationImg})` }}
        />
        {/* Dark overlay — heavy bottom, lighter top so faces stay visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/45" />
        {/* Warm gold tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-transparent to-transparent mix-blend-overlay" />
      </div>

      {/* ── Layer 1: Promo flyer — tilted, floating top-right ── */}
      <div className="absolute top-5 right-5 md:top-8 md:right-8 z-20 w-36 sm:w-44 md:w-60 pointer-events-none select-none">
        <div className="relative rotate-2">
          {/* Glow halo */}
          <div className="absolute -inset-3 bg-gold/20 rounded-2xl blur-xl" />
          <div
            className="relative aspect-square rounded-xl shadow-2xl shadow-black/70 ring-2 ring-gold/30 overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${c.img})` }}
          />
        </div>
      </div>

      {/* ── Layer 2: Content — anchored bottom-left ── */}
      <div className="relative z-10 flex flex-col justify-end min-h-[580px] md:min-h-[700px] p-6 sm:p-8 md:p-12 pt-48 md:pt-64">

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/30 text-gold text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse" />
            Đang mở đăng ký
          </span>
          {c.discount && (
            <span className="bg-red-500/90 text-white text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 rounded-full">
              {c.discount}
            </span>
          )}
        </div>

        {/* Headline */}
        <h2 className="font-display font-medium leading-[0.95] text-white mb-2"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)' }}>
          {c.name}
        </h2>
        {c.tagline && (
          <p className="font-display italic text-gold text-lg md:text-2xl mb-5 leading-snug">
            {c.tagline}
          </p>
        )}

        {/* Description */}
        <p className="text-zinc-300 text-sm leading-relaxed max-w-lg mb-6">{c.desc}</p>

        {/* Units — 2 columns */}
        <ul className="grid sm:grid-cols-2 gap-2 mb-8 max-w-xl">
          {c.units.map((u: string) => (
            <li key={u} className="flex items-start gap-2 text-[13px] text-zinc-200">
              <Check size={13} className="text-gold mt-0.5 flex-shrink-0" />
              {u}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/10">
          <Btn as="a" href={`tel:${c.hotline}`} icon={<Phone size={12} />}>
            Đăng ký ngay
          </Btn>
          <a
            href={`tel:${c.hotline}`}
            className="flex items-center gap-2 text-sm text-zinc-300 hover:text-gold transition-colors"
          >
            <Phone size={13} className="text-zinc-500" />
            <span className="font-medium tracking-wide">{c.hotline}</span>
          </a>
          <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 ml-auto hidden sm:block">
            {c.weeks} · Khai giảng hàng tháng
          </span>
        </div>
      </div>

      {/* ── Layer 3: Gold accent line — left edge ── */}
      <div className="absolute left-0 top-[15%] bottom-[15%] w-[2px] z-10 rounded-full bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
    </article>
  )
}
