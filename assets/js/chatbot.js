/* =========================================================
   FigMyHealth — chatbot.js
   Trợ lý hỏi-đáp dạng kịch bản có sẵn (không dùng AI, không tốn phí,
   không gửi dữ liệu ra ngoài). Nội dung câu trả lời lấy đúng theo
   nội dung thật đã có trên trang (giá, cách dùng, FAQ, liên hệ...),
   không tự bịa thêm thông tin ngoài trang.

   Muốn sửa câu trả lời: chỉnh trực tiếp trong TEXT[lang].answers bên dưới.
   Muốn thêm chủ đề mới: thêm 1 mục vào TEXT[lang].menu + TEXT[lang].answers
   (nhớ thêm đủ cho cả 3 ngôn ngữ).
   ========================================================= */
(function () {
  "use strict";

  var TEXT = {
    vi: {
      launcherLabel: "Mở trợ lý hỏi đáp",
      title: "Hỗ trợ FigMyHealth",
      subtitle: "Trả lời nhanh — hoặc nhắn Zalo để được tư vấn trực tiếp",
      greeting: "Chào bạn 👋 Mình có thể giúp gì? Chọn 1 chủ đề bên dưới nhé.",
      backLabel: "← Xem chủ đề khác",
      zalo: "Nhắn Zalo",
      call: "Gọi điện",
      menu: [
        { id: "price", label: "Giá & các gói sản phẩm" },
        { id: "usage", label: "Cách dùng mỗi ngày" },
        { id: "medicine", label: "Đây có phải là thuốc không?" },
        { id: "shipping", label: "Giao hàng & đổi trả" },
        { id: "order", label: "Cách đặt hàng" },
        { id: "wholesale", label: "Hợp tác nhập khẩu, số lượng lớn" }
      ],
      answers: {
        price: "Hiện có 2 gói: Gói Dùng Thử 100g giá 179.000đ (đủ dùng khoảng 10-12 ngày), và Combo 2 Hộp 200g giá 339.000đ — tiết kiệm 19.000đ, đủ dùng khoảng 20-24 ngày. Giá đã gồm đóng gói; phí vận chuyển tính theo khu vực, xác nhận khi đặt hàng.",
        usage: "3 cách dùng đơn giản: (1) Pha 1-2 thìa cà phê với 150-200ml nước ấm 50-60°C, dùng trước bữa ăn 20-30 phút; (2) Thêm 1 thìa mật ong cho dễ uống hơn; (3) Rắc vào sữa chua, sinh tố, cháo yến mạch.",
        medicine: "Không. Đây là thực phẩm bổ sung, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh — hỗ trợ bổ sung chất xơ và dưỡng chất tự nhiên trong chế độ ăn hằng ngày.",
        shipping: "Đơn hàng thường được đóng gói và gửi trong 1-2 ngày làm việc, đơn vị vận chuyển liên hệ trước khi giao. Nếu hàng lỗi do vận chuyển hoặc không đúng mô tả, liên hệ trong vòng 3 ngày kể từ khi nhận để được đổi trả.",
        order: "Nhanh nhất là nhắn Zalo hoặc gọi 0968 944 077. Bạn cũng có thể điền form \"Gửi Yêu Cầu Đặt Hàng\" ngay trên trang, hoặc gửi email — chúng tôi gọi lại xác nhận trước khi giao.",
        wholesale: "Chúng tôi hợp tác với nhà nhập khẩu/phân phối quốc tế: hỗ trợ mẫu thử, đóng gói theo tiêu chuẩn xuất khẩu, trao đổi OEM/private label. Gửi thông tin công ty, quốc gia, số lượng dự kiến qua Zalo/WhatsApp +84 968 944 077 hoặc email johnlin121017@gmail.com."
      }
    },
    en: {
      launcherLabel: "Open support assistant",
      title: "FigMyHealth Support",
      subtitle: "Quick answers — or message us on Zalo for direct help",
      greeting: "Hi 👋 What can I help with? Pick a topic below.",
      backLabel: "← See other topics",
      zalo: "Message on Zalo",
      call: "Call us",
      menu: [
        { id: "price", label: "Pricing & packs" },
        { id: "usage", label: "How to use it daily" },
        { id: "medicine", label: "Is this a medicine?" },
        { id: "shipping", label: "Shipping & returns" },
        { id: "order", label: "How to order" },
        { id: "wholesale", label: "Wholesale / bulk import" }
      ],
      answers: {
        price: "Two packs: Trial Pack 100g at 179,000đ (lasts about 10–12 days), and 2-Pack Combo 200g at 339,000đ — save 19,000đ, lasts about 20–24 days. Prices include packaging; shipping fees vary by region and are confirmed at checkout.",
        usage: "Three simple ways: (1) Mix 1–2 teaspoons with 150–200ml warm water (50–60°C), drink 20–30 minutes before a meal; (2) Add a spoonful of honey for an easier taste; (3) Sprinkle into yogurt, smoothies or oatmeal.",
        medicine: "No. This is a food supplement, not a medicine, and it's not intended to replace medical treatment — it simply helps add natural fibre and nutrients to your everyday diet.",
        shipping: "Orders are usually packed and shipped within 1–2 business days; the courier contacts you before delivery. If an item arrives damaged or doesn't match its description, contact us within 3 days of delivery for a return or exchange.",
        order: "Fastest is Zalo or a call to +84 968 944 077. You can also fill in the order form on this page, or email us — we'll call to confirm before shipping.",
        wholesale: "We work with international importers/distributors: sample support, export-ready packaging, OEM/private label discussion welcome. Send your company details, country and estimated quantity via WhatsApp/Zalo +84 968 944 077 or email johnlin121017@gmail.com."
      }
    },
    zh: {
      launcherLabel: "打开客服助手",
      title: "FigMyHealth 客服",
      subtitle: "快速解答——或通过 Zalo 直接咨询",
      greeting: "您好 👋 需要了解什么？请选择下方主题。",
      backLabel: "← 查看其他主题",
      zalo: "Zalo 留言",
      call: "致电咨询",
      menu: [
        { id: "price", label: "价格与套餐" },
        { id: "usage", label: "每日使用方法" },
        { id: "medicine", label: "这是药品吗？" },
        { id: "shipping", label: "配送与退换货" },
        { id: "order", label: "如何下单" },
        { id: "wholesale", label: "批发/大宗进口合作" }
      ],
      answers: {
        price: "共2种规格：试用装100克，售价179,000越南盾（约可使用10-12天）；双包组合200克，售价339,000越南盾——立省19,000盾，约可使用20-24天。价格已含包装，运费按地区在下单时确认。",
        usage: "3种简单用法：(1) 取1-2茶匙用150-200毫升50-60°C温水冲泡，建议餐前20-30分钟饮用；(2) 加入一勺蜂蜜口感更佳；(3) 撒入酸奶、奶昔或燕麦粥中。",
        medicine: "不是。本产品为膳食补充食品，并非药品，不能替代药物治疗——它只是帮助您在日常饮食中补充天然膳食纤维与营养素。",
        shipping: "订单通常在1-2个工作日内打包发出，快递员会在派送前联系您。如商品因运输问题受损或与描述不符，请在收货后3天内联系我们办理退换货。",
        order: "最快的方式是 Zalo 或致电 +84 968 944 077。您也可以填写页面上的订购表单，或发送邮件联系我们——发货前我们会致电确认。",
        wholesale: "我们欢迎国际进口商/经销商合作：可提供样品支持、出口标准包装，欢迎洽谈OEM/贴牌合作。请通过 WhatsApp/Zalo +84 968 944 077 或邮箱 johnlin121017@gmail.com 提供贵公司信息、所在国家及预计采购量。"
      }
    }
  };

  var ICONS = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 0 1-12.36 7.56L3 20l1.06-5.4A8.5 8.5 0 1 1 21 11.5z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>',
    zalo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 0 1-12.36 7.56L3 20l1.06-5.4A8.5 8.5 0 1 1 21 11.5z"/></svg>',
    call: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.8 2.1z"/></svg>'
  };

  function currentLang() {
    var lang = document.documentElement.getAttribute("lang");
    return TEXT[lang] ? lang : "vi";
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function build() {
    var root = el("div", "chatbot-root");

    var launcher = el("button", "chatbot-launcher", ICONS.chat);
    launcher.type = "button";

    var panel = el("div", "chatbot-panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Chatbot");

    var header = el("div", "chatbot-header");
    var headTxt = el("div", "chatbot-head-txt", '<strong class="cb-title"></strong><span class="cb-subtitle"></span>');
    var closeBtn = el("button", "chatbot-close", ICONS.close);
    closeBtn.type = "button";
    header.appendChild(headTxt);
    header.appendChild(closeBtn);

    var body = el("div", "chatbot-body");
    var log = el("div", "chatbot-log");
    body.appendChild(log);

    var quick = el("div", "chatbot-quickrow");
    var zaloBtn = el("a", "chatbot-quickbtn", ICONS.zalo + '<span class="cb-zalo-label"></span>');
    zaloBtn.href = "https://zalo.me/0968944077";
    zaloBtn.target = "_blank";
    zaloBtn.rel = "noopener";
    var callBtn = el("a", "chatbot-quickbtn", ICONS.call + '<span class="cb-call-label"></span>');
    callBtn.href = "tel:+84968944077";
    quick.appendChild(zaloBtn);
    quick.appendChild(callBtn);

    panel.appendChild(header);
    panel.appendChild(body);
    panel.appendChild(quick);

    root.appendChild(panel);
    root.appendChild(launcher);
    document.body.appendChild(root);

    var opened = false;

    function setLabels() {
      var t = TEXT[currentLang()];
      launcher.setAttribute("aria-label", t.launcherLabel);
      headTxt.querySelector(".cb-title").textContent = t.title;
      headTxt.querySelector(".cb-subtitle").textContent = t.subtitle;
      zaloBtn.querySelector(".cb-zalo-label").textContent = t.zalo;
      callBtn.querySelector(".cb-call-label").textContent = t.call;
    }

    function renderMenu() {
      var t = TEXT[currentLang()];
      var menuWrap = el("div", "chatbot-menu");
      t.menu.forEach(function (item) {
        var chip = el("button", "chatbot-chip", item.label);
        chip.type = "button";
        chip.addEventListener("click", function () {
          askTopic(item.id, item.label);
        });
        menuWrap.appendChild(chip);
      });
      log.appendChild(menuWrap);
      log.scrollTop = log.scrollHeight;
    }

    function addMsg(kind, text) {
      var msg = el("div", "chatbot-msg " + kind, text);
      log.appendChild(msg);
      log.scrollTop = log.scrollHeight;
    }

    function askTopic(id, label) {
      var t = TEXT[currentLang()];
      // gỡ menu hiện tại để không bấm lại trùng lặp
      var openMenus = log.querySelectorAll(".chatbot-menu");
      openMenus.forEach(function (m) { m.remove(); });

      addMsg("user", label);
      window.setTimeout(function () {
        addMsg("bot", t.answers[id]);
        var backWrap = el("div", "chatbot-menu");
        var backChip = el("button", "chatbot-chip chatbot-chip-back", t.backLabel);
        backChip.type = "button";
        backChip.addEventListener("click", function () {
          backWrap.remove();
          renderMenu();
        });
        backWrap.appendChild(backChip);
        log.appendChild(backWrap);
        log.scrollTop = log.scrollHeight;
      }, 260);
    }

    function openPanel() {
      opened = true;
      root.classList.add("open");
      launcher.setAttribute("aria-expanded", "true");
      if (!log.dataset.inited) {
        log.dataset.inited = "1";
        setLabels();
        addMsg("bot", TEXT[currentLang()].greeting);
        renderMenu();
      }
    }
    function closePanel() {
      opened = false;
      root.classList.remove("open");
      launcher.setAttribute("aria-expanded", "false");
    }

    launcher.addEventListener("click", function () {
      opened ? closePanel() : openPanel();
    });
    closeBtn.addEventListener("click", closePanel);

    setLabels();
    // Khi người dùng đổi ngôn ngữ (VI/EN/中文) bằng nút lang-switch của site,
    // cập nhật lại nhãn — nhưng giữ nguyên lịch sử hội thoại đã có.
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", setLabels);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
