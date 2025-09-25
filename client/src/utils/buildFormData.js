// src/utils/buildFormData.js
export const buildFormData = (values) => {
  const formData = new FormData();

  // append field cơ bản
  formData.append("title", values.title ?? "");
  formData.append("slug", values.slug ?? "");
  formData.append("price", values.price ?? 0);
  formData.append("brand", values.brand ?? "");
  // description: backend của bạn từng nhận array/string; ở đây ta gửi string (nếu nó là string)
  // nếu backend cần array, bạn có thể chuyển JSON.stringify(...) theo api spec
  formData.append("description", values.description ?? "");

  formData.append("category", values.category ?? "");
  formData.append("quantity", values.quantity ?? 0);
  formData.append("instock", values.instock ?? false);
  formData.append("isActive", values.isActive ?? false);

  // object/map
  formData.append("infomations", JSON.stringify(values.infomations ?? {}));
  formData.append("variants", JSON.stringify(values.variants ?? []));

  // thumbnail: nếu là file -> gửi file; nếu là string (URL) -> gửi string (backend xử lý)
  if (values.thumb instanceof File) {
    formData.append("thumb", values.thumb);
  } else if (typeof values.thumb === "string" && values.thumb) {
    // backend có thể mong "thumb" là url string trong body
    formData.append("thumb", values.thumb);
  }

  // images: tách File và URL để backend xử lý chính xác
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

    // Gửi file qua field "images"
    fileImages.forEach((f) => formData.append("images", f));

    // Gửi URL hiện có qua field riêng "existingImages" (JSON)
    if (existingImageUrls.length > 0) {
      formData.append("existingImages", JSON.stringify(existingImageUrls));
    }
  }

  return formData;
};
export default buildFormData;
