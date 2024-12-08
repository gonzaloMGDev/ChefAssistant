import React, { useState, useEffect } from 'react';
import ProveedorService from './ProveedorService';

const ProveedorList = () => {
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const data = await ProveedorService.getProveedores();
                if (Array.isArray(data)) {
                    setProveedores(data);
                } else {
                    throw new Error('La respuesta no es un array.');
                }
            } catch (err) {
                console.error('Error al cargar los proveedores:', err);
                setError('No se pudieron cargar los proveedores.');
            }
        };

        fetchProveedores();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="proveedor-list-container">
            {proveedores.length === 0 ? (
                <p>No hay proveedores disponibles.</p>
            ) : (
                <ul className="proveedor-list">
                    {proveedores.map((proveedor) => (
                        <li key={proveedor.id} className="proveedor-card">
                            <h3>{proveedor.nombre}</h3>
                            <p>Dirección: {proveedor.direccion}</p>
                            <p>Teléfono: {proveedor.telefono}</p>
                            <p>Categoría: {proveedor.categoria}</p>
                            <p>Días de Reparto: {proveedor.reparto}</p>
                            <button>Contactar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProveedorList;
