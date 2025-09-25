const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import Slider model
const Slider = require('./models/slider');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// URLs của các banner cũ
const oldBanners = [
  {
    title: "Promo Banner 1",
    description: "Special promotion banner",
    url: "https://digital-world-2.myshopify.com/cdn/shop/files/promo-20_7441c713-b8bc-4549-b169-67001e3b91e1_1920x.png?v=1750840298",
    type: "banner",
    position: 1,
    buttonText: "Shop Now",
    link: "/products"
  },
  {
    title: "Promo Banner 2", 
    description: "New arrivals promotion",
    url: "https://digital-world-2.myshopify.com/cdn/shop/files/promo-21_94c561f6-4c50-4a5f-8868-0c7b804bc550_1920x.png?v=1750840379",
    type: "banner",
    position: 2,
    buttonText: "Discover More",
    link: "/products"
  },
  {
    title: "Watch Collection",
    description: "Discover the new watch collection",
    url: "https://digital-world-2.myshopify.com/cdn/shop/files/promo-23_2000x_crop_center.png?v=1750842393",
    type: "advertisement",
    position: 1,
    buttonText: "View Collection",
    link: "/products?category=watches"
  },
  {
    title: "Phone Launch",
    description: "We're launching exclusive phone",
    url: "https://digital-world-2.myshopify.com/cdn/shop/files/promo-24_2000x_crop_center.png?v=1750842410",
    type: "advertisement", 
    position: 2,
    buttonText: "Pre-order Now",
    link: "/products?category=phones"
  },
  {
    title: "Electronic Sale",
    description: "Big sale on electronics",
    url: "https://digital-world-2.myshopify.com/cdn/shop/files/Blue_And_Yellow_Modern_Electronic_Sale_Instagram_Post_580_x_655_px_1_600x.png?v=1750860746",
    type: "advertisement",
    position: 3,
    buttonText: "Shop Sale",
    link: "/products?sale=true"
  },
  {
    title: "Juice Blender",
    description: "Orange Colorful Juicer",
    url: "https://digital-world-2.myshopify.com/cdn/shop/files/Orange_Colorful_Juicer_Photo_Instagram_Post_280_x_338_px_1_400x.png?v=1750860819",
    type: "advertisement",
    position: 4,
    buttonText: "Buy Now",
    link: "/products?category=kitchen"
  },
  {
    title: "Cookware Set",
    description: "Red and Yellow Classic Neutrals Cooking Set",
    url: "https://digital-world-2.myshopify.com/cdn/shop/files/Red_and_Yellow_Classic_Neutrals_Cooking_Set_Product_Summer_Instagram_Post_280_x_338_px_1_cd2b3108-c6f2-4ee5-9597-8a501c61f0d6_400x.png?v=1750861662",
    type: "advertisement",
    position: 5,
    buttonText: "Shop Kitchen",
    link: "/products?category=kitchen"
  },
  {
    title: "Mega Sale",
    description: "Blue Yellow Simple Mega Sale Electronic",
    url: "https://digital-world-2.myshopify.com/cdn/shop/files/Blue_Yellow_Simple_Mega_Sale_Electronic_Instagram_Post_280_x_655_px_1_400x.png?v=1750862046",
    type: "advertisement",
    position: 6,
    buttonText: "Shop Mega Sale",
    link: "/products?sale=mega"
  }
];

// Function to download image from URL
async function downloadImage(url, filename) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });

    const uploadsDir = path.join(__dirname, 'uploads', 'sliders');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filepath = path.join(uploadsDir, filename);
    const writer = fs.createWriteStream(filepath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filepath));
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error.message);
    throw error;
  }
}

// Function to upload image to Cloudinary
async function uploadToCloudinary(filepath) {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      folder: 'sliders',
      resource_type: 'image'
    });
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error.message);
    throw error;
  }
}

// Function to create slider in database
async function createSlider(sliderData, cloudinaryResult) {
  try {
    const slider = new Slider({
      title: sliderData.title,
      description: sliderData.description,
      image: cloudinaryResult.secure_url,
      public_id: cloudinaryResult.public_id,
      link: sliderData.link,
      buttonText: sliderData.buttonText,
      position: sliderData.position,
      type: sliderData.type,
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
    });

    await slider.save();
    console.log(`✅ Created slider: ${sliderData.title}`);
    return slider;
  } catch (error) {
    console.error(`Error creating slider ${sliderData.title}:`, error.message);
    throw error;
  }
}

// Main function to seed sliders
async function seedSliders() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing sliders (optional)
    await Slider.deleteMany({});
    console.log('🗑️ Cleared existing sliders');

    // Process each banner
    for (let i = 0; i < oldBanners.length; i++) {
      const banner = oldBanners[i];
      console.log(`\n📥 Processing banner ${i + 1}/${oldBanners.length}: ${banner.title}`);
      
      try {
        // Download image
        const filename = `banner-${i + 1}-${Date.now()}.png`;
        const filepath = await downloadImage(banner.url, filename);
        console.log(`📁 Downloaded: ${filename}`);

        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(filepath);
        console.log(`☁️ Uploaded to Cloudinary: ${cloudinaryResult.public_id}`);

        // Create slider in database
        await createSlider(banner, cloudinaryResult);

        // Clean up local file
        fs.unlinkSync(filepath);
        console.log(`🗑️ Cleaned up local file: ${filename}`);

      } catch (error) {
        console.error(`❌ Failed to process banner ${banner.title}:`, error.message);
        // Continue with next banner
      }
    }

    console.log('\n🎉 Slider seeding completed!');
    
    // Show summary
    const totalSliders = await Slider.countDocuments();
    console.log(`📊 Total sliders in database: ${totalSliders}`);

  } catch (error) {
    console.error('❌ Error seeding sliders:', error.message);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeder
if (require.main === module) {
  seedSliders();
}

module.exports = seedSliders;
