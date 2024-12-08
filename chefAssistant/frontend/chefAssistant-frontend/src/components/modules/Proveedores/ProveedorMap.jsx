import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import ProveedorService from './ProveedorService';

const ProveedorMap = () => {
    const [proveedores, setProveedores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const data = await ProveedorService.getProveedores();
                setProveedores(data);
            } catch (error) {
                console.error('Error al cargar proveedores:', error);
            }
        };

        fetchProveedores();
    }, []);

    return (
        <div className="proveedor-map-container">
            <button
                className="view-list-button"
                onClick={() => navigate('/modules/proveedores')}
            >
                Ver Lista de Proveedores
            </button>
            <div
                style={{
                    height: '400px',
                    width: '80%',
                    margin: '20px auto',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <MapContainer
                    center={[37.9847, -1.1285]}
                    zoom={10}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {proveedores.map((proveedor) => (
                        <Marker
                            key={proveedor.id}
                            position={[proveedor.latitud, proveedor.longitud]}
                        >
                            <Popup>
                                <h3>{proveedor.nombre}</h3>
                                <p>Teléfono: {proveedor.telefono}</p>
                                <p>Días de reparto: {proveedor.reparto}</p>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default ProveedorMap;
