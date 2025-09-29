const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// 📌 Lấy thông tin user hiện tại
const getCurrentUser = asyncHandler(async (req, res) => {

  if (!req.user?._id) {
    res.status(401);
    throw new Error('Unauthorized, user not found in token');
  }

  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// 📌 Cập nhật thông tin user
const updateUserProfile = asyncHandler(async (req, res) => {

  const { firstname, lastname, email, mobile, address, city, state, zipcode } = req.body;

  if (!req.user?._id) {
    res.status(401);
    throw new Error('Unauthorized, user not found in token');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Kiểm tra email trùng (nếu thay đổi email)
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('Email đã được sử dụng bởi tài khoản khác');
    }
  }

  // Cập nhật
  user.firstname = firstname || user.firstname;
  user.lastname = lastname || user.lastname;
  user.email = email || user.email;
  user.mobile = mobile || user.mobile;
  user.address = address || user.address;
  user.city = city || user.city;
  user.state = state || user.state;
  user.zipcode = zipcode || user.zipcode;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    message: 'Cập nhật thông tin thành công',
    user: {
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      address: updatedUser.address,
      city: updatedUser.city,
      state: updatedUser.state,
      zipcode: updatedUser.zipcode,
      avatar: updatedUser.avatar,
    },
  });
});

// 📌 Đổi mật khẩu
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return res.status(400).json({ success: false, message: 'Mật khẩu cũ không đúng' });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ success: true, message: 'Đổi mật khẩu thành công' });
};

// 📌 Upload avatar
const uploadAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!req.file?.path) {
    res.status(400);
    throw new Error('Không có file nào được tải lên');
  }

  user.avatar = req.file.path; // link từ Cloudinary
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
  uploadAvatar,
};
