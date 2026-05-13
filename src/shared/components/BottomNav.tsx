// @ts-nocheck
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HomeIc, Grid, Pin, Phone } from '@/shared/icons'

export const BottomNav = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const handleCall = () => { window.location.href = 'tel:0947947168' }

  const handleBranches = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('branches')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  const navItems = [
    { icon: HomeIc, label: 'Home',    to: '/' },
    { icon: Grid,   label: 'Dịch Vụ', to: '/dich-vu' },
  ]

  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-zinc-900/90 backdrop-blur-xl border-t border-white/10 px-3 pt-2 pb-[max(env(safe-area-inset-bottom),0.6rem)]">
      <div className="flex items-center justify-around relative">
        {navItems.map(it => (
          <Link key={it.to} to={it.to} className={`flex flex-col items-center gap-1 px-3 py-1.5 transition-colors ${pathname === it.to ? 'text-brand' : 'text-zinc-400'}`}>
            <it.icon size={20}/>
            <span className="text-[9px] uppercase tracking-[0.1em] font-medium">{it.label}</span>
          </Link>
        ))}
        <button onClick={handleBranches} className="flex flex-col items-center gap-1 px-3 py-1.5 transition-colors text-zinc-400">
          <Pin size={20}/>
          <span className="text-[9px] uppercase tracking-[0.1em] font-medium">C.Nhánh</span>
        </button>
        <button onClick={handleCall} aria-label="Call" className="absolute right-1 -top-5 w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-brand-glow ring-4 ring-zinc-900">
          <Phone size={16}/>
        </button>
      </div>
    </nav>
  )
}
