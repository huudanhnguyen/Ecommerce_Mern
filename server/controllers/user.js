// server/controllers/user.js
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { generateToken, generateRefreshToken } = require("../middlewares/jwt");
const crypto = require("crypto"); // For generating secure tokens
const sendEmail = require("../ultils/sendMail"); // Import hàm gửi email
const makeToken = require("uniqid");
const cloudinary = require("cloudinary").v2;

// server/controllers/user.js

const register = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, mobile } = req.body;

  if (!firstname || !lastname || !email || !password || !mobile) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Map old field names to new ones
  const firstName = firstname;
  const lastName = lastname;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "Email has already been registered",
    });
  }

  const token = makeToken();
  res.cookie(
    "dataRegister",
    { ...req.body, token },
    { httpOnly: true, maxAge: 15 * 60 * 1000 }
  );

  const html = `<p>Click <a href='${process.env.CLIENT_URL}/api/user/finalRegister/${token}'>here</a> to register your account. This link will expire in 15 minutes.</p>`;

  await sendEmail({ email, html, subject: "successful to register" });

  return res.json({
    success: true,
    message: "Please check your email to activate your account.",
  });
});

const finalRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;
  if (!cookie || cookie?.dataRegister?.token != token)
    return res.redirect(`${process.env.CLIENT_URL}/finalRegister/failed`);
  const newUser = await User.create({
    email: cookie?.dataRegister?.email,
    password: cookie?.dataRegister?.password,
    mobile: cookie?.dataRegister?.mobile,
    firstName: cookie?.dataRegister?.firstname,
    lastName: cookie?.dataRegister?.lastname,
    firstname: cookie?.dataRegister?.firstname, // Keep for backward compatibility
    lastname: cookie?.dataRegister?.lastname, // Keep for backward compatibility
  });
  if (newUser)
    return res.redirect(`${process.env.CLIENT_URL}/finalRegister/success`);
  else return res.redirect(`${process.env.CLIENT_URL}/finalRegister/failed`);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        mobile: user.mobile,
        token: token,
        role: user.role,
      },
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  console.log("USER INFO FROM TOKEN:", req.user);
  const userID = req.user;
  const user = await User.findById(userID).select(
    "-password -refreshToken -role"
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) throw new Error("No refresh token in cookies");

  jwt.verify(
    cookies.refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired refresh token.",
        });
      }

      const user = await User.findById(decode.id);

      if (!user) {
        res.clearCookie("refreshToken", { httpOnly: true, secure: true });
        return res.status(401).json({
          success: false,
          message: "User for this token no longer exists.",
        });
      }

      const newAccessToken = generateToken(user);

      return res.status(200).json({
        success: true,
        newAccessToken: newAccessToken,
      });
    }
  );
});

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res
      .status(204)
      .json({ success: true, message: "No refresh token in cookies" });
  }

  res.clearCookie("refreshToken", { httpOnly: true, secure: true });

  await User.findOneAndUpdate(
    { refreshToken: cookies.refreshToken },
    { refreshToken: null }
  );

  return res.status(200).json({ success: true, message: "Logout successful" });
});

// FORGOT PASSWORD
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({
      success: true,
      message:
        "If an account with this email exists, a password reset link has been sent.",
    });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  const html = `<p>Click <a href='${resetLink}'>here</a> to reset your password. This link will expire in 10 minutes.</p>`;

  const emailSent = await sendEmail({
    email,
    html,
    subject: "Forgot Password",
  });

  if (emailSent) {
    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } else {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
});

// RESET PASSWORD
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  if (!password || !token) {
    return res.status(400).json({ success: false, message: "Missing inputs" });
  }

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired reset token",
    });
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return res.json({
    success: true,
    message: "Password has been reset successfully.",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken -role");
  if (!users) {
    return res.status(404).json({
      success: false,
      message: "No users found",
    });
  }
  return res.status(200).json({
    success: true,
    users,
  });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, mobile } = req.body;

  if (!id || !firstname || !lastname || !email || !mobile) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { firstname, lastname, email, mobile },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: updatedUser,
  });
});
const updateUserbyAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, mobile, role } = req.body;

  if (!id || !firstname || !lastname || !email || !mobile || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { firstname, lastname, email, mobile, role },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: updatedUser,
  });
});

