const featuredContainer = document.getElementById("homeFeaturedBooks");

// Định dạng giá tiền
function formatFeaturedPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

// Chuyển đường dẫn ảnh từ trang danh mục
// sang đường dẫn phù hợp với index.html
function getFeaturedImagePath(imagePath) {
    return imagePath.replace(/^(\.\.\/)+/, "");
}

// Tạo thẻ sách
function renderFeaturedBooks() {

    if (!featuredContainer || typeof bookData === "undefined") {
        return;
    }

    // Lấy 5 cuốn sách đang bán đầu tiên
    const featuredBooks = bookData
        .filter(book => book.status === "Đang bán")
        .slice(0, 5);

    featuredContainer.innerHTML = "";

    featuredBooks.forEach(book => {

        // Tính phần trăm giảm giá
        const discount = book.oldPrice > book.price
            ? Math.round(
                (book.oldPrice - book.price) / book.oldPrice * 100
            )
            : 0;

        const imagePath = getFeaturedImagePath(book.image);

        const detailLink = `pages/book-detail.html?id=${book.id}`;

        featuredContainer.innerHTML += `
            <div class="book-card">

                <a href="${detailLink}"
                   class="book-image-wrapper">

                    <img src="${imagePath}"
                         alt="${book.title}">

                
                    <span class="book-condition">
                        ${book.condition}% mới
                    </span>

                </a>

                <div class="book-card-content">

                    <h3>${book.title}</h3>

                    <div class="book-price">

                        <span class="old-price">
                            ${formatFeaturedPrice(book.oldPrice)}
                        </span>

                        <span class="new-price">
                            ${formatFeaturedPrice(book.price)}
                        </span>

                    </div>

                    <a href="${detailLink}"
                       class="btn btn-primary">

                        Xem chi tiết

                    </a>

                </div>

            </div>
        `;
    });
}

// Hiển thị sách khi trang được tải
renderFeaturedBooks();
