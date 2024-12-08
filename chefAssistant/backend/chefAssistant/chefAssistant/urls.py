"""
URL configuration for chefAssistant project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# backend/chefAssistant/urls.py

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from chef import views  # Importa la vista de bienvenida
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('chef.urls')),  # Rutas de la app chef
    path('', views.api_root, name='api_root'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
