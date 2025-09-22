# Documentación – Parcial 1 Bookstore
## Arquitectura de la solución
La solución está compuesta por dos módulos: un backend en Spring Boot  y un frontend en Next.js (React + TypeScript).
El backend expone la API REST en http://127.0.0.1:8080/api/authors, permitiendo operaciones CRUD sobre autores. El frontend consume esa API e implementa las vistas necesarias: listado de autores, creación, edición, eliminación y favoritos. La lógica de interacción con la API está centralizada en un custom hook (useAuthors), y la navegación entre vistas se maneja con el App Router de Next.js.
## Opción desarrollada en la Parte B
Implementé la opción de Accesibilidad.
Los formularios y botones incluyen atributos ARIA (aria-label, aria-invalid, aria-describedby, aria-pressed).
Los campos inválidos muestran mensajes accesibles (role="alert").
La navegación con teclado funciona con foco visible y tabulación ordenada.
Para validar: navegar con Tab y verificar que el foco resalta los campos y botones, revisar atributos ARIA en el inspector del navegador, y observar mensajes de error accesibles.
## Instrucciones para correr la aplicación

**Docker**:
docker build -t bookstore .
docker run -d -p 127.0.0.1:8080:8080 bookstore
Validar en: http://127.0.0.1:8080/api/authors.
Frontend
Entrar a la carpeta prep-parcial-next.
Instalar dependencias:
npm install
Levantar el servidor:
npm run dev
Abrir en http://localhost:3000.