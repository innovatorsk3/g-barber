// @ts-nocheck
import React from 'react'
import { Pin } from '@/shared/icons'

const milestones = [
  {
    year: '2021',
    title: 'Cột Mốc Đầu Tiên',
    addr: '135 Lương Đình Của, Đông Hoà, Dĩ An',
    body: 'Chi nhánh đầu tiên chính thức khai trương với nhiều hoài bão và khát vọng xây dựng thương hiệu. Ngay trong giai đoạn đó, COVID-19 ập đến — cả thành phố đóng cửa. Nhưng chúng tôi không đóng. Bằng sự kiên trì và quyết tâm, hệ thống vẫn đứng vững và tiếp tục phát triển.',
    img: '/assets/branches/cn1.jpg',
  },
  {
    year: '2023',
    title: 'Mở Rộng Ra TP.HCM',
    addr: '43 Đường Số 8, Linh Xuân, Thủ Đức',
    body: 'Sau quá trình ổn định và phục hồi mạnh mẽ, chúng tôi tiếp tục mở rộng với chi nhánh thứ hai tại Thủ Đức. Đây là bước tiến quan trọng, khẳng định niềm tin của khách hàng và sự tăng trưởng ổn định của thương hiệu G.',
    img: '/assets/branches/cn2.jpg',
  },
  {
    year: '2024',
    title: 'Trách Nhiệm, Không Phải Thành Tích',
    addr: '10/5 Nguyễn Hiền, Đông Hòa, Dĩ An',
    body: 'Chi nhánh thứ ba khai trương — không phải vì muốn lớn, mà vì khách hàng xứng đáng có G ở gần hơn. Hành trình phía trước vẫn còn dài, và chúng tôi sẽ tiếp tục nỗ lực mang đến những giá trị tốt nhất cho cộng đồng.',
    img: '/assets/branches/cn3.jpg',
  },
]

const values = [
  'Không ngừng nâng cao chất lượng',
  'Lấy khách hàng làm trung tâm',
  'Phát triển bền vững',
]

export default function TimelineSection() {
  return (
    <section className="bg-zinc-950 px-5 sm:px-8 py-20 sm:py-32">
      <div className="max-w-6xl mx-auto">

        {/* Opening */}
        <div className="max-w-2xl mb-20 sm:mb-28">
          <p className="text-[11px] uppercase tracking-[0.32em] text-brand mb-4">Hành trình · 2021 – nay</p>
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-zinc-50 leading-[1.05]">
            Từ một chiếc ghế,
            <span className="block italic font-light text-zinc-400 mt-1">đến 3 chi nhánh.</span>
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            G-Barbershop không bắt đầu từ vốn lớn hay chiến lược phức tạp — mà bắt đầu từ niềm tin rằng một haircut tốt có thể thay đổi một ngày của ai đó.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-20 sm:space-y-28">
          {milestones.map((m, i) => {
            const textBlock = (
              <div key="text">
                <div className="font-display text-[4.5rem] sm:text-[6rem] leading-none text-brand/15 select-none -mb-3">{m.year}</div>
                <div className="w-10 h-px bg-brand mb-5" />
                <h3 className="font-display text-2xl sm:text-3xl text-zinc-50 leading-tight">{m.title}</h3>
                <div className="mt-2 flex items-start gap-2 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  <Pin size={11} className="text-brand flex-shrink-0 mt-0.5" />
                  <span>{m.addr}</span>
                </div>
                <p className="mt-5 text-zinc-400 leading-relaxed text-[0.95rem]">{m.body}</p>
              </div>
            )
            const imgBlock = (
              <div key="img" className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06]">
                <img
                  src={m.img}
                  alt={m.title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(20%)' }}
                />
              </div>
            )
            return (
              <div key={m.year} className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
                {i % 2 === 0 ? [textBlock, imgBlock] : [imgBlock, textBlock]}
              </div>
            )
          })}
        </div>

        {/* Mission */}
        <div className="mt-20 sm:mt-28 pt-14 border-t border-white/[0.06]">
          <p className="text-[11px] uppercase tracking-[0.32em] text-brand mb-8">Tinh thần · Mission</p>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {values.map((v) => (
              <div key={v} className="flex items-start gap-4">
                <div className="w-0.5 h-14 bg-brand flex-shrink-0 rounded-full" />
                <p className="text-zinc-200 text-lg font-medium leading-snug pt-1">{v}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
