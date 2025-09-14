// src/pages/public/VerifyEmail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiVerifyEmail } from '../apis';

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await apiVerifyEmail(token);
                if (response.data.success) {
                    setStatus('success');
                    setMessage(response.data.message);
                } else {
                    setStatus('error');
                    setMessage(response.data.message);
                }
            } catch (error) {
                setStatus('error');
                setMessage(error.response.data.message || 'Verification failed.');
            }
        };
        verify();
    }, [token]);

    return (
        <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                {status === 'verifying' && <h1 className="text-2xl font-bold">Verifying your email...</h1>}
                {status === 'success' && (
                    <>
                        <h1 className="text-2xl font-bold text-green-500">Success!</h1>
                        <p className="mt-4">{message}</p>
                        <Link to="/login" className="mt-6 inline-block bg-main text-white font-bold py-2 px-4 rounded">
                            Go to Login
                        </Link>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <h1 className="text-2xl font-bold text-red-500">Verification Failed</h1>
                        <p className="mt-4">{message}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;