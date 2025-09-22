# Bookstore – Prep Parcial Web

Este proyecto corresponde al Preparcial de Programación Web.  
Implementa un sistema CRUD de autores con backend en Spring Boot y frontend en Next.js (React con TypeScript).

---

## Tecnologías utilizadas
- Backend: Java + Spring Boot + Maven + Docker
- Frontend: Next.js 15 (App Router) con React y TypeScript
- Estilos: CSS y componentes básicos

---

## Estructura del repositorio
```
bookstore-back-1/
├── src/                  # Código fuente backend (Spring Boot)
├── prep-parcial-next/    # Proyecto frontend con Next.js
├── Dockerfile            # Imagen para backend
├── pom.xml               # Dependencias de Maven
└── README.md             # Este archivo
```

---

```

---

### 2. Backend (Spring Boot)
1. Compilar y construir la imagen:
   ```bash
   docker build ./ -t bookstore
   ```
2. Ejecutar contenedor:
   ```bash
   docker run -d -p 127.0.0.1:8080:8080 bookstore
   ```
3. Probar que funciona:  
   Abrir en navegador [http://127.0.0.1:8080/api/authors](http://127.0.0.1:8080/api/authors).  
   Si ves un JSON con autores, el backend está funcionando.


---

### 3. Frontend (Next.js)

1. Entrar a la carpeta del frontend:
   ```bash
   cd prep-parcial-next
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear archivo `.env.local` en la raíz del proyecto con el siguiente contenido:
   ```env
   NEXT_PUBLIC_API_BASE=http://127.0.0.1:8080
   ```
4. Ejecutar servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abrir en navegador [http://localhost:3000](http://localhost:3000).

---



---

## Autores
