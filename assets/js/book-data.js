// DANH SÁCH DỮ LIỆU SÁCH BOOKBACK

const bookData = [
    // ================= CNTT VÀ KTS =================
    {
        id: "B001", name: "B001",
        title: "Liệu IT đã hết thời? Công nghệ thông tin và sự xói mòn của lợi thế cạnh tranh",
        group: "CNTT và KTS", type: "Sách tham khảo",
        author: "Nicholas G. Carr",
        price: 85000, oldPrice: 120000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B001.jpg",
        description: "Cuốn sách bàn về vai trò của công nghệ thông tin trong hoạt động kinh doanh và những thay đổi về lợi thế cạnh tranh khi công nghệ ngày càng phổ biến.",
        views: 0, purchases: 0
    },
    {
        id: "B002", name: "B002",
        title: "Công nghệ bán dẫn tiên tiến",
        group: "CNTT và KTS", type: "Sách chuyên ngành",
        author: "",
        price: 95000, oldPrice: 135000, condition: 95,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B002.jpg",
        description: "Tài liệu về công nghệ bán dẫn, một lĩnh vực quan trọng trong sản xuất linh kiện điện tử và phát triển các thiết bị công nghệ hiện đại.",
        views: 0, purchases: 0
    },
    {
        id: "B003", name: "B003",
        title: "Giáo trình Hệ thống thông tin quản lý",
        group: "CNTT và KTS", type: "Giáo trình",
        author: "",
        price: 65000, oldPrice: 95000, condition: 85,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B003.jpg",
        description: "Giáo trình giới thiệu kiến thức về hệ thống thông tin và cách ứng dụng công nghệ thông tin trong hoạt động quản lý của tổ chức.",
        views: 0, purchases: 0
    },
    {
        id: "B004", name: "B004",
        title: "Phân tích và thiết kế hệ thống thông tin quản lý",
        group: "CNTT và KTS", type: "Giáo trình",
        author: "Nguyễn Văn Vy",
        price: 75000, oldPrice: 110000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B004.jpg",
        description: "Tài liệu cung cấp kiến thức về phân tích yêu cầu, mô hình hóa và thiết kế hệ thống thông tin phục vụ công tác quản lý.",
        views: 0, purchases: 0
    },
    {
        id: "B005", name: "B005",
        title: "Công nghệ phần mềm",
        group: "CNTT và KTS", type: "Giáo trình",
        author: "Đường Hữu Thanh",
        price: 70000, oldPrice: 100000, condition: 88,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B005.jpg",
        description: "Giáo trình về các kiến thức cơ bản trong phát triển phần mềm, từ quy trình xây dựng đến tổ chức và quản lý sản phẩm phần mềm.",
        views: 0, purchases: 0
    },
    {
        id: "B006", name: "B006",
        title: "Giáo trình Quản lý dự án công nghệ thông tin",
        group: "CNTT và KTS", type: "Giáo trình",
        author: "",
        price: 80000, oldPrice: 115000, condition: 92,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B006.jpg",
        description: "Giáo trình giới thiệu những kiến thức về lập kế hoạch, tổ chức, theo dõi và kiểm soát các dự án công nghệ thông tin.",
        views: 0, purchases: 0
    },
    {
        id: "B007", name: "B007",
        title: "Quản lý thông tin trong y tế",
        group: "CNTT và KTS", type: "Sách chuyên ngành",
        author: "",
        price: 90000, oldPrice: 130000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B007.jpg",
        description: "Cuốn sách đề cập đến việc quản lý thông tin trong lĩnh vực y tế, cùng vai trò của dữ liệu và công nghệ trong hoạt động chăm sóc sức khỏe.",
        views: 0, purchases: 0
    },
    {
        id: "B008", name: "B008",
        title: "Giáo trình An toàn mạng thông tin",
        group: "CNTT và KTS", type: "Giáo trình",
        author: "",
        price: 70000, oldPrice: 100000, condition: 85,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B008.webp",
        description: "Giáo trình cung cấp kiến thức về an toàn mạng, các nguy cơ mất an toàn thông tin và những nguyên tắc bảo vệ hệ thống mạng.",
        views: 0, purchases: 0
    },
    {
        id: "B009", name: "B009",
        title: "Kỹ thuật lập trình",
        group: "CNTT và KTS", type: "Giáo trình",
        author: "Nguyễn Trâm Anh, Lê Hồng Thái",
        price: 85000, oldPrice: 120000, condition: 93,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B009.jpg",
        description: "Tài liệu giới thiệu các kiến thức và kỹ thuật lập trình, hỗ trợ người học rèn luyện tư duy thuật toán và kỹ năng viết chương trình.",
        views: 0, purchases: 0
    },
    {
        id: "B010", name: "B010",
        title: "Giáo trình Kỹ thuật lập trình",
        group: "CNTT và KTS", type: "Giáo trình",
        author: "",
        price: 75000, oldPrice: 105000, condition: 87,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B010.jpg",
        description: "Giáo trình phục vụ học tập kỹ thuật lập trình, giúp người học tiếp cận các phương pháp xây dựng và triển khai chương trình.",
        views: 0, purchases: 0
    },
    {
        id: "B011", name: "B011",
        title: "Khoa học, công nghệ và đổi mới sáng tạo Việt Nam 2024",
        group: "CNTT và KTS", type: "Sách tham khảo",
        author: "",
        price: 95000, oldPrice: 140000, condition: 96,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B011.jpg",
        description: "Ấn phẩm cung cấp thông tin về tình hình khoa học, công nghệ và hoạt động đổi mới sáng tạo tại Việt Nam năm 2024.",
        views: 0, purchases: 0
    },
    {
        id: "B012", name: "B012",
        title: "Ứng dụng công nghệ thông tin và truyền thông trong đổi mới hoạt động thư viện",
        group: "CNTT và KTS", type: "Sách tham khảo",
        author: "Vương Toàn",
        price: 80000, oldPrice: 115000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/cntt-kts/B012.jpg",
        description: "Cuốn sách đề cập đến việc ứng dụng công nghệ thông tin và truyền thông nhằm đổi mới hoạt động tổ chức, quản lý và phục vụ của thư viện.",
        views: 0, purchases: 0
    },

    // ================= NGÂN HÀNG =================
    {
        id: "NK001", name: "NK001",
        title: "Giáo trình Luật ngân hàng",
        group: "Ngân hàng", type: "Giáo trình",
        author: "Lê Thị Thu Thủy",
        price: 75000, oldPrice: 110000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK001.png",
        description: "Giáo trình giới thiệu những vấn đề pháp lý cơ bản liên quan đến hoạt động ngân hàng và các quy định điều chỉnh lĩnh vực ngân hàng.",
        views: 0, purchases: 0
    },
    {
        id: "NK002", name: "NK002",
        title: "Mô hình Greg Shaw trong quản trị rủi ro đạo đức tại ngân hàng",
        group: "Ngân hàng", type: "Sách tham khảo",
        author: "",
        price: 90000, oldPrice: 130000, condition: 95,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK002.jpg",
        description: "Cuốn sách đề cập đến mô hình Greg Shaw và vấn đề quản trị rủi ro đạo đức trong hoạt động của ngân hàng.",
        views: 0, purchases: 0
    },
    {
        id: "NK003", name: "NK003",
        title: "Giáo trình Quản trị ngân hàng",
        group: "Ngân hàng", type: "Giáo trình",
        author: "",
        price: 70000, oldPrice: 100000, condition: 85,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK003.jpg",
        description: "Giáo trình cung cấp kiến thức về quản trị ngân hàng, các hoạt động điều hành và quản lý trong tổ chức tín dụng.",
        views: 0, purchases: 0
    },
    {
        id: "NK004", name: "NK004",
        title: "Giáo trình Tín dụng ngân hàng",
        group: "Ngân hàng", type: "Giáo trình",
        author: "",
        price: 65000, oldPrice: 95000, condition: 88,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK004.jpg",
        description: "Tài liệu giới thiệu nghiệp vụ tín dụng ngân hàng, quy trình cấp tín dụng và những kiến thức cơ bản về hoạt động cho vay.",
        views: 0, purchases: 0
    },
    {
        id: "NK005", name: "NK005",
        title: "Giáo trình Ngân hàng quốc tế",
        group: "Ngân hàng", type: "Giáo trình",
        author: "",
        price: 85000, oldPrice: 120000, condition: 92,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK005.png",
        description: "Giáo trình giới thiệu hoạt động ngân hàng quốc tế và các nghiệp vụ ngân hàng trong môi trường tài chính toàn cầu.",
        views: 0, purchases: 0
    },
    {
        id: "NK006", name: "NK006",
        title: "Giáo trình Tín dụng ngân hàng",
        group: "Ngân hàng", type: "Giáo trình",
        author: "Nguyễn Văn Tiến",
        price: 70000, oldPrice: 100000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK006.png",
        description: "Tài liệu trình bày các nội dung về tín dụng ngân hàng và nghiệp vụ cấp tín dụng trong hoạt động kinh doanh ngân hàng.",
        views: 0, purchases: 0
    },
    {
        id: "NK007", name: "NK007",
        title: "Nghiệp vụ thị trường tiền tệ liên ngân hàng",
        group: "Ngân hàng", type: "Sách chuyên ngành",
        author: "",
        price: 95000, oldPrice: 135000, condition: 93,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK007.jpg",
        description: "Cuốn sách giới thiệu các nghiệp vụ trên thị trường tiền tệ liên ngân hàng và vai trò của thị trường này trong hệ thống tài chính.",
        views: 0, purchases: 0
    },
    {
        id: "NK008", name: "NK008",
        title: "Giáo trình Ngân hàng Trung ương",
        group: "Ngân hàng", type: "Giáo trình",
        author: "",
        price: 80000, oldPrice: 115000, condition: 87,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK008.webp",
        description: "Giáo trình giới thiệu chức năng, vai trò và các hoạt động cơ bản của ngân hàng trung ương trong nền kinh tế.",
        views: 0, purchases: 0
    },
    {
        id: "NK009", name: "NK009",
        title: "Ngân hàng số: Sự đổi mới mang tính cách mạng",
        group: "Ngân hàng", type: "Sách tham khảo",
        author: "",
        price: 100000, oldPrice: 145000, condition: 96,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK009.webp",
        description: "Cuốn sách đề cập đến quá trình chuyển đổi số trong lĩnh vực ngân hàng và những thay đổi trong cách cung cấp dịch vụ tài chính.",
        views: 0, purchases: 0
    },
    {
        id: "NK010", name: "NK010",
        title: "Quản trị ngân hàng",
        group: "Ngân hàng", type: "Sách chuyên ngành",
        author: "",
        price: 75000, oldPrice: 110000, condition: 85,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK010.webp",
        description: "Tài liệu tham khảo về hoạt động quản trị ngân hàng và các vấn đề liên quan đến tổ chức, điều hành ngân hàng.",
        views: 0, purchases: 0
    },
    {
        id: "NK011", name: "NK011",
        title: "Đột phá ngân hàng từ tư duy thiết kế",
        group: "Ngân hàng", type: "Sách tham khảo",
        author: "Sandeep Deobhakta",
        price: 110000, oldPrice: 155000, condition: 97,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK011.webp",
        description: "Cuốn sách giới thiệu tư duy thiết kế và cách tiếp cận đổi mới nhằm cải thiện trải nghiệm khách hàng trong lĩnh vực ngân hàng.",
        views: 0, purchases: 0
    },
    {
        id: "NK012", name: "NK012",
        title: "Phân tích hiệu quả hoạt động ngân hàng thương mại Việt Nam",
        group: "Ngân hàng", type: "Sách chuyên ngành",
        author: "",
        price: 90000, oldPrice: 130000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/ngan-hang/NK012.jpg",
        description: "Nghiên cứu về hiệu quả hoạt động của các ngân hàng thương mại tại Việt Nam thông qua việc phân tích và đánh giá hoạt động ngân hàng.",
        views: 0, purchases: 0
    },

    // ================= NGOẠI NGỮ =================
    {
        id: "N001", name: "N001",
        title: "Tâm lý học với dạy học ngoại ngữ",
        group: "Ngoại ngữ", type: "Sách tham khảo",
        author: "",
        price: 65000, oldPrice: 95000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N001.jpg",
        description: "Cuốn sách đề cập đến những vấn đề tâm lý học có liên quan đến quá trình dạy và học ngoại ngữ.",
        views: 0, purchases: 0
    },
    {
        id: "N002", name: "N002",
        title: "Giáo trình New HSK 1",
        group: "Ngoại ngữ", type: "Sách ngoại ngữ",
        author: "",
        price: 55000, oldPrice: 80000, condition: 95,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N002.webp",
        description: "Giáo trình tiếng Trung trình độ HSK 1, dành cho người mới bắt đầu làm quen với từ vựng và cấu trúc tiếng Trung cơ bản.",
        views: 0, purchases: 0
    },
    {
        id: "N003", name: "N003",
        title: "Fluent Forever: Cách học ngoại ngữ nhanh và không bao giờ quên",
        group: "Ngoại ngữ", type: "Sách ngoại ngữ",
        author: "Gabriel Wyner",
        price: 105000, oldPrice: 150000, condition: 93,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N003.jpeg",
        description: "Cuốn sách chia sẻ phương pháp học ngoại ngữ, ghi nhớ từ vựng và xây dựng khả năng sử dụng ngôn ngữ lâu dài.",
        views: 0, purchases: 0
    },
    {
        id: "N004", name: "N004",
        title: "Tiếng Nhật - Ngoại ngữ 2, Quyển 1",
        group: "Ngoại ngữ", type: "Sách ngoại ngữ",
        author: "",
        price: 60000, oldPrice: 85000, condition: 88,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N004.jpg",
        description: "Tài liệu học tiếng Nhật dành cho người học ngoại ngữ 2, hỗ trợ làm quen với từ vựng và kiến thức tiếng Nhật cơ bản.",
        views: 0, purchases: 0
    },
    {
        id: "N005", name: "N005",
        title: "Giáo trình New HSK 2",
        group: "Ngoại ngữ", type: "Sách ngoại ngữ",
        author: "",
        price: 55000, oldPrice: 80000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N005.webp",
        description: "Giáo trình tiếng Trung trình độ HSK 2, tiếp nối kiến thức cơ bản và mở rộng vốn từ vựng cho người học.",
        views: 0, purchases: 0
    },
    {
        id: "N006", name: "N006",
        title: "Giáo trình New HSK 3",
        group: "Ngoại ngữ", type: "Sách ngoại ngữ",
        author: "",
        price: 60000, oldPrice: 85000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N006.webp",
        description: "Giáo trình tiếng Trung trình độ HSK 3, giúp người học phát triển thêm vốn từ và khả năng sử dụng tiếng Trung.",
        views: 0, purchases: 0
    },
    {
        id: "N007", name: "N007",
        title: "Tự học tiếng Đức cho người mới bắt đầu",
        group: "Ngoại ngữ", type: "Sách ngoại ngữ",
        author: "",
        price: 75000, oldPrice: 105000, condition: 87,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N007.webp",
        description: "Tài liệu tự học tiếng Đức dành cho người mới bắt đầu, hỗ trợ tiếp cận những kiến thức ngôn ngữ nền tảng.",
        views: 0, purchases: 0
    },
    {
        id: "N008", name: "N008",
        title: "Căn bản phiên dịch Việt - Anh",
        group: "Ngoại ngữ", type: "Sách ngoại ngữ",
        author: "",
        price: 70000, oldPrice: 100000, condition: 92,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N008.webp",
        description: "Cuốn sách cung cấp kiến thức nền tảng về phiên dịch Việt - Anh, phù hợp với người học muốn rèn luyện kỹ năng chuyển ngữ.",
        views: 0, purchases: 0
    },
    {
        id: "N009", name: "N009",
        title: "Giáo trình New HSK 4 - Tập 1",
        group: "Ngoại ngữ", type: "Sách ngoại ngữ",
        author: "",
        price: 65000, oldPrice: 90000, condition: 94,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N009.jpg",
        description: "Giáo trình tiếng Trung trình độ HSK 4, tập trung phát triển kiến thức và kỹ năng ngôn ngữ ở trình độ trung cấp.",
        views: 0, purchases: 0
    },
    {
        id: "N010", name: "N010",
        title: "The Definitive Writing Guide for IELTS",
        group: "Ngoại ngữ", type: "Sách ngoại ngữ",
        author: "",
        price: 85000, oldPrice: 120000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N010.jpg",
        description: "Sách hướng dẫn kỹ năng viết IELTS, hỗ trợ người học rèn luyện cách triển khai ý và cải thiện bài viết.",
        views: 0, purchases: 0
    },
    {
        id: "N011", name: "N011",
        title: "600 động từ bất quy tắc trong tiếng Anh",
        group: "Ngoại ngữ", type: "Sách ngoại ngữ",
        author: "",
        price: 45000, oldPrice: 65000, condition: 85,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N011.jpg",
        description: "Tài liệu tổng hợp các động từ bất quy tắc trong tiếng Anh, hỗ trợ người học tra cứu và ghi nhớ cách chia động từ.",
        views: 0, purchases: 0
    },
    {
        id: "N012", name: "N012",
        title: "Phương pháp tự học và hướng dẫn tự học ngoại ngữ",
        group: "Ngoại ngữ", type: "Sách tham khảo",
        author: "Lê Khánh Bằng, Nguyễn Văn Tư",
        price: 70000, oldPrice: 100000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/ngoai-ngu/N012.jpg",
        description: "Cuốn sách đề cập đến phương pháp tự học và cách tổ chức hoạt động tự học ngoại ngữ nhằm nâng cao hiệu quả học tập.",
        views: 0, purchases: 0
    },

    // ================= LUẬT =================
    {
        id: "L001", name: "L001",
        title: "Giáo trình Luật Hiến pháp Việt Nam",
        group: "Luật", type: "Giáo trình",
        author: "",
        price: 80000, oldPrice: 115000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/luat/L001.jpg",
        description: "Giáo trình giới thiệu những kiến thức cơ bản về luật hiến pháp và các quy định nền tảng trong hệ thống pháp luật Việt Nam.",
        views: 0, purchases: 0
    },
    {
        id: "L002", name: "L002",
        title: "Phương pháp nghiên cứu luật học",
        group: "Luật", type: "Sách tham khảo",
        author: "",
        price: 75000, oldPrice: 105000, condition: 95,
        status: "Đang bán",
        image: "../assets/images/books/luat/L002.jpg",
        description: "Tài liệu giới thiệu các phương pháp nghiên cứu khoa học pháp lý, hỗ trợ người học trong quá trình tìm hiểu và nghiên cứu luật học.",
        views: 0, purchases: 0
    },
    {
        id: "L003", name: "L003",
        title: "Giáo trình Đại cương về Nhà nước và Pháp luật",
        group: "Luật", type: "Giáo trình",
        author: "",
        price: 70000, oldPrice: 100000, condition: 88,
        status: "Đang bán",
        image: "../assets/images/books/luat/L003.jpg",
        description: "Giáo trình cung cấp kiến thức khái quát về nhà nước, pháp luật và những vấn đề cơ bản của đời sống pháp lý.",
        views: 0, purchases: 0
    },
    {
        id: "L004", name: "L004",
        title: "Giáo trình Xã hội học pháp luật",
        group: "Luật", type: "Giáo trình",
        author: "",
        price: 75000, oldPrice: 105000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/luat/L004.jpg",
        description: "Giáo trình tìm hiểu mối quan hệ giữa pháp luật và xã hội, cũng như vai trò của pháp luật trong đời sống xã hội.",
        views: 0, purchases: 0
    },
    {
        id: "L005", name: "L005",
        title: "Luật Kinh tế",
        group: "Luật", type: "Giáo trình",
        author: "",
        price: 65000, oldPrice: 95000, condition: 85,
        status: "Đang bán",
        image: "../assets/images/books/luat/L005.jpg",
        description: "Tài liệu giới thiệu các quy định pháp luật liên quan đến hoạt động kinh doanh và những quan hệ pháp lý trong nền kinh tế.",
        views: 0, purchases: 0
    },
    {
        id: "L006", name: "L006",
        title: "Giáo trình Luật Hành chính Việt Nam",
        group: "Luật", type: "Giáo trình",
        author: "",
        price: 80000, oldPrice: 115000, condition: 92,
        status: "Đang bán",
        image: "../assets/images/books/luat/L006.webp",
        description: "Giáo trình trình bày những kiến thức về luật hành chính và các quy định pháp lý liên quan đến quản lý hành chính nhà nước.",
        views: 0, purchases: 0
    },
    {
        id: "L007", name: "L007",
        title: "Hiến pháp nước Cộng hòa xã hội chủ nghĩa Việt Nam năm 2013",
        group: "Luật", type: "Văn bản pháp luật",
        author: "",
        price: 35000, oldPrice: 50000, condition: 95,
        status: "Đang bán",
        image: "../assets/images/books/luat/L007.webp",
        description: "Ấn phẩm tập hợp nội dung Hiến pháp năm 2013, văn bản pháp lý nền tảng quy định những vấn đề cơ bản của Nhà nước và quyền con người, quyền công dân.",
        views: 0, purchases: 0
    },
    {
        id: "L008", name: "L008",
        title: "Giáo trình Lý luận chung về Nhà nước và Pháp luật",
        group: "Luật", type: "Giáo trình",
        author: "",
        price: 70000, oldPrice: 100000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/luat/L008.webp",
        description: "Giáo trình cung cấp cơ sở lý luận về nhà nước và pháp luật, phục vụ việc học tập các môn khoa học pháp lý.",
        views: 0, purchases: 0
    },
    {
        id: "L009", name: "L009",
        title: "Luật Đầu tư năm 2025",
        group: "Luật", type: "Văn bản pháp luật",
        author: "",
        price: 45000, oldPrice: 65000, condition: 97,
        status: "Đang bán",
        image: "../assets/images/books/luat/L009.webp",
        description: "Ấn phẩm về pháp luật đầu tư, phục vụ việc tra cứu các quy định liên quan đến hoạt động đầu tư.",
        views: 0, purchases: 0
    },
    {
        id: "L010", name: "L010",
        title: "Giáo trình Xã hội học pháp luật",
        group: "Luật", type: "Giáo trình",
        author: "",
        price: 70000, oldPrice: 100000, condition: 86,
        status: "Đang bán",
        image: "../assets/images/books/luat/L010.jpg",
        description: "Giáo trình nghiên cứu các vấn đề xã hội học trong lĩnh vực pháp luật và sự tác động qua lại giữa pháp luật với xã hội.",
        views: 0, purchases: 0
    },
    {
        id: "L011", name: "L011",
        title: "Bộ luật Tố tụng dân sự năm 2015",
        group: "Luật", type: "Văn bản pháp luật",
        author: "",
        price: 55000, oldPrice: 80000, condition: 93,
        status: "Đang bán",
        image: "../assets/images/books/luat/L011.webp",
        description: "Ấn phẩm tập hợp các quy định về trình tự, thủ tục giải quyết các vụ việc dân sự tại tòa án.",
        views: 0, purchases: 0
    },
    {
        id: "L012", name: "L012",
        title: "Luật Doanh nghiệp năm 2020",
        group: "Luật", type: "Văn bản pháp luật",
        author: "",
        price: 50000, oldPrice: 75000, condition: 95,
        status: "Đang bán",
        image: "../assets/images/books/luat/L012.webp",
        description: "Ấn phẩm về các quy định pháp luật liên quan đến thành lập, tổ chức, quản lý và hoạt động của doanh nghiệp.",
        views: 0, purchases: 0
    },

    // ================= KINH TẾ =================
    {
        id: "KT001", name: "KT001",
        title: "Tinh hoa Kinh tế học (Essentials of Economics)",
        group: "Kinh tế", type: "Sách tham khảo",
        author: "Paul Krugman, Robin Wells",
        price: 120000, oldPrice: 170000, condition: 95,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT001.webp",
        description: "Cuốn sách giới thiệu những nguyên lý kinh tế học cơ bản, giúp người đọc hiểu cách cá nhân, doanh nghiệp và nền kinh tế đưa ra quyết định.",
        views: 0, purchases: 0
    },
    {
        id: "KT002", name: "KT002",
        title: "Giáo trình Kinh tế học - Tập 1",
        group: "Kinh tế", type: "Giáo trình",
        author: "",
        price: 75000, oldPrice: 110000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT002.png",
        description: "Giáo trình cung cấp kiến thức nền tảng về kinh tế học, hỗ trợ người học tiếp cận các khái niệm và nguyên lý kinh tế.",
        views: 0, purchases: 0
    },
    {
        id: "KT003", name: "KT003",
        title: "Giáo trình Kinh tế lao động",
        group: "Kinh tế", type: "Giáo trình",
        author: "",
        price: 70000, oldPrice: 100000, condition: 88,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT003.png",
        description: "Giáo trình giới thiệu các vấn đề kinh tế liên quan đến lao động, việc làm, tiền lương và thị trường lao động.",
        views: 0, purchases: 0
    },
    {
        id: "KT004", name: "KT004",
        title: "Giáo trình Kinh tế quốc tế",
        group: "Kinh tế", type: "Giáo trình",
        author: "",
        price: 85000, oldPrice: 120000, condition: 92,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT004.jpg",
        description: "Giáo trình cung cấp kiến thức về thương mại quốc tế, quan hệ kinh tế giữa các quốc gia và hoạt động kinh tế trong môi trường toàn cầu.",
        views: 0, purchases: 0
    },
    {
        id: "KT005", name: "KT005",
        title: "Giáo trình Kinh tế thuế khóa",
        group: "Kinh tế", type: "Giáo trình",
        author: "",
        price: 75000, oldPrice: 105000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT005.jpg",
        description: "Giáo trình tìm hiểu các vấn đề kinh tế liên quan đến thuế, chính sách thuế và tác động của thuế đối với nền kinh tế.",
        views: 0, purchases: 0
    },
    {
        id: "KT006", name: "KT006",
        title: "Kinh tế học vi mô (Principles of Microeconomics)",
        group: "Kinh tế", type: "Giáo trình",
        author: "",
        price: 80000, oldPrice: 115000, condition: 85,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT006.webp",
        description: "Tài liệu giới thiệu các nguyên lý kinh tế học vi mô, tập trung vào hành vi của người tiêu dùng, doanh nghiệp và hoạt động thị trường.",
        views: 0, purchases: 0
    },
    {
        id: "KT007", name: "KT007",
        title: "Giáo trình Kinh tế học đại cương",
        group: "Kinh tế", type: "Giáo trình",
        author: "",
        price: 70000, oldPrice: 100000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT007.webp",
        description: "Giáo trình giới thiệu các khái niệm và nguyên lý kinh tế học cơ bản, phù hợp với người học mới tiếp cận lĩnh vực kinh tế.",
        views: 0, purchases: 0
    },
    {
        id: "KT008", name: "KT008",
        title: "Cách mạng công nghiệp lần thứ tư",
        group: "Kinh tế", type: "Sách tham khảo",
        author: "",
        price: 90000, oldPrice: 130000, condition: 93,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT008.webp",
        description: "Cuốn sách đề cập đến cuộc cách mạng công nghiệp lần thứ tư và những thay đổi do công nghệ mới tạo ra đối với kinh tế và xã hội.",
        views: 0, purchases: 0
    },
    {
        id: "KT009", name: "KT009",
        title: "Giáo trình Kinh tế quốc tế",
        group: "Kinh tế", type: "Giáo trình",
        author: "",
        price: 80000, oldPrice: 115000, condition: 88,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT009.webp",
        description: "Giáo trình cung cấp kiến thức về các hoạt động kinh tế quốc tế và mối quan hệ kinh tế giữa các quốc gia.",
        views: 0, purchases: 0
    },
    {
        id: "KT010", name: "KT010",
        title: "Harvard Business Review: Cẩm nang lãnh đạo",
        group: "Kinh tế", type: "Sách tham khảo",
        author: "",
        price: 105000, oldPrice: 150000, condition: 95,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT010.webp",
        description: "Cuốn sách tập hợp những nội dung tham khảo về năng lực lãnh đạo, quản lý con người và điều hành tổ chức.",
        views: 0, purchases: 0
    },
    {
        id: "KT011", name: "KT011",
        title: "Kinh tế học đổi mới: Cuộc đua giành lợi thế trên phạm vi toàn cầu",
        group: "Kinh tế", type: "Sách tham khảo",
        author: "",
        price: 100000, oldPrice: 145000, condition: 92,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT011.webp",
        description: "Cuốn sách phân tích vai trò của đổi mới sáng tạo trong phát triển kinh tế và cạnh tranh giữa các quốc gia trên thế giới.",
        views: 0, purchases: 0
    },
    {
        id: "KT012", name: "KT012",
        title: "Kinh tế tri thức",
        group: "Kinh tế", type: "Sách tham khảo",
        author: "Đặng Mộng Lân",
        price: 85000, oldPrice: 120000, condition: 87,
        status: "Đang bán",
        image: "../assets/images/books/kinh-te/KT012.webp",
        description: "Cuốn sách đề cập đến nền kinh tế tri thức và vai trò của tri thức, thông tin và công nghệ trong phát triển kinh tế.",
        views: 0, purchases: 0
    },

    // ================= TÀI CHÍNH =================
    {
        id: "TC001", name: "TC001",
        title: "Lập, đọc, phân tích và kiểm tra báo cáo tài chính",
        group: "Tài chính", type: "Sách chuyên ngành",
        author: "",
        price: 95000, oldPrice: 135000, condition: 95,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC001.webp",
        description: "Tài liệu hướng dẫn các nội dung liên quan đến lập, đọc, phân tích và kiểm tra báo cáo tài chính của doanh nghiệp.",
        views: 0, purchases: 0
    },
    {
        id: "TC002", name: "TC002",
        title: "Tài chính quốc tế",
        group: "Tài chính", type: "Giáo trình",
        author: "",
        price: 85000, oldPrice: 120000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC002.jpg",
        description: "Giáo trình giới thiệu các vấn đề về tài chính quốc tế, thị trường tài chính toàn cầu và những hoạt động tài chính xuyên biên giới.",
        views: 0, purchases: 0
    },
    {
        id: "TC003", name: "TC003",
        title: "Tiền tệ, ngân hàng và thị trường tài chính",
        group: "Tài chính", type: "Giáo trình",
        author: "Nguyễn Văn Ngọc",
        price: 90000, oldPrice: 130000, condition: 93,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC003.webp",
        description: "Cuốn sách cung cấp kiến thức về tiền tệ, hoạt động ngân hàng và thị trường tài chính trong nền kinh tế.",
        views: 0, purchases: 0
    },
    {
        id: "TC004", name: "TC004",
        title: "Giáo trình Kế toán tài chính",
        group: "Tài chính", type: "Giáo trình",
        author: "",
        price: 75000, oldPrice: 105000, condition: 88,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC004.jpg",
        description: "Giáo trình giới thiệu các nguyên tắc và nghiệp vụ kế toán tài chính, phục vụ việc ghi nhận và trình bày thông tin tài chính.",
        views: 0, purchases: 0
    },
    {
        id: "TC005", name: "TC005",
        title: "Báo cáo tài chính (Financial Statements)",
        group: "Tài chính", type: "Sách chuyên ngành",
        author: "Thomas R. Ittelson",
        price: 100000, oldPrice: 145000, condition: 95,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC005.jpg",
        description: "Cuốn sách hỗ trợ người đọc tìm hiểu cách đọc và hiểu các báo cáo tài chính cơ bản của doanh nghiệp.",
        views: 0, purchases: 0
    },
    {
        id: "TC006", name: "TC006",
        title: "The Finance Book: Tài chính doanh nghiệp",
        group: "Tài chính", type: "Sách tham khảo",
        author: "Stuart Warner, Si Hussain",
        price: 110000, oldPrice: 155000, condition: 97,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC006.png",
        description: "Cuốn sách giới thiệu các khái niệm và nội dung cơ bản về tài chính doanh nghiệp theo cách trình bày trực quan.",
        views: 0, purchases: 0
    },
    {
        id: "TC007", name: "TC007",
        title: "Lý thuyết tài chính tiền tệ",
        group: "Tài chính", type: "Giáo trình",
        author: "Lê Văn Tề",
        price: 75000, oldPrice: 105000, condition: 85,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC007.webp",
        description: "Tài liệu trình bày những kiến thức lý luận về tài chính, tiền tệ và các vấn đề liên quan trong nền kinh tế.",
        views: 0, purchases: 0
    },
    {
        id: "TC008", name: "TC008",
        title: "Tài chính toàn diện trong bối cảnh Cách mạng công nghiệp 4.0",
        group: "Tài chính", type: "Sách chuyên ngành",
        author: "",
        price: 90000, oldPrice: 130000, condition: 92,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC008.webp",
        description: "Cuốn sách đề cập đến tài chính toàn diện và những vấn đề đặt ra trong bối cảnh phát triển công nghệ của cuộc Cách mạng công nghiệp 4.0.",
        views: 0, purchases: 0
    },
    {
        id: "TC009", name: "TC009",
        title: "Tài chính căn bản",
        group: "Tài chính", type: "Giáo trình",
        author: "Pamela Peterson Drake, Frank J. Fabozzi",
        price: 105000, oldPrice: 150000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC009.jpg",
        description: "Tài liệu giới thiệu những kiến thức nền tảng về tài chính, hỗ trợ người học tiếp cận các khái niệm và quyết định tài chính.",
        views: 0, purchases: 0
    },
    {
        id: "TC010", name: "TC010",
        title: "Unlock It: Mở khóa tài chính, làm giàu doanh nghiệp",
        group: "Tài chính", type: "Sách tham khảo",
        author: "Dan Lok",
        price: 95000, oldPrice: 135000, condition: 96,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC010.png",
        description: "Cuốn sách chia sẻ góc nhìn về tài chính và tư duy phát triển hoạt động kinh doanh.",
        views: 0, purchases: 0
    },
    {
        id: "TC011", name: "TC011",
        title: "Tài chính cá nhân",
        group: "Tài chính", type: "Sách tham khảo",
        author: "",
        price: 65000, oldPrice: 95000, condition: 90,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC011.jpg",
        description: "Cuốn sách giới thiệu những kiến thức cơ bản về quản lý tài chính cá nhân và các vấn đề liên quan đến chi tiêu, tiết kiệm.",
        views: 0, purchases: 0
    },
    {
        id: "TC012", name: "TC012",
        title: "Lý thuyết trò chơi tài chính",
        group: "Tài chính", type: "Sách chuyên ngành",
        author: "Dan McCrum",
        price: 100000, oldPrice: 145000, condition: 94,
        status: "Đang bán",
        image: "../assets/images/books/tai-chinh/TC012.png",
        description: "Cuốn sách khai thác góc nhìn lý thuyết trò chơi trong lĩnh vực tài chính và các quyết định có tính chiến lược.",
        views: 0, purchases: 0
    }
];

