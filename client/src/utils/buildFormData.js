// utils/buildFormData.js
export const buildFormData = (values) => {
  const formData = new FormData();

  // append field cơ bản
  formData.append("title", values.title);
  formData.append("slug", values.slug);
  formData.append("price", values.price);
  formData.append("brand", values.brand);
  formData.append("description", JSON.stringify(values.description)); // array
  formData.append("category", values.category);
  formData.append("quantity", values.quantity);
  formData.append("instock", values.instock);
  formData.append("isActive", values.isActive);

  // object/map
  formData.append("infomations", JSON.stringify(values.infomations));
  formData.append("variants", JSON.stringify(values.variants));

  // thumbnail
  if (values.thumb instanceof File) {
    formData.append("thumb", values.thumb);
  }

  // images
  if (values.images && values.images.length > 0) {
    values.images.forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      }
    });
  }

  return formData;
};
