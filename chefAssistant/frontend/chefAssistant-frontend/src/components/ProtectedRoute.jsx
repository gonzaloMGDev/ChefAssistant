// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { authTokens } = useAuth();

    // Si no hay token, redirige a la página de login
    if (!authTokens) {
        return <Navigate to="/login" />;
    }

    // Si hay token, permite el acceso al componente hijo (ruta protegida)
    return children;
};

export default ProtectedRoute;
