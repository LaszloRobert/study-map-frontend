import React, { useState } from 'react';
import Login from './Login';

const LoginModal = ({ isOpen, onClose }) => {
    const [isRegistering, setIsRegistering] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-md relative max-w-md w-full">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <Login onClose={onClose} isRegistering={isRegistering} />
                <div className="mt-4 text-center">
                    <button className="text-blue-500" onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Logare' : 'Nu ai cont? Înregistrare'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;

