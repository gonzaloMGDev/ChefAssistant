// src/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Ruta correcta a AuthContext

const useAuth = () => useContext(AuthContext);

export default useAuth;
