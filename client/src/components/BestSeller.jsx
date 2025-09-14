import React, { useEffect, useState } from "react";
import { getAllProducts } from "../apis/product";
import Product from "./Product";
import Slider from "react-slick";
import QuickViewModal from './QuickViewModal'; // <-- 1. Import component modal

const tabs = [
  { id: 1, name: "BEST SELLER" },
  { id: 2, name: "NEW ARRIVALS" },
];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const BestSeller = () => {
  const [bestseller, setBestseller] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

  const handleQuickView = (product) => {
        setModalData(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalData(null);
    };

  const fetchProducts = async () => {
    try {
      const response = await Promise.all([
        getAllProducts({ sort: "-sold" }),
        getAllProducts({ sort: "-createdAt" }),
      ]);
      if (response[0]?.data?.success) {
        setBestseller(response[0].data.products);
      }
      if (response[1]?.data?.success) {
        setNewProduct(response[1].data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Chỉ gọi API 1 lần

  return (
    <div className="w-full relative custom-slick">
      {/* --- Phần Tabs --- */}
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`cursor-pointer font-semibold uppercase ${
              activeTab === tab.id ? "text-main" : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Slider {...settings}>
          {activeTab === 1 &&
            bestseller?.map((product) => (
              // Truyền thêm prop label="TRENDING"
              <Product
                key={product._id}
                productData={product}
                label="TRENDING"
                onQuickView={handleQuickView}
              />
            ))}

          {activeTab === 2 &&
            newProduct?.map((product) => (
              // Truyền thêm prop label="NEW"
              <Product key={product._id}
              productData={product}
              label="NEW"
              onQuickView={handleQuickView}
               />
            ))}
        </Slider>
      </div>
      {/* 5. Render Modal một cách có điều kiện */}
            {showModal && modalData && (
                <QuickViewModal product={modalData} onClose={handleCloseModal} />
            )}
    </div>
  );
};

export default BestSeller;
