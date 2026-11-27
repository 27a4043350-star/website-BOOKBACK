document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#checkout-form");
  const orderList = document.querySelector(".order-list");
  const summaryPanel = document.querySelector(".summary-panel");
  const button = summaryPanel?.querySelector(".checkout-btn");
  const status = document.querySelector("[data-checkout-status]");
  const transferPanel = form?.querySelector("[data-bank-transfer]");
  const cartApi = window.BookbackCart;

  const orderId = `BB-${Date.now().toString(36).toUpperCase()}`;
  let orderSubmitted = false;

  if (!form || !orderList || !summaryPanel || !button || !status || !cartApi) {
    return;
  }

  /* MÃ GIẢM GIÁ TỪ TRANG PROMOTION */
  const PROMO_VOUCHERS = [
    {
      code: "LANDAU15",
      title: "Ghé Thăm Lần Đầu",
      badge: "-15%",
      shortDesc: "Giảm 15% tổng đơn giáo trình đầu tiên",
      conditionText: "Mọi đơn hàng",
      type: "percent",
      value: 15,
      maxDiscount: Infinity,
      minOrder: 0,
    },
    {
      code: "TRIAN2011",
      title: "Tri Ân Nhà Giáo 20/11",
      badge: "-20%",
      shortDesc: "Giảm 20% tối đa 30K cho đơn từ 100K",
      conditionText: "Đơn từ 100.000đ",
      type: "percent",
      value: 20,
      maxDiscount: 30000,
      minOrder: 100000,
    },
    {
      code: "FLASHSALE20",
      title: "Flash Sale Giờ Vàng",
      badge: "-20.000đ",
      shortDesc: "Giảm trực tiếp 20K cho đơn từ 120K",
      conditionText: "Đơn từ 120.000đ",
      type: "fixed",
      value: 20000,
      maxDiscount: 20000,
      minOrder: 120000,
    },
  ];

  const EXPIRED_CODES = ["TANSINHVIEN25", "ONTHI15K"];

  const savedCode = (
    window.localStorage.getItem("bookback_saved_voucher") || ""
  )
    .trim()
    .toUpperCase();
  let selectedVoucherCode = PROMO_VOUCHERS.some((v) => v.code === savedCode)
    ? savedCode
    : null;
  let feedbackState = selectedVoucherCode
    ? { type: "success", text: `Đã tự động áp dụng mã ${selectedVoucherCode}.` }
    : null;

  const voucherInput = summaryPanel.querySelector("#voucher-code-input");
  const applyManualBtn = summaryPanel.querySelector(
    "#apply-manual-voucher-btn",
  );
  const feedbackEl = summaryPanel.querySelector("#voucher-feedback");
  const voucherListEl = summaryPanel.querySelector("#available-vouchers");
  const selectedVoucherCard = summaryPanel.querySelector(
    "#selected-voucher-card",
  );
  const selectedCodeText = summaryPanel.querySelector(
    "#selected-voucher-code-text",
  );
  const selectedDescText = summaryPanel.querySelector(
    "#selected-voucher-desc-text",
  );
  const removeVoucherBtn = summaryPanel.querySelector("#remove-voucher-btn");

  if (voucherInput && selectedVoucherCode) {
    voucherInput.value = selectedVoucherCode;
  }

  const summary = {
    subtotal: summaryPanel.querySelector("[data-cart-subtotal]"),
    shipping: summaryPanel.querySelector("[data-cart-shipping]"),
    discountLabel: summaryPanel.querySelector("[data-discount-label]"),
    discountRow: summaryPanel.querySelector(".discount-row"),
    discount: summaryPanel.querySelector("[data-cart-discount]"),
    total: summaryPanel.querySelector("[data-cart-total]"),
  };

  function getShippingFee(items, subtotal) {
    if (!items.length || subtotal <= 0) return 0;
    const rawShipping = cartApi.calculateSummary(items).shipping;
    return typeof rawShipping === "number" ? rawShipping : 20000;
  }

  function getActiveVoucher(subtotal) {
    if (!selectedVoucherCode || subtotal <= 0) return null;
    const voucher = PROMO_VOUCHERS.find((v) => v.code === selectedVoucherCode);
    if (!voucher || subtotal < voucher.minOrder) return null;
    return voucher;
  }

  function calculateVoucherDiscount(subtotal, voucher) {
    if (!voucher || subtotal <= 0 || subtotal < voucher.minOrder) return 0;
    if (voucher.type === "percent") {
      const raw = Math.round((subtotal * voucher.value) / 100);
      return Math.min(raw, voucher.maxDiscount, subtotal);
    }
    return Math.min(voucher.value, subtotal);
  }

  function setFeedback(type, text) {
    feedbackState = text ? { type, text } : null;
  }

  function applyCode(rawCode, subtotal) {
    const code = (rawCode || "").trim().toUpperCase();
    if (!code) {
      setFeedback("error", "Vui lòng nhập hoặc chọn mã giảm giá.");
      return;
    }

    if (subtotal <= 0) {
      setFeedback("error", "Giỏ hàng đang trống, chưa thể áp dụng mã.");
      return;
    }

    if (EXPIRED_CODES.includes(code)) {
      setFeedback("error", `Mã ${code} đã hết hạn khuyến mãi.`);
      return;
    }

    const voucher = PROMO_VOUCHERS.find((v) => v.code === code);
    if (!voucher) {
      setFeedback(
        "error",
        `Mã ${code} không tồn tại. Hãy thử LANDAU15, TRIAN2011 hoặc FLASHSALE20.`,
      );
      return;
    }

    if (subtotal < voucher.minOrder) {
      setFeedback(
        "error",
        `Mã ${voucher.code} yêu cầu đơn hàng từ ${cartApi.formatMoney(voucher.minOrder)}.`,
      );
      return;
    }

    selectedVoucherCode = voucher.code;
    window.localStorage.setItem("bookback_saved_voucher", voucher.code);
    if (voucherInput) voucherInput.value = voucher.code;
    setFeedback(
      "success",
      `Đã áp dụng mã ${voucher.code} – ${voucher.shortDesc}.`,
    );
  }

  function renderFeedback() {
    if (!feedbackEl) return;
    if (!feedbackState) {
      feedbackEl.hidden = true;
      feedbackEl.textContent = "";
      feedbackEl.className = "voucher-feedback";
      return;
    }
    feedbackEl.hidden = false;
    feedbackEl.textContent = feedbackState.text;
    feedbackEl.className = `voucher-feedback is-${feedbackState.type}`;
  }

  function renderVouchers(subtotal) {
    if (selectedVoucherCode) {
      const current = PROMO_VOUCHERS.find(
        (v) => v.code === selectedVoucherCode,
      );
      if (!current || subtotal <= 0 || subtotal < current.minOrder) {
        selectedVoucherCode = null;
      }
    }

    if (applyManualBtn) {
      applyManualBtn.disabled = orderSubmitted || subtotal <= 0;
    }
    if (voucherInput) {
      voucherInput.disabled = orderSubmitted || subtotal <= 0;
    }

    if (voucherListEl) {
      voucherListEl.innerHTML = PROMO_VOUCHERS.map((v) => {
        const isApplied = selectedVoucherCode === v.code;
        const isEligible = subtotal > 0 && subtotal >= v.minOrder;

        let btnLabel = "Dùng ngay";
        if (isApplied) {
          btnLabel = "Đang dùng";
        } else if (subtotal > 0 && !isEligible) {
          btnLabel = "Chưa đủ ĐK";
        }

        return `
          <div class="voucher-ticket ${isApplied ? "is-applied" : ""} ${!isEligible ? "is-ineligible" : ""}">
            <div class="voucher-ticket-body">
              <div class="voucher-ticket-title">${v.title}</div>
              <span class="voucher-ticket-badge">${v.badge}</span>
              <div class="voucher-ticket-code">Mã: <strong>${v.code}</strong></div>
              <div class="voucher-ticket-cond">${v.conditionText}</div>
            </div>
            <button
              type="button"
              class="btn-apply-voucher ${isApplied ? "is-applied" : ""}"
              data-voucher-code="${v.code}"
              ${!isEligible || orderSubmitted ? "disabled" : ""}
            >
              ${btnLabel}
            </button>
          </div>
        `;
      }).join("");
    }

    const activeVoucher = getActiveVoucher(subtotal);
    if (selectedVoucherCard) {
      if (activeVoucher) {
        selectedVoucherCard.hidden = false;
        if (selectedCodeText) selectedCodeText.textContent = activeVoucher.code;
        if (selectedDescText) {
          selectedDescText.textContent = `${activeVoucher.title} (${activeVoucher.shortDesc})`;
        }
      } else {
        selectedVoucherCard.hidden = true;
      }
    }

    renderFeedback();
  }

  applyManualBtn?.addEventListener("click", () => {
    if (orderSubmitted) return;
    const items = cartApi.read();
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    applyCode(voucherInput?.value || "", subtotal);
    render();
  });

  voucherInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyManualBtn?.click();
    }
  });

  voucherListEl?.addEventListener("click", (e) => {
    if (orderSubmitted) return;
    const btn = e.target.closest(".btn-apply-voucher");
    if (!btn || btn.disabled) return;

    const code = btn.getAttribute("data-voucher-code");
    if (!code) return;

    const items = cartApi.read();
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    if (selectedVoucherCode === code) {
      selectedVoucherCode = null;
      window.localStorage.removeItem("bookback_saved_voucher");
      setFeedback("success", `Đã bỏ chọn mã ${code}.`);
    } else {
      applyCode(code, subtotal);
    }
    render();
  });

  removeVoucherBtn?.addEventListener("click", () => {
    if (orderSubmitted) return;
    selectedVoucherCode = null;
    window.localStorage.removeItem("bookback_saved_voucher");
    if (voucherInput) voucherInput.value = "";
    setFeedback("", "");
    render();
  });

  function validateTrimmedFields() {
    const requiredSelectors = [
      "#name",
      "#district",
      "#address",
      "[data-gmail-local]",
    ];
    for (const selector of requiredSelectors) {
      const input = form.querySelector(selector);
      if (!input) continue;

      if (!input.value.trim()) {
        input.setCustomValidity(
          "Vui lòng nhập thông tin hợp lệ (không chỉ gồm khoảng trắng).",
        );
        input.addEventListener("input", () => input.setCustomValidity(""), {
          once: true,
        });
        return false;
      }
      input.setCustomValidity("");
    }
    return true;
  }

  function showResult({ title, message, showMeta, id = "", totalText = "" }) {
    const titleEl = status.querySelector("[data-order-result-title]");
    const messageEl = status.querySelector("[data-order-result-message]");
    const idEl = status.querySelector("[data-order-result-id]");
    const totalEl = status.querySelector("[data-order-result-total]");

    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;

    if (idEl) {
      idEl.textContent = id;
      idEl.parentElement.hidden = !showMeta;
    }
    if (totalEl) {
      totalEl.textContent = totalText;
      totalEl.parentElement.hidden = !showMeta;
    }

    status.hidden = false;
    status.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function render() {
    if (orderSubmitted) {
      return;
    }

    try {
      const items = cartApi.read();
      orderList.replaceChildren();

      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "order-item";

        if (item.image) {
          const image = document.createElement("img");
          image.className = "order-item-image";
          image.src = item.image;
          image.alt = item.title;
          row.append(image);
        }

        const details = document.createElement("div");
        const title = document.createElement("div");
        title.className = "item-name";
        title.textContent = item.title;

        const quantity = document.createElement("div");
        quantity.className = "item-meta";
        quantity.textContent = `Số lượng: ${item.quantity}`;
        details.append(title, quantity);

        const price = document.createElement("strong");
        price.textContent = cartApi.formatMoney(item.price * item.quantity);

        row.append(details, price);
        orderList.append(row);
      });

      if (!items.length) {
        const emptyState = document.createElement("div");
        emptyState.className = "checkout-empty-state";

        const message = document.createElement("p");
        message.className = "cart-empty";
        message.textContent = "Giỏ hàng đang trống.";

        const cartLink = document.createElement("a");
        cartLink.href = "cart.html";
        cartLink.textContent = "Quay lại giỏ hàng";

        emptyState.append(message, cartLink);
        orderList.append(emptyState);
      }

      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const shipping = getShippingFee(items, subtotal);

      renderVouchers(subtotal);
      const activeVoucher = getActiveVoucher(subtotal);
      const discount = calculateVoucherDiscount(subtotal, activeVoucher);
      const total = Math.max(0, subtotal + shipping - discount);
      const formattedTotal = cartApi.formatMoney(total);

      summaryPanel.querySelector("[data-order-count]").textContent = itemCount;
      summary.subtotal.textContent = cartApi.formatMoney(subtotal);
      summary.shipping.textContent = cartApi.formatMoney(shipping);

      if (summary.discountLabel) {
        summary.discountLabel.textContent =
          activeVoucher && discount > 0
            ? `Giảm giá (${activeVoucher.code})`
            : "Giảm giá";
      }
      if (summary.discountRow) {
        summary.discountRow.classList.toggle("has-discount", discount > 0);
      }
      summary.discount.textContent = discount
        ? `-${cartApi.formatMoney(discount)}`
        : "0đ";

      summary.total.textContent = formattedTotal;

      const transferAmountEl = form.querySelector("[data-transfer-amount]");
      const transferRefEl = form.querySelector("[data-transfer-reference]");
      if (transferAmountEl) transferAmountEl.textContent = formattedTotal;
      if (transferRefEl) transferRefEl.textContent = orderId;

      button.disabled = !items.length;
      cartApi.updateCount(items);
    } catch (error) {
      cartApi.showError(orderList, error);
      button.disabled = true;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (orderSubmitted) {
      return;
    }

    render();
    if (!validateTrimmedFields() || !form.reportValidity() || button.disabled) {
      return;
    }

    let orderSaved = false;
    let savedTotal = 0;

    try {
      const items = cartApi.read();
      if (!items.length) {
        button.disabled = true;
        return;
      }

      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const shipping = getShippingFee(items, subtotal);
      const activeVoucher = getActiveVoucher(subtotal);
      const discount = calculateVoucherDiscount(subtotal, activeVoucher);
      const total = Math.max(0, subtotal + shipping - discount);
      savedTotal = total;

      const formData = new FormData(form);
      const paymentMethod = formData.get("payment") || "cod";
      const localEmail = (
        form.querySelector("[data-gmail-local]")?.value || ""
      ).trim();
      const email =
        (formData.get("email") || "").trim() || `${localEmail}@gmail.com`;

      const order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customer: {
          name: (formData.get("name") || "").trim(),
          phone: (formData.get("phone") || "").trim(),
          email,
          city: formData.get("city") || "",
          district: (formData.get("district") || "").trim(),
          address: (formData.get("address") || "").trim(),
          note: (formData.get("orderNote") || "").trim(),
        },
        items: items.map(({ id, title, price, quantity }) => ({
          id,
          title,
          price,
          quantity,
        })),
        shipping: {
          method: formData.get("shipping") || "standard",
          fee: shipping,
        },
        summary: {
          subtotal,
          shipping,
          voucherCode: activeVoucher ? activeVoucher.code : null,
          discount,
          total,
        },
        payment: {
          method: paymentMethod,
          status:
            paymentMethod === "bank-transfer"
              ? "Chờ xác nhận chuyển khoản"
              : "Chờ xác nhận đơn hàng",
        },
      };

      const savedOrders = window.localStorage.getItem("bookback-orders");
      const orders = savedOrders === null ? [] : JSON.parse(savedOrders);
      if (!Array.isArray(orders)) {
        throw new Error("Danh sách đơn hàng đã lưu không hợp lệ.");
      }

      orders.push(order);
      window.localStorage.setItem("bookback-orders", JSON.stringify(orders));
      window.localStorage.removeItem("bookback_saved_voucher");
      orderSaved = true;
      orderSubmitted = true;

      cartApi.write([]);
      cartApi.updateCount([]);

      form.querySelectorAll("input, select, textarea").forEach((el) => {
        el.disabled = true;
      });
      summaryPanel
        .querySelectorAll(
          ".btn-apply-voucher, .btn-apply-manual, .btn-remove-voucher, .voucher-code-input",
        )
        .forEach((el) => {
          el.disabled = true;
        });

      button.disabled = true;
      button.textContent = "Đã đặt hàng";
      showResult({
        title:
          paymentMethod === "bank-transfer"
            ? "Đơn hàng đã được lưu — chờ xác nhận chuyển khoản"
            : "Đơn hàng đã được lưu trên thiết bị này",
        message:
          "Đơn hàng chỉ được lưu trong trình duyệt này, chưa gửi đến cửa hàng. Không có xác nhận thanh toán tự động.",
        showMeta: true,
        id: orderId,
        totalText: cartApi.formatMoney(total),
      });
    } catch (error) {
      console.error(error);
      orderSubmitted = orderSaved;
      button.disabled = orderSaved;
      showResult({
        title: orderSaved ? "Đơn hàng đã được lưu" : "Không thể lưu đơn hàng",
        message: orderSaved
          ? "Đơn hàng đã lưu trên trình duyệt, nhưng không thể xóa giỏ hàng."
          : "Giỏ hàng vẫn được giữ lại. Hãy thử lại hoặc tải lại trang.",
        showMeta: orderSaved,
        id: orderId,
        totalText: cartApi.formatMoney(savedTotal),
      });
    }
  });

  const phoneInput = form.querySelector("#phone");
  phoneInput?.addEventListener("input", () => {
    phoneInput.value = phoneInput.value
      .replace(/^\+84/, "0")
      .replace(/\D/g, "")
      .slice(0, 10);
  });

  form.querySelectorAll('input[name="payment"]').forEach((input) => {
    const option = input.closest(".payment-option");
    option?.classList.toggle("is-selected", input.checked);
    input.addEventListener("change", () => {
      if (transferPanel) {
        transferPanel.hidden = input.value !== "bank-transfer";
      }
      form.querySelectorAll(".payment-option").forEach((paymentOption) => {
        const radio = paymentOption.querySelector('input[name="payment"]');
        paymentOption.classList.toggle("is-selected", Boolean(radio?.checked));
      });
    });
  });

  const selectedPayment = form.querySelector('input[name="payment"]:checked');
  if (transferPanel) {
    transferPanel.hidden =
      !selectedPayment || selectedPayment.value !== "bank-transfer";
  }

  window.addEventListener("bookback:cart-changed", render);
  render();

  const statusBox = document.querySelector("[data-checkout-status]");
  const orderModal = document.getElementById("orderSuccessModal");
  const modalCode = document.getElementById("modalOrderCode");
  const modalTotal = document.getElementById("modalOrderTotal");
  const continueBtn = document.getElementById("continueShoppingBtn");

  if (statusBox && orderModal) {
    const observer = new MutationObserver(() => {
      if (!statusBox.hidden) {
        const realCode = statusBox.querySelector("[data-order-result-id]");
        const realTotal = statusBox.querySelector("[data-order-result-total]");
        if (realCode && modalCode) {
          modalCode.textContent = realCode.textContent.trim();
        }
        if (realTotal && modalTotal) {
          modalTotal.textContent = realTotal.textContent.trim();
        }
        statusBox.hidden = true;
        orderModal.classList.add("show");
      }
    });

    observer.observe(statusBox, {
      attributes: true,
      attributeFilter: ["hidden"],
    });
  }

  if (continueBtn) {
    continueBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../index.html";
    });
  }
});
