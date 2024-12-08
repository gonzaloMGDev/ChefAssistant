import React, { useState } from 'react';
import RecipesService from './RecipesService';

const RecipeForm = ({ onRecipeCreated }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        ingredientes: '',
        descripcion: '',
        imagen: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, imagen: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await RecipesService.createRecipe(formData);
            alert('Receta creada con éxito.');
            onRecipeCreated(); // Llama al callback para indicar que se creó la receta
        } catch (error) {
            console.error('Error al crear receta:', error);
            alert('Error al crear receta.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="recipe-form-container">
            <h2>Crear Receta</h2>
            <div>
                <label>Título</label>
                <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Ingredientes</label>
                <textarea
                    name="ingredientes"
                    value={formData.ingredientes}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Imagen</label>
                <input
                    type="file"
                    name="imagen"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit">Crear Receta</button>
        </form>
    );
};

export default RecipeForm;
