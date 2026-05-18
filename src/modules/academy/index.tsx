// @ts-nocheck
import React from 'react'
import { PageHero } from '@/shared/components/PageHero'
import { SectionLabel } from '@/shared/components/SectionLabel'
import CourseCard from './components/CourseCard'
import ProcessSection from './components/ProcessSection'
import AcademyCTA from './components/AcademyCTA'
import data from './data/academy.json'

export default function Academy() {
  return (
    <>
      <PageHero
        kicker="G Academy · Where barbers are made"
        title={<><span>Học</span><span className="italic font-light text-gold"> nghề Barber</span><span className="block">tại G.</span></>}
        body="Chương trình đào tạo Barber chuyên nghiệp, kết hợp 30% lý thuyết và 70% thực hành trên model thật. Tốt nghiệp có chứng chỉ G + cơ hội việc làm tại hệ thống."
        img="assets/gallery/uon-perm.jpg"
      />

      <section className="px-5 sm:px-8 -mt-8 sm:-mt-10 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {data.stats.map(s => (
            <div key={s.l} className="bg-zinc-900 px-4 py-5 text-center">
              <div className="font-display text-2xl sm:text-3xl text-gold">{s.n}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <SectionLabel
            kicker="Khoá học"
            title={<>Một khoá — <span className="italic font-light text-gold">trọn vẹn một hành trình</span></>}
            body="Không chia cấp độ, không học mãi. Một lộ trình hoàn chỉnh từ căn bản đến tay nghề thực chiến — kết thúc với chứng chỉ và bộ đồ nghề trong tay."
          />
          <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6">
            {data.courses.map((c, i) => <CourseCard key={c.name} c={c} i={i}/>)}
          </div>
        </div>
      </section>

      <ProcessSection />
      <AcademyCTA />
    </>
  )
}
