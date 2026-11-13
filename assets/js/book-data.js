// DANH SÁCH DỮ LIỆU SÁCH BOOKBACK

const bookData = [
    {
        id: 1,
        name: "Giáo trình Lập trình C++",
        group: "Công nghệ thông tin",
        type: "Lập trình",
        author: "Nguyễn Văn A",
        price: 80000,
        oldPrice: 120000,
        condition: 90,
        status: "Còn hàng",
        image: "../assets/images/giao-trinh-C++.webp",
        description: "Giáo trình Lập trình C++ cung cấp những kiến thức cơ bản về lập trình, biến, kiểu dữ liệu, câu lệnh điều kiện, vòng lặp, mảng và hàm trong C++.",
        views: 120,
        purchases: 35
    },

    {
        id: 2,
        name: "Giáo trình Cơ sở dữ liệu",
        group: "Cơ sở dữ liệu",
        type: "Cơ sở dữ liệu",
        author: "Trần Văn B",
        price: 70000,
        oldPrice: 100000,
        condition: 85,
        status: "Còn hàng",
        image: "sach2.jpg",
        description: "Giáo trình giới thiệu các kiến thức cơ bản về cơ sở dữ liệu, bảng dữ liệu, khóa, mối quan hệ giữa các bảng và các câu lệnh SQL cơ bản.",
        views: 95,
        purchases: 28
    },

    {
        id: 3,
        name: "Lập trình Java cơ bản",
        group: "Công nghệ thông tin",
        type: "Lập trình",
        author: "Lê Văn C",
        price: 90000,
        oldPrice: 130000,
        condition: 90,
        status: "Còn hàng",
        image: "sach3.jpg",
        description: "Sách cung cấp kiến thức nền tảng về ngôn ngữ lập trình Java, bao gồm biến, kiểu dữ liệu, câu lệnh điều kiện, vòng lặp, mảng và lập trình hướng đối tượng cơ bản.",
        views: 88,
        purchases: 20
    },

    {
        id: 4,
        name: "Marketing căn bản",
        group: "Marketing",
        type: "Marketing",
        author: "Phạm Thị D",
        price: 100000,
        oldPrice: 150000,
        condition: 80,
        status: "Còn hàng",
        image: "../assets/images/MKT-can-ban.jpg",
        description: "Sách giới thiệu những kiến thức cơ bản về marketing, hành vi khách hàng, nghiên cứu thị trường, sản phẩm, giá cả và các hoạt động quảng bá.",
        views: 110,
        purchases: 32
    },

    {
        id: 5,
        name: "Kinh tế học cơ bản",
        group: "Kinh tế",
        type: "Kinh tế",
        author: "Hoàng Văn E",
        price: 60000,
        oldPrice: 90000,
        condition: 75,
        status: "Còn hàng",
        image: "sach5.jpg",
        description: "Sách trình bày các khái niệm cơ bản trong kinh tế học, cung cầu, thị trường, giá cả và những vấn đề kinh tế thường gặp trong thực tế.",
        views: 76,
        purchases: 18
    },

    {
        id: 6,
        name: "Tiếng Anh giao tiếp",
        group: "Ngoại ngữ",
        type: "Ngoại ngữ",
        author: "Nguyễn Thị F",
        price: 75000,
        oldPrice: 110000,
        condition: 85,
        status: "Còn hàng",
        image: "sach6.jpg",
        description: "Sách cung cấp các mẫu câu và từ vựng tiếng Anh thường được sử dụng trong giao tiếp hằng ngày, giúp người học cải thiện khả năng nghe và nói.",
        views: 70,
        purchases: 15
    },

    {
        id: 7,
        name: "Lập trình Web HTML và CSS",
        group: "Công nghệ thông tin",
        type: "Lập trình",
        author: "Trần Thị G",
        price: 120000,
        oldPrice: 160000,
        condition: 95,
        status: "Còn hàng",
        image: "sach7.jpg",
        description: "Sách hướng dẫn các kiến thức cơ bản về xây dựng website bằng HTML và CSS, từ cấu trúc trang web đến cách tạo nội dung và bố cục cho website.",
        views: 130,
        purchases: 40
    },

    {
        id: 8,
        name: "Quản trị kinh doanh",
        group: "Kinh tế",
        type: "Kinh tế",
        author: "Nguyễn Văn H",
        price: 55000,
        oldPrice: 80000,
        condition: 70,
        status: "Còn hàng",
        image: "sach8.jpg",
        description: "Sách cung cấp những kiến thức cơ bản về quản trị doanh nghiệp, quản lý nhân sự, lập kế hoạch và tổ chức hoạt động kinh doanh.",
        views: 65,
        purchases: 12
    }
];
