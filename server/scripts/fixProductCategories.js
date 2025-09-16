const mongoose = require("mongoose");
const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");

const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce";

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // Load categories
    const categories = await ProductCategory.find();
    const categoryMap = {};
    categories.forEach((c) => {
      categoryMap[c.slug] = c._id;
    });
    console.log("📂 Category map:", categoryMap);

    const products = await Product.find();
    console.log(`👉 Tổng số sản phẩm: ${products.length}`);

    for (const p of products) {
      if (!p.category) {
        const title = p.title.toLowerCase();
        let matched = null;

        if (
          title.includes("iphone") ||
          title.includes("samsung") ||
          title.includes("vivo") ||
          title.includes("xiaomi") ||
          title.includes("google pixel") ||
          title.includes("sony xperia") ||
          title.includes("htc") ||
          title.includes("lg g5")
        ) {
          matched = "smartphone";
        } else if (
          title.includes("laptop") ||
          title.includes("notebook") ||
          title.includes("macbook") ||
          title.includes("dell") ||
          title.includes("lenovo") ||
          title.includes("hp ") ||
          title.includes("acer") ||
          title.includes("asus rog")
        ) {
          matched = "laptop";
        } else if (
          title.includes("ipad") ||
          title.includes("tablet") ||
          title.includes("zenpad") ||
          title.includes("galaxy tab") ||
          title.includes("g pad") ||
          title.includes("mediapad")
        ) {
          matched = "tablet";
        } else if (title.includes("camera") || title.includes("gear 360")) {
          matched = "camera";
        } else if (title.includes("printer")) {
          matched = "printer";
        } else if (
          title.includes("speaker") ||
          title.includes("beats") ||
          title.includes("jbl")
        ) {
          matched = "speaker";
        } else if (
          title.includes("keyboard") ||
          title.includes("sandisk") ||
          title.includes("logitech") ||
          title.includes("usb")
        ) {
          matched = "accessories";
        } else if (
          title.includes("watch") ||
          title.includes("gear") ||
          title.includes("apple watch")
        ) {
          matched = "accessories"; // Hoặc tạo riêng "wearables" nếu bạn muốn
        } else if (title.includes("tv")) {
          matched = "television";
        }

        if (matched && categoryMap[matched]) {
          p.category = categoryMap[matched];
          await p.save();
          console.log(`✅ Updated: ${p.title} → ${matched}`);
        } else {
          console.warn(`⚠️ Chưa xác định được category cho: ${p.title}`);
        }
      }
    }

    console.log("🎉 Done fixing product categories!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
