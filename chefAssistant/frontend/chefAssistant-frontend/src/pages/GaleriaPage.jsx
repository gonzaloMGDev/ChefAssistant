import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GaleriaList from '../components/modules/Galeria/GaleriaList';

const GaleriaPage = () => {
    const [imagesUpdated, setImagesUpdated] = useState(false);

    const handleImageAdded = () => {
        setImagesUpdated(true);
    };

    return (
        <div className="galeria-page-container">
            <h1>Galería</h1>
            <Link to="/modules/galeria/crear" className="add-image-button">
                Añadir Imagen
            </Link>
            <GaleriaList
                update={imagesUpdated}
                resetUpdate={() => setImagesUpdated(false)}
            />
        </div>
    );
};

export default GaleriaPage;
