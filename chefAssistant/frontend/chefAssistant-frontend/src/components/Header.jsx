import React from 'react';
import '../styles/Header.css'; // Importamos los estilos específicos del Header

const Header = () => {
    return (
        <header className="header">
            <div className="header-overlay">
                <h1 className="header-title">ChefAssistant</h1>
            </div>
        </header>
    );
};

export default Header;
