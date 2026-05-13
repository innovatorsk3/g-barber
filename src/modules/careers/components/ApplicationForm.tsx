// @ts-nocheck
import React from 'react'
import { Btn } from '@/shared/components/Btn'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { Upload, ArrowUR } from '@/shared/icons'
import data from '../data/careers.json'

export default function ApplicationForm() {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    alert('Cảm ơn! Bộ phận tuyển dụng sẽ liên hệ trong 48h.')
  }

  return (
    <section id="apply" className="px-5 sm:px-8 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <SectionLabel center kicker="Ứng tuyển" title={<>Gửi CV cho <span className="italic font-light text-brand">G</span></>}
          body="Hoặc gửi trực tiếp về gbarber.hcm@gmail.com — tiêu đề: [Vị trí ứng tuyển] - Họ tên."/>
        <form onSubmit={handleSubmit} className="mt-10 p-6 sm:p-8 rounded-2xl bg-zinc-800/50 border border-white/[0.06] space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-semibold">Họ tên</span>
              <input required type="text" className="mt-2 w-full h-11 px-4 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm transition-all focus:outline-none focus:border-brand/50" placeholder="Nguyễn Văn A"/>
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-semibold">Số điện thoại</span>
              <input required type="tel" className="mt-2 w-full h-11 px-4 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm transition-all focus:outline-none focus:border-brand/50" placeholder="0947 947 168"/>
            </label>
          </div>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-semibold">Email</span>
            <input required type="email" className="mt-2 w-full h-11 px-4 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm transition-all focus:outline-none focus:border-brand/50" placeholder="ban@email.com"/>
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-semibold">Vị trí ứng tuyển</span>
            <select className="mt-2 w-full h-11 px-4 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm transition-all focus:outline-none focus:border-brand/50">
              {data.roles.map(r => <option key={r.title}>{r.title}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-semibold">Giới thiệu bản thân</span>
            <textarea rows={4} className="mt-2 w-full p-4 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm resize-none transition-all focus:outline-none focus:border-brand/50" placeholder="Kinh nghiệm, kỹ năng, mong muốn..."/>
          </label>
          <label className="flex items-center gap-3 px-4 h-14 bg-zinc-900 border border-dashed border-white/15 rounded-lg cursor-pointer hover:border-brand/50 transition-all">
            <span className="w-9 h-9 rounded-full bg-brand/15 text-brand flex items-center justify-center">
              <Upload size={14}/>
            </span>
            <div>
              <div className="text-sm text-white font-medium">Đính kèm CV (PDF / DOC)</div>
              <div className="text-[11px] text-zinc-500">Tối đa 5MB</div>
            </div>
            <input type="file" className="hidden"/>
          </label>
          <Btn as="button" type="submit" variant="primary" className="w-full" icon={<ArrowUR size={13}/>}>
            Gửi đơn ứng tuyển
          </Btn>
          <p className="text-[11px] text-zinc-500 text-center">Bộ phận HR phản hồi trong 48h làm việc.</p>
        </form>
      </div>
    </section>
  )
}
