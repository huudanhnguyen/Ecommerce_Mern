const router = require('express').Router();
const ctrls = require('../controllers/blog');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');
const uploadCloud = require('../config/cloudinary.config');

// Upload ảnh cho blog
router.put('/uploadImage/:id', [verifyToken, isAdmin], uploadCloud.array('images', 10), ctrls.uploadImageBlog);

// Tạo blog (chỉ admin)
router.post('/', [verifyToken, isAdmin], uploadCloud.array('images', 10), ctrls.createBlog);

// Lấy danh sách blog (ai cũng xem được, không cần login)
router.get('/', ctrls.getBlogs);

// Like / Dislike blog (phải login)
router.put('/like/:id', verifyToken, ctrls.likeBlog);
router.put('/dislike/:id', verifyToken, ctrls.dislikeBlog);

// Lấy chi tiết blog (ai cũng xem được, login thì kèm trạng thái like/dislike)
router.get('/:id', ctrls.getBlogById);

// Update blog (admin)
router.put('/:bid', [verifyToken, isAdmin], uploadCloud.array('images', 10), ctrls.updateBlog);

// Xoá blog (admin)
router.delete('/:id', [verifyToken, isAdmin], ctrls.deleteBlog);

module.exports = router;
