const mongoose = require('mongoose');
require('dotenv').config();

// Import Slider model
const Slider = require('./models/slider');

// URLs của các banner cũ (sử dụng trực tiếp URLs)
const oldBanners = [
  {
    title: "Promo Banner 1",
    description: "Special promotion banner - Get up to 50% off on selected items",
    image: "https://digital-world-2.myshopify.com/cdn/shop/files/promo-20_7441c713-b8bc-4549-b169-67001e3b91e1_1920x.png?v=1750840298",
    public_id: "promo-banner-1",
    type: "banner",
    position: 1,
    buttonText: "Shop Now",
    link: "/products",
    isActive: true
  },
  {
    title: "Promo Banner 2", 
    description: "New arrivals promotion - Discover our latest collection",
    image: "https://digital-world-2.myshopify.com/cdn/shop/files/promo-21_94c561f6-4c50-4a5f-8868-0c7b804bc550_1920x.png?v=1750840379",
    public_id: "promo-banner-2",
    type: "banner",
    position: 2,
    buttonText: "Discover More",
    link: "/products",
    isActive: true
  },
  {
    title: "Watch Collection",
    description: "Discover the new watch collection - Premium timepieces",
    image: "https://digital-world-2.myshopify.com/cdn/shop/files/promo-23_2000x_crop_center.png?v=1750842393",
    public_id: "watch-collection",
    type: "advertisement",
    position: 1,
    buttonText: "View Collection",
    link: "/products?category=watches",
    isActive: true
  },
  {
    title: "Phone Launch",
    description: "We're launching exclusive phone - Pre-order now",
    image: "https://digital-world-2.myshopify.com/cdn/shop/files/promo-24_2000x_crop_center.png?v=1750842410",
    public_id: "phone-launch",
    type: "advertisement", 
    position: 2,
    buttonText: "Pre-order Now",
    link: "/products?category=phones",
    isActive: true
  },
  {
    title: "Electronic Sale",
    description: "Big sale on electronics - Up to 70% off",
    image: "https://digital-world-2.myshopify.com/cdn/shop/files/Blue_And_Yellow_Modern_Electronic_Sale_Instagram_Post_580_x_655_px_1_600x.png?v=1750860746",
    public_id: "electronic-sale",
    type: "advertisement",
    position: 3,
    buttonText: "Shop Sale",
    link: "/products?sale=true",
    isActive: true
  },
  {
    title: "Juice Blender",
    description: "Orange Colorful Juicer - Perfect for healthy living",
    image: "https://digital-world-2.myshopify.com/cdn/shop/files/Orange_Colorful_Juicer_Photo_Instagram_Post_280_x_338_px_1_400x.png?v=1750860819",
    public_id: "juice-blender",
    type: "advertisement",
    position: 4,
    buttonText: "Buy Now",
    link: "/products?category=kitchen",
    isActive: true
  },
  {
    title: "Cookware Set",
    description: "Red and Yellow Classic Neutrals Cooking Set - Complete kitchen solution",
    image: "https://digital-world-2.myshopify.com/cdn/shop/files/Red_and_Yellow_Classic_Neutrals_Cooking_Set_Product_Summer_Instagram_Post_280_x_338_px_1_cd2b3108-c6f2-4ee5-9597-8a501c61f0d6_400x.png?v=1750861662",
    public_id: "cookware-set",
    type: "advertisement",
    position: 5,
    buttonText: "Shop Kitchen",
    link: "/products?category=kitchen",
    isActive: true
  },
  {
    title: "Mega Sale",
    description: "Blue Yellow Simple Mega Sale Electronic - Limited time offer",
    image: "https://digital-world-2.myshopify.com/cdn/shop/files/Blue_Yellow_Simple_Mega_Sale_Electronic_Instagram_Post_280_x_655_px_1_400x.png?v=1750862046",
    public_id: "mega-sale",
    type: "advertisement",
    position: 6,
    buttonText: "Shop Mega Sale",
    link: "/products?sale=mega",
    isActive: true
  }
];

// Function to create slider in database
async function createSlider(sliderData) {
  try {
    const slider = new Slider({
      title: sliderData.title,
      description: sliderData.description,
      image: sliderData.image,
      public_id: sliderData.public_id,
      link: sliderData.link,
      buttonText: sliderData.buttonText,
      position: sliderData.position,
      type: sliderData.type,
      isActive: sliderData.isActive,
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
    });

    await slider.save();
    console.log(`✅ Created slider: ${sliderData.title}`);
    return slider;
  } catch (error) {
    console.error(`❌ Error creating slider ${sliderData.title}:`, error.message);
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
        // Create slider in database
        await createSlider(banner);
      } catch (error) {
        console.error(`❌ Failed to process banner ${banner.title}:`, error.message);
        // Continue with next banner
      }
    }

    console.log('\n🎉 Slider seeding completed!');
    
    // Show summary
    const totalSliders = await Slider.countDocuments();
    console.log(`📊 Total sliders in database: ${totalSliders}`);

    // Show sliders by type
    const bannerCount = await Slider.countDocuments({ type: 'banner' });
    const adCount = await Slider.countDocuments({ type: 'advertisement' });
    console.log(`📈 Banners: ${bannerCount}, Advertisements: ${adCount}`);

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
