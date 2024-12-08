//components/modules/Termporizadores/TemporizadorForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TemporizadorService from './TemporizadorService';
import '../../../styles/TemporizadorPage.css'; // Archivo de estilos


const TemporizadorForm = ({ onTemporizadorCreated }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        minutos: 0,
        segundos: 0,
    });

    const navigate = useNavigate(); // Hook para redirigir

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await TemporizadorService.createTemporizador(formData);
            alert('Temporizador creado con éxito.');
            onTemporizadorCreated(); // Callback para actualizar la lista
            navigate('/modules/temporizadores'); // Redirige a la lista de temporizadores
        } catch (error) {
            console.error('Error al crear temporizador:', error);
            alert('Hubo un error al crear el temporizador.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Temporizador</h2>
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
                <label>Minutos</label>
                <input
                    type="number"
                    name="minutos"
                    value={formData.minutos}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>
            <div>
                <label>Segundos</label>
                <input
                    type="number"
                    name="segundos"
                    value={formData.segundos}
                    onChange={handleChange}
                    min="0"
                    max="59"
                    required
                />
            </div>
            <button type="submit">Crear Temporizador</button>
        </form>
    );
};

export default TemporizadorForm;
