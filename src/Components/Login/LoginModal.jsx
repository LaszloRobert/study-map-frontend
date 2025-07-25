import React, { useState } from 'react';
import Login from './Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

const LoginModal = ({ isOpen, onClose }) => {
    const [isRegistering, setIsRegistering] = useState(false);

    if (!isOpen) return null;
    var googleCLientID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    return (
        <GoogleOAuthProvider clientId="673999193048-ljpk17rf7ps7m1t7qs607clukj1o9f9p.apps.googleusercontent.com">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

                <div className="bg-background p-8 rounded-lg shadow-md relative max-w-md w-full border-2 border-primary">
                    <h2 className="text-2xl font-bold text-text text-center mb-6">Autentificare</h2>
                    <button
                        className="absolute top-2 right-2 text-accent hover:text-error transition"
                        onClick={onClose}
                        aria-label="Închide fereastra de autentificare"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <Login onClose={onClose} isRegistering={isRegistering} />
                    <div className="mt-4 text-center text-sm text-muted">
                        <button className="text-accent hover:text-primary underline transition" onClick={() => setIsRegistering(!isRegistering)}>
                            {isRegistering ? 'Autentificare' : 'Nu ai cont? Înregistrează-te'}
                        </button>
                    </div>
                </div>

            </div>
        </GoogleOAuthProvider >
    );
};

export default LoginModal;

