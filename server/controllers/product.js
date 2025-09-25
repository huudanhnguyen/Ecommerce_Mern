const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      price,
      brand,
      category,
      inStock,
      isActive,
      description,
      infomations,
      variants,
      quantity,
    } = req.body;

    // ✅ Parse JSON an toàn
    let parsedInfomations = {};
    if (infomations) {
      try {
        parsedInfomations = JSON.parse(infomations);
      } catch (e) {
        console.error("❌ Parse infomations error:", e);
        parsedInfomations = {};
      }
    }

    let parsedVariants = [];
    if (variants) {
      try {
        parsedVariants = JSON.parse(variants);
      } catch (e) {
        console.error("❌ Parse variants error:", e);
        parsedVariants = [];
      }
    }

    // ✅ Cloudinary multer sẽ trả về link trực tiếp trong `path`
    let thumb = null;
    if (req.files && req.files.thumb && req.files.thumb.length > 0) {
      thumb = req.files.thumb[0].path;
    }

    let images = [];
    if (req.files && req.files.images && req.files.images.length > 0) {
      images = req.files.images.map((img) => img.path);
    }

    // ✅ Tạo product mới
    const newProduct = new Product({
      title: title || "",
      slug: slug || "",
      price: price ? Number(price) : 0,
      brand: brand || "",
      category: category || null,
      inStock: inStock === "true" || inStock === true,
      isActive: isActive === "true" || isActive === true,
      description: description || "",
      infomations: parsedInfomations,
      variants: parsedVariants,
      thumb,
      images,
      quantity: quantity ? Number(quantity) : 0,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "✅ Product created successfully!",
      product: newProduct,
    });
  } catch (err) {
    console.error("❌ Create Product Error:", err);
    return res.status(400).json({
      success: false,
      message: "❌ Failed to create product",
      error: err.message,
    });
  }
};



