const express = require('express');
const router = express.Router();
const { getCurrentUser, updateUserProfile, changePassword, uploadAvatar } = require('../controllers/userProfile');
const { verifyToken } = require('../middlewares/verifyToken');
const upload = require('../config/cloudinary.config');

// Lấy thông tin user hiện tại
router.get('/current', verifyToken, getCurrentUser);

// Cập nhật thông tin user
router.put('/update-profile', verifyToken, updateUserProfile);

// Đổi mật khẩu
router.put('/change-password', verifyToken, changePassword);

// Upload avatar
router.post('/upload-avatar', verifyToken, upload.single('avatar'), uploadAvatar);

module.exports = router;