// ======================= CART =======================

// Helper to populate and return cart
const getPopulatedCartForUser = async (userId) => {
  const userPop = await User.findById(userId).populate(
    "cart.productId",
    "title price thumb"
  );
  return userPop.cart;
};

// Lấy giỏ hàng
const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const cart = await getPopulatedCartForUser(req.user._id);

  res.json({
    success: true,
    cart,
  });
});

// Thêm vào giỏ hàng
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, variants = {} } = req.body;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({ success: false, msg: "Missing productId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const existingItem = user.cart.find(
      (item) =>
        item.productId.toString() === productId &&
        JSON.stringify(item.variants || {}) === JSON.stringify(variants || {})
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity, variants });
    }

    await user.save();

    // ✅ Luôn populate đầy đủ field trước khi trả về
    const populatedCart = await getPopulatedCartForUser(userId);

    return res.json({
      success: true,
      cart: populatedCart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Controller removeFromCart
const removeFromCart = async (req, res) => {
  try {
    const { productId, variants = {} } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "thiếu productId" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let newCart;
    if (Object.keys(variants).length === 0) {
      newCart = user.cart.filter(
        (item) => item.productId.toString() !== productId.toString()
      );
    } else {
      newCart = user.cart.filter(
        (item) =>
          item.productId.toString() !== productId.toString() ||
          JSON.stringify(item.variants || {}) !== JSON.stringify(variants)
      );
    }

    user.cart = newCart;
    await user.save();

    const populatedCart = await getPopulatedCartForUser(req.user._id);

    return res.json({ success: true, cart: populatedCart });
  } catch (err) {
    console.error("❌ Remove cart error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Cập nhật số lượng
const updateCart = asyncHandler(async (req, res) => {
  const { productId, variants = {}, quantity } = req.body;

  if (!productId || !Number.isFinite(Number(quantity))) {
    return res
      .status(400)
      .json({
        success: false,
        message: "productId and numeric quantity are required",
      });
  }

  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const itemIndex = user.cart.findIndex(
    (it) =>
      it.productId.toString() === productId &&
      JSON.stringify(it.variants || {}) === JSON.stringify(variants || {})
  );

  if (itemIndex === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Cart item not found" });
  }

  const qty = Number(quantity);

  if (qty <= 0) {
    // xóa item
    user.cart.splice(itemIndex, 1);
  } else {
    user.cart[itemIndex].quantity = qty;
  }

  await user.save();

  const populatedCart = await getPopulatedCartForUser(req.user._id);

  res.json({ success: true, cart: populatedCart });
});

// ======================= WISHLIST =======================
// Toggle: thêm hoặc xóa wishlist
const toggleWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // kiểm tra có product chưa
  const index = user.wishlist.findIndex(
    (p) => p.toString() === productId.toString()
  );

  if (index > -1) {
    // đã tồn tại -> xóa
    user.wishlist.splice(index, 1);
  } else {
    // chưa có -> thêm
    user.wishlist.push(productId);
  }

  await user.save();

  // populate lại sau khi save
  const updatedUser = await User.findById(userId).populate(
    "wishlist",
    "title price thumb slug"
  );

  res.json({ success: true, wishlist: updatedUser.wishlist });
});

// Lấy wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "wishlist",
    "title price thumb slug"
  );

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, wishlist: user.wishlist });
});

// Xóa hẳn 1 product khỏi wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { wishlist: productId } },
    { new: true }
  ).populate("wishlist", "title price thumb slug");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, wishlist: user.wishlist });
});

// ================== ADMIN USER MANAGEMENT ==================

