// src/pages/public/FinalRegister.jsx

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import path from '../../utils/path'; // Đảm bảo đường dẫn này đúng
import Swal from 'sweetalert2';

// 1. Đổi tên component thành chữ hoa
const FinalRegister = () => {
    const { status } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Chỉ chạy logic nếu status có giá trị
        if (status) {
            if (status === 'failed') {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Đăng ký không thành công. Vui lòng thử lại.',
                    icon: 'error',
                    confirmButtonText: 'Thử lại'
                }).then(() => {
                    navigate(`/${path.REGISTER}`); // Chuyển về trang đăng ký
                });
            }
            
            if (status === 'success') {
                Swal.fire({
                    title: 'Congratulations!',
                    text: 'Đăng ký thành công. Hãy đăng nhập để tiếp tục.',
                    icon: 'success',
                    confirmButtonText: 'Đi đến trang đăng nhập'
                }).then(() => {
                    navigate(`/${path.LOGIN}`); // Chuyển về trang đăng nhập
                });
            }
        }
    }, [status, navigate]); // 2. Thêm dependency `status` và `navigate`

    return (
        // 3. Hiển thị một trạng thái loading trong khi useEffect chạy
        <div className='w-screen h-screen bg-gray-100 flex items-center justify-center'>
            <div className='text-lg font-semibold'>
                Processing your registration...
            </div>
        </div>
    );
};

export default FinalRegister;