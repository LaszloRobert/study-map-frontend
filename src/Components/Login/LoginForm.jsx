import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { loginLocal } from '../../Service/userApiService';
import { toast } from 'react-toastify';

const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleEmailPasswordLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await loginLocal({ email, password });
            console.log(res);
            setUser(res);
            navigate('/map');
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleEmailPasswordLogin}>
                <div className="mb-4">
                    <input
                        className="input-field"
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="input-field"
                        id="password"
                        type="password"
                        placeholder="Parola"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="button" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;