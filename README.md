# Proyecto-casino

# Descripción
La aplicación es una simulación de un sistema para monitorear una mesa de casino.
Desarrollada con los lenguajes de programación JavaScript, PHP y utilizando la biblioteca jQuery.

# Instalación
Para poder testear la aplicación no se necesita de algún requerimiento especial en el sistema (Windows o Linux)
Por favor, seguir los siguientes pasos:

1. Ubicarse en la carpeta del proyecto por medio de CMD o Terminal en sistemas UNIX.
2. Escribir el siguiente comando:
   php -S localhost:8000
// Esto ejecuta un servidor propio de PHP para testear la aplicación en el puerto 8000.

3. Abrir en el navegador http://localhost:8000
4. Probar la aplicación.

Nota: La aplicación utiliza una base de datos propia que se actualiza cada que se realiza alguna acción del CRUD. Escrita en formato JSON.

# Contenido
El directorio raíz contiene carpetas y archivos propios de PHP que sirven para ejecutar el servidor local.
La carpeta de "js" contiene los scripts que sirven de lógica de la aplicación.
La carpeta de "services" contiene los datos de los jugadores en el fichero "data.txt" y los archivos restantes son PHP que sirven como servicios para el CRUD.
