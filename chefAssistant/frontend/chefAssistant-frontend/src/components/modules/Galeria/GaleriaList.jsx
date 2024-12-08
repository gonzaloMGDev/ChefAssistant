import React, { useState, useEffect } from 'react';
import GaleriaService from './GaleriaService';
import '../../../styles/GaleriaPage.css'; // Archivo de estilos

const GaleriaList = () => {
    const [imagenes, setImagenes] = useState([]);
    const [error, setError] = useState(null);

    // Obtener las imágenes desde el servicio
    useEffect(() => {
        const fetchGaleria = async () => {
            try {
                const data = await GaleriaService.getGaleria();
                setImagenes(data);
            } catch (err) {
                console.error('Error al cargar las imágenes:', err);
                setError('Error al cargar las imágenes.');
            }
        };

        fetchGaleria();
    }, []);

    // Agrupar imágenes por categoría
    const groupByCategory = (items) =>
        items.reduce((acc, item) => {
            (acc[item.categoria] = acc[item.categoria] || []).push(item);
            return acc;
        }, {});

    const groupedImages = groupByCategory(imagenes);

    // Eliminar una imagen
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta imagen?');
        if (!confirmDelete) return;

        try {
            await GaleriaService.deleteGaleria(id); // Llama al servicio para eliminar la imagen
            setImagenes((prev) => prev.filter((imagen) => imagen.id !== id)); // Actualiza el estado local
            alert('Imagen eliminada con éxito.');
        } catch (err) {
            console.error('Error al eliminar la imagen:', err);
            alert('Error al eliminar la imagen.');
        }
    };

    // Mostrar error si existe
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="galeria-list-container">
            {/* Iterar sobre las categorías */}
            {Object.keys(groupedImages).map((categoria) => (
                <section key={categoria} className="categoria-section">
                    <h2 className="categoria-title">
                        {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                    </h2>
                    <div className="categoria-images">
                        {/* Mostrar las imágenes dentro de la categoría */}
                        {groupedImages[categoria].map((imagen) => (
                            <div key={imagen.id} className="image-card">
                                <img src={imagen.imagen} alt={`Categoría: ${categoria}`} />
                                <button
                                    className="delete-button-galeria"
                                    onClick={() => handleDelete(imagen.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default GaleriaList;
