import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/AuthForms.css'; // Estilos específicos para los formularios

const LoginForm = () => {
    const { handleLogin } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(username, password);
            navigate('/home');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Iniciar Sesión</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p>
                    ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