// Lấy tất cả users (admin only)
const getAllUsersAdmin = asyncHandler(async (req, res) => {
  try {
    const queries = { ...req.query };
    let query = {};

    // Role filter
    if (queries.role) {
      query.role = queries.role;
    }

    // Search filter
    if (queries.search) {
      query.$or = [
        { firstName: { $regex: queries.search, $options: "i" } },
        { lastName: { $regex: queries.search, $options: "i" } },
        { email: { $regex: queries.search, $options: "i" } },
      ];
    }

    // Pagination
    const page = Number(queries.page) || 1;
    const limit = Number(queries.limit) || 10;
    const skip = (page - 1) * limit;

    // Sort
    let sort = { createdAt: -1 };
    if (queries.sort) {
      switch (queries.sort) {
        case "name-asc":
          sort = { firstName: 1 };
          break;
        case "name-desc":
          sort = { firstName: -1 };
          break;
        case "email-asc":
          sort = { email: 1 };
          break;
        case "email-desc":
          sort = { email: -1 };
          break;
        case "newest":
          sort = { createdAt: -1 };
          break;
        case "oldest":
          sort = { createdAt: 1 };
          break;
      }
    }

    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select("-password -refreshToken");

    // Map users to ensure firstName and lastName are available
    const mappedUsers = users.map(user => ({
      ...user.toObject(),
      firstName: user.firstName || user.firstname || "",
      lastName: user.lastName || user.lastname || "",
    }));

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    return res.json({
      success: true,
      users: mappedUsers,
      totalPages,
      currentPage: page,
      totalUsers,
    });
  } catch (error) {
    console.error("❌ Error in getAllUsersAdmin:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Lấy user theo ID (admin only)
const getUserByIdAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  const user = await User.findById(userId).select("-password -refreshToken");
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Map user to ensure firstName and lastName are available
  const mappedUser = {
    ...user.toObject(),
    firstName: user.firstName || user.firstname || "",
    lastName: user.lastName || user.lastname || "",
  };

  return res.json({
    success: true,
    userData: mappedUser,
  });
});

// Tạo user mới (admin only)
const createUserAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, mobile, role = "user", isBlocked = false } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      success: false,
      message: "First name, last name, and email are required",
    });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "Email has already been registered",
    });
  }

  // Generate random password
  const password = Math.random().toString(36).slice(-8);

  // Handle avatar upload
  let avatar = null;
  if (req.file) {
    avatar = req.file.path;
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    mobile: mobile || "",
    password,
    role,
    isBlocked,
    avatar,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      mobile: newUser.mobile,
      role: newUser.role,
      isBlocked: newUser.isBlocked,
    },
  });
});

// Cập nhật user (admin only)
const updateUserAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, mobile, role, isBlocked } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Check if email is being changed and if it already exists
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email, _id: { $ne: userId } });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email has already been registered",
      });
    }
  }

  // Handle avatar upload
  let avatar = user.avatar;
  if (req.file) {
    // Delete old avatar if exists
    if (user.avatar) {
      const publicId = user.avatar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }
    avatar = req.file.path;
  }

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      mobile: mobile !== undefined ? mobile : user.mobile,
      role: role || user.role,
      isBlocked: isBlocked !== undefined ? isBlocked : user.isBlocked,
      avatar,
    },
    { new: true }
  ).select("-password -refreshToken");

  return res.json({
    success: true,
    message: "User updated successfully",
    updatedUser,
  });
});

// Xóa user (admin only)
const deleteUserAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await User.findByIdAndDelete(userId);

  return res.json({
    success: true,
    message: "User deleted successfully",
  });
});

// Toggle block user (admin only)
const toggleBlockUserAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  return res.json({
    success: true,
    message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isBlocked: user.isBlocked,
    },
  });
});

module.exports = {
  register,
  login,
  getUserProfile,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserbyAdmin,
  finalRegister,
  addToCart,
  removeFromCart,
  toggleWishlist,
  getCart,
  updateCart,
  getWishlist,
  removeFromWishlist,
  // Admin user management
  getAllUsersAdmin,
  getUserByIdAdmin,
  createUserAdmin,
  updateUserAdmin,
  deleteUserAdmin,
  toggleBlockUserAdmin,
};
