// src/pages/public/Register.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRegister } from '../../apis/user'; // Import API

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await apiRegister({ firstname, lastname, email, password, mobile });
            
            if (response.data.success) {
                // Chỉ nhắc người dùng kiểm tra email, KHÔNG redirect login
                setSuccessMessage('Please check your email to activate your account.');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 flex justify-center pt-20">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg h-fit">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
                <p className="text-center text-gray-500 mb-8">
                    Join us! Please fill in the details below.
                </p>

                {error && <p className="text-red-500 text-center my-2 bg-red-100 p-2 rounded">{error}</p>}
                {successMessage && <p className="text-green-500 text-center my-2 bg-green-100 p-2 rounded">{successMessage}</p>}
                
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className='flex gap-4'>
                        <div className='flex-1'>
                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input 
                                type="text" id="firstname" value={firstname}
                                onChange={(e) => setFirstname(e.target.value)} required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                            />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input 
                                type="text" id="lastname" value={lastname}
                                onChange={(e) => setLastname(e.target.value)} required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input 
                            type="email" id="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                        />
                    </div>

                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                        <input 
                            type="text" id="mobile" value={mobile}
                            onChange={(e) => setMobile(e.target.value)} required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main"
                        />
                    </div>
                    
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type={showPassword ? "text" : "password"} // 👈 đổi type theo state
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main pr-10"
                        />
                        {/* Nút toggle show/hide */}
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm 
                                   text-lg font-bold text-white bg-main hover:bg-red-700 focus:outline-none 
                                   focus:ring-2 focus:ring-offset-2 focus:ring-main transition-colors
                                   disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Submitting...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-main hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
