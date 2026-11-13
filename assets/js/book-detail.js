// LẤY MÃ SÁCH TỪ ĐƯỜNG DẪN

const urlParams = new URLSearchParams(window.location.search);

const bookId = Number(urlParams.get("id"));


// TÌM CUỐN SÁCH CÓ ID TƯƠNG ỨNG

const selectedBook = bookData.find(function(book) {

    return book.id === bookId;

});


// LẤY KHU VỰC HTML

const detailContent = document.getElementById("book-detail-content");

const relatedBooks = document.getElementById("related-books");


// ĐỊNH DẠNG GIÁ TIỀN

function formatPrice(price) {

    return price.toLocaleString("vi-VN") + "đ";

}


// KIỂM TRA SÁCH CÓ TỒN TẠI KHÔNG

if (selectedBook) {


    // HIỂN THỊ CHI TIẾT SÁCH

    detailContent.innerHTML = `

        <div class="row">

            <!-- ẢNH BÌA SÁCH -->

            <div class="col-md-5 mb-4">

                <img src="${selectedBook.image}"
                     alt="${selectedBook.name}"
                     class="img-fluid">

            </div>


            <!-- THÔNG TIN SÁCH -->

            <div class="col-md-7 book-detail-info">

                <h2>${selectedBook.name}</h2>

                <p>
                    <b>Thể loại:</b>
                    ${selectedBook.type}
                </p>

                <p>
                    <b>Tác giả:</b>
                    ${selectedBook.author}
                </p>

                <p>
                    <b>Tình trạng:</b>
                    ${selectedBook.status}
                </p>

                <p>
                    <b>Giá bán:</b>
                    ${formatPrice(selectedBook.price)}
                </p>

                <p>
                    <b>Giá niêm yết cũ:</b>
                    <del>${formatPrice(selectedBook.oldPrice)}</del>
                </p>

                <p>
                    <b>Độ mới:</b>
                    ${selectedBook.condition}%
                </p>

                <h4>Mô tả sách</h4>

                <p>
                    ${selectedBook.description}
                </p>

                <label for="quantity">
                    Số lượng:
                </label>

                <input
                    type="number"
                    id="quantity"
                    value="1"
                    min="1"
                    max="99"
                >

                <br><br>

                <button
                    type="button"
                    class="btn btn-outline-success"
                    id="add-to-cart">

                    Thêm vào giỏ hàng

                </button>

                <button
                    type="button"
                    class="btn btn-success"
                    id="buy-now">

                    Mua ngay

                </button>

                <hr>

                <p>
                    <b>Lượt xem:</b>
                    ${selectedBook.views}
                </p>

                <p>
                    <b>Lượt mua:</b>
                    ${selectedBook.purchases}
                </p>

                <p id="cart-message" role="status"></p>

            </div>

        </div>

    `;


    // HIỂN THỊ SẢN PHẨM LIÊN QUAN

    const related = bookData.filter(function(book) {

        return book.group === selectedBook.group &&
               book.id !== selectedBook.id;

    });


    relatedBooks.innerHTML = "";

    related.forEach(function(book) {

        relatedBooks.innerHTML += `

            <div class="col-md-4 col-sm-6 mb-4">

                <div class="book-card">

                    <a href="book-detail.html?id=${book.id}">

                        <img src="${book.image}"
                             alt="${book.name}"
                             width="100%">

                    </a>

                    <h3>${book.name}</h3>

                    <p>${formatPrice(book.price)}</p>

                    <a href="book-detail.html?id=${book.id}"
                       class="btn btn-primary">

                        Xem chi tiết

                    </a>

                </div>

            </div>

        `;

    });


} else {

    detailContent.innerHTML = `
        <h2>Không tìm thấy sách!</h2>
        <p>Vui lòng quay lại danh mục để chọn sách.</p>
    `;

}


// CHỨC NĂNG THÊM VÀO GIỎ HÀNG

function addToCart(goToCart) {

    const quantity = Number(
        document.getElementById("quantity").value
    );

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {

        alert("Vui lòng nhập số lượng từ 1 đến 99!");

        return;

    }


    // Lấy giỏ hàng hiện tại từ trình duyệt

    let cart = JSON.parse(
        localStorage.getItem("bookbackCart") || "[]"
    );


    // Kiểm tra sách đã có trong giỏ hàng chưa

    const existingBook = cart.find(function(item) {

        return item.id === selectedBook.id;

    });


    if (existingBook) {

        existingBook.quantity += quantity;

    } else {

        cart.push({

            id: selectedBook.id,

            name: selectedBook.name,

            price: selectedBook.price,

            image: selectedBook.image,

            quantity: quantity

        });

    }


    // Lưu giỏ hàng

    localStorage.setItem(
        "bookbackCart",
        JSON.stringify(cart)
    );


    // Thông báo

    document.getElementById("cart-message").textContent =
        "Đã thêm sách vào giỏ hàng!";


    // Nếu bấm Mua ngay thì chuyển đến trang giỏ hàng

    if (goToCart) {

        window.location.href = "cart.html";

    }

}


// GẮN SỰ KIỆN CHO HAI NÚT

document.getElementById("add-to-cart").addEventListener("click", function() {

    addToCart(false);

});


document.getElementById("buy-now").addEventListener("click", function() {

    addToCart(true);

});
