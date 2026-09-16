/* =========================================================
   FigMyHealth — main.js
   Ngôn ngữ, menu mobile, FAQ, hiệu ứng cuộn, gửi form.
   ========================================================= */
(function () {
  "use strict";

  /* -----------------------------------------------------
   * 0. CẤU HÌNH — bạn có thể chỉnh các dòng dưới đây
   * ----------------------------------------------------- */
  // Dán URL Google Apps Script Web App vào đây nếu muốn đơn hàng
  // được ghi thêm vào Google Sheet (xem hướng dẫn trong README.md).
  // Để trống ("") nếu chưa dùng tính năng này.
  var GOOGLE_SHEET_WEBHOOK = "";

  /* -----------------------------------------------------
   * 1. NGÔN NGỮ / LANGUAGE
   * ----------------------------------------------------- */
  var TEXT = {
    vi: {
      title: "FigMyHealth – Bột Quả Sung & Cỏ Sữa Lá Lớn Sấy Thăng Hoa",
      desc: "Bột Quả Sung & Cỏ Sữa Lá Lớn sấy thăng hoa nguyên chất, giàu chất xơ tự nhiên. Đặt hàng qua Zalo/điện thoại 0968 944 077. Giao hàng toàn quốc, có mẫu cho nhà nhập khẩu quốc tế.",
      menuLabel: "Mở menu",
      sending: "Đang gửi...",
      ok: "Đã gửi thành công! Chúng tôi sẽ liên hệ lại sớm nhất qua điện thoại/Zalo.",
      err: "Có lỗi khi gửi form. Vui lòng gọi trực tiếp 0968 944 077 hoặc nhắn Zalo giúp mình nhé.",
      needSetup: "Form đặt hàng chưa được kết nối (thiếu Formspree ID) — vui lòng gọi 0968 944 077 hoặc nhắn Zalo để đặt hàng, hoặc xem README.md để kích hoạt form."
    },
    en: {
      title: "FigMyHealth – Freeze-Dried Fig & Euphorbia Hirta Powder",
      desc: "Pure freeze-dried fig and Euphorbia hirta powder, naturally rich in fibre. Order via Zalo/phone +84 968 944 077. Nationwide shipping, wholesale samples available for international importers.",
      menuLabel: "Open menu",
      sending: "Sending...",
      ok: "Sent successfully! We'll get back to you shortly by phone/Zalo.",
      err: "Something went wrong sending the form. Please call +84 968 944 077 or message us on Zalo.",
      needSetup: "The order form isn't connected yet (missing Formspree ID) — please call +84 968 944 077 or message on Zalo, or see README.md to activate the form."
    },
    zh: {
      title: "FigMyHealth – 冻干无花果与大飞扬草粉",
      desc: "纯净冻干无花果与大飞扬草粉，天然富含膳食纤维。可通过 Zalo/电话 +84 968 944 077 下单。支持全国配送，欢迎国际进口商索取样品。",
      menuLabel: "打开菜单",
      sending: "正在发送...",
      ok: "发送成功！我们会尽快通过电话/Zalo与您联系。",
      err: "表单发送出现问题，请直接致电 +84 968 944 077 或通过 Zalo 联系我们。",
      needSetup: "订购表单尚未连接（缺少 Formspree ID）——请致电 +84 968 944 077 或 Zalo 联系下单，或查看 README.md 完成激活。"
    }
  };

  var SUPPORTED = ["vi", "en", "zh"];

  function detectDefaultLang() {
    try {
      var saved = localStorage.getItem("fmh_lang");
      if (saved && SUPPORTED.indexOf(saved) > -1) return saved;
    } catch (e) {}
    var nav = (navigator.language || "vi").toLowerCase();
    if (nav.indexOf("zh") === 0) return "zh";
    if (nav.indexOf("en") === 0) return "en";
    return "vi";
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "vi";
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("fmh_lang", lang); } catch (e) {}

    var t = TEXT[lang];
    var titleEl = document.getElementById("page-title");
    var descEl = document.getElementById("page-desc");
    if (titleEl) titleEl.textContent = t.title;
    if (descEl) descEl.setAttribute("content", t.desc);

    var navToggle = document.getElementById("navToggle");
    if (navToggle) navToggle.setAttribute("aria-label", t.menuLabel);

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  document.querySelectorAll(".lang-switch button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang"));
    });
  });

  setLang(detectDefaultLang());

  /* -----------------------------------------------------
   * 2. MENU MOBILE
   * ----------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -----------------------------------------------------
   * 3. FAQ ACCORDION
   * ----------------------------------------------------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (el) {
        if (el !== item) el.classList.remove("open");
      });
      item.classList.toggle("open", !isOpen);
    });
  });

  /* -----------------------------------------------------
   * 4. HIỆU ỨNG XUẤT HIỆN KHI CUỘN
   * ----------------------------------------------------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* -----------------------------------------------------
   * 5. CHỌN GÓI TỪ BẢNG GIÁ -> TỰ ĐIỀN VÀO FORM
   * ----------------------------------------------------- */
  document.querySelectorAll("[data-pack]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pack = btn.getAttribute("data-pack");
      var radios = document.querySelectorAll('#packGroup input[name="package"]');
      radios.forEach(function (r) { r.checked = (r.value === pack); });
    });
  });

  /* -----------------------------------------------------
   * 6. GỬI FORM (đặt hàng + hợp tác quốc tế)
   * ----------------------------------------------------- */
  function isFormReady(form) {
    var action = form.getAttribute("action") || "";
    return action.indexOf("YOUR_FORM_ID") === -1 && action.indexOf("formspree.io/f/") > -1;
  }

  function handleFormSubmit(formId, statusId) {
    var form = document.getElementById(formId);
    var status = document.getElementById(statusId);
    if (!form) return;

    form.addEventListener("submit", function (e) {
      var lang = document.documentElement.getAttribute("lang") || "vi";
      var t = TEXT[lang];

      if (!isFormReady(form)) {
        e.preventDefault();
        status.textContent = t.needSetup;
        status.className = "form-status show err";
        return;
      }

      e.preventDefault();
      status.textContent = t.sending;
      status.className = "form-status show";

      var data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (resp) {
          if (resp.ok) {
            status.textContent = t.ok;
            status.className = "form-status show ok";
            form.reset();
          } else {
            status.textContent = t.err;
            status.className = "form-status show err";
          }
        })
        .catch(function () {
          status.textContent = t.err;
          status.className = "form-status show err";
        });

      // Gửi thêm (không chặn luồng chính) sang Google Sheet nếu đã cấu hình
      if (GOOGLE_SHEET_WEBHOOK) {
        try {
          fetch(GOOGLE_SHEET_WEBHOOK, {
            method: "POST",
            mode: "no-cors",
            body: data
          });
        } catch (err) {
          /* im lặng bỏ qua nếu lỗi, không ảnh hưởng luồng gửi chính */
        }
      }
    });
  }

  handleFormSubmit("orderForm", "formStatus");
  handleFormSubmit("wholesaleForm", "wholesaleStatus");

  /* -----------------------------------------------------
   * 7. NĂM Ở FOOTER
   * ----------------------------------------------------- */
  var yearEl = document.getElementById("footerYear");
  if (yearEl) {
    var y = new Date().getFullYear();
    yearEl.textContent = "© " + y + " FigMyHealth · figmyhealth.com";
  }
})();
