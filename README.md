# Cine API

API REST para administrar películas y actores favoritos de empleados de IPLACEX.

## Descripción

Esta API permite crear, leer, actualizar y eliminar registros de películas y actores. Está desarrollada con:

- Node.js
- Express
- MongoDB Atlas
- CORS

## Estructura del proyecto

cine-api/
├─ src/
│ ├─ common/
│ │ └─ db.js
│ ├─ pelicula/
│ │ ├─ pelicula.js
│ │ ├─ controller.js
│ │ └─ routes.js
│ └─ actor/
│ ├─ actor.js
│ ├─ controller.js
│ └─ routes.js
├─ server.js
├─ package.json
└─ README.md
