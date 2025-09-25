const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary.config');
const Slider = require('../models/slider');

// Tạo slider mới
const createSlider = asyncHandler(async (req, res) => {
  const { title, description, link, buttonText, position, type, startDate, endDate } = req.body;
  
  if (!req.file) {
    res.status(400);
    throw new Error('Image is required');
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'sliders',
      resource_type: 'image'
    });

    const slider = await Slider.create({
      title,
      description,
      image: result.secure_url,
      public_id: result.public_id,
      link,
      buttonText,
      position: position || 0,
      type: type || 'banner',
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null
    });

    res.status(201).json({
      success: true,
      message: 'Slider created successfully',
      slider
    });
  } catch (error) {
    res.status(400);
    throw new Error('Failed to create slider: ' + error.message);
  }
});

// Lấy tất cả sliders
const getSliders = asyncHandler(async (req, res) => {
  const { type, isActive, page = 1, limit = 10 } = req.query;
  
  const query = {};
  if (type) query.type = type;
  if (isActive !== undefined) query.isActive = isActive === 'true';
  
  // Check if slider is still active based on dates
  query.$or = [
    { endDate: { $exists: false } },
    { endDate: null },
    { endDate: { $gte: new Date() } }
  ];

  const sliders = await Slider.find(query)
    .sort({ position: 1, createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Slider.countDocuments(query);

  res.status(200).json({
    success: true,
    sliders,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total
  });
});

// Lấy slider theo ID
const getSliderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const slider = await Slider.findById(id);
  
  if (!slider) {
    res.status(404);
    throw new Error('Slider not found');
  }
  
  res.status(200).json({
    success: true,
    slider
  });
});

// Cập nhật slider
const updateSlider = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, link, buttonText, position, isActive, type, startDate, endDate } = req.body;
  
  const slider = await Slider.findById(id);
  if (!slider) {
    res.status(404);
    throw new Error('Slider not found');
  }

  let updateData = {
    title: title || slider.title,
    description: description || slider.description,
    link: link || slider.link,
    buttonText: buttonText || slider.buttonText,
    position: position !== undefined ? position : slider.position,
    isActive: isActive !== undefined ? isActive : slider.isActive,
    type: type || slider.type,
    startDate: startDate ? new Date(startDate) : slider.startDate,
    endDate: endDate ? new Date(endDate) : slider.endDate
  };

  // If new image is uploaded
  if (req.file) {
    try {
      // Delete old image from Cloudinary
      if (slider.public_id) {
        await cloudinary.uploader.destroy(slider.public_id);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'sliders',
        resource_type: 'image'
      });

      updateData.image = result.secure_url;
      updateData.public_id = result.public_id;
    } catch (error) {
      res.status(400);
      throw new Error('Failed to upload image: ' + error.message);
    }
  }

  const updatedSlider = await Slider.findByIdAndUpdate(id, updateData, { new: true });
  
  res.status(200).json({
    success: true,
    message: 'Slider updated successfully',
    slider: updatedSlider
  });
});

// Xóa slider
const deleteSlider = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const slider = await Slider.findById(id);
  
  if (!slider) {
    res.status(404);
    throw new Error('Slider not found');
  }

  // Delete image from Cloudinary
  if (slider.public_id) {
    try {
      await cloudinary.uploader.destroy(slider.public_id);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
    }
  }

  await Slider.findByIdAndDelete(id);
  
  res.status(200).json({
    success: true,
    message: 'Slider deleted successfully',
    deletedSlider: slider
  });
});

// Toggle active status
const toggleSliderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const slider = await Slider.findById(id);
  
  if (!slider) {
    res.status(404);
    throw new Error('Slider not found');
  }

  slider.isActive = !slider.isActive;
  await slider.save();
  
  res.status(200).json({
    success: true,
    message: `Slider ${slider.isActive ? 'activated' : 'deactivated'} successfully`,
    slider
  });
});

// Update positions (for drag & drop)
const updatePositions = asyncHandler(async (req, res) => {
  const { sliders } = req.body; // Array of { id, position }
  
  if (!Array.isArray(sliders)) {
    res.status(400);
    throw new Error('Sliders array is required');
  }

  const updatePromises = sliders.map(({ id, position }) =>
    Slider.findByIdAndUpdate(id, { position }, { new: true })
  );

  await Promise.all(updatePromises);
  
  res.status(200).json({
    success: true,
    message: 'Positions updated successfully'
  });
});

module.exports = {
  createSlider,
  getSliders,
  getSliderById,
  updateSlider,
  deleteSlider,
  toggleSliderStatus,
  updatePositions
};
