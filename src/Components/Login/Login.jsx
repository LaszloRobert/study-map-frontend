import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSuccessful, registerUser } from '../../Service/userApiService';
import { UserContext } from '../UserContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

const Login = ({ onClose, isRegistering }) => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    // Google One Tap login success handler
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const res = await loginSuccessful(token);
            setUser(res);
            navigate('/dashboard');
            if (onClose) onClose();
        } catch (err) {
            console.error(err);
            toast.error("Autentificarea cu Google a eșuat. Încearcă din nou.");
        }
    };

    // Google One Tap login error handler
    const handleGoogleLoginError = () => {
        toast.error("Autentificarea cu Google a eșuat. Încearcă din nou.");
        console.error("Google Login failed.");
    };

    return (
        <div className="z-3">
            <div className="space-y-4">
                {isRegistering ? <RegisterForm onClose={onClose} /> : <LoginForm onClose={onClose} />}
            </div>
            <div className="text-center mt-6 text-accent text-sm font-semibold">sau</div>
            <div className="mt-3 flex justify-center">
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    theme="filled_black"
                    size="large"
                    width="100%"
                />
            </div>
        </div>
    );
}

export default Login