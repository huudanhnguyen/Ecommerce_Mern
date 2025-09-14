// src/pages/public/Login.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // Lấy trạng thái từ Redux store
    const { isLoggedIn, error } = useSelector((state) => state.user);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    // Side effect sau khi đăng nhập thành công
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/'); // Chuyển hướng về trang chủ
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="w-full bg-gray-100 flex justify-center pt-20 pb-20">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg h-fit">
                {/* --- Tiêu đề --- */}
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Login</h1>
                
                {/* Thông báo lỗi */}
                {error && <p className="text-red-500 text-center my-2">{error}</p>}

                <p className="text-center text-gray-500 mb-8">
                    Welcome back! Please enter your details.
                </p>

                {/* --- Form đăng nhập --- */}
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm 
                                       placeholder-gray-400 focus:outline-none focus:ring-main focus:border-main"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password + Toggle */}
                    <div className="relative">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-main hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm 
                                       placeholder-gray-400 focus:outline-none focus:ring-main focus:border-main pr-10"
                            placeholder="Enter your password"
                        />
                        {/* Nút toggle 👁️ 🙈 */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-11 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                    {/* Nút submit */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm 
                                   text-lg font-bold text-white bg-main hover:bg-red-700 focus:outline-none 
                                   focus:ring-2 focus:ring-offset-2 focus:ring-main transition-colors"
                    >
                        Sign In
                    </button>
                </form>

                {/* Link đăng ký */}
                <p className="mt-8 text-center text-sm text-gray-500">
                    Don’t have an account?{' '}
                    <Link to="/register" className="font-medium text-main hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
