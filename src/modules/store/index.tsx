// @ts-nocheck
import React, { useState } from 'react'
import { PageHero } from '@/shared/components/PageHero'
import { SectionLabel } from '@/shared/components/SectionLabel'
import PromoStrip from './components/PromoStrip'
import ProductCard from './components/ProductCard'
import ProductFilter from './components/ProductFilter'
import BundlePromo from './components/BundlePromo'
import data from './data/products.json'

export default function Store() {
  const [cat, setCat] = useState('Tất cả')
  const filtered = cat === 'Tất cả' ? data.products : data.products.filter(p => p.cat === cat)

  return (
    <>
      <PageHero
        kicker="G-Store · Curated for gents"
        title={<><span>Cửa hàng</span><span className="block italic font-light text-brand mt-1">tóc & râu</span></>}
        body="Bộ sưu tập sản phẩm tóc, dao cạo, dầu gội được G tuyển chọn — dùng chính tại tiệm. Ghé tiệm hoặc hỏi barber của bạn để được tư vấn sản phẩm phù hợp."
        img="assets/gallery/3.jpg"
      />

      <PromoStrip />

      <section className="px-5 sm:px-8 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8 sm:mb-10">
            <SectionLabel kicker="Sản phẩm" title={<>Tóc, râu &amp; <span className="italic font-light text-brand">phụ kiện</span></>}/>
            <ProductFilter categories={data.categories} active={cat} onChange={setCat}/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((p, i) => <ProductCard key={p.name} p={p} i={i}/>)}
          </div>
        </div>
      </section>

      <BundlePromo />
    </>
  )
}
