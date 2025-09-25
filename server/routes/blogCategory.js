const router = require('express').Router();
const ctrls = require('../controllers/blogCategory');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

// Tạo blog category mới (admin only)
router.post('/', [verifyToken, isAdmin], ctrls.createBlogCategory);

// Lấy tất cả blog categories (public)
router.get('/', ctrls.getBlogCategories);

// Lấy blog category theo ID (public)
router.get('/:id', ctrls.getBlogCategoryById);

// Cập nhật blog category (admin only)
router.put('/:id', [verifyToken, isAdmin], ctrls.updateBlogCategory);

// Xóa blog category (admin only)
router.delete('/:id', [verifyToken, isAdmin], ctrls.deleteBlogCategory);

module.exports = router;
