// src/components/modules/Temporizadores/TemporizadorService.js
import api from '../../../utils/api';

const TemporizadorService = {
    getTemporizadores: async () => {
        const response = await api.get('temporizadores/');
        return response.data;
    },
    createTemporizador: async (data) => {
        const response = await api.post('temporizadores/', data);
        return response.data;
    },
    deleteTemporizador: async (id) => {
        await api.delete(`temporizadores/${id}/`);
    },
};

export default TemporizadorService;
