import React, { useState } from 'react';
import RecipeList from '../components/modules/Recipes/RecipeList';
import RecipeForm from '../components/modules/Recipes/RecipeForm';
import '../styles/RecipesPage.css'; // Importamos los estilos

const RecipesPage = () => {
    const [showForm, setShowForm] = useState(false); // Controla qué vista mostrar
    const [recipesUpdated, setRecipesUpdated] = useState(false); // Indica si la lista debe actualizarse

    // Alterna entre la vista del formulario y la lista
    const toggleForm = () => setShowForm((prev) => !prev);

    // Maneja el evento de creación de receta
    const handleRecipeCreated = () => {
        setShowForm(false); // Vuelve a la vista de lista
        setRecipesUpdated(true); // Actualiza la lista
    };

    return (
        <div className="recipes-container">
            <h1>Recetas</h1>
            {showForm ? (
                <>
                    <RecipeForm onRecipeCreated={handleRecipeCreated} />
                    <button onClick={toggleForm}>Volver a la lista</button>
                </>
            ) : (
                <>
                    <button onClick={toggleForm}>Añadir Receta</button>
                    <RecipeList update={recipesUpdated} resetUpdate={() => setRecipesUpdated(false)} />
                </>
            )}
        </div>
    );
};

export default RecipesPage;
