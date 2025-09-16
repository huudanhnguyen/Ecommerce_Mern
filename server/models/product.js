const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
      required: true,
    },
    infomations: {
      type: Map, // dùng Map để lưu key-value động
      of: String, // giá trị là chuỗi
      default: {},
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    variants: [
      {
        label: { type: String }, // ví dụ: "Color", "Size"
        variants: [{ type: String }], // ví dụ: ["Red", "Blue", "Black"]
      },
    ],
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    thumb: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    images: [
      {
        type: Array,
        default: [],
      },
    ],
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        postedAt: Date,
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("formattedPrice").get(function () {
  if (this.price == null) {
    return "";
  }
  // Sử dụng toLocaleString, một cách nhanh hơn của Intl.NumberFormat
  return this.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
});

module.exports = mongoose.model("Product", productSchema);
