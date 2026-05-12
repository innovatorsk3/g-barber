/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import React, { useState } from 'react';
import { Header, Footer, BottomNav, Btn, Eyebrow, SectionLabel, PageHero } from '@/components/shared';


    const CATS = ["Tất cả", "Pomade & Wax", "Dầu gội", "Dao cạo", "Phụ kiện"];
    const PRODUCTS = [
      { cat:"Pomade & Wax", name:"G Signature Pomade", sub:"Strong hold · matte finish · 100g", price:"289K", old:"349K", tag:"Best seller", img:"assets/gallery/3.jpg" },
      { cat:"Pomade & Wax", name:"G Classic Wax", sub:"Medium hold · natural shine · 80g", price:"229K", img:"assets/gallery/4.jpg" },
      { cat:"Dầu gội",      name:"Charcoal Shampoo", sub:"Than hoạt tính · 250ml · sạch sâu", price:"199K", img:"assets/gallery/5.jpg" },
      { cat:"Dầu gội",      name:"Daily Care Shampoo", sub:"Bồ kết + biotin · 250ml", price:"179K", tag:"Mới", img:"assets/gallery/6.jpg" },
      { cat:"Dao cạo",      name:"G Straight Razor", sub:"Inox 440C · cán gỗ ép · tặng dao gập", price:"659K", img:"assets/branches/cn1.jpg" },
      { cat:"Dao cạo",      name:"Safety Razor Set", sub:"Chrome + 10 lưỡi · hộp da PU", price:"489K", img:"assets/branches/cn2.jpg" },
      { cat:"Phụ kiện",     name:"Lược Sừng Trâu", sub:"Handmade Việt Nam · 14cm", price:"129K", img:"assets/team/1.jpg" },
      { cat:"Phụ kiện",     name:"Bộ Khăn Đắp Nóng-Lạnh", sub:"Cotton 100% · gói 2 chiếc", price:"99K", img:"assets/team/2.jpg" },
    ];

    const ProductCard = ({ p, i }) => (
      <article className="anim-up group flex flex-col bg-zinc-800/50 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-brand/40 hover:shadow-card-lift transition-all duration-500" style={{animationDelay:`${0.04*i}s`}}>
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105" style={{backgroundImage:`url(${p.img})`,filter:"saturate(0.85)"}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent"></div>
          {p.tag && <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand/90 text-white text-[9px] font-semibold tracking-[0.18em] uppercase backdrop-blur">{p.tag}</span>}
          <button aria-label="Yêu thích" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-900/70 backdrop-blur border border-white/10 text-zinc-300 hover:text-brand hover:border-brand/50 transition-all flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <div className="text-[9px] uppercase tracking-[0.22em] text-brand font-semibold mb-1.5">{p.cat}</div>
          <h3 className="font-display text-lg text-zinc-50 leading-tight">{p.name}</h3>
          <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed flex-grow">{p.sub}</p>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-end justify-between gap-3">
            <div>
              <div className="font-display text-brand text-lg leading-none">{p.price}</div>
              {p.old && <div className="text-[11px] text-zinc-500 line-through mt-1">{p.old}</div>}
            </div>
            <button className="h-10 px-4 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.16em] text-zinc-200 hover:bg-brand hover:border-brand hover:text-white transition-all">+ Giỏ</button>
          </div>
        </div>
      </article>
    );

    export default function Page() {
      const [cat, setCat] = useState("Tất cả");
      const filtered = cat === "Tất cả" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
      return (
        <div className="min-h-screen">
          <Header active="store" onCta={() => window.location.href='tel:0947947168'}/>
          <PageHero kicker="G-Store · Curated for gents"
            title={<><span>Cửa hàng</span><span className="block italic font-light text-brand mt-1">tóc & râu</span></>}
            body="Bộ sưu tập sản phẩm tóc, dao cạo, dầu gội được G tuyển chọn — dùng chính tại tiệm. Free-ship trong nội thành Sài Gòn cho đơn từ 299K."
            img="assets/gallery/3.jpg"/>

          {/* Promo strip */}
          <section className="px-5 sm:px-8 -mt-8 sm:-mt-10 relative z-10">
            <div className="max-w-5xl mx-auto grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
              {[{n:"Free-ship",l:"đơn từ 299K"},{n:"30 ngày",l:"đổi trả"},{n:"Chính hãng",l:"100%"}].map(s=>(
                <div key={s.l} className="bg-zinc-900 px-3 py-5 sm:px-6 sm:py-6 text-center">
                  <div className="font-display text-lg sm:text-2xl text-brand">{s.n}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">{s.l}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="px-5 sm:px-8 py-14 sm:py-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8 sm:mb-10">
                <SectionLabel kicker="Sản phẩm" title={<>Tóc, râu &amp; <span className="italic font-light text-brand">phụ kiện</span></>}/>
                <div className="flex flex-wrap gap-2">
                  {CATS.map(c => (
                    <button key={c} onClick={()=>setCat(c)} className={`text-[10px] uppercase tracking-[0.18em] font-semibold px-4 py-2 rounded-full border transition-all ${cat===c ? "bg-brand border-brand text-white" : "border-white/10 text-zinc-400 hover:text-white hover:border-white/30"}`}>{c}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {filtered.map((p,i) => <ProductCard key={p.name} p={p} i={i}/>)}
              </div>
            </div>
          </section>

          {/* Bundle promo */}
          <section className="px-5 sm:px-8 pb-20">
            <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-800 border border-brand-700">
              <div className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay" style={{backgroundImage:"url(assets/gallery/4.jpg)"}}></div>
              <div className="relative px-6 sm:px-12 py-12 sm:py-16 flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <Eyebrow>Combo tiết kiệm · Limited drop</Eyebrow>
                  <h3 className="mt-4 font-display text-3xl sm:text-5xl text-white leading-tight">G Starter Kit<span className="block italic font-light text-white/80">Pomade + Shampoo + Lược</span></h3>
                  <p className="mt-4 text-white/85 text-sm max-w-md leading-relaxed">Bộ ba sản phẩm thiết yếu cho người đàn ông hiện đại. Tiết kiệm 18% so với mua lẻ.</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="font-display text-white text-5xl sm:text-6xl">499K</div>
                  <div className="text-white/70 line-through text-base mt-1">609K</div>
                  <Btn variant="light" className="mt-5">Mua ngay</Btn>
                </div>
              </div>
            </div>
          </section>

          
          <Footer />
          <BottomNav active="store" onCta={() => window.location.href='tel:0947947168'}/>
        </div>
      );
    };
    
  
