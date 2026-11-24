// Lấy phần tử HTML gốc
const root = document.documentElement;

// Lấy chế độ đã lưu trong localStorage
const savedTheme = localStorage.getItem("bookback-theme");

// Mặc định là chế độ sáng nếu chưa có lựa chọn
const initialTheme = savedTheme === "dark" ? "dark" : "light";

// Áp dụng giao diện ban đầu
root.setAttribute("data-theme", initialTheme);

// Chờ HTML tải xong
document.addEventListener("DOMContentLoaded", function () {

    // Lấy nút chuyển đổi
    const themeToggle = document.getElementById("themeToggle");

    // Nếu trang không có nút thì kết thúc
    if (!themeToggle) return;

    // Cập nhật giao diện của nút
    function updateButton(theme) {

        if (theme === "dark") {
            themeToggle.setAttribute(
                "aria-label",
                "Chuyển sang chế độ sáng"
            );
            themeToggle.setAttribute("aria-pressed", "true");

        } else {
            themeToggle.setAttribute(
                "aria-label",
                "Chuyển sang chế độ tối"
            );
            themeToggle.setAttribute("aria-pressed", "false");
        }
    }

    // Hiển thị đúng trạng thái nút ban đầu
    updateButton(initialTheme);

    // Xử lý khi người dùng nhấn nút
    themeToggle.addEventListener("click", function () {

        // Lấy chế độ hiện tại
        const currentTheme = root.getAttribute("data-theme");

        // Chuyển sang chế độ ngược lại
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        // Áp dụng giao diện mới
        root.setAttribute("data-theme", newTheme);

        // Lưu lựa chọn của người dùng
        localStorage.setItem("bookback-theme", newTheme);

        // Cập nhật nội dung nút
        updateButton(newTheme);
    });
});
