// @ts-nocheck
import React from 'react'

export const Btn = ({ as: As = 'button', variant = 'primary', size = 'md', icon, children, className = '', ...p }: any) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium uppercase rounded-full transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] select-none cursor-pointer'
  const sizes: any = {
    md: 'h-12 px-7 text-[11px] tracking-[0.18em]',
    lg: 'h-14 px-9 text-[12px] tracking-[0.2em]',
    sm: 'h-10 px-5 text-[10px] tracking-[0.16em]',
  }
  const variants: any = {
    primary: 'bg-brand text-white hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-brand-glow active:translate-y-0',
    outline: 'border border-white/30 text-white hover:bg-white/5 hover:border-white hover:-translate-y-0.5',
    light:   'bg-white text-zinc-900 hover:bg-zinc-100 hover:-translate-y-0.5',
    ghost:   'text-zinc-300 hover:text-white',
  }
  return (
    <As className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...p}>
      {icon}{children}
    </As>
  )
}
