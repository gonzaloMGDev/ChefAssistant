// src/pages/TemporizadorPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TemporizadorPage.css'; // Archivo de estilos para la página
import TemporizadorList from '../components/modules/Temporizadores/TemporizadorList';

const TemporizadorPage = () => {
    const [temporizadoresUpdated, setTemporizadoresUpdated] = useState(false);

    const handleTemporizadorCreated = () => {
        setTemporizadoresUpdated(true); // Actualiza la lista de temporizadores
    };

    return (
        <div className="temporizador-page-container">
            <h1 className="temporizador-page-title">Mis Temporizadores</h1>
            <div className="button-container">
                <Link to="/modules/temporizadores/crear" className="add-temporizador-button">
                    Añadir Temporizador
                </Link>
            </div>
            <TemporizadorList
                update={temporizadoresUpdated}
                resetUpdate={() => setTemporizadoresUpdated(false)}
            />
        </div>
    );
};

export default TemporizadorPage;
