const mongoose = require('mongoose');
const ProductCategory = require('../models/productCategory');
const slugify = require('slugify');

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/yourDB'); // thay yourDB bằng tên DB thật
    console.log('✅ Connected MongoDB');

    const categories = await ProductCategory.find();
    for (const cat of categories) {
      if (!cat.slug) {
        cat.slug = slugify(cat.title, { lower: true, strict: true });
        await cat.save();
        console.log(`✔️ Updated: ${cat.title} -> ${cat.slug}`);
      }
    }

    console.log('🎉 Done updating slugs');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
