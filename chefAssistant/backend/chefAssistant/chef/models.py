from django.db import models

# Create your models here.
# models.py
from django.db import models
from django.conf import settings

class Receta(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='recetas'
    )
    titulo = models.CharField(max_length=200)
    ingredientes = models.TextField()
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='recetas/', null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.titulo} (por {self.usuario.username})"


class Temporizador(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="temporizadores"
    )
    nombre = models.CharField(max_length=200)
    minutos = models.PositiveIntegerField()  # Solo valores positivos
    segundos = models.PositiveIntegerField()  # Solo valores positivos (máx 59)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.usuario.username}"

from django.db import models
from django.contrib.auth.models import User

class Proveedor(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='proveedores')
    nombre = models.CharField(max_length=255)
    direccion = models.TextField()
    telefono = models.CharField(max_length=15, null=True, blank=True)
    categoria = models.CharField(max_length=100, choices=[
        ('congelados', 'Congelados'),
        ('carnes', 'Carnes'),
        ('pescados', 'Pescados'),
        ('conservas', 'Conservas'),
        ('embalaje', 'Embalaje'),
        ('material_cocina', 'Material de Cocina'),
    ])
    reparto = models.CharField(max_length=255, default='Lunes a Viernes')  # Días de reparto
    latitud = models.FloatField()  # Coordenadas de ubicación
    longitud = models.FloatField()  # Coordenadas de ubicación

    def __str__(self):
        return self.nombre




class Galeria(models.Model):
    CATEGORIAS_CHOICES = [
        ('restaurante', 'Restaurante'),
        ('platos', 'Platos'),
        ('cocina', 'Cocina'),
    ]
    categoria = models.CharField(max_length=50, choices=CATEGORIAS_CHOICES)
    imagen = models.ImageField(upload_to='galeria/')

    def __str__(self):
        return f"Imagen en {self.get_categoria_display()}"

