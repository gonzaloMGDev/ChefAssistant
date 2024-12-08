ChefAssistant
Este es un proyecto de gestión de recetas y tareas relacionadas con la cocina, compuesto por un backend desarrollado en Django y un frontend en React.

Requisitos del Sistema
Backend (Django)
Python 3.10 o superior
pip
virtualenvwrapper (recomendado para gestionar entornos virtuales)
Frontend (React)
Node.js (versión 14 o superior)
npm (incluido con Node.js)

Instrucciones de Configuración
1. Clonar el repositorio
Primero, clona este repositorio desde GitHub:
git clone https://github.com/gonzaloMGDev/ChefAssistant.git
cd ChefAssistant

2. Configuración del Backend (Django)
Navegar al directorio del backend:
Instalar y configurar virtualenvwrapper (si no lo tienes):
Instala virtualenvwrapper y configúralo en tu sistema:

pip install virtualenvwrapper
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=$(which python3)
source $(which virtualenvwrapper.sh)

Crear un entorno virtual con virtualenvwrapper:
mkvirtualenv chef-assistant
workon chef-assistant
Esto creará y activará un entorno virtual llamado chef-assistant.

Instalar las dependencias del backend:
Con el entorno virtual activado (y estando a la altura del archivo requirements.txt):
pip install -r requirements.txt

Configurar la base de datos:
Ejecuta las migraciones para crear la base de datos:(situarse a la altura del archivo manage.py)
python3 manage.py makemigrations
python3 manage.py migrate

Ejecutar el servidor del backend:
Desde el mismo directorio que contiene manage.py:
python3 manage.py runserver
El backend estará disponible en: http://127.0.0.1:8000/.

3. Configuración del Frontend (React)
Navegar al directorio del frontend:
cd ../chefAssistante-frontend

Instalar las dependencias del frontend:
npm install

Iniciar el servidor de desarrollo:
npm run dev
El frontend estará disponible en: http://localhost:5173/ (si esto varía, será necesario ajustar las peticiones en el frontend para apuntar a la API del backend).

4. Ejecución conjunta del proyecto
Para ejecutar el proyecto completo, abre dos terminales:

Terminal 1: Ejecutar el backend (Django)
Navega al directorio del backend:
Activa el entorno virtual:
workon chef-assistant
Ejecuta el servidor del backend (desde el directorio donde se encuentra manage.py):
python3 manage.py runserver

Terminal 2: Ejecutar el frontend (React)
Navega al directorio del frontend:
Inicia el servidor del frontend (desde el directorio donde se encuentra package.json):
npm run dev

