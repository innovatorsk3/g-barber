export interface Slot {
  fileName: string
  label: string
  note: string
}

export interface Section {
  id: string
  icon: string
  label: string
  path: string
  accentColor: string
  usedIn: string[]
  description: string
  slots: Slot[]
  freeUpload?: boolean
}

export const SECTIONS: Section[] = [
  {
    id: 'team',
    icon: '👤',
    label: 'Team Barbers',
    path: 'team',
    accentColor: '#60a5fa',
    usedIn: ['Trang Chủ → Team Section', 'Tuyển Dụng → Hero'],
    description: 'Ảnh chân dung từng barber. Phông nền tối, đồng phục G, ánh sáng tốt. Tỷ lệ 3:4 hoặc 1:1.',
    slots: [
      { fileName: 'master-minh.jpg',  label: 'Master Minh',   note: 'Senior Barber' },
      { fileName: 'barber-hoang.jpg', label: 'Barber Hoàng',  note: 'Head Stylist' },
      { fileName: 'barber-duc.jpg',   label: 'Barber Đức',    note: 'Color Specialist' },
      { fileName: 'barber-tu.jpg',    label: 'Barber Tú',     note: 'Perm Expert' },
    ],
    freeUpload: true,
  },
  {
    id: 'gallery',
    icon: '✂️',
    label: 'Gallery Dịch Vụ',
    path: 'gallery',
    accentColor: '#c084fc',
    usedIn: ['Trang Chủ → Featured Services', 'Dịch Vụ → Service Cards (7 nhóm)'],
    description: 'Ảnh kết quả cắt, uốn, nhuộm. Mỗi nhóm dịch vụ cần 1 ảnh đại diện. Góc chụp đẹp, ánh sáng studio hoặc tự nhiên.',
    slots: [
      { fileName: 'cat-combo.jpg',       label: 'Cắt Combo',     note: 'Haircut + Gội + Tạo kiểu' },
      { fileName: 'uon-perm.jpg',        label: 'Uốn Perm',      note: 'Buddha Perm / Premlock' },
      { fileName: 'nhuom-bach-kim.jpg',  label: 'Nhuộm',         note: 'Nhuộm thời trang / bạch kim' },
      { fileName: 'tay-toc.jpg',         label: 'Tẩy Tóc',       note: 'Bleaching' },
      { fileName: 'duoi-toc.jpg',        label: 'Duỗi Tóc',      note: 'Straightening' },
      { fileName: 'ep-side.jpg',         label: 'Ép Side',        note: 'Side part / gáy' },
      { fileName: 'cham-soc.jpg',        label: 'Chăm Sóc',      note: 'Cao mặt / da mặt' },
    ],
    freeUpload: true,
  },
  {
    id: 'branches',
    icon: '🏪',
    label: 'Chi Nhánh',
    path: 'branches',
    accentColor: '#34d399',
    usedIn: ['Trang Chủ → Branches Section', 'Về Chúng Tôi → Timeline'],
    description: '⚠️ Tên file BẮT BUỘC đúng (cn1/cn2/cn3) để hiển thị đúng vị trí. Chụp không gian tiệm, góc rộng, đèn bật đủ sáng.',
    slots: [
      { fileName: 'cn1.jpg', label: 'CS 1 · Lương Đình Của', note: 'Dĩ An, Bình Dương' },
      { fileName: 'cn2.jpg', label: 'CS 2 · Linh Xuân',      note: 'Thủ Đức, TP.HCM' },
      { fileName: 'cn3.jpg', label: 'CS 3 · Nguyễn Hiền',    note: 'Dĩ An, Bình Dương' },
    ],
  },
  {
    id: 'products',
    icon: '🛒',
    label: 'Sản Phẩm G-Store',
    path: 'products',
    accentColor: '#fbbf24',
    usedIn: ['G-Store → Product Cards (8 sản phẩm)'],
    description: 'Ảnh sản phẩm. Chụp nền trắng hoặc xám trung tính, ánh sáng đều. Tỷ lệ vuông 1:1.',
    slots: [
      { fileName: 'pomade-signature.jpg', label: 'G Signature Pomade',  note: 'Strong hold · matte · 100g' },
      { fileName: 'wax-classic.jpg',      label: 'G Classic Wax',       note: 'Medium hold · natural shine' },
      { fileName: 'shampoo-charcoal.jpg', label: 'Charcoal Shampoo',    note: 'Than hoạt tính · 250ml' },
      { fileName: 'shampoo-daily.jpg',    label: 'Daily Care Shampoo',  note: 'Bồ kết + biotin · 250ml' },
      { fileName: 'razor-straight.jpg',   label: 'G Straight Razor',    note: 'Inox 440C · cán gỗ ép' },
      { fileName: 'razor-safety.jpg',     label: 'Safety Razor Set',    note: 'Chrome · 10 lưỡi' },
      { fileName: 'luoc-sung-trau.jpg',   label: 'Lược Sừng Trâu',     note: 'Handmade VN · 14cm' },
      { fileName: 'khan-dap.jpg',         label: 'Bộ Khăn Đắp',        note: 'Nóng-Lạnh · Cotton 100%' },
    ],
  },
  {
    id: 'academy',
    icon: '🎓',
    label: 'G Academy',
    path: 'academy',
    accentColor: '#fb923c',
    usedIn: ['Academy → Hero', 'Academy → Course Cards', 'Academy → Faculty Section'],
    description: 'Ảnh lớp học và giảng viên. Cần ít nhất 2 ảnh chân dung giảng viên + ảnh không khí lớp học.',
    slots: [
      { fileName: 'teacher-hung.jpg',   label: 'Master Hùng',       note: 'Head Educator' },
      { fileName: 'teacher-khoa.jpg',   label: 'Master Khoa',       note: 'Fade Specialist' },
      { fileName: 'class-basic.jpg',    label: 'Lớp Căn Bản',      note: 'Foundation — 6 tuần' },
      { fileName: 'class-advanced.jpg', label: 'Lớp Nâng Cao',     note: 'Advanced — 8 tuần' },
      { fileName: 'class-master.jpg',   label: 'Master Class',      note: 'Master — 12 tuần' },
    ],
    freeUpload: true,
  },
  {
    id: 'price',
    icon: '💰',
    label: 'Bảng Giá',
    path: 'price',
    accentColor: '#f87171',
    usedIn: ['Dịch Vụ → Bảng Giá Section (ảnh chính)'],
    description: 'Ảnh bảng giá thiết kế đẹp. File PHẢI tên price.jpg để hiển thị đúng. Độ phân giải cao, đọc được chữ.',
    slots: [
      { fileName: 'price.jpg', label: 'Bảng Giá Chính', note: '⚠️ Bắt buộc tên price.jpg' },
    ],
    freeUpload: true,
  },
]
