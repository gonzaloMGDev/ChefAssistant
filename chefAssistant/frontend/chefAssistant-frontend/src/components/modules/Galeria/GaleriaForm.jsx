import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GaleriaService from './GaleriaService';
import '../../../styles/GaleriaPage.css'; // Archivo de estilos

const GaleriaForm = ({ onImageAdded }) => {
    const [formData, setFormData] = useState({
        categoria: 'restaurante', // Default category
    });
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('categoria', formData.categoria);
        data.append('imagen', imagen);

        try {
            await GaleriaService.createGaleria(data);
            alert('Imagen subida con éxito.');
            onImageAdded();
            navigate('/modules/galeria');
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="galeria-form-container">
            <h2>Añadir Imagen</h2>
            <div>
                <label>Categoría</label>
                <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="restaurante">Restaurante</option>
                    <option value="platos">Platos</option>
                    <option value="cocina">Cocina</option>
                </select>
            </div>
            <div>
                <label>Imagen</label>
                <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <div className="button-group">
                <button type="submit" className="upload-button">Subir Imagen</button>
                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate('/modules/galeria')}
                >
                    Volver a la Galería
                </button>
            </div>
        </form>
    );
};

export default GaleriaForm;
