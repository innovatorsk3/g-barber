// @ts-nocheck
import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, Pin } from '@/shared/icons'
import { NAV } from '@/shared/constants/nav'

export const Footer = () => (
  <footer className="bg-zinc-950 border-t border-white/5 px-5 sm:px-8 pt-16 pb-28 sm:pb-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo/logo_g.png" alt="" className="h-12 invert brightness-0"/>
            <span className="font-display text-2xl">
              <span className="text-brand font-semibold">G</span>
              <span className="text-zinc-300"> · Barbershop</span>
            </span>
          </div>
          <p className="mt-5 text-sm text-zinc-400 leading-relaxed max-w-sm">Đẳng cấp trong từng đường kéo. Phong cách nam tính, chuyên nghiệp. Sài Gòn & Bình Dương.</p>
          <div className="mt-6 flex gap-2 flex-wrap">
            {['Facebook', 'Instagram', 'TikTok', 'YouTube'].map(s => (
              <a key={s} href="#" className="text-[11px] uppercase tracking-[0.12em] text-zinc-300 border border-white/10 hover:border-gold hover:text-white hover:bg-gold/10 rounded-full px-3.5 py-2 transition-all">
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold font-semibold mb-5">Điều Hướng</div>
          <ul className="space-y-3 text-sm text-zinc-400">
            {NAV.map(n => (
              <li key={n.key}><Link to={n.to} className="hover:text-white transition-colors">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold font-semibold mb-5">Liên Hệ</div>
          <a href="tel:0947947168" className="font-display text-3xl text-white hover:text-gold transition-colors">0947 947 168</a>
          <p className="mt-2 text-sm text-zinc-400">gbarber.hcm@gmail.com</p>
          <p className="mt-4 text-sm text-zinc-400 flex items-center gap-2"><Clock size={13}/> 8:00 – 21:00 · Thứ 2 – CN</p>
          <p className="mt-1.5 text-sm text-zinc-400 flex items-center gap-2"><Pin size={13}/> Dĩ An & Thủ Đức</p>
        </div>
      </div>
      <div className="h-px mt-10 bg-gradient-to-r from-transparent via-white/15 to-transparent"/>
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-zinc-500 tracking-[0.06em]">© 2026 G - Barbershop. All rights reserved.</p>
        <p className="text-[11px] text-zinc-500">Made with <span className="text-gold">♥</span> in Việt Nam</p>
      </div>
    </div>
  </footer>
)
