document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(
        "#reviewSlider .review-slide"
    );

    const dots = document.querySelectorAll(
        ".home-reviews .review-dot"
    );

    if (!slides.length || !dots.length) return;

    let currentSlide = 0;
    let reviewTimer;

    // Hiển thị đánh giá được chọn
    function showReview(index) {

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        currentSlide = index;
    }

    // Chuyển sang đánh giá tiếp theo
    function nextReview() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showReview(nextIndex);
    }

    // Tự động chuyển sau 5 giây
    function startReviewTimer() {
        clearInterval(reviewTimer);
        reviewTimer = setInterval(nextReview, 5000);
    }

    // Người dùng nhấn vào dấu chấm
    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {
            showReview(index);
            startReviewTimer();
        });

    });

    // Khởi chạy
    showReview(0);
    startReviewTimer();

});
