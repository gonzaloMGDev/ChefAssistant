import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Navbar.css'; // Importamos los estilos específicos del Navbar

const Navbar = () => {
    const { authTokens, handleLogout } = useAuth(); // Obtenemos el estado de autenticación
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                {authTokens ? (
                    // Mostrar estos enlaces si el usuario está autenticado
                    <>
                        <li><Link to="/home" className="navbar-link">Inicio</Link></li>
                        <li><button onClick={onLogout} className="navbar-button">Cerrar sesión</button></li>
                    </>
                ) : (
                    // Mostrar estos enlaces si el usuario no está autenticado
                    <>
                        <li><Link to="/login" className="navbar-link">Iniciar Sesión</Link></li>
                        <li><Link to="/register" className="navbar-link">Registrarse</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
