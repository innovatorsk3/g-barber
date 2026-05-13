// @ts-nocheck
import React from 'react'
import { Eyebrow } from './Eyebrow'

export const SectionLabel = ({ kicker, title, body, center, children }: any) => (
  <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl`}>
    {kicker && <div className="mb-4"><Eyebrow>{kicker}</Eyebrow></div>}
    <h2 className="font-display font-medium leading-[1.05] text-[clamp(2rem,6vw,3.5rem)] text-zinc-50">{title}</h2>
    {body && <p className="mt-4 text-[0.95rem] leading-relaxed text-zinc-400">{body}</p>}
    {children}
  </div>
)
