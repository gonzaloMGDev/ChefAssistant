# backend/chef/views.py

from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer
from django.urls import reverse
from django.http import HttpResponse


# Vista de bienvenida para la raíz de la API
@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    # Genera las URLs absolutas para los endpoints de registro y login
    register_url = request.build_absolute_uri(reverse('register'))
    login_url = request.build_absolute_uri(reverse('token_obtain_pair'))

    # Devuelve una respuesta HTML con enlaces de registro e inicio de sesión
    html_content = f"""
    <html>
        <body>
            <h1>Bienvenido a la API de Chef Assistant</h1>
            <p>Para registrar un nuevo usuario, haga clic en el siguiente enlace:</p>
            <a href="{register_url}">Registrar Usuario</a>
            <br><br>
            <p>Si ya tiene una cuenta, puede iniciar sesión aquí:</p>
            <a href="{login_url}">Iniciar Sesión</a>
        </body>
    </html>
    """
    return HttpResponse(html_content)

# Vista para el registro de nuevos usuarios
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'GET':
        # Respuesta para solicitudes GET
        return Response(
            {"message": "Este endpoint permite registrar usuarios. Use POST para enviar datos."},
            status=status.HTTP_200_OK
        )
    elif request.method == 'POST':
        # Procesa el registro de usuarios
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario registrado exitosamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# views.py
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView
from .models import Receta
from .serializers import RecetaSerializer

class RecetaListCreateView(ListCreateAPIView):
    serializer_class = RecetaSerializer
    permission_classes = [IsAuthenticated]  # Requiere autenticación

    def get_queryset(self):
        return Receta.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)




from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Temporizador
from .serializers import TemporizadorSerializer

class TemporizadorListCreateView(ListCreateAPIView):
    serializer_class = TemporizadorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtra los temporizadores por usuario autenticado
        return Temporizador.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        # Asigna automáticamente el usuario autenticado al temporizador
        print("Encabezados recibidos:", self.request.headers)
        serializer.save(usuario=self.request.user)
    

class TemporizadorDestroyView(DestroyAPIView):
    serializer_class = TemporizadorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Permite eliminar temporizadores del usuario autenticado
        return Temporizador.objects.filter(usuario=self.request.user)



from rest_framework.generics import ListCreateAPIView
from .models import Proveedor
from .serializers import ProveedorSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView  # Importar APIView

class ProveedorListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        proveedores = Proveedor.objects.filter(usuario=request.user)
        serializer = ProveedorSerializer(proveedores, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProveedorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(usuario=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Galeria
from .serializers import GaleriaSerializer

class GaleriaListCreateView(APIView):
    def get(self, request):
        categoria = request.query_params.get('categoria')
        if categoria:
            imagenes = Galeria.objects.filter(categoria=categoria)
        else:
            imagenes = Galeria.objects.all()
        serializer = GaleriaSerializer(imagenes, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = GaleriaSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GaleriaDetailView(APIView):
    def delete(self, request, pk):
        try:
            imagen = Galeria.objects.get(pk=pk)
            imagen.delete()
            return Response({"message": "Imagen eliminada con éxito."}, status=status.HTTP_204_NO_CONTENT)
        except Galeria.DoesNotExist:
            return Response({"error": "Imagen no encontrada."}, status=status.HTTP_404_NOT_FOUND)



