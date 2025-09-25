const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const cloudinary = require('cloudinary').v2;
const BlogCategory = require('../models/blogCategory'); // Import BlogCategory model
const createBlog = asyncHandler(async (req, res) => {
    try {
        const { title, description, category, author } = req.body;
        if (!title || !description || !category || !author) {
            throw new Error('All required fields must be provided');
        }
        const foundCategory = await BlogCategory.findOne({ title: category });
        if (!foundCategory) {
            throw new Error(`Blog Category '${category}' not found.`);
        }
        if (!req.files || req.files.length === 0) {
            throw new Error('Blog images are required');
        }
        const imagesData = req.files.map((file) => ({
            url: file.path,
            public_id: file.filename,
        }));
        const newBlogData = {
            title,
            description,
            author, // Giả sử author vẫn là một ObjectId
            slug: slugify(title, { lower: true }),
            images: imagesData,
            category: foundCategory._id, // [NEW] Gán _id của category đã tìm thấy
        };
        const newBlog = new Blog(newBlogData);
         await newBlog.save();

        // [NEW] Populate dữ liệu sau khi đã lưu
        // Dùng .populate() trên đối tượng newBlog để làm đầy các trường tham chiếu
        await newBlog.populate('category', 'title _id'); // Chỉ lấy title và _id của category
        await newBlog.populate('author', 'firstname lastname');
        const createdBlog = newBlog.toObject(); // Chuyển đổi sang object thuần túy
        return res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            createdBlog,
        });
    } catch (error) {
        // Khối catch để dọn dẹp ảnh vẫn hoạt động hoàn hảo
        if (req.files && req.files.length > 0) {
            console.log("An application error occurred. Cleaning up uploaded files...");
            const publicIds = req.files.map((file) => file.filename);
            await cloudinary.api.delete_resources(publicIds);
        }
        
        if (error.message.includes('required') || error.message.includes('not found')) {
            return res.status(400).json({ success: false, message: error.message });
        }
        
        throw error;
    }
});
const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    try {
        const blog = await Blog.findById(bid);
        if (!blog) {
            if (req.files) {
                const publicIds = req.files.map(file => file.filename);
                await cloudinary.api.delete_resources(publicIds);
            }
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // Xử lý category
        if (req.body.category) {
            // Kiểm tra nếu category là ObjectId hợp lệ
            if (req.body.category.match(/^[0-9a-fA-F]{24}$/)) {
                // Nếu là ObjectId, tìm category theo _id
                const foundCategory = await BlogCategory.findById(req.body.category);
                if (!foundCategory) {
                    throw new Error(`Blog Category with ID '${req.body.category}' not found.`);
                }
                req.body.category = foundCategory._id;
            } else {
                // Nếu không phải ObjectId, tìm theo title
                const foundCategory = await BlogCategory.findOne({ title: req.body.category });
                if (!foundCategory) {
                    throw new Error(`Blog Category '${req.body.category}' not found.`);
                }
                req.body.category = foundCategory._id;
            }
        }

        if (req.body.title) {
            req.body.slug = slugify(req.body.title, { lower: true });
        }

        // Xử lý images (merge new and existing)
        let finalImages = blog.images || [];
        let existingImagesFromClient = [];

        if (req.body.existingImages) {
            try {
                existingImagesFromClient = JSON.parse(req.body.existingImages);
            } catch (e) {
                console.error("Error parsing existingImages:", e);
            }
        }

        // Nếu có file ảnh mới được upload
        if (req.files && req.files.images && req.files.images.length > 0) {
            // Xóa các ảnh cũ không còn trong existingImagesFromClient
            const imagesToDelete = finalImages.filter(
                (img) => !existingImagesFromClient.some(existing => existing.url === img.url)
            );
            if (imagesToDelete.length > 0) {
                const oldPublicIds = imagesToDelete.map((img) => img.public_id);
                await cloudinary.api.delete_resources(oldPublicIds);
            }

            // Thêm các ảnh mới upload
            const newUploadedImages = req.files.images.map((file) => ({
                url: file.path,
                public_id: file.filename
            }));
            finalImages = [...existingImagesFromClient, ...newUploadedImages];
        } else {
            // Nếu không có ảnh mới upload, chỉ dùng existingImagesFromClient
            // Cần xóa những ảnh cũ không còn trong existingImagesFromClient
            const imagesToDelete = finalImages.filter(
                (img) => !existingImagesFromClient.some(existing => existing.url === img.url)
            );
            if (imagesToDelete.length > 0) {
                const oldPublicIds = imagesToDelete.map((img) => img.public_id);
                await cloudinary.api.delete_resources(oldPublicIds);
            }
            finalImages = existingImagesFromClient;
        }
        req.body.images = finalImages;

        // Cập nhật blog
        Object.assign(blog, req.body);
        const updatedBlog = await blog.save();
        await updatedBlog.populate('category', 'title _id');
        await updatedBlog.populate('author', 'firstname lastname');
        
        return res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            updatedBlog,
        });

    } catch (error) {
        if (req.files && req.files.length > 0) {
            console.log("An error occurred during blog update. Cleaning up uploaded files...");
            const publicIds = req.files.map((file) => file.filename);
            await cloudinary.api.delete_resources(publicIds);
        }

        if (error.message.includes('not found')) {
            return res.status(400).json({ success: false, message: error.message });
        }

        throw error;
    }
});
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    // Xóa ảnh từ Cloudinary trước khi xóa blog
    if (blog.images && blog.images.length > 0) {
        const publicIds = blog.images.map(img => img.public_id);
        try {
            await cloudinary.api.delete_resources(publicIds);
        } catch (error) {
            console.error('Error deleting images from Cloudinary:', error);
        }
    }

    // Xóa blog từ database
    await Blog.findByIdAndDelete(id);
    
    res.status(200).json({ 
        success: true,
        message: 'Blog removed successfully', 
        deletedBlog: blog 
    });
});
// likeBlog and dislikeBlog
const likeBlog = asyncHandler(async (req, res) => {
    const { id } = req.params; // lấy id từ params
    const loginUserId = req.user._id;

    const blog = await Blog.findById(id);
    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    const isLiked = blog.likes.includes(loginUserId);
    const isDisliked = blog.dislikes.includes(loginUserId);

    if (isLiked) {
        blog.likes.pull(loginUserId);
    } else {
        blog.likes.push(loginUserId);
        if (isDisliked) blog.dislikes.pull(loginUserId);
    }

    await blog.save();
    res.json(blog);
});

