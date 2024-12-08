import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Estilos específicos de Home en styles

const Home = () => {
    const modules = [
        { name: 'Recetas', path: '/modules/recipes' },
        { name: 'Temporizadores', path: '/modules/temporizadores' }, // Nuevo módulo
        { name: 'Proveedores', path: '/modules/proveedores' }, // Nuevo módulo
        { name: 'Galeria', path: '/modules/galeria' }, // Nuevo módulo

    ];

    const getImagePath = (moduleName) => 
        new URL(`../assets/${moduleName.toLowerCase()}.jpg`, import.meta.url).href;

    return (
        <div className="home-container">
            <h1 className="home-title">Equipando al chef en ti</h1>
            <div className="modules-list">
                {modules.map((module) => (
                    <div key={module.name} className="module-card">
                        <Link to={module.path}>
                            <img
                                src={getImagePath(module.name)}
                                alt={module.name}
                                className="module-image"
                            />
                            <h3 className="module-title">{module.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
