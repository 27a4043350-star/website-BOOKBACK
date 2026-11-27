const bestSellerContainer =
    document.getElementById("homeBestSellerBooks");

// 5 cuốn sách được lựa chọn tạm thời, nếu sau muốn thay đổi thì sửa mã sách là dc
const bestSellerBookIds = [
    "NK009",
    "N003",
    "L007",
    "KT010",
    "TC011"
];

// Định dạng giá tiền
function formatBestSellerPrice(price) {
    return Number(price).toLocaleString("vi-VN") + "đ";
}

// Chuyển đường dẫn ảnh phù hợp với index.html
function getBestSellerImagePath(imagePath) {
    return imagePath.replace(/^(\.\.\/)+/, "");
}

// Hiển thị sách bán chạy
function renderBestSellerBooks() {

    if (!bestSellerContainer || typeof bookData === "undefined") {
        return;
    }

    // Lấy đúng 5 cuốn sách theo mã đã chọn
    const bestSellerBooks = bestSellerBookIds
        .map(id => bookData.find(book => book.id === id))
        .filter(book => book && book.status === "Đang bán");

    bestSellerContainer.innerHTML = bestSellerBooks.map(book => {

        const imagePath = getBestSellerImagePath(book.image);
        const detailLink = `pages/book-detail.html?id=${book.id}`;

        return `
            <div class="book-card">

                <!-- Ảnh bìa và tag tình trạng -->
                <a href="${detailLink}"
                   class="book-image-wrapper">

                    <img src="${imagePath}"
                         alt="${book.title}">

                    <span class="book-condition">
                        ${book.condition}% mới
                    </span>

                </a>

                <!-- Thông tin sách -->
                <div class="book-card-content">

                    <h3>${book.title}</h3>

                    <div class="book-price">

                        <span class="old-price">
                            ${formatBestSellerPrice(book.oldPrice)}
                        </span>

                        <span class="new-price">
                            ${formatBestSellerPrice(book.price)}
                        </span>

                    </div>

                    <a href="${detailLink}"
                       class="btn btn-primary">
                        Xem chi tiết
                    </a>

                </div>

            </div>
        `;
    }).join("");
}

// Chạy khi trang được tải
renderBestSellerBooks();
