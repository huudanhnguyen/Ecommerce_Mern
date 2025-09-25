const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ctrls = require('../controllers/slider');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/sliders/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'slider-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Public routes
router.get('/', ctrls.getSliders);
router.get('/:id', ctrls.getSliderById);

// Admin routes
router.post('/', [verifyToken, isAdmin, upload.single('image')], ctrls.createSlider);
router.put('/:id', [verifyToken, isAdmin, upload.single('image')], ctrls.updateSlider);
router.delete('/:id', [verifyToken, isAdmin], ctrls.deleteSlider);
router.put('/:id/toggle', [verifyToken, isAdmin], ctrls.toggleSliderStatus);
router.put('/positions/update', [verifyToken, isAdmin], ctrls.updatePositions);

module.exports = router;
