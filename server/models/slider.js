const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  image: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  },
  link: {
    type: String,
    trim: true
  },
  buttonText: {
    type: String,
    trim: true,
    maxlength: 50
  },
  position: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  type: {
    type: String,
    enum: ['banner', 'slider', 'advertisement'],
    default: 'banner'
  }
}, {
  timestamps: true
});

// Index for better performance
sliderSchema.index({ isActive: 1, position: 1 });
sliderSchema.index({ type: 1, isActive: 1 });

module.exports = mongoose.model('Slider', sliderSchema);
