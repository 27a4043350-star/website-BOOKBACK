# 📚 BOOKBACK

**Website mua bán sách cũ dành cho sinh viên Học viện Ngân hàng**

> Bài tập lớn cuối kỳ – Môn **Thiết kế Web** (mã lớp học phần 261IS19A02) – Học viện Ngân hàng

🔗 **Website:** `https://<điền-link-sau-khi-deploy>`

📦 **Repository:** `https://github.com/27a4043350-star/website-BOOKBACK`

---

## 1. Giới thiệu

**BOOKBACK** là website hỗ trợ sinh viên Học viện Ngân hàng (HVNH) mua, bán và trao đổi sách cũ. Tên gọi BOOKBACK thể hiện tinh thần cho những cuốn sách "quay trở lại" tay người học: một cuốn sách khép lại với người này sẽ trở thành nguồn tri thức cho người khác.

### Bối cảnh và vấn đề

Giáo trình và tài liệu học tập là khoản chi không nhỏ với sinh viên, trong khi nhiều cuốn chỉ dùng trong một học kỳ. Hiện nay, việc mua bán sách cũ chủ yếu diễn ra trên các sàn thương mại điện tử đa ngành hoặc hội nhóm mạng xã hội, với nhiều hạn chế:

- Khó tìm đúng giáo trình theo môn học, chuyên ngành vì giao diện tìm kiếm chưa được tối ưu.
- Thông tin về tình trạng sách (độ mới) thiếu rõ ràng, khó kiểm chứng chất lượng.
- Rủi ro khi giao dịch qua các hội nhóm thiếu minh bạch.
- Phí vận chuyển đôi khi cao so với giá trị cuốn sách.
- Sách không còn dùng đến bị bỏ không, trong khi sinh viên khóa sau lại cần.

### Giải pháp

BOOKBACK là nền tảng chuyên biệt cho sinh viên HVNH, nơi sinh viên có thể:

- Xem danh mục sách rõ ràng, tìm kiếm, lọc theo thể loại, khoảng giá, độ mới và sắp xếp theo giá.
- Xem thông tin chi tiết từng cuốn: giá bán, giá bìa gốc, độ mới, tình trạng còn/hết.
- Ước tính nhanh giá bán sách cũ và số tiền tiết kiệm được so với mua sách mới bằng công cụ tính.
- Đặt mua qua giỏ hàng và thanh toán, hoặc gửi thông tin để bán lại sách không còn sử dụng.

### Mục tiêu

- Giúp sinh viên dễ dàng tìm kiếm sách cũ theo đúng nhu cầu học tập.
- Hỗ trợ sinh viên mua sách với giá phù hợp, tiết kiệm chi phí học tập.
- Tạo kênh để sinh viên bán lại những cuốn sách không còn sử dụng, hình thành vòng tuần hoàn tri thức.
- Giúp việc mua bán, trao đổi sách trở nên thuận tiện, minh bạch và đáng tin cậy hơn.

### Đối tượng sử dụng

- **Người mua:** sinh viên HVNH cần giáo trình, sách chuyên ngành, tài liệu tham khảo với chi phí thấp.
- **Người bán:** sinh viên có sách đã học xong muốn bán lại hoặc thanh lý.

### Giá trị mang lại

- **Tiết kiệm chi phí:** sách cũ có giá thấp hơn đáng kể so với giá bìa.
- **Tiện lợi:** tìm đúng sách nhanh, thông tin hiển thị rõ ràng trên cả máy tính và điện thoại.
- **Bền vững:** tái sử dụng sách, giảm lãng phí tri thức sau mỗi học kỳ.

---

## 2. Thành viên nhóm

| STT | Họ và tên | Mã sinh viên | Vai trò | Phụ trách chính |
|:---:|---|:---:|---|---|
| 1 | Quách Phương Thảo | 27A4043350 | Nhóm trưởng | Cấu trúc dự án, README, phân tích & thiết kế giao diện chung, trang chủ (`index.html`), `main.css`, Git & Deploy |
| 2 | Nguyễn Tấn Sang | 27A4043343 | Thành viên | Trang danh mục sách (`books.html`), trang chi tiết sách (`book-detail.html`) |
| 3 | Đặng Duy Quang | 27A4043340 | Thành viên | Giỏ hàng (`cart.html`), thanh toán (`checkout.html`), liên hệ & thu mua (`contact.html`), `validation.js`, bảng kiểm thử |
| 4 | Đặng Xuân Quang | 27A4043341 | Thành viên | Công cụ tính giá (`calculator.html`), JSON + AJAX + tìm kiếm, lọc, sắp xếp |

---

## 3. Chức năng và các trang của website

