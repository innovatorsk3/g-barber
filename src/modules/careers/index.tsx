// @ts-nocheck
import React from 'react'
import { PageHero } from '@/shared/components/PageHero'
import BenefitsSection from './components/BenefitsSection'
import ApplicationForm from './components/ApplicationForm'
import data from './data/careers.json'

export default function Careers() {
  return (
    <>
      <PageHero
        kicker="Tuyển dụng · Join the crew"
        title={<><span>Trở thành</span><span className="block italic font-light text-gold">một phần của <span className="text-brand">G.</span></span></>}
        body="G đang tìm những người yêu nghề, có gu, sẵn sàng phát triển cùng một thương hiệu Barbershop hàng đầu. Lương tốt — môi trường tử tế — lộ trình rõ ràng."
        img="assets/team/1.jpg"
      />

      <section className="px-5 sm:px-8 -mt-8 sm:-mt-10 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {data.stats.map(s => (
            <div key={s.l} className="bg-zinc-900 px-4 py-5 text-center">
              <div className="font-display text-2xl sm:text-3xl text-gold">{s.n}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <BenefitsSection />
      <ApplicationForm />
    </>
  )
}
