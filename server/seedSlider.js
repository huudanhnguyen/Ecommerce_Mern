const mongoose = require('mongoose');
const Slider = require('./models/slider'); // nhớ sửa đường dẫn cho đúng

const MONGODB_URI = "mongodb+srv://huudanh:2366huudanh@ecommerce.siwzg4c.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB Connected');

  const sliders = [
    {
      title: "Khuyến mãi mùa hè",
      description: "Giảm giá lên đến 50% cho tất cả sản phẩm.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
      public_id: "banner1_abc123",
      link: "/san-pham",
      buttonText: "Mua ngay",
      position: 1,
      isActive: true,
      type: "banner",
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
    },
    {
      title: "Sản phẩm mới ra mắt",
      description: "Khám phá bộ sưu tập mới nhất của chúng tôi.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200",
      public_id: "banner2_def456",
      link: "/bo-suu-tap",
      buttonText: "Khám phá",
      position: 2,
      isActive: true,
      type: "slider",
      startDate: new Date(),
    },
    {
      title: "Quảng cáo đặc biệt",
      description: "Đặt quảng cáo của bạn tại đây để tiếp cận nhiều khách hàng hơn.",
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200",
      public_id: "banner3_xyz789",
      link: "https://quangcao.example.com",
      buttonText: "Liên hệ",
      position: 3,
      isActive: false,
      type: "advertisement",
      startDate: new Date(),
    }
  ];

  await Slider.insertMany(sliders);
  console.log("✅ Dữ liệu mẫu đã được thêm vào DB");

  mongoose.connection.close();
})
.catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));
