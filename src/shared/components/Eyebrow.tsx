// @ts-nocheck
import React from 'react'

export const Eyebrow = ({ children, dot = true, className = '' }: any) => (
  <div className={`inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-400 ${className}`}>
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
    {children}
  </div>
)
