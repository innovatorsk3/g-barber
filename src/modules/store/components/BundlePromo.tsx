// @ts-nocheck
import React from 'react'
import { Btn } from '@/shared/components/Btn'
import { Eyebrow } from '@/shared/components/Eyebrow'
import data from '../data/products.json'

export default function BundlePromo() {
  const b = data.bundle
  return (
    <section className="px-5 sm:px-8 pb-20">
      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-800 border border-brand-700">
        <div className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay" style={{ backgroundImage: `url(${b.img})` }}/>
        <div className="relative px-6 sm:px-12 py-12 sm:py-16 flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <Eyebrow>Sản phẩm G · Dùng chính tại tiệm</Eyebrow>
            <h3 className="mt-4 font-display text-3xl sm:text-5xl text-white leading-tight">
              {b.name}<span className="block italic font-light text-white/80">{b.sub}</span>
            </h3>
            <p className="mt-4 text-white/85 text-sm max-w-md leading-relaxed">{b.desc}</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-white/70 text-sm mb-5">{b.price}</p>
            <Btn variant="light" as="a" href="tel:0947947168">Gọi Tư Vấn</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
