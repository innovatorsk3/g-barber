// @ts-nocheck
import React from 'react'

const TAG_STYLES: any = {
  'Best seller': 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  'Signature':   'bg-brand/15 text-brand border-brand/30',
  'Premium':     'bg-fuchsia-400/15 text-fuchsia-300 border-fuchsia-400/30',
  'Add-on':      'bg-white/5 text-zinc-300 border-white/20',
  'Kids':        'bg-sky-400/15 text-sky-300 border-sky-400/30',
}

export default function Tag({ t }: { t: string }) {
  const cls = TAG_STYLES[t] || 'bg-white/5 text-zinc-300 border-white/20'
  return (
    <span className={`inline-flex items-center text-[9px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border ${cls}`}>
      {t}
    </span>
  )
}
