// @ts-nocheck
import React from 'react'
import { PageHero } from '@/shared/components/PageHero'
import TimelineSection from './components/TimelineSection'

export default function About() {
  return (
    <>
      <PageHero
        kicker="Về Chúng Tôi · Our Story"
        title={<><span>Hành Trình</span><span className="block italic font-light text-gold mt-1"><span className="text-brand">G</span>-Barbershop</span></>}
        body="Từ một chiếc ghế cắt tóc đến hệ thống 3 chi nhánh — câu chuyện của sự kiên trì, niềm tin và tình yêu với nghề."
        img="assets/branches/cn1.jpg"
      />
      <TimelineSection />
    </>
  )
}
