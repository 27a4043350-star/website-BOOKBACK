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

  const summary = {
    subtotal: summaryPanel.querySelector("[data-cart-subtotal]"),
    shipping: summaryPanel.querySelector("[data-cart-shipping]"),
    discount: summaryPanel.querySelector("[data-cart-discount]"),
    total: summaryPanel.querySelector("[data-cart-total]"),
  };

  // Chặn trường hợp người dùng chỉ nhập dấu cách ở các ô bắt buộc
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

      const itemCount = items.reduce((total, item) => total + item.quantity, 0);
      const { subtotal, shipping, discount, total } =
        cartApi.calculateSummary(items);
      const formattedTotal = cartApi.formatMoney(total);

      summaryPanel.querySelector("[data-order-count]").textContent = itemCount;
      summary.subtotal.textContent = cartApi.formatMoney(subtotal);
      summary.shipping.textContent = cartApi.formatMoney(shipping);
      summary.discount.textContent = discount
        ? `-${cartApi.formatMoney(discount)}`
        : cartApi.formatMoney(0);
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

      const { subtotal, shipping, discount, total } =
        cartApi.calculateSummary(items);
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
      orderSaved = true;
      orderSubmitted = true;

      cartApi.write([]);
      cartApi.updateCount([]);

      form.querySelectorAll("input, select, textarea").forEach((el) => {
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
