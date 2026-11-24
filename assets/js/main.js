document.addEventListener("DOMContentLoaded", function () {
    // Lấy các thành phần của banner
    const slider = document.querySelector(".banner-slider");
    // Kiểm tra trang có banner hay không
    if (!slider) return;

    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".slider-btn.prev");
    const nextBtn = slider.querySelector(".slider-btn.next");
    const dots = slider.querySelectorAll(".dot");

    // Kiểm tra số lượng banner
    if (slides.length === 0) return;
    // Vị trí banner đang hiển thị
    let currentIndex = 0;
    // Thời gian tự động chuyển banner: 10 giây
    const slideInterval = 10000;

    // Biến quản lý bộ đếm thời gian
    let autoSlideTimer;
    // Hàm hiển thị banner theo vị trí
    function showSlide(index) {
        // Đảm bảo vị trí nằm trong phạm vi các banner
        currentIndex = (index + slides.length) % slides.length;
        // Cập nhật trạng thái các banner
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentIndex);
        });
        // Cập nhật trạng thái các dấu chấm
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }
    // Chuyển sang banner tiếp theo
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    // Quay về banner trước đó
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    // Đặt lại bộ đếm tự động
    function resetAutoSlide() {
        // Hủy bộ đếm cũ
        clearTimeout(autoSlideTimer);
        // Tạo bộ đếm mới
        autoSlideTimer = setTimeout(function () {
            nextSlide();
            // Tiếp tục tự động chuyển banner
            resetAutoSlide();
        }, slideInterval);
    }
    // Nút mũi tên phải
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            nextSlide();
            resetAutoSlide();
        });
    }
    // Nút mũi tên trái
    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            prevSlide();
            resetAutoSlide();
        });
    }
    // Các nút chấm tròn
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            showSlide(index);
            resetAutoSlide();
        });
    });
    // Hiển thị banner đầu tiên
    showSlide(0);
    // Bắt đầu tự động chuyển banner
    resetAutoSlide();
});