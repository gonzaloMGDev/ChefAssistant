# backend/chef/serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Receta

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Encripta la contraseña
        user.save()  # Guarda el usuario en la base de datos
        return user


class RecetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receta
        fields = ['id', 'usuario', 'titulo', 'ingredientes', 'descripcion', 'imagen', 'creado_en']
        read_only_fields = ['usuario', 'creado_en']

from rest_framework import serializers
from .models import Temporizador


class TemporizadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temporizador
        fields = ['id', 'usuario', 'nombre', 'minutos', 'segundos', 'creado_en']
        read_only_fields = ['usuario', 'creado_en']



from rest_framework import serializers
from .models import Proveedor

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = ['id', 'nombre', 'direccion', 'telefono', 'categoria', 'reparto', 'latitud', 'longitud']


from rest_framework import serializers
from .models import Galeria

class GaleriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Galeria
        fields = ['id', 'categoria', 'imagen']