| Trang | File | Mô tả |
|---|---|---|
| Trang chủ | `index.html` | Banner, giới thiệu BOOKBACK, danh mục sách, sách nổi bật, lợi ích của việc mua sách cũ |
| Danh mục sách | `pages/books.html` | Danh sách sách dạng card, sidebar lọc theo thể loại, giá, độ mới; tìm kiếm và sắp xếp |
| Chi tiết sách | `pages/book-detail.html` | Ảnh bìa, thông tin sách, giá, tình trạng, chọn số lượng, sản phẩm liên quan |
| Giới thiệu | `pages/about.html` | Ý tưởng dự án, vấn đề cần giải quyết, giá trị mang lại, thông tin nhóm |
| Liên hệ & Thu mua | `pages/contact.html` | Form liên hệ và form thu mua sách cũ, kiểm tra dữ liệu nhập |
| Công cụ tính | `pages/calculator.html` | Tính giá bán sách cũ dự kiến và số tiền tiết kiệm so với mua mới |
| Giỏ hàng | `pages/cart.html` | Tăng/giảm số lượng, tự động tính tổng tiền, lưu giỏ hàng bằng LocalStorage |
| Thanh toán | `pages/checkout.html` | Form thông tin nhận hàng, phương thức thanh toán, tổng đơn hàng, mã giảm giá |

### Tính năng nổi bật

- Giao diện thống nhất (màu sắc, font chữ, header, navbar, footer) trên toàn bộ website.
- Responsive trên điện thoại, máy tính bảng và laptop.
- Hiển thị dữ liệu sách động từ file JSON bằng AJAX.
- Tìm kiếm, lọc theo giá, sắp xếp giá tăng/giảm dần.
- Kiểm tra dữ liệu form (email, số điện thoại 10 số, trường bắt buộc) bằng JavaScript.
- Giỏ hàng lưu bằng LocalStorage, đồng bộ số lượng trên biểu tượng giỏ hàng.

---

## 4. Công nghệ sử dụng

| Nhóm | Công nghệ |
|---|---|
| Giao diện | HTML5, CSS3, Bootstrap 4 |
| Xử lý | JavaScript (DOM, Event, Validation), jQuery |
| Dữ liệu | JSON, AJAX, LocalStorage |
| Quản lý mã nguồn | Git, GitHub |
| Triển khai | `<điền nền tảng deploy: GitHub Pages / Netlify / Vercel>` |

---

## 5. Cấu trúc thư mục

```
BOOKBACK/
├── index.html              # Trang chủ
├── pages/
│   ├── books.html          # Danh mục sách
│   ├── book-detail.html    # Chi tiết sách
│   ├── about.html          # Giới thiệu
│   ├── contact.html        # Liên hệ & Thu mua
│   ├── calculator.html     # Công cụ tính
│   ├── cart.html           # Giỏ hàng
│   └── checkout.html       # Thanh toán
├── assets/
│   ├── css/
│   │   └── main.css        # CSS dùng chung toàn website
│   ├── js/
│   │   ├── validation.js   # Kiểm tra dữ liệu form
│   │   └── ...             # Các file JS khác
│   ├── data/
│   │   └── books.json      # Dữ liệu sách
│   └── images/             # Hình ảnh, ảnh bìa sách
├── docs/                   # Tài liệu: sitemap, wireframe, bảng test, AI_USAGE
└── README.md
```

<!-- sau khi hoàn tất bài sẽ cập nhật lại cấu trúc thư mục-->

---

## 6. Cách chạy website

**Cách 1 – Mở trực tiếp:** tải mã nguồn về và mở file `index.html` bằng trình duyệt.

**Cách 2 – Dùng local server (khuyến nghị):** phần tải dữ liệu JSON bằng AJAX có thể bị trình duyệt chặn khi mở file trực tiếp.

```bash
# Clone dự án
git clone https://github.com/<điền-link-repo>.git
cd BOOKBACK

# Chạy bằng VS Code: cài extension "Live Server" → chuột phải index.html → Open with Live Server
# Hoặc chạy bằng Python:
python -m http.server 8000
# Sau đó truy cập http://localhost:8000
```

---

## 7. Quy trình làm việc nhóm

- Quản lý mã nguồn bằng Git/GitHub; mỗi thành viên làm trên nhánh riêng và merge về nhánh chính sau khi hoàn thành.
- Thống nhất cấu trúc HTML, tên ID/class giữa các thành viên trước khi tích hợp.
- Kiểm thử chéo: mỗi thành viên test chức năng của thành viên khác, kết quả ghi trong `docs/`.

---

## 8. Sử dụng AI trong dự án

Thông tin chi tiết về việc sử dụng công cụ AI của từng thành viên được tổng hợp tại [`docs/AI_USAGE.md`](docs/AI_USAGE.md).

---

## 9. Thông tin học phần

- **Môn học:** Thiết kế Web
- **Lớp:** 261IS19A02
- **Trường:** Học viện Ngân hàng
- **Năm thực hiện:** 2026

© 2026 BOOKBACK – Nhóm Thảo, Sang, Duy Quang, Xuân Quang.
