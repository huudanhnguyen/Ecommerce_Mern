const mongoose = require("mongoose");
const Blog = require("./models/blog");
const BlogCategory = require("./models/blogCategory");

const { Types } = mongoose;

const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

// Mẫu nội dung theo từng chủ đề
const contentTemplates = {
  Technology: [
    "Technology continues to evolve at an incredible pace, shaping industries and transforming daily life.",
    "From cloud computing to wearable devices, businesses and individuals alike are seeing huge benefits.",
    "Cybersecurity has become more critical than ever as threats grow increasingly sophisticated.",
    "The future promises even more disruptive innovations, with experts predicting breakthroughs in quantum computing and biotechnology."
  ],
  Smartphones: [
    "Smartphones are no longer just communication devices but powerful tools for work, entertainment, and health tracking.",
    "Foldable phones and new form factors are redefining how users interact with mobile devices.",
    "5G connectivity is revolutionizing speed, streaming, and online gaming experiences.",
    "Manufacturers are competing fiercely, pushing boundaries in battery life, camera technology, and AI integration."
  ],
  "Artificial Intelligence": [
    "Artificial Intelligence has moved from academic theory to real-world applications.",
    "Healthcare is being transformed by AI algorithms that can detect diseases faster than doctors.",
    "AI-driven automation is reshaping industries, raising both excitement and concern about job displacement.",
    "Ethical challenges remain at the forefront, as experts push for responsible development of AI systems."
  ],
  "Tech Tips": [
    "Staying safe online requires strong, unique passwords and two-factor authentication.",
    "Simple tricks like clearing cache or disabling background apps can boost device performance.",
    "Learning keyboard shortcuts saves time and increases productivity.",
    "Regular software updates are essential to protect against security vulnerabilities."
  ]
};

// Tạo content dài tự nhiên cho từng blog
const generateContent = (category) => {
  const sentences = contentTemplates[category];
  let paragraphs = [];

  for (let i = 0; i < 5; i++) {
    const shuffled = sentences.sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, 3).join(" ");
    paragraphs.push(picked);
  }

  return paragraphs.join("\n\n");
};

// Tạo danh sách ObjectId giả để seed likes/dislikes
const generateObjectIds = (count) => {
  return Array.from({ length: count }, () => new Types.ObjectId());
};

const seed = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

    await Blog.deleteMany();
    await BlogCategory.deleteMany();

    const categories = [
      { title: "Technology", slug: slugify("Technology"), description: "Latest updates and insights on general technology trends." },
      { title: "Smartphones", slug: slugify("Smartphones"), description: "News, reviews, and innovations in mobile devices." },
      { title: "Artificial Intelligence", slug: slugify("Artificial Intelligence"), description: "AI breakthroughs, applications, and future potential." },
      { title: "Tech Tips", slug: slugify("Tech Tips"), description: "Practical guides and tricks to make the most out of technology." }
    ];

    const createdCategories = await BlogCategory.insertMany(categories);

    const blogs = [];

    createdCategories.forEach((cat) => {
      for (let i = 1; i <= 10; i++) {
        blogs.push({
          title: `${cat.title} Article ${i}`,
          description: `An in-depth article about ${cat.title}.`,
          slug: slugify(`${cat.title} Article ${i}`),
          category: cat._id,
          content: generateContent(cat.title),
          author: "Admin",
          images: [
            {
              url: `https://picsum.photos/seed/${slugify(cat.title)}${i}/800/600`,
              alt: `${cat.title} image ${i}`
            }
          ],
          numberViews: Math.floor(Math.random() * 5000), // lượt xem ngẫu nhiên
          likes: generateObjectIds(Math.floor(Math.random() * 5)), // 0-4 likes giả
          dislikes: generateObjectIds(Math.floor(Math.random() * 3)) // 0-2 dislikes giả
        });
      }
    });

    await Blog.insertMany(blogs);

    console.log("✅ Seed success with views, likes, and dislikes added!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  }
};

seed();
