# Hộp thư ảnh thật — đặt ảnh mới vào đây

Khi bạn có ảnh chụp thật (sản phẩm, nguyên liệu, quy trình sản xuất...), chỉ cần
kéo-thả file ảnh vào **đúng thư mục này** trên GitHub (không cần biết lệnh git).

## Cách đặt tên file

Mở file `assets/img/manifest.json` ở thư mục gốc, tìm cột `"file"` của vị trí
bạn muốn thay ảnh (ví dụ `hero-banner.svg`, `blog-hero-qua-sung.svg`...), rồi
đặt tên file ảnh mới của bạn **giống hệt phần tên đó nhưng đổi đuôi thành
.jpg hoặc .png**. Ví dụ:

| Bạn muốn thay ảnh cho           | Đặt tên file ảnh mới là     |
|----------------------------------|------------------------------|
| hero-banner (ảnh đầu trang chủ)  | `hero-banner.jpg`            |
| fig-illustration (ảnh quả sung)  | `fig-illustration.jpg`       |
| blog-hero-qua-sung                | `blog-hero-qua-sung.jpg`     |

## Lưu ý quan trọng — LOGO

Logo hiện tại (`assets/img/logo-placeholder.svg`) đã được **chốt giữ nguyên
vĩnh viễn** theo yêu cầu của chủ shop (17/09/2026). Đừng thả ảnh logo mới vào
đây trừ khi bạn thật sự muốn đổi logo — nếu có, hãy nói rõ trong tin nhắn
("mình muốn đổi logo mới") để Claude xác nhận lại trước khi thay, vì đây là
slot đã bị khoá trong `manifest.json`.

## Sau khi upload ảnh

Nhắn cho Claude (ở bất kỳ đoạn chat nào): "mình vừa up ảnh mới vào GitHub,
cập nhật giúp mình". Claude sẽ tự lấy repo mới nhất về, chèn ảnh vào đúng vị
trí, xoá ảnh khỏi hộp thư này, và đẩy hướng dẫn cập nhật cho bạn để áp dụng
qua GitHub Desktop (Claude hiện không thể tự đẩy code lên GitHub do chính
sách mạng của môi trường chạy Claude).
