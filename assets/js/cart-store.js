(function () {
  const storageKey = "bookbackCart";
  const DEFAULT_STOCK = 99;

  function normalizeItem(item) {
    if (!item || typeof item !== "object") {
      return null;
    }

    const id =
      item.id !== undefined && item.id !== null ? String(item.id).trim() : "";
    const title =
      typeof item.title === "string" && item.title.trim()
        ? item.title.trim()
        : typeof item.name === "string" && item.name.trim()
          ? item.name.trim()
          : "Sách BOOKBACK";
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    const stock =
      Number.isInteger(item.stock) && item.stock > 0
        ? item.stock
        : Math.max(
            DEFAULT_STOCK,
            Number.isInteger(quantity) ? quantity : DEFAULT_STOCK,
          );

    return {
      id,
      name: title,
      title,
      description: typeof item.description === "string" ? item.description : "",
      thumb: typeof item.thumb === "string" ? item.thumb : "BOOKBACK",
      image: typeof item.image === "string" ? item.image : undefined,
      price,
      quantity,
      stock,
    };
  }

  function isValidItem(item) {
    return (
      item &&
      typeof item.id === "string" &&
      item.id.length > 0 &&
      typeof item.title === "string" &&
      item.title.length > 0 &&
      (item.description === undefined ||
        typeof item.description === "string") &&
      (item.thumb === undefined || typeof item.thumb === "string") &&
      (item.image === undefined || typeof item.image === "string") &&
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      Number.isInteger(item.stock) &&
      item.stock >= item.quantity
    );
  }

  function read() {
    const storedItems = window.localStorage.getItem(storageKey);
    if (storedItems === null) {
      return [];
    }

    const rawItems = JSON.parse(storedItems);
    if (!Array.isArray(rawItems)) {
      throw new Error(
        "Dữ liệu giỏ hàng không hợp lệ. Vui lòng xóa dữ liệu giỏ hàng và thử lại.",
      );
    }

    const items = rawItems.map(normalizeItem);
    if (!items.every(isValidItem)) {
      throw new Error(
        "Dữ liệu giỏ hàng không hợp lệ. Vui lòng xóa dữ liệu giỏ hàng và thử lại.",
      );
    }
    return items;
  }

  function write(items) {
    if (!Array.isArray(items)) {
      throw new Error(
        "Không thể lưu giỏ hàng do dữ liệu sản phẩm không hợp lệ.",
      );
    }

    const normalized = items.map(normalizeItem);
    if (!normalized.every(isValidItem)) {
      throw new Error(
        "Không thể lưu giỏ hàng do dữ liệu sản phẩm không hợp lệ.",
      );
    }

    window.localStorage.setItem(storageKey, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent("bookback:cart-changed"));
  }

  function addItem(newItem) {
    const normalizedNew = normalizeItem(newItem);
    if (!isValidItem(normalizedNew)) {
      throw new Error("Thông tin sản phẩm không hợp lệ.");
    }

    const items = read();
    const existingItem = items.find((item) => item.id === normalizedNew.id);
    if (existingItem) {
      if (existingItem.quantity + normalizedNew.quantity > existingItem.stock) {
        throw new Error("Số lượng đặt vượt quá số sách hiện có.");
      }
      existingItem.quantity += normalizedNew.quantity;
    } else {
      items.push(normalizedNew);
    }
    write(items);
    return items;
  }

  // Hàm tính tiền dùng chung cho cả trang Giỏ hàng và Thanh toán
  // Đổi 0.1 thành tỷ lệ giảm giá của shop (ví dụ 0.1 = 10%, 0.15 = 15%)
  function calculateSummary(items, discountRate = 0.1) {
    const SHIPPING_FEE = 20000;

    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const shipping = items.length ? SHIPPING_FEE : 0;
    const discount = items.length ? Math.round(subtotal * discountRate) : 0;
    const total = Math.max(0, subtotal + shipping - discount);

    return { subtotal, shipping, discount, total };
  }

  function formatMoney(amount) {
    return `${new Intl.NumberFormat("vi-VN").format(amount)}đ`;
  }

  function updateCount(items) {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    document
      .querySelectorAll(".cart-count, [data-cart-item-count]")
      .forEach((element) => {
        element.textContent = count;
      });
  }

  function showError(container, error) {
    console.error(error);
    container.querySelector(".cart-error")?.remove();
    const message = document.createElement("p");
    message.className = "cart-error";
    message.setAttribute("role", "alert");
    message.textContent =
      error?.message ||
      "Không thể tải hoặc lưu giỏ hàng. Hãy bật bộ nhớ trình duyệt và tải lại trang.";
    container.prepend(message);
  }

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) {
      window.dispatchEvent(new CustomEvent("bookback:cart-changed"));
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    try {
      updateCount(read());
    } catch (error) {
      console.error(error);
    }
  });

  window.BookbackCart = {
    read,
    write,
    addItem,
    calculateSummary,
    formatMoney,
    updateCount,
    showError,
  };
})();
