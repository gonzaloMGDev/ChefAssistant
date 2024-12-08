import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RecipesPage from "./pages/RecipesPage";
import "./styles/global.css";
import Header from "./components/Header";
import TemporizadorPage from "./pages/TemporizadorPage";
import TemporizadorForm from "./components/modules/Temporizadores/TemporizadorForm";
import ProveedoresPage from "./pages/ProveedoresPage"; // Importar la página de Proveedores
import ProveedorForm from "./components/modules/Proveedores/ProveedorForm"; // Importar el formulario de Proveedores
import ProveedorMap from "./components/modules/Proveedores/ProveedorMap";
import GaleriaPage from './pages/GaleriaPage';
import GaleriaForm from './components/modules/Galeria/GaleriaForm';
function App() {
  return (
    <>
      <Header />
      <main>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/recipes"
            element={
              <ProtectedRoute>
                <RecipesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/temporizadores"
            element={
              <ProtectedRoute>
                <TemporizadorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/temporizadores/crear"
            element={
              <ProtectedRoute>
                <TemporizadorForm onTemporizadorCreated={() => {}} />
              </ProtectedRoute>
            }
          />
          {/* Rutas para el módulo de Proveedores */}
          <Route
            path="/modules/proveedores"
            element={
              <ProtectedRoute>
                <ProveedoresPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/proveedores/crear"
            element={
              <ProtectedRoute>
                <ProveedorForm onProveedorCreated={() => {}} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/proveedores/mapa"
            element={
              <ProtectedRoute>
                <ProveedorMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/galeria"
            element={
              <ProtectedRoute>
                <GaleriaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/galeria/crear"
            element={
              <ProtectedRoute>
                <GaleriaForm onImageAdded={() => {}} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

// Componente adicional para condicionar el renderizado del Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/login" && location.pathname !== "/register";

  return showNavbar ? <Navbar /> : null;
};

export default App;
