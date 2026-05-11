# API REST - Turnos Clínica

API REST construida con **Node.js + Express + MySQL** para gestionar turnos de una clínica. Proyecto desarrollado como parte de la asignatura Programación Web — Ingeniería de Ejecución en Informática, Santo Tomás Puerto Montt.

---

## Tecnologías utilizadas

- Node.js
- Express 5
- MySQL2
- dotenv
- nodemon (desarrollo)

---

## Estructura del proyecto

```
turno_clinica/
└── backend/
    ├── controllers/
    │   └── turnosClinicaController.js   # Lógica de negocio (CRUD)
    ├── routes/
    │   └── turnosClinica.js             # Definición de rutas
    ├── postman/
    │   └── API Turnos Clinica.postman_collection.json
    ├── .env                             # Variables de entorno (no subir)
    ├── app.js                           # Entry point del servidor
    ├── db.js                            # Conexión a la base de datos
    ├── base_de_datos_web_23_24.sql      # Script SQL de creación de tablas
    ├── package.json
    └── package-lock.json
```

---

## Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd turno_clinica/backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear el archivo `.env`

Crear un archivo `.env` en la raíz del backend con las siguientes variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tablas_web
```

### 4. Crear la base de datos y tabla

Ejecutar el siguiente script SQL en MySQL Workbench o tu cliente SQL:

```sql
CREATE DATABASE tablas_web;

USE tablas_web;

CREATE TABLE turnos_clinica (
    id INT NOT NULL AUTO_INCREMENT,
    paciente_nombre VARCHAR(120) NOT NULL,
    especialidad VARCHAR(80) NOT NULL,
    medico_nombre VARCHAR(120) NOT NULL,
    fecha_turno DATETIME DEFAULT CURRENT_TIMESTAMP,
    consultorio VARCHAR(20) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
```

> También podés ejecutar directamente el archivo `base_de_datos_web_23_24.sql` incluido en el proyecto.

### 5. Iniciar el servidor

```bash
# Desarrollo (con hot reload)
npm run dev

# Producción
npm start
```

El servidor correrá en `http://localhost:3000`

---

## Endpoints disponibles

Base URL: `http://localhost:3000/turnos-clinica`

| Método | Endpoint               | Descripción                  |
|--------|------------------------|------------------------------|
| POST   | `/turnos-clinica`      | Crear un nuevo turno          |
| GET    | `/turnos-clinica`      | Listar todos los turnos       |
| GET    | `/turnos-clinica/:id`  | Obtener un turno por ID       |
| PUT    | `/turnos-clinica/:id`  | Actualizar un turno completo  |
| DELETE | `/turnos-clinica/:id`  | Eliminar un turno             |

---

### POST `/turnos-clinica`

Crea un nuevo turno en la clínica.

**Body (JSON):**
```json
{
    "paciente_nombre": "Fernando García",
    "especialidad": "Cirugía",
    "medico_nombre": "Dr. Pepe",
    "consultorio": "A3",
    "estado": "pendiente"
}
```

**Respuesta exitosa (201):**
```json
{
    "mensaje": "Turno guardado con éxito",
    "id": 1
}
```

---

### GET `/turnos-clinica`

Retorna todos los turnos registrados.

**Respuesta exitosa (200):**
```json
[
    {
        "id": 1,
        "paciente_nombre": "Fernando García",
        "especialidad": "Cirugía",
        "medico_nombre": "Dr. Pepe",
        "fecha_turno": "2026-05-09T19:47:13.000Z",
        "consultorio": "A3",
        "estado": "pendiente"
    }
]
```

---

### GET `/turnos-clinica/:id`

Retorna un turno específico por su ID.

**Respuesta exitosa (200):**
```json
{
    "id": 1,
    "paciente_nombre": "Fernando García",
    "especialidad": "Cirugía",
    "medico_nombre": "Dr. Pepe",
    "fecha_turno": "2026-05-09T19:47:13.000Z",
    "consultorio": "A3",
    "estado": "pendiente"
}
```

---

### PUT `/turnos-clinica/:id`

Actualiza un turno completo por su ID.

**Body (JSON):**
```json
{
    "paciente_nombre": "Fernando García",
    "especialidad": "Cirugía",
    "medico_nombre": "Dr. Pepe Actualizado",
    "consultorio": "A3",
    "estado": "confirmado"
}
```

**Respuesta exitosa (201):**
```json
{
    "mensaje": "Post actualizado con éxito",
    "id": 0
}
```

---

### DELETE `/turnos-clinica/:id`

Elimina un turno por su ID.

**Respuesta exitosa (201):**
```json
{
    "mensaje": "Post eliminado con éxito"
}
```

---

## Pruebas con Postman

Se incluye la colección de Postman en `postman/API Turnos Clinica.postman_collection.json`.

Para importarla:
1. Abrir Postman
2. Click en **Import**
3. Seleccionar el archivo `API Turnos Clinica.postman_collection.json`
4. Ejecutar los endpoints en orden: POST → GET → GET/id → PUT/id → DELETE/id

---

## Validaciones implementadas

- Los campos `paciente_nombre`, `especialidad` y `medico_nombre` son **obligatorios** en POST y PUT.
- Si `consultorio` no se envía, se asigna cadena vacía por defecto.
- Si `estado` no se envía, se asigna `"pendiente"` por defecto.
- Se retorna `400 Bad Request` si faltan campos obligatorios.
- Se retorna `500 Internal Server Error` ante errores de base de datos.
- Conexión a MySQL mediante pool con variables de entorno.

---

## Autor

Proyecto desarrollado para EVA 2 — Programación Web  
Instituto Santo Tomás, sede Puerto Montt, Tomás Alexis Quintana Ramos.
