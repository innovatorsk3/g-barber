export interface MetaField {
  key: string
  label: string
  placeholder?: string
  multiline?: boolean
}

export interface ImageSlot {
  key: string
  fileName: string
  folder: string
  label: string
  note: string
  meta?: MetaField[]
  staticPath?: string  // current production image path (shown when R2 slot is empty)
}

export interface PageSection {
  id: string
  label: string
  description?: string
  slots: ImageSlot[]
  freeUpload?: boolean
  contentKey?: string
}

export interface AdminPage {
  id: string
  route: string
  icon: string
  label: string
  sections: PageSection[]
}

export const PAGES: AdminPage[] = [
  {
    id: 'home',
    route: '/',
    icon: '🏠',
    label: 'Trang Chủ',
    sections: [
      {
        id: 'hero',
        label: 'Hero Section',
        description: 'Ảnh nền lớn — không gian trong tiệm hoặc barber đang làm việc, góc rộng, chiều sâu tốt.',
        slots: [
          { key: 'hero-bg', fileName: 'hero-bg.jpg', folder: 'gallery', label: 'Ảnh nền Hero', note: 'Toàn màn hình · 16:9 trở lên', staticPath: '/assets/team/1.jpg' },
        ],
      },
      {
        id: 'team',
        label: 'Team Barbers',
        description: 'Ảnh chân dung từng barber. Phông nền tối, đồng phục G, ánh sáng tốt. Tỷ lệ 3:4 hoặc 1:1.',
        slots: [
          { key: 'team-minh',  fileName: 'master-minh.jpg',  folder: 'team', label: 'Master Minh',  note: 'Senior Barber',     staticPath: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&q=80' },
          { key: 'team-hoang', fileName: 'barber-hoang.jpg', folder: 'team', label: 'Barber Hoàng', note: 'Head Stylist',       staticPath: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=480&q=80' },
          { key: 'team-duc',   fileName: 'barber-duc.jpg',   folder: 'team', label: 'Barber Đức',   note: 'Color Specialist',  staticPath: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=480&q=80' },
          { key: 'team-tu',    fileName: 'barber-tu.jpg',    folder: 'team', label: 'Barber Tú',    note: 'Perm Expert',       staticPath: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=480&q=80' },
        ],
        freeUpload: true,
      },
      {
        id: 'featured',
        label: 'Dịch Vụ Nổi Bật',
        description: 'Ảnh kết quả 3 dịch vụ chính hiển thị trên trang chủ. Góc chụp đẹp, ánh sáng tốt.',
        contentKey: 'content/featured.json',
        slots: [
          {
            key: 'feat-cat', fileName: 'cat-combo.jpg', folder: 'gallery', label: 'Cắt Combo', note: 'Haircut + Gội + Tạo kiểu', staticPath: '/assets/gallery/cat-combo.jpg',
            meta: [
              { key: 'name',  label: 'Tên dịch vụ', placeholder: 'Combo Cắt-Xả-Tạo Kiểu' },
              { key: 'tag',   label: 'Badge',        placeholder: 'Best seller' },
              { key: 'price', label: 'Giá',          placeholder: 'từ 40K' },
              { key: 'blurb', label: 'Mô tả ngắn',   placeholder: 'Cắt tóc chuẩn form · Gội xả · Tạo kiểu sáp nhẹ.', multiline: true },
            ],
          },
          {
            key: 'feat-uon', fileName: 'uon-perm.jpg', folder: 'gallery', label: 'Uốn Perm', note: 'Buddha Perm / Premlock', staticPath: '/assets/gallery/uon-perm.jpg',
            meta: [
              { key: 'name',  label: 'Tên dịch vụ', placeholder: 'Uốn Premlock / Buddha Perm' },
              { key: 'tag',   label: 'Badge',        placeholder: 'Signature' },
              { key: 'price', label: 'Giá',          placeholder: 'từ 500K' },
              { key: 'blurb', label: 'Mô tả ngắn',   placeholder: 'Lọn xoăn cá tính, giữ nếp 4–6 tháng.', multiline: true },
            ],
          },
          {
            key: 'feat-nhuom', fileName: 'nhuom-bach-kim.jpg', folder: 'gallery', label: 'Nhuộm', note: 'Nhuộm thời trang / bạch kim', staticPath: '/assets/gallery/nhuom-bach-kim.jpg',
            meta: [
              { key: 'name',  label: 'Tên dịch vụ', placeholder: 'Nhuộm Bạch Kim' },
              { key: 'tag',   label: 'Badge',        placeholder: 'Premium' },
              { key: 'price', label: 'Giá',          placeholder: 'từ 650K' },
              { key: 'blurb', label: 'Mô tả ngắn',   placeholder: 'Tẩy 2 lần + nhuộm + dưỡng phục hồi tại chỗ.', multiline: true },
            ],
          },
        ],
      },
      {
        id: 'branches',
        label: 'Chi Nhánh',
        description: '⚠️ Tên file BẮT BUỘC đúng (cn1/cn2/cn3). Chụp không gian tiệm, góc rộng, đèn bật đủ sáng.',
        slots: [
          { key: 'cn1', fileName: 'cn1.jpg', folder: 'branches', label: 'CS 1 · Lương Đình Của', note: 'Dĩ An, Bình Dương',  staticPath: '/assets/branches/cn1.jpg' },
          { key: 'cn2', fileName: 'cn2.jpg', folder: 'branches', label: 'CS 2 · Linh Xuân',      note: 'Thủ Đức, TP.HCM',    staticPath: '/assets/branches/cn2.jpg' },
          { key: 'cn3', fileName: 'cn3.jpg', folder: 'branches', label: 'CS 3 · Nguyễn Hiền',    note: 'Dĩ An, Bình Dương',  staticPath: '/assets/branches/cn3.jpg' },
        ],
      },
    ],
  },

  {
    id: 'services',
    route: '/dich-vu',
    icon: '✂️',
    label: 'Dịch Vụ',
    sections: [
      {
        id: 'price',
        label: 'Bảng Giá',
        description: '⚠️ File PHẢI tên price.jpg. Ảnh thiết kế đẹp, độ phân giải cao, đọc được chữ.',
        slots: [
          { key: 'price', fileName: 'price.jpg', folder: 'price', label: 'Bảng Giá Chính', note: '⚠️ Bắt buộc tên price.jpg', staticPath: '/assets/price/price.jpg' },
        ],
      },
      {
        id: 'service-images',
        label: 'Ảnh 7 Nhóm Dịch Vụ',
        description: 'Mỗi nhóm dịch vụ cần 1 ảnh đại diện — kết quả thực tế, góc chụp đẹp.',
        slots: [
          { key: 'svc-cat',    fileName: 'cat-combo.jpg',      folder: 'gallery', label: 'Cắt Combo',  note: 'Haircut + Gội + Tạo kiểu',       staticPath: '/assets/gallery/cat-combo.jpg' },
          { key: 'svc-uon',    fileName: 'uon-perm.jpg',       folder: 'gallery', label: 'Uốn Perm',   note: 'Buddha Perm / Premlock',          staticPath: '/assets/gallery/uon-perm.jpg' },
          { key: 'svc-nhuom',  fileName: 'nhuom-bach-kim.jpg', folder: 'gallery', label: 'Nhuộm',      note: 'Nhuộm thời trang / bạch kim',     staticPath: '/assets/gallery/nhuom-bach-kim.jpg' },
          { key: 'svc-tay',    fileName: 'tay-toc.jpg',        folder: 'gallery', label: 'Tẩy Tóc',    note: 'Bleaching', staticPath: 'assets/gallery/tay-toc.jpg' },
          { key: 'svc-duoi',   fileName: 'duoi-toc.jpg',       folder: 'gallery', label: 'Duỗi Tóc',   note: 'Straightening — KHÔNG dùng ảnh chi nhánh' },
          { key: 'svc-ep',     fileName: 'ep-side.jpg',        folder: 'gallery', label: 'Ép Side',    note: 'Side part / gáy — KHÔNG dùng ảnh chi nhánh' },
          { key: 'svc-cham',   fileName: 'cham-soc.jpg',       folder: 'gallery', label: 'Chăm Sóc',   note: 'Cao mặt / da mặt — KHÔNG dùng ảnh chi nhánh' },
        ],
      },
    ],
  },

  {
    id: 'about',
    route: '/ve-chung-toi',
    icon: '📖',
    label: 'Về Chúng Tôi',
    sections: [
      {
        id: 'timeline',
        label: 'Timeline Chi Nhánh',
        description: 'Ảnh từng chi nhánh dùng trong timeline câu chuyện. Xác nhận đúng mapping CN1/CN2/CN3.',
        slots: [
          { key: 'about-cn1', fileName: 'cn1.jpg', folder: 'branches', label: 'CN1 · Khai trương 2021', note: 'Lương Đình Của, Dĩ An',  staticPath: '/assets/branches/cn1.jpg' },
          { key: 'about-cn2', fileName: 'cn2.jpg', folder: 'branches', label: 'CN2 · Mở rộng 2023',    note: 'Linh Xuân, Thủ Đức',    staticPath: '/assets/branches/cn2.jpg' },
          { key: 'about-cn3', fileName: 'cn3.jpg', folder: 'branches', label: 'CN3 · Trưởng thành 2024', note: 'Nguyễn Hiền, Dĩ An',  staticPath: '/assets/branches/cn3.jpg' },
        ],
      },
      {
        id: 'story',
        label: 'Ảnh Câu Chuyện',
        description: 'Ảnh bổ sung để kể câu chuyện thương hiệu — khai trương, team ngày đầu, không gian tiệm.',
        slots: [],
        freeUpload: true,
      },
    ],
  },

  {
    id: 'academy',
    route: '/academy',
    icon: '🎓',
    label: 'G Academy',
    sections: [
      {
        id: 'faculty',
        label: 'Giảng Viên',
        description: 'Ảnh chân dung giảng viên. Đồng phục chuẩn, phông sáng, thể hiện sự chuyên nghiệp.',
        slots: [
          { key: 'teacher-hung', fileName: 'teacher-hung.jpg', folder: 'academy', label: 'Master Hùng', note: 'Head Educator · 15+ năm' },
          { key: 'teacher-khoa', fileName: 'teacher-khoa.jpg', folder: 'academy', label: 'Master Khoa', note: 'Fade Specialist · 10+ năm' },
        ],
        freeUpload: true,
      },
      {
        id: 'courses',
        label: 'Ảnh Khoá Học',
        description: 'Ảnh khoá học — 1 ảnh thông tin khoá (promo banner) và 1 ảnh tốt nghiệp (học viên nhận chứng chỉ).',
        slots: [
          { key: 'class-info', fileName: 'course-info.jpg', folder: 'academy', label: 'Ảnh Thông Tin Khoá', note: 'Promo banner khoá học — landscape 4:3', staticPath: 'assets/academy/course-info.jpg' },
          { key: 'class-cert', fileName: 'graduation.jpg', folder: 'academy', label: 'Ảnh Tốt Nghiệp',   note: 'Học viên nhận chứng chỉ — gần vuông',  staticPath: 'assets/academy/graduation.jpg' },
        ],
      },
    ],
  },

  {
    id: 'store',
    route: '/store',
    icon: '🛒',
    label: 'G-Store',
    sections: [
      {
        id: 'products',
        label: 'Ảnh Sản Phẩm',
        description: '⚠️ Hiện tại TOÀN BỘ 8 sản phẩm đang dùng ảnh sai. Chụp nền trắng/xám, ánh sáng đều, tỷ lệ 1:1.',
        slots: [
          { key: 'p-pomade',  fileName: 'pomade-signature.jpg', folder: 'products', label: 'G Signature Pomade', note: 'Strong hold · matte · 100g' },
          { key: 'p-wax',     fileName: 'wax-classic.jpg',      folder: 'products', label: 'G Classic Wax',       note: 'Medium hold · natural shine' },
          { key: 'p-shamp-c', fileName: 'shampoo-charcoal.jpg', folder: 'products', label: 'Charcoal Shampoo',    note: 'Than hoạt tính · 250ml' },
          { key: 'p-shamp-d', fileName: 'shampoo-daily.jpg',    folder: 'products', label: 'Daily Care Shampoo',  note: 'Bồ kết + biotin · 250ml' },
          { key: 'p-razor-s', fileName: 'razor-straight.jpg',   folder: 'products', label: 'G Straight Razor',    note: 'Inox 440C · cán gỗ ép' },
          { key: 'p-razor-f', fileName: 'razor-safety.jpg',     folder: 'products', label: 'Safety Razor Set',    note: 'Chrome · 10 lưỡi' },
          { key: 'p-luoc',    fileName: 'luoc-sung-trau.jpg',   folder: 'products', label: 'Lược Sừng Trâu',     note: 'Handmade VN · 14cm' },
          { key: 'p-khan',    fileName: 'khan-dap.jpg',         folder: 'products', label: 'Bộ Khăn Đắp',        note: 'Nóng-Lạnh · Cotton 100%' },
        ],
      },
    ],
  },

  {
    id: 'careers',
    route: '/tuyen-dung',
    icon: '💼',
    label: 'Tuyển Dụng',
    sections: [
      {
        id: 'team-photos',
        label: 'Ảnh Team & Không Gian',
        description: 'Ảnh team đang làm việc tại tiệm — thể hiện môi trường làm việc tích cực, vibe G.',
        slots: [
          { key: 'career-hero', fileName: 'career-hero.jpg', folder: 'team', label: 'Ảnh Hero Tuyển Dụng', note: 'Team tại tiệm — nhóm đông, không gian thoải mái' },
        ],
        freeUpload: true,
      },
    ],
  },
]
