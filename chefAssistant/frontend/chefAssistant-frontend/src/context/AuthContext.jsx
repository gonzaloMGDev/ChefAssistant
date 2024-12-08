// src/context/AuthContext.jsx

import React, { createContext, useState } from 'react';
import { login } from '../components/Auth/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('accessToken') || null);

    const handleLogin = async (username, password) => {
        const data = await login(username, password);
        setAuthTokens(data.access); 
        localStorage.setItem('accessToken', data.access); // Guarda el token en localStorage
    };

    const handleLogout = () => {
        setAuthTokens(null);
        localStorage.removeItem('accessToken'); // Elimina el token de localStorage al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ authTokens, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
