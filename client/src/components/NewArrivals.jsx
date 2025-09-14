import React, { useState, useEffect,useRef } from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';
import { useSelector } from 'react-redux'; // 1. Import useSelector
import { getAllProducts } from '../apis/product';
import Product from './Product';
import QuickViewModal from './QuickViewModal';
import { getApiCategories } from '../apis/categoryProduct'; // 1. Import thêm getApiCategories


const NewArrivals = () => {
    // State chỉ để lưu sản phẩm mới
    const [newProducts, setNewProducts] = useState(null);
    
    // State cho Quick View Modal
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
     const sliderRef = useRef(); // 2. Thêm ref để điều khiển slider

    // Hàm để lấy sản phẩm mới nhất
    const fetchNewProducts = async () => {
        try {
            // Gọi API với tham số sort theo 'createdAt'
            const response = await getAllProducts({ sort: '-createdAt', limit: 10 });
            if (response?.data?.success) {
                setNewProducts(response.data.products);
            }
        } catch (error) {
            console.error("Failed to fetch new products:", error);
        }
    };

    // useEffect để gọi API một lần duy nhất
    useEffect(() => {
        fetchNewProducts();
    }, []);

    // Các hàm để điều khiển modal
    const handleQuickView = (product) => {
        setModalData(product);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setModalData(null);
    };

    // Hàm quyết định nhãn sản phẩm (chỉ cần trả về "NEW")
     const getProductLabel = (product) => {
        // 1. THÊM "LÍNH GÁC": Nếu không có product, trả về null ngay lập tức
        if (!product) return null;

        // Giả sử: bán trên 20 sản phẩm là "trending"
        if (product.sold > 20) return "TRENDING"; 
        
        // Giả sử: sản phẩm tạo trong 7 ngày gần nhất là "new"
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        if (new Date(product.createdAt) > sevenDaysAgo) return "NEW";

        return null; // Không có nhãn
    };

    // Cài đặt cho slider
    const sliderSettings = {
        dots: false,
        infinite: newProducts?.length > 4,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false, // 3. Ẩn mũi tên mặc định để dùng nút tùy chỉnh
    };

    return (
        <div className='w-full'>
            <div className='py-4 border-b-2 border-main'>
                <h3 className='text-xl font-semibold uppercase'>NEW ARRIVALS</h3>
            </div>

            {/* --- Slider sản phẩm --- */}
            {/* 4. Thêm 'relative' và 'custom-slick' vào div cha */}
            <div className='mt-4 mx-[-10px] relative custom-slick'>
                <Slider ref={sliderRef} {...sliderSettings}>
                    {newProducts?.map(product => (
                        <div key={product._id} className='px-2'>
                            <Product 
                                productData={product} 
                                label={getProductLabel(product)}
                                onQuickView={handleQuickView}
                            />
                        </div>
                    ))}
                </Slider>

                {/* 5. THÊM LẠI CÁC NÚT BẤM TÙY CHỈNH */}
                <button 
                    onClick={() => sliderRef.current.slickPrev()} 
                    className='custom-banner-slick slick-prev'>
                    &lt;
                </button>
                <button 
                    onClick={() => sliderRef.current.slickNext()} 
                    className='custom-banner-slick slick-next'>
                    &gt;
                </button>
            </div>

            {/* --- Render Modal qua Portal --- */}
            {showModal && modalData && ReactDOM.createPortal(
                <QuickViewModal 
                    product={modalData} 
                    onClose={handleCloseModal} 
                />,
                document.getElementById('modal-root')
            )}
        </div>
    );
};

export default NewArrivals;