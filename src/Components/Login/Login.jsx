import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { loginSuccessful, registerUser } from '../../Service/userApiService';
import { UserContext } from '../UserContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Login = ({ onClose, isRegistering }) => {
    const [error, setError] = useState("");
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
            setError("Login failed. Please try again.");
        }
    }

    const handleGoogleLoginError = () => {
        setError("Google Login failed. Please try again.");
        console.error("Google Login failed.");
    };


    var googleCLientID = process.env.REACT_APP_GOOGLE_CLIENT_ID

    return (
        <GoogleOAuthProvider clientId="673999193048-ljpk17rf7ps7m1t7qs607clukj1o9f9p.apps.googleusercontent.com">
            <div className="login-page z-3">
                <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
                <div className="mt-4">
                    <h3 className="text-md mb-2 text-black text-center">OR</h3>
                    {isRegistering ? <RegisterForm onClose={onClose} /> : <LoginForm onClose={onClose} />}
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </GoogleOAuthProvider >
    );
}

export default Login