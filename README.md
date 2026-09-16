# FigMyHealth — Website Bột Quả Sung & Cỏ Sữa Lá Lớn

Website tĩnh (HTML/CSS/JS thuần, không cần build, không cần framework) — deploy được ngay lên **Vercel, Netlify hoặc GitHub Pages** (miễn phí). Hỗ trợ 3 ngôn ngữ: Tiếng Việt / English / 中文.

---

## 1. Việc bạn CẦN LÀM trước khi công khai website

Những nội dung dưới đây tôi đã điền số liệu hợp lý tạm thời — bạn cần xem lại và chỉnh cho khớp thực tế:

| Nội dung | Vị trí | Ghi chú |
|---|---|---|
| **Logo thật** | `assets/img/logo-placeholder.svg` | Thay file này bằng logo thật của bạn (nên dùng định dạng `.svg` hoặc `.png` nền trong suốt, vuông). Có thể đổi tên file, nhớ sửa lại đường dẫn trong `index.html` (tìm `logo-placeholder.svg`, có 2 chỗ: header và footer). |
| **Ảnh sản phẩm thật** | `assets/img/*.svg` | Toàn bộ hình minh họa (banner, bao bì, nguyên liệu...) hiện là **minh họa tự vẽ**, chưa phải ảnh chụp thật — vì bạn chưa gửi ảnh sản phẩm. Khi có ảnh thật (chụp sản phẩm, bao bì, quy trình sản xuất), thay trực tiếp các file `.svg`/`.jpg`/`.png` cùng tên trong thư mục `assets/img/`, hoặc gửi cho tôi để tôi chèn lại bố cục. |
| **Giá bán & khối lượng** | `index.html`, tìm `179.000đ`, `339.000đ`, `100g`, `200g` | Tôi tạm đặt giá 179.000đ/hộp 100g và combo 2 hộp 339.000đ (trong khung 150-250k bạn chọn). Sửa lại đúng khối lượng/giá thật trước khi chạy quảng cáo. |
| **Chứng nhận ATTP / Tự công bố sản phẩm** | mục "Chứng nhận & Minh bạch nguồn gốc" | Đang để ở trạng thái "đang hoàn thiện" — khi có giấy tờ thật, gửi ảnh chụp/scan để chèn vào, thay cho phần placeholder này. |
| **Form đặt hàng chưa hoạt động** | xem mục 3 bên dưới | Bắt buộc phải làm để nhận được đơn hàng qua form. |

---

## 2. Deploy website (chọn 1 trong 3 cách, đều miễn phí)

Toàn bộ website nằm trong các file: `index.html`, thư mục `assets/`, `robots.txt`, `sitemap.xml`. Không cần cài đặt hay build gì cả.

