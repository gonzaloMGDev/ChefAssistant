import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProveedorService from './ProveedorService';

const ProveedorForm = ({ onProveedorCreated }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        categoria: 'congelados', // Valor predeterminado para categoría
        reparto: 'Lunes a Viernes', // Valor predeterminado para reparto
        latitud: '',
        longitud: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData); // Para depuración

        try {
            await ProveedorService.createProveedor(formData);
            alert('Proveedor creado con éxito.');
            onProveedorCreated(); // Callback para actualizar la lista
            navigate('/modules/proveedores'); // Redirige a la lista de proveedores
        } catch (error) {
            console.error('Error al crear proveedor:', error);
            alert('Error al crear proveedor. Revisa los datos e intenta nuevamente.');
        }
    };

    const goToProveedorList = () => {
        navigate('/modules/proveedores');
    };

    return (
        <form onSubmit={handleSubmit} className="proveedor-form-container">
            <h2>Añadir Proveedor</h2>
            <div>
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Dirección</label>
                <textarea
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Teléfono</label>
                <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Categoría</label>
                <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="congelados">Congelados</option>
                    <option value="carnes">Carnes</option>
                    <option value="pescados">Pescados</option>
                    <option value="conservas">Conservas</option>
                    <option value="embalaje">Embalaje</option>
                    <option value="material_cocina">Material de Cocina</option>
                </select>
            </div>
            <div>
                <label>Reparto</label>
                <input
                    type="text"
                    name="reparto"
                    value={formData.reparto}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Latitud</label>
                <input
                    type="number"
                    name="latitud"
                    value={formData.latitud}
                    onChange={handleChange}
                    step="any"
                    required
                />
            </div>
            <div>
                <label>Longitud</label>
                <input
                    type="number"
                    name="longitud"
                    value={formData.longitud}
                    onChange={handleChange}
                    step="any"
                    required
                />
            </div>
            <div className="button-group">
                <button type="submit">Añadir Proveedor</button>
                <button
                    type="button"
                    className="go-to-list-button"
                    onClick={goToProveedorList}
                >
                    Ver Lista de Proveedores
                </button>
            </div>
        </form>
    );
};

export default ProveedorForm;
