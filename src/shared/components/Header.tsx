// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Clock, Pin } from '@/shared/icons'
import { Btn } from './Btn'
import { NAV } from '@/shared/constants/nav'

export const Header = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  const handleCall = () => { window.location.href = 'tel:0947947168' }

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-zinc-900/85 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16 sm:h-20">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-2 text-zinc-200 hover:text-white" aria-label="Menu">
            <Menu size={22}/>
          </button>
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/assets/logo/logo_g.png" alt="G" className="h-14 sm:h-16 w-auto invert brightness-0"/>
            <span className="hidden sm:inline-flex font-display text-[20px] tracking-[0.06em]">
              <span className="text-brand font-semibold">G</span>
              <span className="text-zinc-300 font-normal"> · Barbershop</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map(n => (
              <Link key={n.key} to={n.to}
                className={`text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors ${pathname === n.to ? 'text-brand' : 'text-zinc-300 hover:text-white'}`}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:0947947168" className="sm:hidden w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center" aria-label="Call">
              <Phone size={15}/>
            </a>
            <Btn as="button" size="sm" variant="primary" className="hidden sm:inline-flex" onClick={handleCall} icon={<Phone size={12}/>}>
              0947 947 168
            </Btn>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-zinc-950/96 backdrop-blur-md flex flex-col" onClick={(e: any) => e.target === e.currentTarget && setOpen(false)}>
          <div className="flex items-center justify-between px-5 h-16">
            <img src="/assets/logo/logo_g.png" alt="G" className="h-10 invert brightness-0"/>
            <button onClick={() => setOpen(false)} className="p-2 text-zinc-200" aria-label="Close"><X size={22}/></button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-8 gap-1 pb-24">
            {NAV.map((n, i) => (
              <Link key={n.key} to={n.to} onClick={() => setOpen(false)}
                className={`font-display text-[32px] py-3 transition-colors flex items-baseline gap-4 ${pathname === n.to ? 'text-brand' : 'text-zinc-100 hover:text-brand'}`}
                style={{ animation: `fadeUp .5s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.06}s both` }}>
                <span className="text-[10px] font-sans tracking-[0.28em] text-zinc-500">0{i + 1}</span>
                {n.label}
              </Link>
            ))}
            <div className="h-px my-6 bg-gradient-to-r from-transparent via-white/15 to-transparent"/>
            <Btn as="button" variant="primary" className="self-start" icon={<Phone size={12}/>} onClick={() => { setOpen(false); handleCall() }}>
              Đặt lịch hẹn
            </Btn>
            <div className="mt-8 text-[11px] uppercase tracking-[0.18em] text-zinc-500 leading-7">
              <p className="flex items-center gap-2"><Clock size={12}/> 8:00 – 21:00 · Thứ 2 – CN</p>
              <p className="flex items-center gap-2 mt-1"><Pin size={12}/> Dĩ An · TP.HCM</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
