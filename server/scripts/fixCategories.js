const mongoose = require("mongoose");
const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");

async function fixCategories() {
  try {
    // 1. Kết nối MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // 2. Lấy toàn bộ category
    const categories = await ProductCategory.find();
    const categoryMap = {};

    categories.forEach((cat) => {
      // map theo title (chuyển về lowercase để dễ so khớp)
      categoryMap[cat.title.toLowerCase()] = cat._id;
      // map theo slug (nếu có slug)
      if (cat.slug) {
        categoryMap[cat.slug.toLowerCase()] = cat._id;
      }
    });

    console.log("📂 Category map:", categoryMap);

    // 3. Lấy toàn bộ products
    const products = await Product.find();

    for (const product of products) {
      if (typeof product.category === "string") {
        const key = product.category.toLowerCase();
        const newCategoryId = categoryMap[key];

        if (newCategoryId) {
          console.log(
            `🔄 Updating product "${product.title}" (${product._id}): ${product.category} -> ${newCategoryId}`
          );
          product.category = newCategoryId;
          await product.save();
        } else {
          console.log(
            `⚠ Không tìm thấy category cho "${product.title}" (${product.category})`
          );
        }
      }
    }

    console.log("🎉 Done fixing categories!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

fixCategories();
