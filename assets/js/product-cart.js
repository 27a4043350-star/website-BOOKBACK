document.addEventListener("DOMContentLoaded", () => {
  const info = document.querySelector(".book-detail-info");
  const quantityInput = document.querySelector("#quantity");
  const addButton = info && info.querySelector(".btn-outline-success");
  const buyButton = info && info.querySelector(".btn-success");

  if (!info || !quantityInput || !addButton || !buyButton) {
    return;
  }

  const title = info.querySelector("h2").textContent.trim();
  const priceText = info.querySelector(".font-weight-bold").textContent;
  const price = Number(priceText.replace(/\D/g, ""));
  const description = info.querySelector("h4 + p").textContent.trim();
  const image = document.querySelector(".book-detail-info")
    .closest(".row")
    .querySelector("img")
    .getAttribute("src");
  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  info.insertBefore(status, info.querySelector("hr"));

  function addToCart() {
    if (!quantityInput.reportValidity()) {
      return false;
    }

    const quantity = Number(quantityInput.value);
    if (!Number.isInteger(quantity) || quantity < 1 || !Number.isFinite(price)) {
      status.textContent = "Vui lòng chọn số lượng hợp lệ.";
      return false;
    }

    try {
      const items = window.BookbackCart.addItem({
        id: "book-1",
        title,
        description,
        thumb: "C++",
        image,
        price,
        quantity,
        stock: 5,
      });
      window.BookbackCart.updateCount(items);
      status.textContent = "Đã thêm sách vào giỏ hàng.";
      return true;
    } catch (error) {
      window.BookbackCart.showError(info, error);
      return false;
    }
  }

  addButton.addEventListener("click", () => {
    addToCart();
  });

  buyButton.addEventListener("click", () => {
    if (addToCart()) {
      window.location.href = "checkout.html";
    }
  });

  try {
    window.BookbackCart.updateCount(window.BookbackCart.read());
  } catch (error) {
    window.BookbackCart.showError(info, error);
  }
});
