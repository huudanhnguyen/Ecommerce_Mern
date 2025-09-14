import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiForgotPassword } from '../../apis/user'; // Import hàm API

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await apiForgotPassword(email);
            // ✅ Backend trả về { success, message }
            setMessage(response.data.message || 'Vui lòng kiểm tra email của bạn.');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-gray-100 flex justify-center pt-20 pb-20 min-h-screen">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg h-fit">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Forgot Password</h1>
                <p className="text-center text-gray-500 mb-8">
                    Enter your email and we'll send you a link to reset your password.
                </p>

                {message && (
                    <p className="text-center text-green-600 mb-4 bg-green-100 p-2 rounded-md">
                        {message}
                    </p>
                )}
                {error && (
                    <p className="text-center text-red-600 mb-4 bg-red-100 p-2 rounded-md">
                        {error}
                    </p>
                )}

                <form onSubmit={handleForgotPassword} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm 
                                       placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm 
                                   text-lg font-bold text-white bg-main hover:bg-red-700 focus:outline-none 
                                   focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Remember your password?{' '}
                    <Link to="/login" className="font-medium text-main hover:underline">
                        Return to Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
