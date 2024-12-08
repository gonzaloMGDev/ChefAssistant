import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProveedoresPage.css';
import ProveedorList from '../components/modules/Proveedores/ProveedorList';

const ProveedoresPage = () => {
    const [proveedoresUpdated, setProveedoresUpdated] = useState(false);

    const handleProveedorCreated = () => {
        setProveedoresUpdated(true);
    };

    return (
        <div className="proveedores-page-container">
            <h1>Gestión de Proveedores</h1>
            <div className="proveedor-actions">
                <Link to="/modules/proveedores/crear" className="add-proveedor-button">
                    Añadir Proveedor
                </Link>
                <Link to="/modules/proveedores/mapa" className="view-map-button">
                    Ver Mapa
                </Link>
            </div>
            <ProveedorList
                update={proveedoresUpdated}
                resetUpdate={() => setProveedoresUpdated(false)}
            />
        </div>
    );
};

export default ProveedoresPage;
