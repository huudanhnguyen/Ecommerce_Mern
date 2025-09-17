import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import { getAllProducts } from "../apis/product";
import Product from "./Product";
import QuickViewModal from "./QuickViewModal";
import { getProductLabel } from "../utils/helpers";

const ProductSlider = ({ title, apiParams = {}, excludeId = null }) => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const sliderRef = useRef();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts(apiParams);
        if (response?.data?.success) {
          let fetched = response.data.products;

          // bỏ sản phẩm đang xem
          if (excludeId) {
            fetched = fetched.filter((p) => p._id !== excludeId);
          }

          setProducts(fetched);
        }
      } catch (error) {
        console.error("❌ Lỗi fetch products:", error);
      }
    };
    fetchProducts();
  }, [JSON.stringify(apiParams), excludeId]);

  const handleQuickView = (product) => {
    setModalData(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const sliderSettings = {
    dots: false,
    infinite: products?.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    products?.length > 0 && (
      <div className="w-full mt-10">
        {/* Tiêu đề */}
        <div className="py-4 border-b-2 border-main">
          <h3 className="text-xl font-semibold uppercase">{title}</h3>
        </div>

        {/* Slider */}
        <div className="mt-4 mx-[-10px] relative custom-slick">
          <Slider ref={sliderRef} {...sliderSettings}>
            {products.map((product) => (
              <div key={product._id} className="px-2">
                <Product
                  productData={product}
                  label={getProductLabel(product)}
                  onQuickView={handleQuickView}
                />
              </div>
            ))}
          </Slider>

          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="custom-banner-slick slick-prev"
          >
            &lt;
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="custom-banner-slick slick-next"
          >
            &gt;
          </button>
        </div>

        {/* QuickView Modal */}
        {showModal &&
          modalData &&
          ReactDOM.createPortal(
            <QuickViewModal product={modalData} onClose={handleCloseModal} />,
            document.getElementById("modal-root")
          )}
      </div>
    )
  );
};

export default ProductSlider;
