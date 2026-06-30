# Sistema de Reservas
=======================
## Descripción
Sistema de reservas es una aplicación que permite a los usuarios registrar, iniciar sesión, crear, leer, actualizar y eliminar reservas. La aplicación utiliza MongoDB como base de datos y Node.js como servidor.

## Stack
* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT) para autenticación

## Instalación
1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. Configurar la variable de entorno `MONGO_URI` con la URL de la base de datos de MongoDB
4. Iniciar el servidor con `npm start`

## Docker
1. Construir la imagen con `docker build -t sistema-de-reservas .`
2. Iniciar el contenedor con `docker run -p 5000:5000 sistema-de-reservas`

## Endpoints
### Autenticación
* **POST /api/auth/register**: Registrar un nuevo usuario
* **POST /api/auth/login**: Iniciar sesión
* **POST /api/auth/logout**: Cerrar sesión (requiere autenticación)

### Reservas
* **GET /api/reservations**: Listar reservas (requiere autenticación)
* **POST /api/reservations**: Crear reserva (requiere autenticación)
* **GET /api/reservations/:id**: Obtener reserva por ID (requiere autenticación)
* **PUT /api/reservations/:id**: Actualizar reserva (requiere autenticación)
* **DELETE /api/reservations/:id**: Eliminar reserva (requiere autenticación)

### Disponibilidad
* **GET /api/availability**: Listar disponibilidad (requiere autenticación)

### Usuarios
* **GET /api/users**: Listar usuarios (requiere autenticación)
* **GET /api/users/:id**: Obtener usuario por ID (requiere autenticación)

## Seguridad
La aplicación utiliza JSON Web Token (JWT) para autenticar a los usuarios. Los endpoints que requieren autenticación están marcados con `(requiere autenticación)`. Los tokens de acceso se generan al iniciar sesión y se envían en la respuesta. Los tokens deben ser incluidos en la cabecera `Authorization` de las solicitudes para acceder a los endpoints protegidos.

## Modelo de Reserva
El modelo de reserva tiene los siguientes campos:
* `date`: Fecha de la reserva (tipo `Date`)
* `time`: Hora de la reserva (tipo `String`)
* `userId`: ID del usuario que hizo la reserva (tipo `ObjectId`)
* `status`: Estado de la reserva (tipo `String`)