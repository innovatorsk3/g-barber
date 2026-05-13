// @ts-nocheck
import React from 'react'
import { Eyebrow } from './Eyebrow'

export const PageHero = ({ kicker, title, body, img }: any) => (
  <section className="relative pt-32 sm:pt-44 pb-16 sm:pb-24 px-5 sm:px-8 overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})`, filter: 'grayscale(30%)' }}/>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/75 to-zinc-900"/>
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand/15 to-transparent mix-blend-screen"/>
    </div>
    <div className="max-w-5xl mx-auto relative">
      <Eyebrow>{kicker}</Eyebrow>
      <h1 className="mt-5 font-display font-medium leading-[0.98] text-[clamp(2.4rem,8vw,5.2rem)] text-zinc-50">{title}</h1>
      {body && <p className="mt-5 max-w-xl text-zinc-300 text-base leading-relaxed">{body}</p>}
    </div>
  </section>
)
