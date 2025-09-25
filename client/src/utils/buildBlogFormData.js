// src/utils/buildBlogFormData.js - Chuyên dụng cho Blog
export const buildBlogFormData = (values) => {
  const formData = new FormData();

  // Các field cơ bản của blog
  formData.append("title", values.title ?? "");
  formData.append("description", values.description ?? "");
  formData.append("content", values.content ?? "");
  formData.append("author", values.author ?? "Admin");
  formData.append("category", values.category ?? "");

  // Xử lý images: tách File mới và URL hiện có
  if (Array.isArray(values.images) && values.images.length > 0) {
    const fileImages = [];
    const existingImageUrls = [];

    values.images.forEach((img) => {
      if (img instanceof File) {
        fileImages.push(img);
      } else if (typeof img === "string" && img) {
        existingImageUrls.push(img);
      } else if (img && typeof img === "object" && img.url) {
        // Xử lý cho blog images có cấu trúc {url, alt, public_id}
        existingImageUrls.push(img);
      }
    });

    // Gửi file mới qua field "images"
    fileImages.forEach((f) => formData.append("images", f));

    // Gửi URL hiện có qua field riêng "existingImages" (JSON)
    if (existingImageUrls.length > 0) {
      formData.append("existingImages", JSON.stringify(existingImageUrls));
    }
  }

  return formData;
};

export default buildBlogFormData;


