# Documentación – Parcial 1 Bookstore:
## Arquitectura de la solución:
La aplicación sigue una arquitectura cliente-servidor compuesta por dos módulos. El backend, desarrollado en Spring Boot, expone una API REST en http://127.0.0.1:8080/api/authors que permite realizar operaciones CRUD sobre los autores. El frontend, implementado en Next.js con React y TypeScript, consume esta API para mostrar los datos y permitir la interacción del usuario.
En el frontend, la lógica de comunicación con el API está centralizada en un custom hook (useAuthors), encargado de manejar las operaciones de lectura, creación, edición y eliminación. Las vistas se implementan con el App Router de Next.js, definiendo páginas como /authors, /crear, /editar/[id] y /favoritos. El estado de la aplicación se maneja con hooks de React, y para los favoritos se extiende el estado global mediante Context, garantizando persistencia entre rutas.
## Extensiones implementadas:
**Parte A:**
Añadí un botón en cada autor de la lista para marcarlo o desmarcarlo como favorito. Usé un estado global con React Context para que los favoritos se mantengan al navegar entre páginas. También implementé la ruta /favoritos, que reutiliza el mismo componente de lista pero filtrando solo los autores seleccionados como favoritos.
**Parte B:**
Implementé la opción de Accesibilidad.
Los formularios y botones incluyen atributos ARIA (aria-label, aria-invalid, aria-describedby, aria-pressed).
Los campos inválidos muestran mensajes accesibles (role="alert").
La navegación con teclado funciona con foco visible y tabulación ordenada.
Para validar: navegar con Tab y verificar que el foco resalta los campos y botones, revisar atributos ARIA en el inspector del navegador, y observar mensajes de error accesibles.
## Instrucciones para correr la aplicación:

**Docker:**

docker build -t bookstore .
docker run -d -p 127.0.0.1:8080:8080 bookstore
Validar en: http://127.0.0.1:8080/api/authors.

**Frontend:**
Entrar a la carpeta prep-parcial-next.
Instalar dependencias:
npm install
Levantar el servidor:
npm run dev
Abrir en http://localhost:3000.