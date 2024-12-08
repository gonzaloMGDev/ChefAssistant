// src/components/modules/Recipes/RecipeList.jsx

import React, { useState, useEffect } from 'react';
import RecipesService from './RecipesService';
import '../../../styles/RecipesPage.css'; // Archivo de estilos

const RecipeList = ({ update, resetUpdate }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await RecipesService.getRecipes();
                setRecipes(data);
                if (update) resetUpdate(); // Restablece el indicador de actualización
            } catch (err) {
                console.error('Error fetching recipes:', err.response || err.message);
                setError(err.response?.status === 401 
                    ? 'No estás autenticado. Por favor, inicia sesión.'
                    : 'Error al obtener recetas.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [update]); // Vuelve a cargar cuando 'update' cambia

    if (loading) return <p>Cargando recetas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="recipe-list-container">
            <h2 className="recipe-list-title">Mis Recetas</h2>
            {recipes.length === 0 ? (
                <p>No tienes recetas creadas aún.</p>
            ) : (
                <ul className="recipe-list">
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="recipe-card">
                            {recipe.imagen && (
                                <img src={recipe.imagen} alt={recipe.titulo} className="recipe-image" />
                            )}
                            <h3 className="recipe-title">{recipe.titulo}</h3>
                            <h4 className="recipe-section-title">Ingredientes</h4>
                            <p className="recipe-ingredients">{recipe.ingredientes}</p>
                            <h4 className="recipe-section-title">Descripción</h4>
                            <p className="recipe-description">{recipe.descripcion}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecipeList;
