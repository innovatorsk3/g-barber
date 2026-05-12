/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import React from 'react';
import { Header, Footer, BottomNav, Btn, Eyebrow, SectionLabel, PageHero, Check, Phone, ArrowUR } from '@/components/shared';


    const COURSES = [
      { level:"Foundation", weeks:"6 tuần", price:"4.900K", name:"Barber Căn Bản", img:"assets/gallery/3.jpg",
        desc:"Học từ cầm kéo đến hoàn thiện look. Phù hợp với người chưa từng học cắt tóc.",
        units:["Anatomy của tóc & da đầu","Cầm tông đơ & kéo cơ bản","Cắt fade căn bản (low/mid/high)","Tạo kiểu pomade/wax","Vệ sinh dụng cụ chuẩn salon"] },
      { level:"Advanced", weeks:"8 tuần", price:"7.900K", name:"Barber Chuyên Nghiệp", img:"assets/gallery/4.jpg",
        desc:"Khoá nâng cao cho người đã có nền tảng. Đào tạo cắt fade nâng cao, cạo dao và service flow.",
        units:["Skin fade & burst fade","Texture cut & scissor over comb","Cạo dao thẳng cổ điển","Service flow chuẩn G","Tư vấn khách & xây hình ảnh"] },
      { level:"Master", weeks:"12 tuần", price:"14.900K", name:"Barber Master Class", img:"assets/gallery/5.jpg",
        desc:"Đào tạo Master Barber với chứng chỉ G. Bao gồm thực hành tại tiệm và cơ hội tuyển dụng.",
        units:["Tất cả nội dung Advanced","Nhuộm + uốn nam chuyên sâu","Branding & xây thương hiệu cá nhân","Thực tập 4 tuần tại G","Hỗ trợ chuyển nghề / mở tiệm"] },
    ];

    const FACULTY = [
      { name:"Master Hùng", role:"Head Educator", years:"15+ năm", img:"assets/team/1.jpg" },
      { name:"Master Khoa", role:"Fade Specialist", years:"10+ năm", img:"assets/team/2.jpg" },
    ];

    export default function Page() {
  return (
      <div className="min-h-screen">
        <Header active="academy" onCta={() => window.location.href='tel:0947947168'}/>
        <PageHero kicker="G Academy · Where barbers are made"
          title={<><span>Học</span><span className="italic font-light text-brand"> nghề Barber</span><span className="block">tại G.</span></>}
          body="Chương trình đào tạo Barber chuyên nghiệp, kết hợp 30% lý thuyết và 70% thực hành trên model thật. Tốt nghiệp có chứng chỉ G + cơ hội việc làm tại hệ thống."
          img="assets/gallery/5.jpg"/>

        {/* Why us strip */}
        <section className="px-5 sm:px-8 -mt-8 sm:-mt-10 relative z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {[{n:"500+",l:"Học viên"},{n:"95%",l:"Có việc làm"},{n:"6-12",l:"Tuần"},{n:"4.9★",l:"Đánh giá"}].map(s=>(
              <div key={s.l} className="bg-zinc-900 px-4 py-5 text-center">
                <div className="font-display text-2xl sm:text-3xl text-brand">{s.n}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum stages */}
        <section className="px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <SectionLabel kicker="Lộ trình" title={<>3 cấp độ — <span className="italic font-light text-brand">từ con số 0 đến Master</span></>}
              body="Chọn khoá phù hợp với trình độ và mục tiêu. Học viên có thể chuyển lên cấp cao hơn sau khi hoàn thành."/>
            <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6">
              {COURSES.map((c,i) => (
                <article key={c.name} className="anim-up group grid md:grid-cols-12 gap-0 bg-zinc-800/50 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-brand/40 transition-all duration-500" style={{animationDelay:`${0.06*i}s`}}>
                  <div className="md:col-span-4 relative aspect-[4/3] md:aspect-auto overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105" style={{backgroundImage:`url(${c.img})`,filter:"grayscale(15%)"}}></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/85 via-zinc-950/30 to-transparent md:bg-gradient-to-r"></div>
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <span className="font-display text-brand text-3xl italic leading-none">0{i+1}</span>
                    </div>
                    <div className="absolute bottom-5 left-5">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-brand font-semibold">{c.level}</div>
                      <div className="font-display text-2xl text-white mt-1">{c.weeks}</div>
                    </div>
                  </div>
                  <div className="md:col-span-8 p-6 sm:p-8 flex flex-col">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl sm:text-3xl text-zinc-50 leading-tight">{c.name}</h3>
                      <div className="font-display text-brand text-xl sm:text-2xl whitespace-nowrap">{c.price}</div>
                    </div>
                    <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{c.desc}</p>
                    <ul className="mt-5 grid sm:grid-cols-2 gap-2.5">
                      {c.units.map(u => <li key={u} className="flex items-start gap-2.5 text-[13px] text-zinc-300"><Check size={14} className="text-brand mt-0.5 flex-shrink-0"/>{u}</li>)}
                    </ul>
                    <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">Khai giảng hàng tháng</span>
                      <Btn size="sm" icon={<ArrowUR size={13}/>}>Đăng ký</Btn>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty */}
        <section className="bg-zinc-900 border-y border-white/5 px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <SectionLabel kicker="Đội ngũ giảng viên" title={<>Học từ <span className="italic font-light text-brand">Master Barber thực chiến</span></>}
              body="Giảng viên đều là Master Barber với hơn 10 năm kinh nghiệm tại các tiệm hàng đầu Sài Gòn."/>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {[...FACULTY, FACULTY[0], FACULTY[1]].map((m,i) => (
                <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.06]">
                  <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105" style={{backgroundImage:`url(${m.img})`}}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-[9px] uppercase tracking-[0.22em] text-brand font-semibold">{m.role}</div>
                    <h3 className="font-display text-base sm:text-lg text-white leading-tight mt-1">{m.name}</h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{m.years} kinh nghiệm</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <SectionLabel kicker="Quy trình đăng ký" title={<>4 bước <span className="italic font-light text-brand">đơn giản</span></>}/>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {n:"01", k:"Tư vấn", v:"Gọi hotline / Zalo, được tư vấn miễn phí về lộ trình phù hợp."},
                {n:"02", k:"Test đầu vào", v:"Test cơ bản tại tiệm để xác định cấp độ và sắp lớp."},
                {n:"03", k:"Đóng học phí", v:"Trả 1 lần hoặc chia 2-3 đợt theo từng module."},
                {n:"04", k:"Học & thực hành", v:"Học tại Academy + thực tập trên model thật tại tiệm G."},
              ].map(p => (
                <div key={p.n} className="relative p-6 rounded-2xl bg-zinc-800/60 border border-white/[0.06] hover:border-brand/40 hover:bg-zinc-800 transition-all">
                  <div className="font-display text-brand text-4xl italic leading-none">{p.n}</div>
                  <h3 className="mt-4 font-display text-xl text-zinc-50">{p.k}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 sm:px-8 pb-20">
          <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-zinc-800 border border-white/[0.06]">
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage:"url(assets/gallery/6.jpg)",filter:"grayscale(40%)"}}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/30"></div>
            <div className="relative px-6 sm:px-12 py-12 sm:py-16 max-w-2xl">
              <Eyebrow>Khai giảng tháng 6 · Còn 8 chỗ</Eyebrow>
              <h3 className="mt-4 font-display text-3xl sm:text-5xl text-white leading-tight">Bắt đầu sự nghiệp<span className="block italic font-light text-brand">Barber hôm nay</span></h3>
              <p className="mt-4 text-zinc-300 text-sm max-w-md">Đăng ký tư vấn miễn phí, nhận lộ trình học cá nhân hoá cho bạn.</p>
              <div className="mt-7 flex flex-wrap gap-3"><Btn icon={<Phone size={12}/>}>Tư vấn miễn phí</Btn><Btn variant="outline">Tải brochure</Btn></div>
            </div>
          </div>
        </section>

        
        <Footer />
        <BottomNav active="academy" onCta={() => window.location.href='tel:0947947168'}/>
      </div>
    );
}
