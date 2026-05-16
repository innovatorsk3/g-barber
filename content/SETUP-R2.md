# Hướng Dẫn Setup Cloudflare R2

Làm 1 lần, xong dùng mãi. Mất khoảng 5–10 phút.

---

## Bước 1 — Tạo R2 Bucket

1. Vào [dash.cloudflare.com](https://dash.cloudflare.com)
2. Chọn account → **R2 Object Storage** (menu trái)
3. Bấm **Create bucket**
4. Đặt tên bucket: `g-barber-assets`
5. Location: chọn **Asia Pacific (APAC)** → Create

---

## Bước 2 — Kết nối R2 với Pages project

1. Vào **Workers & Pages** → chọn project `g-barber-v2`
2. Tab **Settings** → **Bindings**
3. Bấm **Add** → chọn **R2 bucket**
4. Điền:
   - **Variable name:** `BUCKET`  ← phải đúng chữ này
   - **R2 bucket:** `g-barber-assets`
5. Save

---

## Bước 3 — Thêm Environment Variable (mật khẩu admin)

1. Vẫn ở **Settings** → **Environment variables**
2. Bấm **Add variable**
3. Điền:
   - **Variable name:** `ADMIN_PASS`
   - **Value:** `mật-khẩu-bạn-muốn` (ví dụ: `GBarber@2026`)
4. Chọn **Production** + **Preview** → Save

---

## Bước 4 — Deploy lại

1. Push code lên GitHub (Cloudflare Pages tự build)
2. Hoặc vào Pages → bấm **Retry deployment**
3. Chờ ~2 phút để build xong

---

## Bước 5 — Dùng Admin Panel

1. Vào `https://your-site.pages.dev/admin`
2. Nhập mật khẩu vừa đặt ở Bước 3
3. Chọn folder → kéo thả ảnh → Upload

**URL ảnh sau khi upload:**
```
/uploads/team/master-minh.jpg
/uploads/gallery/cat-combo-1.jpg
/uploads/branches/cn1.jpg
```

---

## Cấu Trúc Thư Mục R2

```
g-barber-assets (R2 bucket)
├── team/           👤 Ảnh barber chân dung
├── gallery/        ✂️ Kết quả dịch vụ
├── branches/       🏪 Ảnh chi nhánh
├── products/       🛒 Sản phẩm G-Store
├── academy/        🎓 Lớp học Academy
└── price/          💰 Bảng giá
```

---

## Dùng URL Ảnh Trong Code

Sau khi upload ảnh, copy URL từ admin panel và cập nhật vào data files:

```js
// src/modules/home/data/home.json
{
  "team": [
    { "name": "Master Minh", "image": "/uploads/team/master-minh.jpg" },
    ...
  ]
}
```

---

## Lưu Ý

- **Upload xong → live ngay**, không cần rebuild
- **Miễn phí** đến 10GB storage + 10M request/tháng
- Ảnh cũ ở `/assets/` vẫn hoạt động bình thường
- Xóa ảnh trong admin → xóa khỏi R2 ngay lập tức
