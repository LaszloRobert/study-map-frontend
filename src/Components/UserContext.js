import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user_map');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSetUser = (user) => {
        localStorage.setItem('user_map', JSON.stringify(user));
        setUser(user);
    };

    const handleLogout = () => {
        console.log('logging out');
        localStorage.removeItem('user_map');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser: handleSetUser, logout: handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};