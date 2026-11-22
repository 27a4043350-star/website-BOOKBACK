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

// PHÂN TRANG
let currentPage = 1;
const booksPerPage = 12;
let filteredBooks = bookData;

// TẠO KHU VỰC PHÂN TRANG
const pagination = document.createElement("div");

pagination.id = "pagination";

pagination.className ="d-flex justify-content-center align-items-center gap-2 mt-4 mb-4";

bookList.insertAdjacentElement("afterend", pagination);


// ĐỊNH DẠNG GIÁ TIỀN

function formatPrice(price) {

    return price.toLocaleString("vi-VN") + "đ";

}


// HIỂN THỊ DANH SÁCH SÁCH

// HIỂN THỊ DANH SÁCH SÁCH
function displayBooks(list) {

    filteredBooks = list;

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    // Đảm bảo trang hiện tại hợp lệ
    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }

    // Xác định vị trí sách cần hiển thị
    const start = (currentPage - 1) * booksPerPage;

    const end = start + booksPerPage;

    const booksToShow = filteredBooks.slice(start, end);

    bookList.innerHTML = "";

    booksToShow.forEach(function(book) {

        
bookList.innerHTML += `

    <div class="col-12 col-sm-6 col-lg-3 mb-4">

        <div class="book-card">

            <a href="book-detail.html?id=${book.id}" class="book-image-wrapper">

                <img src="${book.image}"
                     alt="${book.title}"
                     width="100%">

                <span class="book-condition">
                    ${book.condition}% mới
                </span>

            </a>

            <h3>${book.title}</h3>

            <div class="book-price">
                <span class="old-price">
                    ${formatPrice(book.oldPrice)}
                </span>

                <span class="new-price">
                    ${formatPrice(book.price)}
                </span>
            </div>

            <a href="book-detail.html?id=${book.id}"
               class="btn btn-primary">

                Xem chi tiết

            </a>

        </div>

    </div>

`;


    });

    // Hiện thông báo nếu không có sách
    if (filteredBooks.length === 0) {

        noBooks.hidden = false;

    } else {

        noBooks.hidden = true;

    }

    // Hiển thị nút chuyển trang
    renderPagination(totalPages);
}

// HIỂN THỊ CÁC NÚT CHUYỂN TRANG
function renderPagination(totalPages) {

    pagination.innerHTML = "";

    // Không cần chuyển trang nếu chỉ có 1 trang
    if (totalPages <= 1) {
        return;
    }

    // Nút trang trước
    const previousButton = document.createElement("button");

    previousButton.textContent = "«";

    previousButton.className = "btn btn-outline-primary";

    previousButton.disabled = currentPage === 1;

    previousButton.addEventListener("click", function() {

        currentPage--;

        displayBooks(filteredBooks);

    });

    pagination.appendChild(previousButton);


    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {

        const pageButton = document.createElement("button");

        pageButton.textContent = i;

        pageButton.className =
            i === currentPage
                ? "btn btn-primary"
                : "btn btn-outline-primary";

        pageButton.addEventListener("click", function() {

            currentPage = i;

            displayBooks(filteredBooks);

        });

        pagination.appendChild(pageButton);

    }


    // Nút trang tiếp theo
    const nextButton = document.createElement("button");

    nextButton.textContent = "»";

    nextButton.className = "btn btn-outline-primary";

    nextButton.disabled = currentPage === totalPages;

    nextButton.addEventListener("click", function() {

        currentPage++;

        displayBooks(filteredBooks);

    });

    pagination.appendChild(nextButton);
}

// CHỨC NĂNG LỌC SÁCH

function filterBooks() {

    // Lấy giá trị người dùng nhập

    const keyword = searchInput.value.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");

    const selectedType = categoryFilter.value;

    const selectedPrice = priceFilter.value;

    const selectedCondition = conditionFilter.value;


    // Lọc từ danh sách sách ban đầu

    let result = bookData.filter(function(book) {


        // 1. Lọc theo tên sách

        const bookTitle = book.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
        const matchName = bookTitle.includes(keyword);

        // 2. Lọc theo khoa
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


// Khi lọc hoặc tìm kiếm, quay về trang đầu tiên

currentPage = 1;

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
