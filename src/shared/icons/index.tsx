// @ts-nocheck
import React from 'react'

const I = ({ size = 20, sw = 1.6, children, ...p }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}>{children}</svg>
)

export const Phone   = (p: any) => <I {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></I>
export const Pin     = (p: any) => <I {...p}><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></I>
export const Clock   = (p: any) => <I {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></I>
export const Arrow   = (p: any) => <I {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></I>
export const ArrowUR = (p: any) => <I {...p}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></I>
export const Menu    = (p: any) => <I {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></I>
export const X       = (p: any) => <I {...p}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></I>
export const HomeIc  = (p: any) => <I {...p}><path d="M3 11l9-8 9 8"/><path d="M5 9.5V21h14V9.5"/></I>
export const Grid    = (p: any) => <I {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></I>
export const Check   = (p: any) => <I {...p}><polyline points="20 6 9 17 4 12"/></I>
export const Mail    = (p: any) => <I {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2 7 12 13 22 7"/></I>
export const Star    = (p: any) => <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 6.91-1.01z"/></svg>
export const Sparkle = (p: any) => <I {...p}><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></I>
export const Scissor = (p: any) => <I {...p}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></I>
export const Bottle  = (p: any) => <I {...p}><path d="M10 2h4v3h-4z"/><path d="M9 5h6l1 4v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9z"/><line x1="9" y1="13" x2="15" y2="13"/></I>
export const Cap     = (p: any) => <I {...p}><path d="M22 10L12 4 2 10l10 6 10-6z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></I>
export const Hands   = (p: any) => <I {...p}><path d="M9 11V6a2 2 0 1 1 4 0v5"/><path d="M9 11V8a2 2 0 1 0-4 0v6a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6v-3a2 2 0 1 0-4 0v1"/></I>
export const Heart   = (p: any) => <I {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></I>
export const Eye     = (p: any) => <I {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></I>
export const Upload  = (p: any) => <I {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></I>
