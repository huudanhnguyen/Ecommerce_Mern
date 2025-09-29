// middlewares/verifyToken.js
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const verifyToken = asyncHandler(async (req, res, next) => {
  let token;

  // 📌 Kiểm tra header có Authorization không
  if (!req?.headers?.authorization?.startsWith('Bearer')) {
    console.log("❌ [verifyToken] Missing or invalid Authorization header:", req.headers?.authorization);
    res.status(401);
    throw new Error('There is no token attached to header');
  }

  token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(404);
      throw new Error("User not found for this token");
    }

    req.user = user; // gắn user vào request

    next();
  } catch (error) {
    console.error("❌ [verifyToken] Token error:", error.message);
    res.status(401);
    throw new Error('Not Authorized, token expired or invalid');
  }
});

// 📌 Middleware 2: chỉ cho admin
const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("No user attached to request");
  }

  const { role } = req.user;

  if (role !== 'admin') {
    res.status(403); // Forbidden
    throw new Error('Not authorized as an admin');
  }

  next();
});

module.exports = { verifyToken, isAdmin };
