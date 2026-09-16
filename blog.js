/* =========================================================
   FigMyHealth — blog.js
   Danh mục 5 bài viết (nguồn dữ liệu dùng chung) + bộ đếm lượt xem
   thật, miễn phí, không cần đăng ký (Abacus — abacus.jasoncameron.dev)
   + mục "Bài viết nổi bật" tự động xếp theo lượt xem thật.

   Nếu vì lý do nào đó (chặn mạng, mất kết nối...) mà không lấy được
   số liệu, trang vẫn hoạt động bình thường: số lượt xem sẽ tự ẩn,
   và mục "nổi bật" sẽ mặc định hiển thị bài viết bắt buộc đầu tiên
   (Sấy thăng hoa) cùng 2 bài kế tiếp theo thứ tự xuất bản.
   ========================================================= */
(function () {
  "use strict";

  var NAMESPACE = "figmyhealth-kienthuc";
  var GET_URL = "https://abacus.jasoncameron.dev/get/" + NAMESPACE + "/";
  var HIT_URL = "https://abacus.jasoncameron.dev/hit/" + NAMESPACE + "/";
  var FETCH_TIMEOUT = 4500;

  // Mọi đường dẫn trong POSTS bên dưới viết theo gốc site (vd. "assets/img/...",
  // "blog/xxx.html") vì mục "nổi bật" được render trên cả trang chủ (gốc site)
  // lẫn trang blog (thư mục con /blog/). BASE_PREFIX tự nhận biết độ sâu hiện
  // tại và được cộng vào trước mỗi đường dẫn khi dựng HTML.
  var BASE_PREFIX = location.pathname.indexOf("/blog/") > -1 ? "../" : "";

  // Nguồn dữ liệu DUY NHẤT cho toàn bộ 5 bài viết — dùng để dựng
  // mục "Bài viết nổi bật" trên trang chủ & trang danh sách blog.
  // Thứ tự trong mảng = thứ tự ưu tiên khi dùng làm phương án dự phòng.
  var POSTS = [
    {
      slug: "say-thang-hoa-la-gi",
      title: "Sấy thăng hoa là gì? Vì sao giữ trọn dưỡng chất hơn cách sấy thông thường",
      excerpt: "Giải mã công nghệ sấy thăng hoa (freeze-drying) — từ nguyên lý đá thăng hoa thành hơi đến lý do nó giữ cấu trúc, chất xơ tốt hơn phơi nắng hay sấy nhiệt.",
      tag: "Công nghệ chế biến",
      img: "assets/img/blog/hero-say-thang-hoa.svg",
      url: "blog/say-thang-hoa-la-gi.html",
      read: "7 phút đọc"
    },
    {
      slug: "khoa-hoc-qua-sung",
      title: "Quả sung (Ficus carica): những gì khoa học đã ghi nhận",
      excerpt: "Nhìn lại các nghiên cứu công khai về thành phần dinh dưỡng và hoạt chất trong quả sung — chất xơ, kali, polyphenol — và ý nghĩa với bữa ăn hằng ngày.",
      tag: "Nguyên liệu",
      img: "assets/img/blog/hero-qua-sung.svg",
      url: "blog/khoa-hoc-qua-sung.html",
      read: "6 phút đọc"
    },
    {
      slug: "co-sua-la-lon-cay-thuoc-nam",
      title: "Cỏ sữa lá lớn: cây mọc dại ven đường, vì sao được y học cổ truyền và khoa học chú ý",
      excerpt: "Từ bài thuốc dân gian đến các ghi nhận khoa học hiện đại về Euphorbia hirta — góc nhìn cân bằng, không thổi phồng công dụng.",
      tag: "Nguyên liệu",
      img: "assets/img/blog/hero-co-sua.svg",
      url: "blog/co-sua-la-lon-cay-thuoc-nam.html",
      read: "6 phút đọc"
    },
    {
      slug: "chat-xo-hoa-tan-thieu-hut",
      title: "Vì sao phần lớn chúng ta đang thiếu chất xơ mà không hề biết?",
      excerpt: "Khuyến nghị 25–38g chất xơ mỗi ngày, nhưng thực tế nhiều người chỉ nạp chưa tới một nửa. Chất xơ hoà tan là gì và vì sao nó quan trọng?",
      tag: "Dinh dưỡng",
      img: "assets/img/blog/hero-chat-xo.svg",
      url: "blog/chat-xo-hoa-tan-thieu-hut.html",
      read: "5 phút đọc"
    },
    {
      slug: "cach-chon-thuc-pham-bo-sung-uy-tin",
      title: "Cách chọn thực phẩm bổ sung uy tín: đọc nhãn đúng chuẩn, tránh quảng cáo thổi phồng",
      excerpt: "Những dấu hiệu cảnh báo theo khuyến cáo của Bộ Y tế, và cách đọc nhãn/hồ sơ công bố sản phẩm trước khi chọn mua bất kỳ thực phẩm bổ sung nào.",
      tag: "Hướng dẫn",
      img: "assets/img/blog/hero-chon-mua.svg",
      url: "blog/cach-chon-thuc-pham-bo-sung-uy-tin.html",
      read: "6 phút đọc"
    },
    {
      slug: "cong-nang-cac-bo-phan-cay-sung",
      title: "Công năng từng bộ phận cây sung: quả, lá, nhựa mủ, vỏ, rễ",
      excerpt: "Không chỉ quả — lá, nhựa mủ, vỏ và rễ cây sung đều từng được dùng trong kinh nghiệm dân gian. Đối chiếu với nghiên cứu khoa học công khai, có trích dẫn.",
      tag: "Nguyên liệu",
      img: "assets/img/blog/hero-bo-phan-cay-sung.svg",
      url: "blog/cong-nang-cac-bo-phan-cay-sung.html",
      read: "7 phút đọc"
    },
    {
      slug: "cac-giong-sung-tren-the-gioi",
      title: "Các giống sung (Ficus carica) trên thế giới và đặc điểm dinh dưỡng",
      excerpt: "Từ Black Mission tím đen đến sung nếp Việt Nam — tổng hợp nguồn gốc, đặc điểm và dữ liệu khoa học về các giống sung phổ biến trên thế giới.",
      tag: "Nguyên liệu",
      img: "assets/img/blog/hero-giong-sung.svg",
      url: "blog/cac-giong-sung-tren-the-gioi.html",
      read: "7 phút đọc"
    }
  ];

  function svgEye() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>';
  }
  function svgBadge() {
    return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/></svg>';
  }

  function fmtViews(n) {
    if (typeof n !== "number") return null;
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(n);
  }

  function fetchWithTimeout(url) {
    var controller = ("AbortController" in window) ? new AbortController() : null;
    var opts = controller ? { signal: controller.signal } : {};
    var timer = controller ? setTimeout(function () { controller.abort(); }, FETCH_TIMEOUT) : null;
    return fetch(url, opts)
      .then(function (r) { if (timer) clearTimeout(timer); return r.ok ? r.json() : null; })
      .catch(function () { if (timer) clearTimeout(timer); return null; });
  }

  function fetchAllCounts(cb) {
    var results = {};
    var jobs = POSTS.map(function (p) {
      return fetchWithTimeout(GET_URL + encodeURIComponent(p.slug)).then(function (d) {
        results[p.slug] = (d && typeof d.value === "number") ? d.value : null;
      });
    });
    Promise.all(jobs).then(function () { cb(results); });
  }

  function postCardHTML(p, count, featured) {
    var vnum = fmtViews(count);
    var viewsHTML = vnum === null
      ? ""
      : '<span class="pviews">' + svgEye() + '<span class="vnum" data-loaded="1">' + vnum + "</span></span>";
    var href = BASE_PREFIX + p.url;
    var img = BASE_PREFIX + p.img;
    return (
      '<article class="post-card reveal in">' +
      (featured ? '<span class="featured-badge">' + svgBadge() + "Nổi bật</span>" : "") +
      '<a class="thumb" href="' + href + '" aria-hidden="true" tabindex="-1"><img src="' + img + '" alt="" loading="lazy"></a>' +
      '<div class="pbody">' +
      '<span class="ptag">' + p.tag + "</span>" +
      '<h3><a href="' + href + '">' + p.title + "</a></h3>" +
      "<p>" + p.excerpt + "</p>" +
      '<div class="pmeta"><span>' + p.read + "</span>" + viewsHTML + "</div>" +
      "</div></article>"
    );
  }

  function renderFeaturedInto(container, results) {
    var haveData = POSTS.some(function (p) { return typeof results[p.slug] === "number"; });
    var top;
    if (haveData) {
      top = POSTS.slice().sort(function (a, b) {
        var av = typeof results[a.slug] === "number" ? results[a.slug] : -1;
        var bv = typeof results[b.slug] === "number" ? results[b.slug] : -1;
        return bv - av;
      }).slice(0, 3);
    } else {
      // Dự phòng khi không lấy được số liệu: bài bắt buộc đầu tiên + 2 bài kế tiếp
      top = POSTS.slice(0, 3);
    }
    container.innerHTML = top.map(function (p) {
      return postCardHTML(p, results[p.slug], true);
    }).join("");
  }

  function fillStaticViewPills(results) {
    document.querySelectorAll("[data-vslug]").forEach(function (el) {
      var slug = el.getAttribute("data-vslug");
      var val = results[slug];
      var vnum = fmtViews(val);
      var wrap = el.closest(".pviews") || el.closest(".view-pill") || el;
      if (vnum === null) {
        wrap.style.display = "none";
        return;
      }
      el.textContent = vnum;
      el.setAttribute("data-loaded", "1");
    });
  }

  function initFeaturedAndCounts() {
    var featuredContainers = document.querySelectorAll("[data-featured-grid]");
    var needCounts = featuredContainers.length || document.querySelector("[data-vslug]");
    if (!needCounts) return;

    fetchAllCounts(function (results) {
      featuredContainers.forEach(function (c) { renderFeaturedInto(c, results); });
      fillStaticViewPills(results);
    });
  }

  function initSelfViewCounter() {
    var body = document.body;
    var slug = body.getAttribute("data-article-slug");
    if (!slug) return;
    fetchWithTimeout(HIT_URL + encodeURIComponent(slug)).then(function (d) {
      var val = d && typeof d.value === "number" ? d.value : null;
      document.querySelectorAll('[data-vslug-self="' + slug + '"]').forEach(function (el) {
        var vnum = fmtViews(val);
        var wrap = el.closest(".pviews") || el.closest(".view-pill") || el;
        if (vnum === null) { wrap.style.display = "none"; return; }
        el.textContent = vnum;
        el.setAttribute("data-loaded", "1");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSelfViewCounter();
    initFeaturedAndCounts();
  });
})();
