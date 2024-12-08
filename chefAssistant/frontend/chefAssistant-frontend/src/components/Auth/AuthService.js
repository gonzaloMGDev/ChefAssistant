// src/components/Auth/AuthService.js

import api from '../../utils/api';

// Función para iniciar sesión
export const login = async (username, password) => {
    try {
        const response = await api.post('login/', { username, password });
        const { access } = response.data;

        // Guardar el token en localStorage
        localStorage.setItem('accessToken', access);

        return response.data;
    } catch (error) {
        throw new Error('Error al iniciar sesión: Verifique sus credenciales.');
    }
};

// Función para registrar un nuevo usuario
export const register = async (username, password, email) => {
    try {
        const response = await api.post('register/', { username, password, email });
        return response.data; // Devolver el mensaje de éxito
    } catch (error) {
        throw new Error('Error al registrarse: Verifique sus datos.');
    }
};
