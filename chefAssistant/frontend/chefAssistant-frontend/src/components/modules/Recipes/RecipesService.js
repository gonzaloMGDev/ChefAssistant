// src/components/modules/Recipes/RecipesService.js

import api from '../../../utils/api';

const RecipesService = {
    getRecipes: async () => {
        const response = await api.get('/recetas/');
        return response.data;
    },

    createRecipe: async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        const response = await api.post('/recetas/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

export default RecipesService;
