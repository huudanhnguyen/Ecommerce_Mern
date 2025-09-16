const moongose = require('mongoose');
const slugify = require('slugify');

const productCategorySchema = new moongose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  brand: {
    type: [String],
    required: true,
  },
  img: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});
productCategorySchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = moongose.model('ProductCategory', productCategorySchema);