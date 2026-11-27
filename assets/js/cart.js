document.addEventListener("DOMContentLoaded", () => {
  const cartPanel = document.querySelector(".cart-panel");
  const summaryBox = document.querySelector(".summary-box");
  const cartHeader = cartPanel?.querySelector(".cart-header");
  const cartApi = window.BookbackCart;

  if (!cartPanel || !summaryBox || !cartApi) {
    return;
  }

  const summary = {
    subtotal: summaryBox.querySelector("[data-cart-subtotal]"),
    shipping: summaryBox.querySelector("[data-cart-shipping]"),
    discount: summaryBox.querySelector("[data-cart-discount]"),
    total: summaryBox.querySelector("[data-cart-total]"),
    checkout: summaryBox.querySelector(".primary-btn"),
  };

  function render() {
    try {
      const items = cartApi.read();

      cartPanel.replaceChildren();
      if (items.length && cartHeader) {
        cartPanel.append(cartHeader);
      }

      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "cart-item";
        row.dataset.itemId = item.id;

        const thumb = document.createElement("div");
        thumb.className = "book-thumb";
        if (item.image) {
          const image = document.createElement("img");
          image.src = item.image;
          image.alt = item.title;
          thumb.append(image);
        } else {
          thumb.textContent = item.thumb || "BOOKBACK";
        }

        const info = document.createElement("div");
        info.className = "book-info";
        const title = document.createElement("h3");
        title.textContent = item.title;
        const description = document.createElement("p");
        description.textContent = item.description || "";
        info.append(title, description);

        const price = document.createElement("div");
        price.className = "unit-price";
        price.textContent = cartApi.formatMoney(item.price);

        const quantity = document.createElement("div");
        quantity.className = "qty-box";

        const decrease = document.createElement("button");
        decrease.type = "button";
        decrease.dataset.action = "decrease";
        decrease.setAttribute("aria-label", `Giảm số lượng ${item.title}`);
        decrease.textContent = "−";

        const amount = document.createElement("span");
        amount.textContent = item.quantity;

        const increase = document.createElement("button");
        increase.type = "button";
        increase.dataset.action = "increase";
        increase.setAttribute("aria-label", `Tăng số lượng ${item.title}`);
        increase.textContent = "+";
        increase.disabled = item.quantity >= item.stock;

        quantity.append(decrease, amount, increase);

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "remove-btn";
        remove.dataset.action = "remove";
        remove.setAttribute("aria-label", `Xóa ${item.title} khỏi giỏ hàng`);
        remove.textContent = "Xóa";

        row.append(thumb, info, price, quantity, remove);
        cartPanel.append(row);
      });

      if (!items.length) {
        const emptyState = document.createElement("div");
        emptyState.className = "cart-empty-state";

        const icon = document.createElement("span");
        icon.className = "cart-empty-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "🛒";

        const title = document.createElement("h3");
        title.textContent = "Giỏ hàng đang trống";

        const message = document.createElement("p");
        message.textContent = "Hãy thêm sách vào giỏ để tiếp tục mua sắm.";

        const shopLink = document.createElement("a");
        shopLink.href = "books.html";
        shopLink.className = "primary-btn";
        shopLink.textContent = "Mua sắm ngay";

        emptyState.append(icon, title, message, shopLink);
        cartPanel.append(emptyState);
      }

      const itemCount = items.reduce((total, item) => total + item.quantity, 0);
      document.querySelectorAll("[data-cart-item-count]").forEach((element) => {
        element.textContent = itemCount;
      });

      const { subtotal, shipping, discount, total } =
        cartApi.calculateSummary(items);

      summary.subtotal.textContent = cartApi.formatMoney(subtotal);
      summary.shipping.textContent = cartApi.formatMoney(shipping);
      summary.discount.textContent = discount
        ? `-${cartApi.formatMoney(discount)}`
        : cartApi.formatMoney(0);
      summary.total.textContent = cartApi.formatMoney(total);

      const isEmpty = !items.length;
      summary.checkout.setAttribute("aria-disabled", String(isEmpty));
      summary.checkout.classList.toggle("is-disabled", isEmpty);
      if (isEmpty) {
        summary.checkout.setAttribute("tabindex", "-1");
      } else {
        summary.checkout.removeAttribute("tabindex");
      }

      cartApi.updateCount(items);
    } catch (error) {
      cartApi.showError(cartPanel, error);
    }
  }

  cartPanel.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    try {
      const items = cartApi.read();
      const row = button.closest("[data-item-id]");
      const item = items.find((entry) => entry.id === row?.dataset.itemId);
      if (!item) {
        return;
      }

      const action = button.dataset.action;
      if (action === "increase") {
        item.quantity = Math.min(item.stock, item.quantity + 1);
        cartApi.write(items);
      } else if (action === "decrease") {
        if (item.quantity === 1) {
          cartApi.write(items.filter((entry) => entry.id !== item.id));
        } else {
          item.quantity -= 1;
          cartApi.write(items);
        }
      } else if (action === "remove") {
        cartApi.write(items.filter((entry) => entry.id !== item.id));
      }
    } catch (error) {
      cartApi.showError(cartPanel, error);
    }
  });

  summary.checkout.addEventListener("click", (event) => {
    if (summary.checkout.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
    }
  });

  window.addEventListener("bookback:cart-changed", render);
  render();
});