const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
//   console.log(`--- Searching for Product ID: "${pid}" ---`);
  const product = await Product.findById(pid).populate("category", "title _id");

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  return res.status(200).json({
    success: true,
    productData: product,
  });
});
const getAllProducts = async (req, res) => {
  try {
    const queries = { ...req.query };
    let query = {};

    // Category filter
    if (queries.category) {
      const foundCategory = await ProductCategory.findOne({
        slug: queries.category.toLowerCase(),
      });

      if (foundCategory) {
        query.category = foundCategory._id;
      } else {
        console.warn("⚠️ Không tìm thấy category:", queries.category);
      }
    }
     //Search theo title
    if (queries.title) {
      query.title = { $regex: queries.title, $options: "i" };
    }

    // Color / Size filter (map vào variants)
    if (queries.color) {
      query["variants.variants"] = { $in: queries.color.split(",") };
    }
    if (queries.size) {
      query["variants.variants"] = { $in: queries.size.split(",") };
    }

    // Price filter
    if (queries["price[gte]"] || queries["price[lte]"]) {
      query.price = {};
      if (queries["price[gte]"]) query.price.$gte = Number(queries["price[gte]"]);
      if (queries["price[lte]"]) query.price.$lte = Number(queries["price[lte]"]);
    }


    // Pagination
    const page = Number(queries.page) || 1;
    const limit = Number(queries.limit) || 8;
    const skip = (page - 1) * limit;

    // Sort
    let sort = {};
    if (queries.sort) {
      switch (queries.sort) {
        case "price-asc":
          sort.price = 1;
          break;
        case "price-desc":
          sort.price = -1;
          break;
        case "newest":
          sort.createdAt = -1;
          break;
        case "best-selling":
          sort.sold = -1;
          break;
      }
    }


    // Query MongoDB
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate("category", "title slug"); // ✅ populate thêm category

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);


    return res.json({
      success: true,
      products,
      totalPages,
    });
  } catch (error) {
    console.error("❌ Lỗi trong getAllProducts:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  try {
    if (req.body.category) {
      const foundCategory = await ProductCategory.findOne({
        title: req.body.category,
      });
      if (!foundCategory)
        throw new Error(`Product Category '${req.body.category}' not found.`);
      req.body.category = foundCategory._id;
    }
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }

    const product = await Product.findById(pid);
    if (!product) {
      if (req.files) {
        const publicIds = req.files.map((file) => file.filename);
        await cloudinary.api.delete_resources(publicIds);
      }
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.files && req.files.length > 0) {
      if (product.images && product.images.length > 0) {
        const oldImagePublicIds = product.images.map((img) => img.public_id);
        await cloudinary.api.delete_resources(oldImagePublicIds);
      }
      req.body.images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    await updatedProduct.populate("category", "title _id");

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    if (req.files && req.files.length > 0) {
      console.log(
        "An error occurred during product update. Cleaning up uploaded files..."
      );
      const publicIds = req.files.map((file) => file.filename);
      await cloudinary.api.delete_resources(publicIds);
      console.log("Cleanup successful.");
    }
    if (error.message.includes("not found")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    throw error;
  }
});
const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;  // lấy userId từ token
  const { star, comment, name, postedBy  } = req.body;
  const { pid } = req.params; // lấy productId từ params

  if (!star) {
    return res.status(400).json({ status: false, message: "Missing star rating" });
  }

  const product = await Product.findById(pid);
  if (!product) {
    return res.status(404).json({ status: false, message: "Product not found" });
  }

  // Kiểm tra người dùng đã từng đánh giá chưa
  const alreadyRated = product.ratings.find(
    (rating) => rating.postedBy && rating.postedBy.equals(_id)
  );

  if (alreadyRated) {
    // Cập nhật đánh giá cũ
    alreadyRated.star = star;
    alreadyRated.comment = comment !== undefined ? comment : alreadyRated.comment;
    alreadyRated.name = name !== undefined ? name : alreadyRated.name;
    alreadyRated.postedAt = new Date();
  } else {
    // Thêm mới đánh giá
    product.ratings.push({
      star,
      comment: comment || "",   // cho phép rỗng
      name: name || "",         // cho phép rỗng
      postedBy: _id,
      postedAt: new Date(),
    });
  }

  // Tính lại tổng rating trung bình
  const ratingsCount = product.ratings.length;
  const sumRatings = product.ratings.reduce((sum, r) => sum + r.star, 0);
  product.totalRating = Math.round((sumRatings / ratingsCount) * 10) / 10;

  await product.save();

  return res.status(200).json({
    status: true,
    message: "Rating submitted successfully",
    product,
  });
});


// Lấy danh sách ratings của một sản phẩm
const getProductRatings = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  const product = await Product.findById(pid)
    .populate("ratings.postedBy", "name email"); // populate để lấy thông tin user

  if (!product) {
    return res.status(404).json({ status: false, message: "Product not found" });
  }

  return res.status(200).json({
    status: true,
    ratings: product.ratings,
    totalRating: product.totalRating,
  });
});


const uploadImageProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files || req.files.length === 0) {
    throw new Error("No files uploaded");
  }
  const product = await Product.findById(pid);
  if (!product) {
    throw new Error("Product not found");
  }
  const newImages = req.files.map((file) => ({
    url: file.path,
    public_id: file.filename,
  }));
  // 5. Thêm các ảnh mới vào mảng images của sản phẩm
  //    Sử dụng $push và $each để thêm nhiều ảnh cùng lúc
  const updatedProduct = await Product.findByIdAndUpdate(
    pid,
    { $push: { images: { $each: newImages } } },
    { new: true } // Trả về document đã được cập nhật
  );
  return res.status(200).json({
    success: true,
    message: "Images uploaded and updated successfully",
    data: updatedProduct,
  });
});


module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  ratings,
  uploadImageProduct,
  getProductRatings,
};
