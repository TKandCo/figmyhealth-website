/**
 * FigMyHealth — Google Apps Script Web App
 * ------------------------------------------------------------
 * Script này nhận dữ liệu từ form trên website (POST) và:
 *   1) Ghi thêm 1 dòng mới vào Google Sheet
 *   2) Gửi email thông báo về hộp thư của bạn
 *
 * CÁCH DÙNG (làm 1 lần, mất khoảng 5 phút):
 *   1. Tạo 1 Google Sheet mới (sheet.new), đặt tên tuỳ ý,
 *      ví dụ "Đơn hàng FigMyHealth".
 *   2. Trong Sheet đó, vào menu Extensions/Tiện ích mở rộng
 *      > Apps Script.
 *   3. Xoá hết code mẫu, dán toàn bộ nội dung file Code.gs này vào.
 *   4. Sửa dòng NOTIFY_EMAIL bên dưới thành email bạn muốn nhận
 *      thông báo (mặc định đã để sẵn johnlin121017@gmail.com).
 *   5. Bấm Deploy > New deployment > chọn loại "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *      Bấm Deploy, cấp quyền khi được hỏi (Authorize access).
 *   6. Copy đường dẫn "Web app URL" (dạng
 *      https://script.google.com/macros/s/xxxx/exec).
 *   7. Mở file assets/js/main.js trong source code website,
 *      dán URL đó vào biến GOOGLE_SHEET_WEBHOOK ở đầu file.
 *
 * Sau bước này, mỗi đơn hàng gửi từ form trên web sẽ tự động
 * được ghi thêm vào Google Sheet VÀ gửi email cho bạn. Đây là nơi
 * duy nhất nhận dữ liệu — form không còn gửi song song về Formspree nữa.
 */

var NOTIFY_EMAIL = "johnlin121017@gmail.com";

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var params = e.parameter || {};

    // Nếu sheet chưa có dòng tiêu đề, tự thêm vào
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian", "Loại", "Họ tên / Công ty", "SĐT / Email",
        "Gói / Quốc gia", "Địa chỉ / Số lượng", "Ghi chú"
      ]);
    }

    var isWholesale = params.form_type === "wholesale";

    var extraNotes = [];
    if (params.interest_reason) extraNotes.push("Lý do quan tâm: " + params.interest_reason);
    if (params.intended_user) extraNotes.push("Dùng cho: " + params.intended_user);
    if (params.referral_source) extraNotes.push("Biết đến từ: " + params.referral_source);
    if (params.note) extraNotes.push("Ghi chú: " + params.note);

    var row = [
      new Date(),
      isWholesale ? "Đối tác quốc tế" : "Đơn hàng lẻ",
      params.name || params.company || "",
      params.phone || params.email || "",
      params.package || params.country || "",
      params.address || params.quantity || "",
      extraNotes.join(" | ")
    ];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      var subject = isWholesale
        ? "🌿 Yêu cầu hợp tác quốc tế mới - FigMyHealth"
        : "🌿 Đơn hàng mới từ website FigMyHealth";
      var body = Object.keys(params)
        .map(function (k) { return k + ": " + params[k]; })
        .join("\n");
      MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
