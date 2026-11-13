// LẤY CÁC PHẦN TỬ HTML

const bookList = document.getElementById("book-list");

const searchInput = document.getElementById("book-search");

const categoryFilter = document.getElementById("category-filter");

const priceFilter = document.getElementById("price-filter");

const conditionFilter = document.getElementById("condition-filter");

const sortOrder = document.getElementById("sort-order");

const filterForm = document.getElementById("book-filters");

const noBooks = document.getElementById("no-books");


// LƯU DANH MỤC ĐANG CHỌN

let selectedGroup = "all";


// ĐỊNH DẠNG GIÁ TIỀN

function formatPrice(price) {

    return price.toLocaleString("vi-VN") + "đ";

}


// HIỂN THỊ DANH SÁCH SÁCH

function displayBooks(list) {

    bookList.innerHTML = "";

    list.forEach(function(book) {

        bookList.innerHTML += `

            <div class="col-12 col-sm-6 col-lg-4 mb-4">

                <div class="book-card">

                    <a href="book-detail.html?id=${book.id}">

                        <img src="${book.image}"
                             alt="${book.name}"
                             width="100%">

                    </a>

                    <h3>${book.name}</h3>

                    <p>${formatPrice(book.price)}</p>

                    <p>Độ mới: ${book.condition}%</p>

                    <a href="book-detail.html?id=${book.id}"
                       class="btn btn-primary">

                        Xem chi tiết

                    </a>

                </div>

            </div>

        `;

    });


    // Nếu không còn sách nào thì hiện thông báo

    if (list.length === 0) {

        noBooks.hidden = false;

    } else {

        noBooks.hidden = true;

    }

}


// CHỨC NĂNG LỌC SÁCH

function filterBooks() {

    // Lấy giá trị người dùng nhập

    const keyword = searchInput.value.toLowerCase().trim();

    const selectedType = categoryFilter.value;

    const selectedPrice = priceFilter.value;

    const selectedCondition = conditionFilter.value;


    // Lọc từ danh sách sách ban đầu

    let result = bookData.filter(function(book) {


        // 1. Lọc theo tên sách

        const matchName = book.name.toLowerCase().includes(keyword);


        // 2. Lọc theo nhóm danh mục

        const matchGroup =
            selectedGroup === "all" ||
            book.group === selectedGroup;


        // 3. Lọc theo thể loại

        const matchType =
            selectedType === "" ||
            book.type === selectedType;


        // 4. Lọc theo giá tiền

        let matchPrice = true;

        if (selectedPrice === "under-50000") {

            matchPrice = book.price < 50000;

        } else if (selectedPrice === "50000-100000") {

            matchPrice =
                book.price >= 50000 && book.price <= 100000;

        } else if (selectedPrice === "100000-200000") {

            matchPrice =
                book.price > 100000 && book.price <= 200000;

        } else if (selectedPrice === "over-200000") {

            matchPrice = book.price > 200000;

        }


        // 5. Lọc theo độ mới

        let matchCondition = true;

        if (selectedCondition === "90-100") {

            matchCondition =
                book.condition >= 90 && book.condition <= 100;

        } else if (selectedCondition === "70-89") {

            matchCondition =
                book.condition >= 70 && book.condition <= 89;

        } else if (selectedCondition === "under-70") {

            matchCondition = book.condition < 70;

        }


        // Một cuốn sách phải thỏa mãn tất cả điều kiện

        return matchName &&
               matchGroup &&
               matchType &&
               matchPrice &&
               matchCondition;

    });


    // 6. SẮP XẾP SÁCH

    if (sortOrder.value === "price-asc") {

        result.sort(function(a, b) {

            return a.price - b.price;

        });

    } else if (sortOrder.value === "price-desc") {

        result.sort(function(a, b) {

            return b.price - a.price;

        });

    }


    // Hiển thị kết quả cuối cùng

    displayBooks(result);

}


// CLICK DANH MỤC BÊN TRÁI

const categoryLinks = document.querySelectorAll(".category-link");

categoryLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        selectedGroup = link.dataset.group;

        filterBooks();

    });

});


// NÚT ÁP DỤNG BỘ LỌC

filterForm.addEventListener("submit", function(event) {

    event.preventDefault();

    filterBooks();

});


// TÌM KIẾM VÀ CẬP NHẬT KHI THAY ĐỔI BỘ LỌC

searchInput.addEventListener("input", filterBooks);

categoryFilter.addEventListener("change", filterBooks);

priceFilter.addEventListener("change", filterBooks);

conditionFilter.addEventListener("change", filterBooks);

sortOrder.addEventListener("change", filterBooks);


// HIỂN THỊ TẤT CẢ SÁCH KHI MỞ TRANG

displayBooks(bookData);
