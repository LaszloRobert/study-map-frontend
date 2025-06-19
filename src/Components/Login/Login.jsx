import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSuccessful, registerUser } from '../../Service/userApiService';
import { UserContext } from '../UserContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

const Login = ({ onClose, isRegistering }) => {
    const navigate = useNavigate(); // Define navigate using useNavigate
    const { setUser } = useContext(UserContext);

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const token = response.credential;
            const res = await loginSuccessful(token);
            console.log(res);
            setUser(res);
            navigate('/dashboard')
        } catch (err) {
            console.error(err);
            toast.error("Login failed. Please try again.");
        }
    }

    const handleGoogleLoginError = () => {
        toast.error("Google Login failed. Please try again.");
        console.error("Google Login failed.");
    };

    const login = useGoogleLogin({
        onSuccess: handleGoogleLoginSuccess,
        onError: handleGoogleLoginError,
    });

    return (

        <div className="z-3">
            <div className="space-y-4">
                {isRegistering ? <RegisterForm onClose={onClose} /> : <LoginForm onClose={onClose} />}
            </div>
            <div className="text-center mt-6 text-text text-sm">Sau</div>
            <div className="mt-3 flex justify-center">
                <button
                    onClick={() => login()}
                    className="p-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-background transition"
                >
                    <FaGoogle size={20} />
                </button>
            </div>
        </div>

    );
}

export default Login