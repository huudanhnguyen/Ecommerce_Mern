// seedRatings.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";

// Bình luận theo nhóm
const negativeComments = [
  "Very disappointed, poor quality.",
  "Not worth the money.",
  "It broke after a few days.",
  "The product did not match the description.",
  "Terrible experience, would not recommend.",
  "Cheaply made, not durable.",
  "I regret buying this product.",
];

const neutralComments = [
  "It's okay, nothing special.",
  "Average quality, acceptable for the price.",
  "Not great but not terrible either.",
  "Just works as expected.",
  "So-so, could be better.",
];

const positiveComments = [
  "Great product, really happy with my purchase!",
  "The quality is better than I expected.",
  "Fast delivery and good packaging.",
  "Excellent value for money.",
  "I will definitely buy again!",
  "The design is very stylish and modern.",
  "It works perfectly, highly recommended!",
  "Five stars for this amazing product!",
  "Exceeded my expectations!",
  "Very useful in daily life.",
  "I would recommend this to my family and friends."
];

// Tên người dùng mẫu
const sampleNames = [
  "John", "Emily", "Michael", "Sarah", "David", "Jessica", 
  "Daniel", "Sophia", "James", "Olivia", "Chris", "Emma",
  "William", "Mia", "Ethan", "Charlotte", "Benjamin", "Amelia"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomStar = () => Math.floor(Math.random() * 5) + 1;

const getCommentByStar = (star) => {
  if (star <= 2) return getRandom(negativeComments);
  if (star === 3) return getRandom(neutralComments);
  return getRandom(positiveComments); // 4–5
};

const seedRatings = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to DB");

    const products = await Product.find();
    console.log(`Found ${products.length} products.`);

    for (const product of products) {
      // Xóa đánh giá cũ
      product.ratings = [];

      const numRatings = Math.floor(Math.random() * 11) + 10; // 10–20 đánh giá
      for (let i = 0; i < numRatings; i++) {
        const star = getRandomStar();
        product.ratings.push({
          star,
          comment: getCommentByStar(star),
          name: getRandom(sampleNames),
          postedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
        });
      }

      // Tính lại tổng rating trung bình
      const ratingsCount = product.ratings.length;
      const sumRatings = product.ratings.reduce((sum, r) => sum + r.star, 0);
      product.totalRating = Math.round((sumRatings / ratingsCount) * 10) / 10;

      await product.save();
      console.log(`🌟 Added ${numRatings} ratings for: ${product.title}`);
    }

    console.log("✅ Random ratings seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding ratings:", error);
    process.exit(1);
  }
};

seedRatings();
