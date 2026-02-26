
export type Language = 'vi' | 'en';

export const translations = {
  vi: {
    nav: {
      services: "Dịch vụ",
      demo: "Trải nghiệm",
      howItWorks: "Cách hoạt động",
      login: "Đăng nhập",
    },
    hero: {
      tag: "✨ Dịch vụ cứu hộ xe máy số 1 Việt Nam",
      title1: "Sửa xe mọi lúc,",
      title2: "An tâm mọi nơi",
      desc: "Gặp sự cố trên đường? Đừng lo lắng. Fixee kết nối bạn với những thợ sửa xe uy tín nhất gần bạn chỉ trong tích tắc.",
      cta: "Tìm thợ ngay",
      stats: "người dùng tin cậy",
      found: "Đã tìm thấy thợ!",
      coming: "Thợ sửa xe đang đến vị trí của bạn",
      time: "15 Phút",
      avgTime: "Thời gian đến trung bình",
    },
    services: {
      title: "Dịch vụ đa dạng",
      subtitle: "Fixee cung cấp đầy đủ các dịch vụ cứu hộ và sửa chữa xe máy, đáp ứng mọi nhu cầu khẩn cấp của bạn.",
      items: [
        { name: 'Vá lốp', desc: 'Hỗ trợ vá lốp tận nơi nhanh chóng' },
        { name: 'Chết máy', desc: 'Xử lý sự cố chết máy, kích nổ' },
        { name: 'Hết xăng', desc: 'Giao xăng tận nơi 24/7' },
        { name: 'Thay ắc quy', desc: 'Thay thế ắc quy chính hãng' },
        { name: 'Kéo xe', desc: 'Dịch vụ cứu hộ, kéo xe về gara' },
        { name: 'Kiểm tra', desc: 'Kiểm tra tổng quát tình trạng xe' },
      ]
    },
    demo: {
      tag: "🚀 Trải nghiệm ngay",
      title1: "Đơn giản như",
      title2: "một lần chạm",
      desc: "Hãy thử tương tác với điện thoại mô phỏng bên cạnh. Chỉ cần nhấn nút \"Tìm quanh đây\", Fixee sẽ ngay lập tức quét và hiển thị các thợ sửa xe gần nhất trên bản đồ thời gian thực.",
      features: [
        'Định vị chính xác vị trí của bạn',
        'Xem thông tin và đánh giá của thợ',
        'Biết trước giá cả và thời gian đến',
        'Theo dõi lộ trình di chuyển của thợ'
      ],
      phone: {
        needMechanic: "Cần thợ gấp?",
        findMechanic: "Tìm thợ sửa xe gần nhất chỉ với một chạm",
        searchBtn: "Tìm quanh đây",
        searching: "Đang tìm thợ gần bạn...",
        call: "Gọi",
      }
    },
    process: {
      tag: "Quy trình",
      title: "Hoạt động như thế nào?",
      subtitle: "Giải quyết sự cố xe máy của bạn chỉ trong 4 bước đơn giản",
      steps: [
        { title: 'Gặp sự cố', desc: 'Xe hỏng hóc giữa đường hoặc tại nhà? Đừng lo lắng.' },
        { title: 'Đặt dịch vụ', desc: 'Mở app Fixee và xác nhận vị trí cần cứu hộ.' },
        { title: 'Thợ đến ngay', desc: 'Đối tác Fixee gần nhất sẽ di chuyển đến bạn.' },
        { title: 'Thanh toán', desc: 'Sửa xong mới trả tiền. Hỗ trợ tiền mặt & chuyển khoản.' },
      ]
    },
    cta: {
      title: "Sẵn sàng trải nghiệm?",
      desc: "Tải ứng dụng Fixee ngay hôm nay để nhận ưu đãi đặc biệt cho lần sử dụng dịch vụ đầu tiên!",
      login: "Đăng nhập ngay",
      download: "Tải ứng dụng",
    },
    footer: {
      desc: "Ứng dụng kết nối thợ sửa xe và người dùng hàng đầu Việt Nam. Nhanh chóng, tiện lợi, minh bạch.",
      about: "Về Fixee",
      services: "Dịch vụ",
      contact: "Liên hệ",
      links: {
        intro: "Giới thiệu",
        careers: "Tuyển dụng",
        terms: "Điều khoản",
        privacy: "Bảo mật",
        rescue: "Cứu hộ xe máy",
        maintenance: "Bảo dưỡng định kỳ",
        consult: "Tư vấn kỹ thuật",
        pricing: "Bảng giá",
      },
      address: "Địa chỉ",
      rights: "© 2024 Fixee. All rights reserved.",
    },
    auth: {
      welcome: "Fixee xin chào! 👋",
      loginSubtitle: "Đăng nhập để tiếp tục trải nghiệm",
      emailPlaceholder: "Địa chỉ Email",
      passwordPlaceholder: "Mật khẩu",
      forgotPassword: "Quên mật khẩu?",
      loginButton: "Đăng nhập",
      noAccount: "Chưa có tài khoản?",
      registerNow: "Đăng ký ngay",
      orLoginWith: "Hoặc đăng nhập với",
      terms: "Bằng việc tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật",
    }
  },
  en: {
    nav: {
      services: "Services",
      demo: "Demo",
      howItWorks: "How it works",
      login: "Log in",
    },
    hero: {
      tag: "✨ #1 Motorbike Rescue Service in Vietnam",
      title1: "Repair anytime,",
      title2: "Peace of mind anywhere",
      desc: "Having trouble on the road? Don't worry. Fixee connects you with the most reputable mechanics near you in seconds.",
      cta: "Find a mechanic",
      stats: "trusted users",
      found: "Mechanic found!",
      coming: "Mechanic is coming to your location",
      time: "15 Mins",
      avgTime: "Average arrival time",
    },
    services: {
      title: "Our Services",
      subtitle: "Fixee provides a full range of motorbike rescue and repair services, meeting all your emergency needs.",
      items: [
        { name: 'Tire Repair', desc: 'Quick on-site tire repair support' },
        { name: 'Engine Stalling', desc: 'Handle stalling incidents, jump start' },
        { name: 'Out of Gas', desc: 'Gas delivery 24/7' },
        { name: 'Battery Replacement', desc: 'Genuine battery replacement' },
        { name: 'Towing', desc: 'Rescue service, towing to garage' },
        { name: 'Checkup', desc: 'General vehicle condition check' },
      ]
    },
    demo: {
      tag: "🚀 Try it now",
      title1: "Simple as",
      title2: "one touch",
      desc: "Try interacting with the simulated phone. Just press the \"Find Nearby\" button, Fixee will immediately scan and display the nearest mechanics on the real-time map.",
      features: [
        'Accurately locate your position',
        'View mechanic info and ratings',
        'Know price and arrival time in advance',
        'Track mechanic\'s route'
      ],
      phone: {
        needMechanic: "Need help?",
        findMechanic: "Find nearest mechanic with one touch",
        searchBtn: "Find Nearby",
        searching: "Finding mechanic nearby...",
        call: "Call",
      }
    },
    process: {
      tag: "Process",
      title: "How it works?",
      subtitle: "Solve your motorbike problems in just 4 simple steps",
      steps: [
        { title: 'Trouble', desc: 'Bike breakdown on the road or at home? Don\'t worry.' },
        { title: 'Book Service', desc: 'Open Fixee app and confirm your location.' },
        { title: 'Mechanic Arrives', desc: 'Nearest Fixee partner will come to you.' },
        { title: 'Payment', desc: 'Pay after repair. Cash & transfer supported.' },
      ]
    },
    cta: {
      title: "Ready to experience?",
      desc: "Download Fixee app today to get a special offer for your first service use!",
      login: "Log in now",
      download: "Download App",
    },
    footer: {
      desc: "Top motorbike mechanic connecting app in Vietnam. Fast, convenient, transparent.",
      about: "About Fixee",
      services: "Services",
      contact: "Contact",
      links: {
        intro: "Introduction",
        careers: "Careers",
        terms: "Terms",
        privacy: "Privacy",
        rescue: "Motorbike Rescue",
        maintenance: "Periodic Maintenance",
        consult: "Technical Consultation",
        pricing: "Pricing",
      },
      address: "Address",
      rights: "© 2024 Fixee. All rights reserved.",
    },
    auth: {
      welcome: "Hello from Fixee! 👋",
      loginSubtitle: "Log in to continue",
      emailPlaceholder: "Email Address",
      passwordPlaceholder: "Password",
      forgotPassword: "Forgot password?",
      loginButton: "Log in",
      noAccount: "No account?",
      registerNow: "Sign up now",
      orLoginWith: "Or log in with",
      terms: "By continuing, you agree to our Terms & Privacy Policy",
    }
  }
};
