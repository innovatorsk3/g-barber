# Tuyển Dụng (Careers)

Route: `/tuyen-dung`

---

## Các Section & Nội Dung Hiện Tại

### 1. Hero Section
| Thành phần | Nội dung hiện tại | Trạng thái |
|---|---|---|
| Kicker | "Tuyển dụng · Join the crew" | ✅ OK |
| Tiêu đề | "Trở thành một phần của G." | ✅ OK |
| Mô tả | "G đang tìm những người yêu nghề, có gu, sẵn sàng phát triển cùng một thương hiệu Barbershop hàng đầu. Lương tốt — môi trường tử tế — lộ trình rõ ràng." | ✅ OK |
| **Ảnh nền** | `assets/team/1.jpg` | ⚠️ Cần ảnh team thực tế đẹp hơn |

---

### 2. Stats Section
| Chỉ số | Nội dung | Trạng thái |
|---|---|---|
| Vị trí mở | "5 Vị trí mở" | ⚠️ Cập nhật theo thực tế |
| Chi nhánh | "3 Chi nhánh" | ✅ OK |
| Nhân viên | "50+ Nhân viên" | ⚠️ Xác nhận số liệu |

---

### 3. Benefits Section ("Vì sao chọn làm tại G?")
| Quyền lợi | Nội dung | Trạng thái |
|---|---|---|
| Lương + hoa hồng | "Hoa hồng 20-35% trên doanh thu. Top barber 30M+/tháng." | ⚠️ Xác nhận con số |
| Đào tạo | "Tham gia G Academy miễn phí. Workshop hàng quý với khách mời quốc tế." | ⚠️ Workshop quốc tế có thật không? |
| Bảo hiểm | "BHYT, BHXH đầy đủ. 12 ngày phép/năm + sinh nhật + cưới hỏi." | ⚠️ Xác nhận chính sách |
| Môi trường | "Đồng nghiệp tử tế, có gu. Không drama. Đề cao kỷ luật + tay nghề." | ✅ OK |
| Lộ trình | "Junior → Senior → Master → Quản lý chi nhánh. Đánh giá 6 tháng/lần." | ✅ OK |
| Dụng cụ | "Tặng bộ dụng cụ đầu vào trị giá 5M. Đồng phục 4 bộ/năm." | ⚠️ Xác nhận chính sách |

---

### 4. Job Openings (5 vị trí)

#### Vị trí 1: Senior Barber
| Thành phần | Nội dung | Trạng thái |
|---|---|---|
| Địa điểm | Dĩ An · TP.HCM | ✅ OK |
| Loại | Full-time | ✅ OK |
| Lương | 15-25M | ⚠️ Xác nhận |
| Yêu cầu | Cắt fade nâng cao + cạo dao, 3 năm kinh nghiệm | ✅ OK |

#### Vị trí 2: Junior Barber
| Thành phần | Nội dung | Trạng thái |
|---|---|---|
| Địa điểm | Thủ Đức · TP.HCM | ✅ OK |
| Lương | 8-15M | ⚠️ Xác nhận |
| Yêu cầu | Tốt nghiệp Barber academy, yêu nghề | ✅ OK |

#### Vị trí 3: Lễ Tân / Booking
| Thành phần | Nội dung | Trạng thái |
|---|---|---|
| Địa điểm | Dĩ An · TP.HCM | ✅ OK |
| Lương | 7-9M | ⚠️ Xác nhận |
| Yêu cầu | Giao tiếp tốt, CRM/Excel, ca xoay 8:00-21:00 | ✅ OK |

#### Vị trí 4: Content Creator / Editor
| Thành phần | Nội dung | Trạng thái |
|---|---|---|
| Địa điểm | Hybrid | ✅ OK |
| Loại | Part-time | ✅ OK |
| Lương | 6-10M | ⚠️ Xác nhận |
| Yêu cầu | Quay dựng TikTok/Reels, portfolio, hiểu thẩm mỹ G | ✅ OK |

#### Vị trí 5: Store Manager
| Thành phần | Nội dung | Trạng thái |
|---|---|---|
| Địa điểm | Dĩ An · TP.HCM | ✅ OK |
| Lương | 18-28M | ⚠️ Xác nhận |
| Yêu cầu | Kinh nghiệm vận hành 2+ năm, quản lý team 5-10 người | ✅ OK |

---

### 5. Application Form
| Trường | Placeholder | Trạng thái |
|---|---|---|
| Họ tên | "Nguyễn Văn A" | ✅ OK |
| Số điện thoại | "0947 947 168" | ✅ OK |
| Email | "ban@email.com" | ✅ OK |
| Vị trí ứng tuyển | Dropdown từ job list | ✅ OK |
| Giới thiệu bản thân | Textarea | ✅ OK |
| Upload CV | PDF/DOC, max 5MB | ⚠️ Form này có xử lý backend chưa? |

**Form hiện tại:** Alert "Cảm ơn! Bộ phận tuyển dụng sẽ liên hệ trong 48h."

**Cần bổ sung:**
- [ ] Backend xử lý form (email notification, lưu vào DB)
- [ ] Hoặc tích hợp Google Form / Typeform
- [ ] Email HR: `gbarber.hcm@gmail.com` đã hiển thị → cần có người check thường xuyên

---

## Tổng Kết Cần Làm — Tuyển Dụng

| Loại | Ghi chú |
|---|---|
| Xác nhận số vị trí đang mở | Cập nhật realtime |
| Xác nhận lương/chính sách | Đảm bảo số liệu đúng |
| Ảnh team thực tế | 2–3 ảnh team đang làm việc tại tiệm |
| Backend form ứng tuyển | Bắt buộc trước khi ra mắt |
| Xác nhận workshop quốc tế | Nếu chưa có thì bỏ dòng này |

**Ghi chú:** Page tuyển dụng có cấu trúc rất tốt. Điểm cần làm nhất là form ứng tuyển phải có backend thật + cập nhật số vị trí theo thực tế.