const dislikeBlog = asyncHandler(async (req, res) => {
    const { id } = req.params; // lấy id từ params
    const loginUserId = req.user._id;

    const blog = await Blog.findById(id);
    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    const isDisliked = blog.dislikes.includes(loginUserId);
    const isLiked = blog.likes.includes(loginUserId);

    if (isDisliked) {
        blog.dislikes.pull(loginUserId);
    } else {
        blog.dislikes.push(loginUserId);
        if (isLiked) blog.likes.pull(loginUserId);
    }

    await blog.save();
    res.json(blog);
});

const excludeFields = '-__v -password -refreshToken -role -createdAt -updatedAt'; // Chỉ lấy các trường likes và dislikes
// File: controllers/blog.js

const getBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const excludeFields = '-__v -password -refreshToken -role -createdAt -updatedAt -email -mobile -role -cart -address -wishlist -isBlocked'; // Chỉ lấy các trường likes và dislikes
    const blog = await Blog.findByIdAndUpdate(id,{ $inc: { numberViews: 1 } }, { new: true})// Tăng số lượt xem mỗi khi truy cập
        .populate('likes', 'lastName firstName email') // Chỉ lấy các trường cần thiết từ likes
        .populate('dislikes', 'lastName firstName email') // Chỉ lấy các trường cần thiết từ dislikes
        .populate('author', 'firstName lastName'); // Bạn có thể thêm populate author nếu cần
    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }
    // Chuyển Mongoose document thành object thuần túy để có thể thêm thuộc tính mới
    const blogObject = blog.toObject();
    // KIỂM TRA XEM NGƯỜI DÙNG CÓ ĐĂNG NHẬP KHÔNG
    const loginUserId = req.user?._id?.toString(); // Dùng optional chaining (?.) để tránh lỗi

    if (loginUserId) {
        // Nếu người dùng đã đăng nhập, tính toán isLiked và isDisliked
        blogObject.isLiked = blog.likes.some(user => user._id.toString() === loginUserId);
        blogObject.isDisliked = blog.dislikes.some(user => user._id.toString() === loginUserId);
    } else {
        // Nếu không, mặc định là false
        blogObject.isLiked = false;
        blogObject.isDisliked = false;
    }
    res.status(200).json(blogObject);
});
const getBlogs = asyncHandler(async (req, res) => {
  try {
    // Lấy page và limit từ query (nếu không có thì mặc định page=1, limit=6)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Đếm tổng số blogs
    const total = await Blog.countDocuments();

    // Lấy danh sách blogs phân trang
    const blogs = await Blog.find({})
      .populate("likes", "lastName firstName email")
      .populate("dislikes", "lastName firstName email")
      .populate("author", "firstName lastName email")
      .populate("category", "title _id")
      .sort({ createdAt: -1 }) // mới nhất trước
      .skip(skip)
      .limit(limit);

    // Format lại dữ liệu trả về
    const formattedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      slug: blog.slug,
      content: blog.content,
      numberViews: blog.numberViews,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      images:
        blog.images?.map((img) => ({
          url: img.url,
          alt: img.alt || blog.title,
        })) || [],
      author: blog.author?.firstName
        ? `${blog.author.firstName} ${blog.author.lastName}`
        : blog.author || "Admin",
      category: blog.category
        ? { _id: blog.category._id, title: blog.category.title }
        : null,
      likes: blog.likes || [],
      dislikes: blog.dislikes || [],
    }));

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      blogs: formattedBlogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});



const uploadImageBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!req.files || req.files.length === 0) {
        throw new Error('No files uploaded');
    }
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error('Blog not found');
    }
    const newImages = req.files.map(file => ({
        url: file.path,
        public_id: file.filename
    }));
    // 5. Thêm các ảnh mới vào mảng images của sản phẩm
    //    Sử dụng $push và $each để thêm nhiều ảnh cùng lúc
    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { $push: { images: { $each: newImages } } },
        { new: true } // Trả về document đã được cập nhật
    );
    return res.status(200).json({
        success: true,
        message: 'Images uploaded and updated successfully',
        data: updatedBlog
    });
});
module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    uploadImageBlog
};