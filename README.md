# API REST — Posts Foro & Turnos Clínica

API REST construida con **Node.js + Express + MySQL** que gestiona dos recursos independientes: posts de un foro y turnos de una clínica. Proyecto desarrollado como parte de la asignatura Programación Web — Ingeniería de Ejecución en Informática, Santo Tomás Puerto Montt.

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
Trabajo_Web/
├──base de datos_web/
|   └──base de datos_web_23_24.sql
├── post_foro/
│   └── backend/
│       ├── controllers/
│       │   └── postsForoController.js        # Lógica CRUD posts foro
│       ├── routes/
│       │   └── postForo.js                   # Rutas /posts-foro
│       ├── postman/
│       │   └── API Posts Foro.postman_collection.json
│       ├── .env
│       ├── app.js
│       ├── db.js
│       └── package.json
│
└── turno_clinica/
    └── backend/
        ├── controllers/
        │   └── turnosClinicaController.js    # Lógica CRUD turnos clínica
        ├── routes/
        │   └── turnosClinica.js              # Rutas /turnos-clinica
        ├── postman/
        │   └── API Turnos Clinica.postman_collection.json
        ├── .env
        ├── app.js
        ├── db.js
        ├── base_de_datos_web_23_24.sql       # Script SQL completo
        └── package.json
```

---

## Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

### 2. Instalar dependencias (en cada proyecto)

```bash
cd post_foro/backend
npm install

cd ../../turno_clinica/backend
npm install
```

### 3. Crear el archivo `.env` en cada proyecto

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tablas_web
```

### 4. Crear la base de datos y tablas

Ejecutar el archivo `base_de_datos_web_23_24.sql` o correr manualmente:

```sql
CREATE DATABASE tablas_web;

USE tablas_web;

CREATE TABLE posts_foro (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(180) NOT NULL,
    contenido TEXT NOT NULL,
    autor_alias VARCHAR(100),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    vistas INT DEFAULT 0 NOT NULL,
    cerrado BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

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

### 5. Iniciar los servidores

```bash
# Desarrollo (con hot reload)
npm run dev

# Producción
npm start
```

Ambos proyectos corren en `http://localhost:3000` (iniciar uno a la vez o cambiar el PORT en `.env`).

---

## Endpoints — Posts Foro

Base URL: `http://localhost:3000/posts-foro`

| Método | Endpoint           | Descripción               |
|--------|--------------------|---------------------------|
| POST   | `/posts-foro`      | Crear un nuevo post        |
| GET    | `/posts-foro`      | Listar todos los posts     |
| GET    | `/posts-foro/:id`  | Obtener un post por ID     |
| PUT    | `/posts-foro/:id`  | Actualizar un post         |
| DELETE | `/posts-foro/:id`  | Eliminar un post           |

### POST `/posts-foro`
**Body:**
```json
{
    "titulo": "Mi primer post",
    "contenido": "Este es el contenido del post",
    "autor_alias": "usuario1"
}
```
**Respuesta (201):**
```json
{ "mensaje": "Post guardado con éxito", "id": 1 }
```

### GET `/posts-foro`
**Respuesta (200):**
```json
[
    {
        "id": 1,
        "titulo": "Mi primer post",
        "contenido": "Este es el contenido del post",
        "autor_alias": "usuario1",
        "fecha_creacion": "2026-05-09T19:47:13.000Z",
        "vistas": 0,
        "cerrado": 0
    }
]
```

### GET `/posts-foro/:id`
**Respuesta (200):** objeto único con los mismos campos.

### PUT `/posts-foro/:id`
**Body:**
```json
{
    "titulo": "Titulo actualizado",
    "contenido": "Contenido actualizado",
    "autor_alias": "usuario1",
    "vistas": 5,
    "cerrado": false
}
```
**Respuesta (201):**
```json
{ "mensaje": "Post actualizado con éxito", "id": 0 }
```

### DELETE `/posts-foro/:id`
**Respuesta (201):**
```json
{ "mensaje": "Post eliminado con éxito" }
```

**Campos obligatorios:** `titulo`, `contenido`, `autor_alias`

---

## Endpoints — Turnos Clínica

Base URL: `http://localhost:3000/turnos-clinica`

| Método | Endpoint               | Descripción                  |
|--------|------------------------|------------------------------|
| POST   | `/turnos-clinica`      | Crear un nuevo turno          |
| GET    | `/turnos-clinica`      | Listar todos los turnos       |
| GET    | `/turnos-clinica/:id`  | Obtener un turno por ID       |
| PUT    | `/turnos-clinica/:id`  | Actualizar un turno completo  |
| DELETE | `/turnos-clinica/:id`  | Eliminar un turno             |

### POST `/turnos-clinica`
**Body:**
```json
{
    "paciente_nombre": "Fernando García",
    "especialidad": "Cirugía",
    "medico_nombre": "Dr. Pepe",
    "consultorio": "A3",
    "estado": "pendiente"
}
```
**Respuesta (201):**
```json
{ "mensaje": "Turno guardado con éxito", "id": 1 }
```

### GET `/turnos-clinica`
**Respuesta (200):**
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

### GET `/turnos-clinica/:id`
**Respuesta (200):** objeto único con los mismos campos.

### PUT `/turnos-clinica/:id`
**Body:**
```json
{
    "paciente_nombre": "Fernando García",
    "especialidad": "Cirugía",
    "medico_nombre": "Dr. Pepe Actualizado",
    "consultorio": "A3",
    "estado": "confirmado"
}
```
**Respuesta (201):**
```json
{ "mensaje": "Post actualizado con éxito", "id": 0 }
```

### DELETE `/turnos-clinica/:id`
**Respuesta (201):**
```json
{ "mensaje": "Post eliminado con éxito" }
```

**Campos obligatorios:** `paciente_nombre`, `especialidad`, `medico_nombre`  
**Valores por defecto:** `consultorio` → `""`, `estado` → `"pendiente"`

---

## Pruebas con Postman

Cada proyecto incluye su colección de Postman lista para importar:

| Colección | Archivo |
|-----------|---------|
| Posts Foro | `post_foro/backend/postman/API Posts Foro.postman_collection.json` |
| Turnos Clínica | `turno_clinica/backend/postman/API Turnos Clinica.postman_collection.json` |

**Para importar:**
1. Abrir Postman → **Import**
2. Seleccionar el archivo `.json` correspondiente
3. Ejecutar en orden: POST → GET → GET/id → PUT/id → DELETE/id

---

## Validaciones y manejo de errores

| Código | Situación |
|--------|-----------|
| `200 OK` | Consulta exitosa (GET) |
| `201 Created` | Operación de escritura exitosa (POST, PUT, DELETE) |
| `400 Bad Request` | Campos obligatorios faltantes |
| `500 Internal Server Error` | Error en la base de datos |

---

## Autor

Proyecto desarrollado para EVA 2 — Programación Web  
Instituto Santo Tomás, sede Puerto Montt, Tomás Alexis Quintana Ramos.
