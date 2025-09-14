export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');

export  const formatPrice = (priceInSmallestUnit) => {
    // 1. Kiểm tra xem giá trị đầu vào có phải là một số hợp lệ hay không
    if (typeof priceInSmallestUnit !== "number" || isNaN(priceInSmallestUnit)) {
      return "Giá liên hệ";
    }

    // 2. CHIA CHO 100 ĐỂ CÓ ĐƯỢC GIÁ TRỊ THỰC TẾ
    //    Ví dụ: 798429319 -> 7984293.19
    const actualPrice = priceInSmallestUnit / 100;

    // 3. SỬ DỤNG Math.floor() ĐỂ LOẠI BỎ HOÀN TOÀN PHẦN THẬP PHÂN
    //    Ví dụ: 7984293.19 -> 7984293
    const integerPrice = Math.floor(actualPrice);

    // 4. Định dạng số nguyên đã được xử lý
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      // Bắt buộc không hiển thị phần thập phân
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(integerPrice);
  };

export const renderRatingStars = (totalRating) => {
    const stars = [];
    const fullStars = Math.floor(totalRating); // Số sao đầy đủ
    const halfStar = totalRating % 1 >= 0.5; // Kiểm tra có nửa sao không
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số sao rỗng còn lại

    // Thêm sao đầy đủ
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>);
    }

    // Thêm nửa sao nếu có
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400"></i>);
    }

    // Thêm sao rỗng
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>);
    }

    return stars;
  };
  export const validateVariant = (product, selectedVariants) => {
  if (!product?.variants || product.variants.length === 0) return true; // không có biến thể thì luôn hợp lệ

  return product.variants.every(
    (v) => selectedVariants[v.label] && selectedVariants[v.label].trim() !== ""
  );
};
export const getProductLabel = (product) => {
  if (!product) return null;

  // Nếu bán >20 cái thì là trending
  if (product.sold > 20) return "TRENDING";

  // Nếu mới tạo trong 7 ngày gần nhất thì là new
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  if (new Date(product.createdAt) > sevenDaysAgo) return "NEW";

  return null;
};