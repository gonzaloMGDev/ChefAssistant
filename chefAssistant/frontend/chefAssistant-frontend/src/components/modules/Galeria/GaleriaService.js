import axios from '../../../utils/api';

const GaleriaService = {
    getGaleria: () => axios.get('/galeria/').then((response) => response.data),
    createGaleria: (data) => axios.post('/galeria/', data).then((response) => response.data),
    deleteGaleria: (id) => axios.delete(`/galeria/${id}/`), // Endpoint para eliminar
};

export default GaleriaService;
