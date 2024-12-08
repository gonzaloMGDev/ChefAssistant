# backend/chef/urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import api_root, register_user
from .views import RecetaListCreateView ,TemporizadorListCreateView, TemporizadorDestroyView , ProveedorListCreateView , GaleriaListCreateView , GaleriaDetailView

urlpatterns = [
    path('', api_root, name='api_root'),  # Ruta para /api/, muestra la vista de bienvenida
    path('register/', register_user, name='register'),  # Ruta para /api/register/, permite el registro de usuarios
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Ruta para /api/login/, devuelve el token JWT
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Ruta para /api/token/refresh/, refresca el token
    path('recetas/', RecetaListCreateView.as_view(), name='recetas-list-create'),
    path('temporizadores/', TemporizadorListCreateView.as_view(), name='temporizador-list-create'),
    path('temporizadores/<int:pk>/', TemporizadorDestroyView.as_view(), name='temporizador-destroy'),
    path('proveedores/', ProveedorListCreateView.as_view(), name='proveedores-list'),
    path('galeria/', GaleriaListCreateView.as_view(), name='galeria-list-create'),
    path('galeria/<int:pk>/', GaleriaDetailView.as_view(), name='galeria-detail'),

]
