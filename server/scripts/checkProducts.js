const mongoose = require("mongoose");
const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");

const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce";

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // Lấy tất cả sản phẩm + populate category
    const products = await Product.find()
      .populate("category", "title slug")
      .lean();

    console.log(`👉 Tổng số sản phẩm: ${products.length}\n`);

    // Nhóm sản phẩm theo category
    const grouped = {};
    products.forEach((p) => {
      const catName = p.category?.slug || "❌ Chưa có category";
      if (!grouped[catName]) grouped[catName] = [];
      grouped[catName].push(p.title);
    });

    // In kết quả
    Object.entries(grouped).forEach(([cat, items]) => {
      console.log(`📂 ${cat} (${items.length} sản phẩm)`);
      items.forEach((t) => console.log("   - " + t));
      console.log("");
    });

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
