(() => {
  const script = document.currentScript;
  if (!script || document.getElementById("bookback-chatbot")) return;

  const siteRoot = new URL("../../", script.src);
  const pageUrl = (path) => new URL(path, siteRoot).href;
  const config = {
    // Các liên kết mạng xã hội chính thức đang được dùng trong footer website.
    facebookUrl: "https://www.facebook.com/share/1A5s3pSn68/?mibextid=wwXIfr",
    instagramUrl: "https://www.instagram.com/bookback.hvnh?xtok=MW96bnNyeTF0a3M5ZQ%3D%3D&utm_source=qr",
  };

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("../css/chatbot.css", script.src).href;
  if (!Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some((link) => link.href === stylesheet.href)) {
    document.head.append(stylesheet);
  }

  const widget = document.createElement("div");
  widget.id = "bookback-chatbot";
  widget.className = "bookback-chatbot";
  widget.innerHTML = `
    <section class="bookback-chatbot-panel" id="bookback-chatbot-panel" aria-label="Trợ lý BOOKBACK" aria-hidden="true" hidden>
      <header class="bookback-chatbot-header">
        <span class="bookback-chatbot-avatar" aria-hidden="true">📚</span>
        <div class="bookback-chatbot-heading">
          <strong>Trợ lý BOOKBACK</strong>
          <span>Trả lời tự động · FAQ website</span>
        </div>
        <button class="bookback-chatbot-close" type="button" aria-label="Đóng cửa sổ chat">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </header>
      <div class="bookback-chatbot-content">
        <div class="bookback-chatbot-messages" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Nội dung hội thoại">
          <article class="bookback-chatbot-message bookback-chatbot-message--bot">
            Xin chào! Chào mừng bạn đến với BOOKBACK 📚<br><br>
            Mình là trợ lý ảo BOOKBACK. Mình có thể giúp bạn tìm hiểu về website, mua bán sách cũ, cách tìm và lọc sách. Bạn cần hỗ trợ điều gì?
          </article>
          <div class="bookback-chatbot-suggestions" aria-label="Câu hỏi gợi ý">
            <button type="button" data-question="BOOKBACK là gì?">BOOKBACK là gì?</button>
            <button type="button" data-question="Hướng dẫn mua sách">Cách mua sách</button>
            <button type="button" data-question="Cách đăng bán sách">Cách bán sách</button>
            <button type="button" data-question="Cách lọc và sắp xếp sách theo giá">Tìm và lọc sách</button>
          </div>
        </div>
        <div class="bookback-chatbot-social" aria-label="Kết nối với BOOKBACK">
          <span>Kết nối với BOOKBACK</span>
          <a class="bookback-chatbot-social-link bookback-chatbot-social-link--facebook" data-social="facebook" target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">f</span> Facebook
          </a>
          <a class="bookback-chatbot-social-link bookback-chatbot-social-link--instagram" data-social="instagram" target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>
            </span>
            Instagram
          </a>
        </div>
      </div>
      <form class="bookback-chatbot-form">
        <label class="bookback-chatbot-visually-hidden" for="bookback-chatbot-input">Nhập câu hỏi</label>
        <input id="bookback-chatbot-input" name="message" type="text" placeholder="Nhập câu hỏi của bạn..." autocomplete="off" maxlength="500" required>
        <button type="submit" aria-label="Gửi tin nhắn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 3-7.2 18-3.8-7-7-3.8L21 3Zm0 0L10 14" /></svg>
        </button>
      </form>
    </section>
    <button class="bookback-chatbot-launcher" type="button" aria-label="Mở chat với BOOKBACK" aria-controls="bookback-chatbot-panel" aria-expanded="false">
      <svg class="bookback-chatbot-launcher-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-6a7.5 7.5 0 1 1 17-3.5Z"/><path d="M8 11h8M8 14h5"/></svg>
      <span class="bookback-chatbot-launcher-label">Chat với BOOKBACK</span>
    </button>
  `;
  document.body.append(widget);

  const panel = widget.querySelector(".bookback-chatbot-panel");
  const launcher = widget.querySelector(".bookback-chatbot-launcher");
  const closeButton = widget.querySelector(".bookback-chatbot-close");
  const messages = widget.querySelector(".bookback-chatbot-messages");
  const form = widget.querySelector(".bookback-chatbot-form");
  const input = widget.querySelector(".bookback-chatbot-form input");
  widget.querySelector('[data-social="facebook"]').href = config.facebookUrl;
  widget.querySelector('[data-social="instagram"]').href = config.instagramUrl;

  const normalize = (value) => value
    .toLocaleLowerCase("vi")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const contactLinks = [
    { label: "Trang liên hệ BOOKBACK", href: pageUrl("pages/contact.html") },
    { label: "Gửi email", href: "mailto:27a4043350@hvnh.edu.vn" },
    { label: "Gọi 0969990579", href: "tel:0969990579" },
  ];

  const knowledgeBase = [
    {
      test: (text) => /\b(hello|xin chao|chao ban|hi)\b/.test(text),
      answer: "Xin chào bạn! Mình có thể hướng dẫn mua sách, gửi yêu cầu thu mua, tìm kiếm hoặc lọc sách trên BOOKBACK.",
      links: [{ label: "Xem danh mục sách", href: pageUrl("pages/books.html") }],
    },
    {
      test: (text) => /bookback la gi|gioi thieu|website nay|bookback/.test(text),
      answer: "BOOKBACK là website hỗ trợ sinh viên Học viện Ngân hàng mua, bán và tái sử dụng sách cũ. Website có danh mục sách, tìm kiếm và lọc, trang chi tiết, giỏ hàng, thanh toán và công cụ ước tính giá sách cũ.",
      links: [{ label: "Tìm hiểu về BOOKBACK", href: pageUrl("pages/about.html") }, { label: "Xem danh mục sách", href: pageUrl("pages/books.html") }],
    },
    {
      test: (text) => /mua sach|dat mua|mua hang|gio hang|thanh toan|checkout/.test(text),
      answer: "Để mua sách, mở Danh mục sách, tìm cuốn phù hợp và xem trang chi tiết; sau đó thêm vào giỏ hàng và tiếp tục tới trang thanh toán. Trang thanh toán hiện liệt kê COD, chuyển khoản ngân hàng và ví điện tử/Momo. Hãy kiểm tra thông tin đơn hàng trước khi xác nhận.",
      links: [{ label: "Mở danh mục sách", href: pageUrl("pages/books.html") }, { label: "Mở giỏ hàng", href: pageUrl("pages/cart.html") }],
    },
    {
      test: (text) => /ban sach|dang ban|thu mua|muon ban|thanh ly/.test(text),
      answer: "BOOKBACK hiện hướng dẫn người bán gửi yêu cầu thu mua qua trang Liên hệ & Thu mua: điền thông tin liên lạc và mô tả tên sách, tình trạng, số lượng. BOOKBACK sẽ liên hệ tư vấn; website không có chức năng tự đăng tin bán trực tiếp.",
      links: [{ label: "Gửi yêu cầu thu mua", href: pageUrl("pages/contact.html") }],
    },
    {
      test: (text) => /tim sach|tim kiem|loc sach|the loai|danh muc/.test(text),
      answer: "Trong trang Danh mục sách, bạn có thể nhập tên sách ở ô Tìm kiếm, chọn thể loại, khoảng giá hoặc độ mới. Kết quả được cập nhật theo các bộ lọc đã chọn.",
      links: [{ label: "Mở trang Danh mục sách", href: pageUrl("pages/books.html") }],
    },
    {
      test: (text) => /sap xep|gia tang|gia giam|thu tu gia/.test(text),
      answer: "Ở trang Danh mục sách, dùng mục Sắp xếp và chọn “Giá tăng dần” hoặc “Giá giảm dần”.",
      links: [{ label: "Mở bộ lọc sách", href: pageUrl("pages/books.html") }],
    },
    {
      test: (text) => /khoang gia|loc theo gia|duoi [0-9]|gia sach|bao nhieu tien/.test(text),
      answer: "Bộ lọc giá trên trang Danh mục sách có các mức: dưới 50.000đ; 50.000–100.000đ; 100.000–200.000đ; và trên 200.000đ. Giá cụ thể tùy từng cuốn và được hiển thị trong danh mục/chi tiết sách.",
      links: [{ label: "Xem sách và giá hiện có", href: pageUrl("pages/books.html") }],
    },
    {
      test: (text) => /sach cu|do moi|tinh trang|chat luong sach/.test(text),
      answer: "BOOKBACK tập trung vào sách đã qua sử dụng. Mỗi sản phẩm có thông tin giá, tình trạng hoặc độ mới và trạng thái còn hàng theo dữ liệu hiển thị trên website. Bạn hãy xem chi tiết từng cuốn trước khi đặt mua.",
      links: [{ label: "Khám phá sách cũ", href: pageUrl("pages/books.html") }],
    },
    {
      test: (text) => /lien he|email|so dien thoai|dia chi|hotline|facebook|instagram|mang xa hoi/.test(text),
      answer: "Bạn có thể liên hệ BOOKBACK qua số 0969990579, email 27a4043350@hvnh.edu.vn hoặc trang Liên hệ. Địa chỉ được công bố trên website: 12 Chùa Bộc, Đống Đa, Hà Nội.",
      links: contactLinks,
    },
    {
      test: (text) => /giao hang|van chuyen|phi ship|doi tra|hoan tien|chinh sach/.test(text),
      answer: "Thông tin chi tiết về giao hàng, đổi trả và các chính sách chưa được công bố trong nội dung trang hiện có. Để tránh cung cấp sai thông tin, bạn vui lòng liên hệ BOOKBACK để được xác nhận.",
      links: contactLinks,
    },
    {
      test: (text) => /tinh gia|uoc tinh gia|tiet kiem|cong cu/.test(text),
      answer: "BOOKBACK có Công cụ tính để ước tính giá bán sách cũ và khoản tiết kiệm so với giá sách mới. Kết quả chỉ mang tính tham khảo.",
      links: [{ label: "Mở Công cụ tính", href: pageUrl("pages/calculator.html") }],
    },
  ];

  function setOpen(open) {
    panel.hidden = !open;
    panel.setAttribute("aria-hidden", String(!open));
    launcher.setAttribute("aria-expanded", String(open));
    launcher.setAttribute("aria-label", open ? "Đóng chat BOOKBACK" : "Mở chat với BOOKBACK");
    widget.classList.toggle("bookback-chatbot--open", open);
    if (open) closeButton.focus();
    else launcher.focus();
  }

  function appendMessage(text, sender, links = []) {
    const message = document.createElement("article");
    message.className = `bookback-chatbot-message bookback-chatbot-message--${sender}`;
    message.textContent = text;
    messages.append(message);

    if (links.length) {
      const linkGroup = document.createElement("div");
      linkGroup.className = "bookback-chatbot-reply-links";
      links.forEach(({ label, href }) => {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = label;
        if (/^https?:/.test(href)) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        linkGroup.append(link);
      });
      messages.append(linkGroup);
    }

    messages.scrollTop = messages.scrollHeight;
  }

  function answerQuestion(question) {
    const normalized = normalize(question);
    const match = knowledgeBase.find((entry) => entry.test(normalized));
    if (match) return match;
    return {
      answer: "Xin lỗi, mình chưa có thông tin chính xác để trả lời câu hỏi này. Bạn có thể liên hệ trực tiếp với BOOKBACK hoặc nhắn qua Facebook/Instagram ở phía trên nhé.",
      links: contactLinks,
    };
  }

  function sendMessage(question) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    appendMessage(cleanQuestion, "user");
    const response = answerQuestion(cleanQuestion);
    window.setTimeout(() => appendMessage(response.answer, "bot", response.links), 280);
  }

  launcher.addEventListener("click", () => setOpen(panel.hidden));
  closeButton.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) setOpen(false);
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage(input.value);
    input.value = "";
    input.focus();
  });
  widget.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", () => sendMessage(button.dataset.question));
  });
  document.querySelectorAll("[data-bookback-chatbot-open]").forEach((button) => {
    button.addEventListener("click", () => setOpen(true));
  });
})();