### Cách A — Netlify (dễ nhất, kéo-thả)
1. Vào [app.netlify.com](https://app.netlify.com) → đăng ký/đăng nhập miễn phí.
2. Ở trang "Sites", kéo thả **cả thư mục** `figmyhealth` (chứa `index.html`) vào ô "Drag and drop your site output folder here".
3. Netlify sẽ cấp cho bạn 1 link dạng `random-name.netlify.app` — vào **Site settings > Domain management > Add a domain** để gắn `figmyhealth.com` (bạn cần trỏ DNS của domain đó về Netlify theo hướng dẫn hiển thị).

### Cách B — Vercel
1. Cài [Vercel CLI](https://vercel.com/docs/cli) hoặc dùng giao diện web tại [vercel.com/new](https://vercel.com/new).
2. Tạo tài khoản, chọn "Add New… > Project" → upload thư mục này (hoặc kết nối GitHub, xem Cách C rồi import repo vào Vercel).
3. Vercel tự nhận đây là static site, không cần cấu hình build command.
4. Gắn domain `figmyhealth.com` trong **Project Settings > Domains**.

### Cách C — GitHub Pages
1. Tạo 1 repository mới trên GitHub, ví dụ `figmyhealth-web`.
2. Upload toàn bộ nội dung thư mục này vào repo (đảm bảo `index.html` nằm ở thư mục gốc).
3. Vào **Settings > Pages** của repo → Source chọn nhánh `main`, thư mục `/ (root)`.
4. Sau vài phút, site chạy tại `https://<tên-github-của-bạn>.github.io/figmyhealth-web/`.
5. Để dùng domain riêng: vào **Settings > Pages > Custom domain**, nhập `figmyhealth.com`, rồi trỏ DNS domain về GitHub Pages theo [hướng dẫn chính thức](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

> Dù chọn host nào, bước gắn domain `figmyhealth.com` đều cần bạn vào nơi bạn đã mua domain (Nhà đăng ký tên miền) để sửa bản ghi DNS (thường là 1 bản ghi `A`/`ALIAS` hoặc `CNAME`) trỏ về host bạn chọn — mỗi host sẽ hiển thị chỉ số chính xác cần nhập khi bạn thêm domain ở bước trên.

---

## 3. Kích hoạt form đặt hàng (BẮT BUỘC để nhận đơn qua form)

Hiện tại các nút **gọi điện, Zalo, email, WhatsApp đã hoạt động ngay** — không cần làm gì thêm. Riêng 2 form trên web (form đặt hàng & form đối tác quốc tế) cần bạn kết nối với Formspree (miễn phí, 2 phút):

1. Vào [formspree.io](https://formspree.io) → **Sign up** bằng email `johnlin121017@gmail.com`.
2. Sau khi đăng nhập, bấm **New Form**, đặt tên (vd. "FigMyHealth Orders"), bấm tạo.
3. Formspree sẽ cho bạn 1 mã dạng `f/xxxxabcd`. Mở file `index.html`, tìm 2 chỗ có chữ:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   (1 chỗ ở form đặt hàng, 1 chỗ ở form đối tác quốc tế — bạn có thể dùng chung 1 mã, hoặc tạo 2 form riêng để dễ phân loại).
4. Thay `YOUR_FORM_ID` bằng mã thật, ví dụ: `action="https://formspree.io/f/xabcwxyz"`.
5. Formspree sẽ gửi 1 email xác nhận về `johnlin121017@gmail.com` — bấm xác nhận để kích hoạt.
6. Lưu file, deploy lại (upload lại lên Netlify/Vercel/GitHub Pages). Từ giờ, mỗi khi khách gửi form, bạn sẽ nhận được email ngay.

**Cách kiểm tra đã hoạt động:** mở website thật, điền thử form và gửi — nếu thấy dòng chữ xanh "Đã gửi thành công!" là ổn; nếu thấy dòng chữ đỏ nhắc "chưa được kết nối" nghĩa là bạn chưa thay `YOUR_FORM_ID`.

### (Tuỳ chọn) Ghi thêm đơn hàng vào Google Sheet
Nếu muốn đơn hàng vừa gửi vào email, vừa tự động ghi thành 1 dòng trong Google Sheet để dễ theo dõi/tổng hợp:

1. Mở file `google-apps-script/Code.gs` — file này có hướng dẫn chi tiết ngay trong đó (5 bước, khoảng 5 phút).
2. Làm theo hướng dẫn để lấy 1 "Web app URL" từ Google Apps Script.
3. Mở file `assets/js/main.js`, tìm dòng:
   ```js
   var GOOGLE_SHEET_WEBHOOK = "";
   ```
   Dán URL đó vào giữa hai dấu ngoặc kép.
4. Lưu, deploy lại. Từ giờ mỗi đơn hàng sẽ vừa gửi email vừa tự ghi vào Google Sheet.

Đây hoàn toàn miễn phí và dùng tài khoản Google của chính bạn — không qua bên thứ ba nào khác.

---

## 4. Cấu trúc thư mục

```
figmyhealth/
├── index.html              ← Toàn bộ nội dung trang (3 ngôn ngữ)
├── assets/
│   ├── css/style.css       ← Giao diện, màu sắc, responsive
│   ├── js/main.js          ← Chuyển ngôn ngữ, menu mobile, FAQ, gửi form
│   ├── js/blog.js          ← Danh mục bài viết + bộ đếm lượt xem + mục "nổi bật"
│   └── img/                ← Toàn bộ hình minh họa (SVG, dễ thay thế)
│       └── blog/           ← Hình minh họa riêng cho 5 bài viết
├── blog/
│   ├── index.html                          ← Trang danh sách "Chia sẻ kiến thức"
│   ├── say-thang-hoa-la-gi.html             ← Bài 1: Sấy thăng hoa là gì
│   ├── khoa-hoc-qua-sung.html                ← Bài 2: Khoa học về quả sung
│   ├── co-sua-la-lon-cay-thuoc-nam.html      ← Bài 3: Cỏ sữa lá lớn
│   ├── chat-xo-hoa-tan-thieu-hut.html        ← Bài 4: Thiếu chất xơ
│   └── cach-chon-thuc-pham-bo-sung-uy-tin.html ← Bài 5: Chọn thực phẩm bổ sung uy tín
├── google-apps-script/
│   └── Code.gs             ← Script tuỳ chọn để ghi đơn hàng vào Google Sheet
├── robots.txt
├── sitemap.xml
└── README.md               ← Chính là file bạn đang đọc
```

---

## 5. Mục "Chia sẻ kiến thức" (blog) hoạt động thế nào?

- **Chỉ có bản tiếng Việt** ở giai đoạn này (theo lựa chọn của bạn) — nút chuyển ngôn ngữ EN/中文 trên các trang blog được ẩn đi, nhưng menu trang chủ vẫn có mục này ghi chú rõ "Blog (Vietnamese)" / "博客（越南文）" cho khách quốc tế.
- **Lượt xem là số thật, đếm tự động** — không phải số ảo. Trang dùng dịch vụ miễn phí, không cần đăng ký tên **Abacus** (`abacus.jasoncameron.dev`) để đếm mỗi lượt mở bài viết. Mỗi khi có người mở 1 bài viết, số lượt xem của bài đó tăng thêm 1 và được lưu lại trên máy chủ của Abacus (không phải trên site của bạn).
- **Mục "Bài viết nổi bật"** (trên trang chủ và đầu trang blog) tự động lấy số lượt xem thật của cả 5 bài, xếp hạng giảm dần, và hiển thị 3 bài có lượt xem cao nhất — không phải do admin tự chọn. Nếu vì lý do nào đó không lấy được số liệu (mất mạng, dịch vụ tạm ngưng...), trang sẽ tự động hiển thị bài viết đầu tiên (Sấy thăng hoa) cùng 2 bài kế tiếp như phương án dự phòng, để mục này không bao giờ bị trống.
- Vì đây là dịch vụ miễn phí của bên thứ ba, số liệu có thể **không tồn tại vĩnh viễn** — nếu sau này muốn có bộ đếm bền vững hơn (gắn với Google Analytics, hoặc lưu trên chính server của bạn), bạn có thể yêu cầu nâng cấp sau.
- **Thêm bài viết mới:** sao chép 1 trong 5 file `.html` trong thư mục `blog/`, sửa nội dung, đổi `slug` (tên file + thuộc tính `data-article-slug` trong thẻ `<body>`) thành 1 tên mới chưa dùng, rồi thêm bài đó vào danh sách `POSTS` trong `assets/js/blog.js` (để mục "nổi bật" nhận diện được) và vào `blog/index.html` + `sitemap.xml`.
- **Ảnh minh họa bài viết:** hiện là hình minh họa tự vẽ (SVG) trong `assets/img/blog/`, được thiết kế để dễ dàng thay bằng ảnh chụp thật quy trình sản xuất khi bạn gửi — chỉ cần thay file cùng tên hoặc đổi đường dẫn `src` trong các file `.html` tương ứng.

## 6. Quy trình gửi ảnh thật & cập nhật tự động

Bạn đã chọn cách gửi ảnh qua **1 thư mục dùng chung (Google Drive)**. Quy trình:

1. Mở file `assets/img/manifest.json` — đây là "danh mục" toàn bộ 14 vị trí ảnh trên site (logo, banner, ảnh nguyên liệu, ảnh 5 bài blog...), mỗi vị trí có sẵn tên file (`file`), nơi ảnh xuất hiện (`usedOn`) và kích thước khuyến nghị (`recommendedSize`).
2. Khi có ảnh mới, bỏ vào thư mục Google Drive dùng chung, **đặt tên file trùng với cột `file` trong manifest** (ví dụ ảnh banner đặt tên `hero-banner.jpg`). Nếu không đặt tên trùng được, chỉ cần ghi chú "ảnh này thay cho slot nào" (vd. "ảnh này thay hero-banner") trong tên thư mục con hoặc file mô tả kèm theo.
3. Ở lượt chỉnh sửa kế tiếp (xem mục 7 — cập nhật hằng ngày), tôi sẽ tự động đối chiếu ảnh mới với `manifest.json`, chèn thay thế đúng vị trí, cập nhật `status` từ `"illustration"` sang `"photo"`, và báo lại cho bạn những gì đã thay.
4. Ảnh càng đúng kích thước khuyến nghị càng ít bị cắt/méo khi hiển thị responsive; nếu ảnh lệch tỷ lệ, tôi sẽ tự crop/căn giữa hợp lý trước khi chèn.

> Trong lúc chưa có ảnh thật, các hình minh họa hiện tại được vẽ chi tiết (không phải khung trống/placeholder sơ sài) để trang vẫn trông chuyên nghiệp — nhưng ảnh chụp thật luôn tăng độ tin cậy hơn, nên vẫn nên gửi khi có thể.

## 7. Lộ trình mở rộng sang nhiều sản phẩm

Trang hiện được thiết kế cho 1 sản phẩm (Bột Quả Sung & Cỏ Sữa Lá Lớn), nhưng đã chuẩn bị sẵn để mở rộng sang các dòng bột sấy thăng hoa khác (bột rau củ detox, bột vitamin/khoáng chất, sản phẩm hỗ trợ chức năng...) mà không cần viết lại từ đầu:

- **Design token tập trung:** toàn bộ màu sắc, khoảng cách, bo góc nằm trong `:root{...}` ở đầu `assets/css/style.css` — 1 sản phẩm mới có thể dùng chung hệ thống này hoặc đổi biến `--fig-*`/`--green-*` cho bảng màu riêng.
- **Cấu trúc lặp lại được:** các khối "nguyên liệu", "cách dùng", "chứng nhận", FAQ, form đặt hàng đều là các block HTML độc lập, dễ nhân bản sang trang sản phẩm mới (`san-pham-2/index.html`...) mà không đụng vào trang hiện tại.
- **Blog dùng chung cho nhiều sản phẩm:** `assets/js/blog.js` (danh sách `POSTS`) đã tách khỏi nội dung trang chủ — khi có sản phẩm mới, chỉ cần thêm bài viết liên quan vào cùng danh sách, không cần blog riêng cho từng sản phẩm.
- **Sản phẩm thứ 2 đã có trang "sắp ra mắt":** `bot-rau-que-ngo-ri.html` (Bột Rau Quế &amp; Ngò Rí) — trang giới thiệu + thu thập quan tâm qua Zalo/email, CHƯA có giá bán hay form đặt hàng thật vì sản phẩm chưa hoàn thiện công bố. Khi sản phẩm sẵn sàng bán thật, nên nâng cấp trang này thành đầy đủ như trang chủ (giá, form đặt hàng, chứng nhận...).
- **Khi thực sự có sản phẩm thứ 2 (mở rộng thêm nữa):** nên thêm 1 trang "Sản phẩm" (danh sách tất cả sản phẩm) ở nav chính, và cân nhắc chuyển từ HTML tĩnh từng trang sang 1 file dữ liệu JSON (`assets/data/products.json`) + template dùng chung, để không phải sửa lặp lại nhiều file khi đổi giá/mô tả. Tôi chưa làm bước này ngay vì hiện chỉ có 1 sản phẩm thật — làm trước sẽ tạo dữ liệu/sản phẩm ảo không cần thiết.

## 8. Chatbot tư vấn nhanh (đã có sẵn, miễn phí)

Góc dưới-phải mọi trang có nút chat tròn — bấm vào mở bảng hỏi-đáp theo kịch bản dựng sẵn (không dùng AI, không tốn phí, không cần máy chủ riêng):

- 6 chủ đề: giá & khối lượng, cách dùng, có phải thuốc không, giao hàng/đổi trả, cách đặt hàng, hợp tác/đại lý/xuất khẩu — nội dung trả lời lấy đúng từ thông tin đã có sẵn trên trang (không bịa số liệu).
- Luôn có nút "Nhắn Zalo" / "Gọi ngay" ngay trong khung chat để chuyển sang người thật bất cứ lúc nào khách cần.
- Code nằm ở `assets/js/chatbot.js` (nội dung câu hỏi/trả lời, 3 ngôn ngữ) và phần CSS `.chatbot-*` ở cuối `assets/css/style.css`. Muốn thêm chủ đề mới: thêm 1 mục vào mảng `menu` và 1 khoá tương ứng trong `answers` (theo đúng 3 ngôn ngữ vi/en/zh) trong `chatbot.js`.
- Khi doanh nghiệp lớn hơn và cần chatbot trả lời được câu hỏi tự do (không chỉ theo kịch bản có sẵn), có thể nâng cấp lên chatbot AI (cần kết nối API, có phí) — hiện chưa làm vì bạn chọn phương án miễn phí.

## 9. Cải tiến liên tục hằng ngày

Theo yêu cầu của bạn, mỗi ngày vào khoảng **20:00 giờ Việt Nam**, tôi sẽ tự nhắn cho bạn để xin phép thực hiện 2-3 cải tiến cần thiết cho site (dựa trên khảo sát xu hướng e-commerce/đối thủ cùng ngành ngày hôm đó) — bạn đồng ý hoặc trả lời "chưa cần" là được, không bắt buộc phải làm mỗi ngày.

**Lưu ý về mặt kỹ thuật (nói thẳng để bạn nắm):** việc nhắn hằng ngày được thực hiện qua 1 tác vụ lên lịch tự động; tác vụ đó sẽ tự kiểm tra xem có truy cập được đúng bộ mã nguồn này không. Nếu môi trường làm việc này còn tồn tại, tôi sẽ chỉnh sửa trực tiếp; nếu không (ví dụ phiên làm việc đã bị dọn dẹp), tôi sẽ đề xuất thay đổi cụ thể trong tin nhắn và bạn xác nhận, tôi sẽ làm lại trong phiên mới. Để việc cập nhật hằng ngày mượt mà và không phụ thuộc "phiên làm việc còn sống hay không", cách bền vững nhất là kết nối repo GitHub + Netlify (mỗi lần tôi sửa xong, tự động deploy) — nếu bạn muốn, chỉ cần nói "kết nối GitHub" và tôi sẽ hướng dẫn/thực hiện bước này.

## 10. Về dòng chữ "Powered by Netlify" che góc dưới-phải trên mobile

Đây **không phải lỗi từ mã nguồn website** — dòng chữ đó là badge do chính nền tảng Netlify tự chèn vào (thường gặp ở site "Netlify Drop" chưa được nhận/gắn vào tài khoản, hoặc do 1 tuỳ chọn hiển thị badge trong Site settings). Cách xử lý (làm trên Netlify, không sửa được từ phía mã nguồn):

1. Đăng nhập [app.netlify.com](https://app.netlify.com), vào đúng site `figmyhealth.com`.
2. Nếu site đang ở dạng "chưa nhận" (unclaimed): bấm "Claim this site" và gắn vào tài khoản Netlify của bạn — bước này thường tự loại bỏ badge.
3. Nếu vẫn còn: vào **Site settings > tìm mục liên quan đến "Netlify badge"** (một số gói/site có tuỳ chọn bật/tắt) và tắt đi.
4. Nếu không tìm thấy tuỳ chọn, đây có thể là badge chỉ hiện ở gói miễn phí — có thể cần nâng cấp gói trả phí để tắt hẳn, Netlify sẽ ghi rõ điều này tại đúng mục cài đặt đó.

## 11. Một vài lưu ý khác

- **Đổi màu sắc thương hiệu:** mở `assets/css/style.css`, sửa các mã màu ở đầu file (phần `:root{...}`) — toàn bộ trang sẽ đổi theo.
- **Sửa nội dung:** mọi đoạn văn bản đều nằm trực tiếp trong `index.html`, có đánh dấu 3 khối tiếng Việt/English/中文 liền nhau (thẻ `data-i18n="vi"`, `"en"`, `"zh"`) — sửa đúng khối ngôn ngữ tương ứng.
- **Pháp lý:** trang đã có sẵn dòng khuyến cáo bắt buộc "Thực phẩm này không phải là thuốc..." theo quy định hiện hành về quảng cáo thực phẩm bảo vệ sức khỏe/thực phẩm bổ sung tại Việt Nam. Khi có giấy tự công bố sản phẩm chính thức, bạn nên rà lại toàn bộ nội dung công dụng một lần nữa cho khớp với hồ sơ đã công bố.
- **Số điện thoại/email** đã gắn sẵn theo thông tin bạn cung cấp: `0968 944 077` (điện thoại/Zalo/WhatsApp) và `johnlin121017@gmail.com`.

Chúc bạn kinh doanh thuận lợi! 🌿
