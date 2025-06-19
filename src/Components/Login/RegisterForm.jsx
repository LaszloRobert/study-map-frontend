import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { registerUser } from '../../Service/userApiService';
import { toast } from 'react-toastify';

const RegisterForm = ({ onClose }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser({ name, password, email });
            toast.success("Cont creat cu succes!");
            setUser(res);
            navigate('/map');
            onClose();
        } catch (err) {
            console.error(err);
            setError("Înregistrarea a eșuat. Încearcă din nou.");
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <input
                        className="input-field"
                        id="username"
                        type="text"
                        placeholder="Nume"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="input-field"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="input-field"
                        id="password"
                        type="password"
                        placeholder="Parolă"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="button" type="submit">
                        Înregistrare
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default RegisterForm;