const mongoose = require("mongoose");
const Blog = require("./models/blog"); // đường dẫn tới model Blog
require("dotenv").config();

const fixBlogImages = async () => {
  try {
    // Kết nối DB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to DB");

    // Lấy tất cả blogs
    const blogs = await Blog.find({});
    console.log(`📒 Found ${blogs.length} blogs`);

    for (let i = 0; i < blogs.length; i++) {
      let blog = blogs[i];

      // Nếu blog chưa có ảnh hoặc ảnh rỗng
      if (!blog.images || blog.images.length === 0 || !blog.images[0].url) {
        blog.images = [
          {
            url: `https://picsum.photos/seed/${blog.slug}/800/600`,
            alt: blog.title,
          },
        ];

        await blog.save();
        console.log(`🖼 Updated blog: ${blog.title}`);
      }
    }

    console.log("🎉 Done fixing blog images!");
    process.exit();
  } catch (err) {
    console.error("❌ Error fixing blog images:", err);
    process.exit(1);
  }
};

fixBlogImages();
