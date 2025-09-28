const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// Lấy thông tin user hiện tại
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json({
    success: true,
    user
  });
});

// Cập nhật thông tin user
const updateUserProfile = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, mobile, address, city, state, zipcode } = req.body;
  
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Kiểm tra email trùng lặp (nếu thay đổi email)
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('Email đã được sử dụng bởi tài khoản khác');
    }
  }

  // Cập nhật thông tin
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      firstname: firstname || user.firstname,
      lastname: lastname || user.lastname,
      email: email || user.email,
      mobile: mobile || user.mobile,
      address: address || user.address,
      city: city || user.city,
      state: state || user.state,
      zipcode: zipcode || user.zipcode
    },
    { new: true, runValidators: true }
  ).select('-password');

  res.status(200).json({
    success: true,
    message: 'Cập nhật thông tin thành công',
    user: updatedUser
  });
});

// Đổi mật khẩu
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Kiểm tra mật khẩu hiện tại
  const isPasswordMatch = await user.isPasswordMatched(currentPassword);
  if (!isPasswordMatch) {
    res.status(400);
    throw new Error('Mật khẩu hiện tại không đúng');
  }

  // Cập nhật mật khẩu mới
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Đổi mật khẩu thành công'
  });
});

// Upload avatar
const uploadAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Cập nhật avatar
  user.avatar = req.file.path;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Cập nhật avatar thành công',
    avatar: user.avatar
  });
});

module.exports = {
  getCurrentUser,
  updateUserProfile,
  changePassword,
  uploadAvatar
};






