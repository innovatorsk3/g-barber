# G-Barbershop v2

Website chính thức của hệ thống G-Barbershop — 3 chi nhánh tại Bình Dương và TP.HCM.

## Stack

- **React 18** + **Vite** — không phải Next.js, dù project gốc khởi tạo từ CNA
- **React Router DOM** — client-side routing
- **TailwindCSS** — styling, custom design tokens (brand color, font-display)
- **TypeScript** — phần lớn file dùng `@ts-nocheck` tạm thời
- Không có component library bên ngoài (không antd, không shadcn) — custom components toàn bộ

## Cấu trúc

```
src/
  main.tsx                 ← routes
  layouts/RootLayout.tsx   ← Header + Footer + Outlet
  shared/
    components/            ← Btn, PageHero, SectionLabel, Eyebrow, Header, Footer, BottomNav
    constants/nav.ts       ← navigation config
    icons/                 ← custom SVG icons
  modules/
    home/                  ← trang chủ
    services/              ← bảng giá & dịch vụ
    store/                 ← catalog sản phẩm (hiển thị, chưa có e-commerce)
    about/                 ← tiểu sử & hành trình phát triển
    academy/               ← đào tạo barber
    careers/               ← tuyển dụng
public/
  assets/
    price/price.jpg        ← bảng giá chính thức (nguồn sự thật cho pricing)
    gallery/               ← ảnh dịch vụ
    branches/              ← ảnh chi nhánh
    team/                  ← ảnh team
```

## Routes

| Path              | Module   |
|-------------------|----------|
| `/`               | Home     |
| `/dich-vu`        | Services |
| `/store`          | Store    |
| `/ve-chung-toi`   | About    |
| `/academy`        | Academy  |
| `/tuyen-dung`     | Careers  |

## Dev

```bash
npm install
npm run dev
```

## Lưu ý quan trọng

- **Bảng giá**: Nguồn chính xác là `public/assets/price/price.jpg`. File `services/data/services.json` đã được đồng bộ theo ảnh này. Nếu giá thay đổi, cập nhật cả hai.
- **Store**: Hiện tại chỉ là catalog — chưa có e-commerce. Các nút "Liên hệ" đều link đến `tel:0947947168`.
- **Đặt lịch**: Chưa có hệ thống booking online. Tất cả CTA đặt lịch đều gọi điện trực tiếp.
- **shadcn/antd**: Chưa cần — sẽ xem xét khi có usecase cụ thể (modal, datepicker, form phức tạp).

## Chi nhánh

| # | Địa chỉ | Khai trương |
|---|---------|------------|
| 1 | 135 Lương Đình Của, Đông Hoà, Dĩ An | 2021 |
| 2 | 43 Đường Số 8, Linh Xuân, Thủ Đức | 2023 |
| 3 | 10/5 Nguyễn Hiền, Đông Hòa, Dĩ An | 2024 |

**Hotline:** 0947 947 168
