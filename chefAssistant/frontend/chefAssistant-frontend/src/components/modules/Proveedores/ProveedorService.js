import api from '../../../utils/api';

const ProveedorService = {
    getProveedores: async () => {
        const response = await api.get('/proveedores/');
        return response.data;
    },
    createProveedor: async (proveedor) => {
        const response = await api.post('/proveedores/', proveedor);
        return response.data;
    },
};

export default ProveedorService;
