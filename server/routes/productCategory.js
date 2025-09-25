const router = require('express').Router();
const ctrls = require('../controllers/productCategory');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

// Tạo product category mới (admin only)
router.post('/', [verifyToken, isAdmin], ctrls.createProductCategory);

// Lấy tất cả product categories (public)
router.get('/', ctrls.getProductCategories);

// Lấy product category theo ID (public)
router.get('/:id', ctrls.getProductCategoryById);

// Cập nhật product category (admin only)
router.put('/:id', [verifyToken, isAdmin], ctrls.updateProductCategory);

// Xóa product category (admin only)
router.delete('/:id', [verifyToken, isAdmin], ctrls.deleteProductCategory);

module.exports = router;
