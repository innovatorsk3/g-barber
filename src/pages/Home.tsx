// @ts-nocheck
import { Link } from 'react-router-dom'
import { Scissor, Bottle, Cap, Hands, Heart, Eye, Btn, Eyebrow, SectionLabel, Star, Sparkle, Clock, Arrow, ArrowUR, Phone, Pin } from '@/components/shared'

/* ── DATA ── */
const GATEWAYS = [
  { icon: Scissor, kicker: '01', title: 'Dịch Vụ',    desc: 'Cắt, Uốn, Nhuộm, Tẩy — chuyên sâu.',      to: '/dich-vu',    img: '/assets/gallery/3.jpg' },
  { icon: Bottle,  kicker: '02', title: 'G - Store',  desc: 'Sáp, dầu gội & phụ kiện chăm sóc tóc.',   to: '/store',      img: '/assets/gallery/5.jpg' },
  { icon: Cap,     kicker: '03', title: 'G - Academy',desc: 'Lớp đào tạo Barber chuyên nghiệp.',         to: '/academy',    img: '/assets/team/2.jpg' },
  { icon: Hands,   kicker: '04', title: 'Tuyển Dụng', desc: 'Gia nhập đội ngũ G - Barbershop.',          to: '/tuyen-dung', img: '/assets/branches/cn2.jpg' },
]
const FEATURED = [
  { name: 'Combo Cắt-Xả-Tạo Kiểu',     tag: 'Best seller', price: 'từ 40K',  blurb: 'Cắt tóc chuẩn form • Gội xả • Tạo kiểu sáp nhẹ.', img: '/assets/gallery/3.jpg' },
  { name: 'Uốn Premlock / Buddha Perm', tag: 'Signature',   price: 'từ 500K', blurb: 'Lọn xoăn cá tính, giữ nếp 4–6 tháng.',          img: '/assets/gallery/5.jpg' },
  { name: 'Nhuộm Bạch Kim',             tag: 'Premium',     price: 'từ 650K', blurb: 'Tẩy 2 lần + nhuộm + dưỡng phục hồi tại chỗ.',    img: '/assets/gallery/6.jpg' },
]
const USP = [
  { icon: Heart,   title: 'Thợ có Tâm & Tay Nghề Cao',       desc: 'Đào tạo bài bản, tỉ mỉ trong từng đường kéo.' },
  { icon: Eye,     title: 'Giá Minh Bạch — Không Ép Giá',    desc: 'Bảng giá công khai trước khi cắt. Không phụ thu.' },
  { icon: Sparkle, title: 'Không Gian Thoải Mái — Vibe Chill',desc: 'Decor ấm, nhạc đúng gu, cà phê miễn phí.' },
]
const TEAM = [
  { name: 'Master Minh',  role: 'Senior Barber',    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&q=80' },
  { name: 'Barber Hoàng', role: 'Head Stylist',     img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=480&q=80' },
  { name: 'Barber Đức',   role: 'Color Specialist', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=480&q=80' },
  { name: 'Barber Tú',    role: 'Perm Expert',      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=480&q=80' },
]
const REVIEWS = [
  { name: 'Lê Thanh Tùng',   text: 'Không gian đẹp, thợ cắt tỉ mỉ. Không có gì để phàn nàn.' },
  { name: 'Nguyễn Hải Nam',  text: 'Kiểu tóc ưng ý nhất. Chuyên nghiệp nhưng không "công nghiệp".' },
  { name: 'Trần Minh Quân',  text: 'Đi nhiều nơi nhưng chưa đâu tỉ mỉ như G - Barbershop.' },
]
const BRANCHES = [
  { id: 1, name: 'CS 1 · Lương Đình Của', addr: '135 Lương Đình Của, Đông Hoà, Dĩ An, Bình Dương', img: '/assets/branches/cn1.jpg' },
  { id: 2, name: 'CS 2 · Linh Xuân',      addr: '43 Đường Số 8, Linh Xuân, Thủ Đức, TP.HCM',      img: '/assets/branches/cn2.jpg' },
  { id: 3, name: 'CS 3 · Nguyễn Hiền',    addr: '10/5 Nguyễn Hiền, Đông Hòa, Dĩ An, Bình Dương',  img: '/assets/branches/cn3.jpg' },
]

/* ── Hero ── */
const Hero = () => {
  const handleCta = () => { window.location.href = 'tel:0947947168' }
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden grain pt-16 sm:pt-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/assets/team/1.jpg)", filter: "grayscale(35%) contrast(1.05)" }}/>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/85 via-zinc-950/60 to-zinc-900"/>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand/15 to-transparent mix-blend-screen"/>
      </div>
      <div className="relative z-10 max-w-6xl w-full px-6 sm:px-8 py-20">
        <div className="anim-up inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"/>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-zinc-300">From Heart to Hair · Tóc Đẹp Từ Tâm</span>
        </div>
        <h1 className="anim-up d1 font-display font-medium text-zinc-50 leading-[0.95] text-[clamp(3.4rem,15vw,8rem)]">
          <span className="text-brand">G</span><span className="text-zinc-100"> ·</span>
          <span className="block">Barber<span className="text-brand">·</span>shop</span>
        </h1>
        <p className="anim-up d2 mt-7 max-w-md text-zinc-300 text-[0.98rem] sm:text-base leading-relaxed">
          Không chỉ là tiệm cắt tóc — mà còn là nơi gặp gỡ và trò chuyện. Chúng tôi kết hợp cổ điển & hiện đại để bạn có mái tóc đúng với ý mình nhất.
        </p>
        <div className="anim-up d3 mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Btn variant="primary" size="lg" as="button" onClick={handleCta}>Đặt Lịch Hẹn <Arrow size={14}/></Btn>
          <Btn variant="outline" size="lg" as="a" href="#dichvu">Khám Phá Dịch Vụ</Btn>
        </div>
        <div className="anim-up d4 mt-14 sm:mt-16 flex items-center gap-5 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          <span className="flex items-center gap-2"><Pin size={13} className="text-brand"/> 3 chi nhánh</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700"/>
          <span className="flex items-center gap-2"><Clock size={13} className="text-brand"/> 8:00 – 21:00</span>
        </div>
      </div>
      <div className="absolute bottom-6 inset-x-0 flex justify-center text-zinc-500 anim-up d4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent"/>
        </div>
      </div>
    </section>
  )
}

/* ── Gateway ── */
const Gateway = () => (
  <section className="relative bg-zinc-900 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
    <div className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full bg-brand/[0.04] blur-3xl"/>
    <div className="max-w-7xl mx-auto relative">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12 sm:mb-16">
        <SectionLabel kicker="Khám Phá · Explore" title={<>Tất cả về <span className="text-brand italic">G</span></>} />
        <p className="text-zinc-400 text-[0.95rem] max-w-sm">Bốn lối vào — chọn một để bắt đầu hành trình.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {GATEWAYS.map((g) => (
          <Link key={g.title} to={g.to}
            className="group relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.06] bg-zinc-800 hover:border-brand/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-lift">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${g.img})`, filter: 'grayscale(40%)' }}/>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/20"/>
            <div className="absolute inset-0 bg-gradient-to-t from-brand/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
            <div className="relative h-full p-4 sm:p-5 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur flex items-center justify-center text-zinc-100 group-hover:bg-brand group-hover:border-brand transition-all">
                  <g.icon size={16}/>
                </div>
                <span className="font-display text-[11px] sm:text-xs italic text-zinc-500">{g.kicker}</span>
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl text-white leading-tight">{g.title}</h3>
                <p className="mt-1.5 text-[11px] sm:text-xs text-zinc-300 leading-relaxed">{g.desc}</p>
                <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-300 group-hover:text-white">
                  <span>Khám phá</span>
                  <ArrowUR size={12} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

/* ── Featured Services ── */
const Featured = () => (
  <section id="dichvu" className="relative bg-zinc-950 py-20 sm:py-28 px-5 sm:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 sm:mb-14">
        <SectionLabel center kicker="Dịch Vụ Nổi Bật · Featured"
          title={<>Được khách hàng <span className="italic text-brand">yêu thích</span> nhất</>}
          body="Ba dịch vụ được book nhiều nhất tháng này." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {FEATURED.map((s, i) => (
          <article key={s.name} className="group relative flex flex-col rounded-2xl bg-zinc-900 border border-white/[0.06] overflow-hidden hover:border-brand/40 transition-all duration-500 hover:-translate-y-1.5">
            <div className="aspect-[5/4] relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${s.img})`, filter: 'grayscale(15%)' }}/>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"/>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand/90 text-white text-[9px] font-semibold tracking-[0.18em] uppercase backdrop-blur">{s.tag}</span>
              <span className="absolute bottom-3 right-3 font-display text-xl text-brand">0{i+1}</span>
            </div>
            <div className="p-5 sm:p-6 flex flex-col flex-grow">
              <div className="flex items-baseline justify-between gap-3 min-h-[3.6rem]">
                <h3 className="font-display text-xl sm:text-[1.4rem] text-zinc-50 leading-tight">{s.name}</h3>
                <span className="font-display text-brand text-base whitespace-nowrap">{s.price}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed flex-grow">{s.blurb}</p>
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] uppercase tracking-[0.28em]">
                <span className="text-zinc-500 flex items-center gap-1.5"><Clock size={12}/> ~ 45 phút</span>
                <span className="text-zinc-500">{s.tag}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 sm:mt-14 text-center">
        <Btn variant="outline" size="md" as={Link} to="/dich-vu">Xem toàn bộ dịch vụ & bảng giá <Arrow size={13}/></Btn>
      </div>
    </div>
  </section>
)

/* ── USP ── */
const Why = () => (
  <section className="relative bg-zinc-900 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 sm:mb-16">
        <SectionLabel kicker="Tại sao chọn G?" title={<>Ba lý do để <span className="italic text-brand">quay lại</span>.</>} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {USP.map((u, i) => (
          <div key={u.title} className="group relative p-7 sm:p-8 rounded-2xl bg-zinc-800/60 border border-white/[0.06] hover:border-brand/40 hover:bg-zinc-800 transition-all duration-500">
            <div className="absolute top-7 right-7 font-display text-zinc-700 text-3xl italic">0{i+1}</div>
            <div className="w-12 h-12 rounded-full bg-brand/15 text-brand flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white transition-all">
              <u.icon size={20}/>
            </div>
            <h3 className="font-display text-xl sm:text-2xl text-zinc-50 leading-snug">{u.title}</h3>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{u.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* ── Team ── */
const Team = () => (
  <section className="relative bg-zinc-950 py-20 sm:py-28 overflow-hidden">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 sm:mb-14">
        <SectionLabel kicker="Đội Ngũ · Master Barbers" title={<>Tâm <span className="italic text-brand">&</span> Tài</>} body="Những bàn tay tỉ mỉ đứng sau từng đường kéo." />
        <Link to="/tuyen-dung" className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-zinc-400 hover:text-brand transition-colors">Xem toàn đội <Arrow size={12}/></Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {TEAM.map((m, i) => (
          <div key={m.name} className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.06] group-hover:border-brand/60 transition-all duration-500">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${m.img})` }}/>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"/>
              <span className="absolute top-3 left-3 font-display text-[11px] italic text-zinc-300/80">0{i+1}</span>
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <div className="text-[9px] uppercase tracking-[0.28em] text-brand mb-1">{m.role}</div>
                <h3 className="font-display text-base sm:text-lg text-white leading-tight">{m.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* ── Reviews ── */
const Reviews = () => (
  <section className="relative bg-zinc-900 py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
    <div className="absolute top-10 left-1/2 -translate-x-1/2 font-display text-[18rem] sm:text-[26rem] text-white/[0.03] leading-none pointer-events-none select-none">"</div>
    <div className="max-w-6xl mx-auto relative">
      <div className="text-center mb-12 sm:mb-14">
        <SectionLabel center kicker="Khách Hàng Nói Về G" title={<>Đánh giá <span className="italic text-brand">thật</span>, từ khách thật.</>} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {REVIEWS.map((r, i) => (
          <figure key={r.name} className="relative p-6 sm:p-7 rounded-2xl bg-zinc-800/50 border border-white/[0.06] hover:border-brand/30 transition-all">
            <div className="flex gap-0.5 text-brand mb-4">{[0,1,2,3,4].map(s => <Star key={s} size={14}/>)}</div>
            <blockquote className="font-display italic text-[1.05rem] sm:text-[1.15rem] text-zinc-100 leading-snug">"{r.text}"</blockquote>
            <figcaption className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.28em] text-zinc-400 font-semibold">{r.name}</span>
              <span className="text-[10px] text-zinc-600 font-mono">— G.{2026 - i}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
)

/* ── Branches ── */
const Branches = () => (
  <section id="branches" className="relative bg-zinc-950 py-20 sm:py-28 px-5 sm:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 sm:mb-14">
        <SectionLabel kicker="Hệ Thống · 3 Chi Nhánh" title={<>Ghé <span className="italic text-brand">địa chỉ</span> gần bạn</>} body="Mở cửa cả tuần · 8:00 – 21:00 · Hotline 0947 947 168" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {BRANCHES.map((b) => (
          <article key={b.id} className="group rounded-2xl bg-zinc-900 border border-white/[0.06] overflow-hidden hover:border-brand/40 hover:-translate-y-1 transition-all duration-500">
            <div className="relative h-44 sm:h-48">
              <div className="absolute inset-0 bg-cover bg-center grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: `url(${b.img})` }}/>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent"/>
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/70 backdrop-blur-sm border border-white/10 text-[10px] uppercase tracking-[0.28em] text-zinc-200">CS 0{b.id}</span>
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl text-zinc-50 leading-tight">{b.name}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed flex items-start gap-2"><Pin size={13} className="mt-0.5 flex-shrink-0 text-brand"/>{b.addr}</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 flex items-center gap-1.5"><Clock size={12}/> 8:00 – 21:00</span>
                <a href="#" className="text-[11px] uppercase tracking-[0.28em] text-zinc-400 hover:text-brand flex items-center gap-1.5 transition-colors">Bản đồ <ArrowUR size={11}/></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

/* ── Final CTA ── */
const FinalCTA = () => {
  const handleCta = () => { window.location.href = 'tel:0947947168' }
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3D0808] via-brand-800 to-brand"/>
      <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25" style={{ backgroundImage: 'url(/assets/team/2.jpg)' }}/>
      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-24 sm:py-32 text-center">
        <Eyebrow><span className="text-white/80">Last call · The chair is waiting</span></Eyebrow>
        <h2 className="mt-5 font-display font-medium leading-[0.95] text-[clamp(2.8rem,10vw,6rem)] text-white">
          Sẵn Sàng<span className="block italic font-light text-white/80">Thay Đổi?</span>
        </h2>
        <p className="mt-6 max-w-md mx-auto text-white/85 leading-relaxed">Đặt lịch trong 30 giây — không cần tài khoản, chỉ cần một cuộc gọi.</p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Btn variant="light" size="lg" as="button" onClick={handleCta} icon={<Phone size={13}/>}>Đặt Lịch Hẹn Ngay</Btn>
          <Btn variant="outline" size="lg" className="!border-white/40 hover:!bg-white/10" as="a" href="tel:0947947168">0947 947 168</Btn>
        </div>
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[11px] uppercase tracking-[0.28em] text-white/70">
          <span className="flex items-center gap-2"><Clock size={12}/> 8:00 – 21:00</span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/40"/>
          <span className="flex items-center gap-2"><Pin size={12}/> 3 chi nhánh · HCM & Bình Dương</span>
        </div>
      </div>
    </section>
  )
}

/* ── Page ── */
export default function Home() {
  return (
    <>
      <Hero />
      <Gateway />
      <Featured />
      <Why />
      <Team />
      <Reviews />
      <Branches />
      <FinalCTA />
    </>
  )
}
