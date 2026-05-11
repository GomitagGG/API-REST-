# API REST - Posts Foro

API REST construida con **Node.js + Express + MySQL** para gestionar posts de un foro. Proyecto desarrollado como parte de la asignatura Programación Web — Ingeniería en Informática, Santo Tomás Puerto Montt.

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
post_foro/
└── backend/
    ├── controllers/
    │   └── postsForoController.js   # Lógica de negocio (CRUD)
    ├── routes/
    │   └── postForo.js              # Definición de rutas
    ├── postman/
    │   └── API Posts Foro.postman_collection.json
    ├── .env                         # Variables de entorno (no subir)
    ├── app.js                       # Entry point del servidor
    ├── db.js                        # Conexión a la base de datos
    ├── package.json
    └── package-lock.json
```

---

## Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd post_foro/backend
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

CREATE TABLE posts_foro (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(180),
    contenido TEXT,
    autor_alias VARCHAR(100),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    vistas INT DEFAULT 0,
    cerrado BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);
```

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

Base URL: `http://localhost:3000/posts-foro`

| Método | Endpoint            | Descripción               |
|--------|---------------------|---------------------------|
| POST   | `/posts-foro`       | Crear un nuevo post        |
| GET    | `/posts-foro`       | Listar todos los posts     |
| GET    | `/posts-foro/:id`   | Obtener un post por ID     |
| PUT    | `/posts-foro/:id`   | Actualizar un post         |
| DELETE | `/posts-foro/:id`   | Eliminar un post           |

---

### POST `/posts-foro`

Crea un nuevo post en el foro.

**Body (JSON):**
```json
{
    "titulo": "Mi primer post",
    "contenido": "Este es el contenido del post",
    "autor_alias": "usuario1"
}
```

**Respuesta exitosa (201):**
```json
{
    "mensaje": "Post guardado con éxito",
    "id": 1
}
```

---

### GET `/posts-foro`

Retorna todos los posts.

**Respuesta exitosa (200):**
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

---

### GET `/posts-foro/:id`

Retorna un post específico por su ID.

**Respuesta exitosa (200):**
```json
{
    "id": 1,
    "titulo": "Mi primer post",
    "contenido": "Este es el contenido del post",
    "autor_alias": "usuario1",
    "fecha_creacion": "2026-05-09T19:47:13.000Z",
    "vistas": 0,
    "cerrado": 0
}
```

---

### PUT `/posts-foro/:id`

Actualiza un post completo por su ID.

**Body (JSON):**
```json
{
    "titulo": "Titulo actualizado",
    "contenido": "Contenido actualizado",
    "autor_alias": "usuario1",
    "vistas": 5,
    "cerrado": false
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

### DELETE `/posts-foro/:id`

Elimina un post por su ID.

**Respuesta exitosa (201):**
```json
{
    "mensaje": "Post eliminado con éxito"
}
```

---

## Pruebas con Postman

Se incluye la colección de Postman en `postman/API Posts Foro.postman_collection.json`.

Para importarla:
1. Abrir Postman
2. Click en **Import**
3. Seleccionar el archivo `API Posts Foro.postman_collection.json`
4. Ejecutar los endpoints en orden: POST → GET → GET/id → PUT/id → DELETE/id

---

## Validaciones implementadas

- Los campos `titulo`, `contenido` y `autor_alias` son **obligatorios** en POST y PUT.
- Se retorna `400 Bad Request` si falta alguno de estos campos.
- Se retorna `500 Internal Server Error` ante errores de base de datos.
- Conexión a MySQL mediante pool con variables de entorno.

---

## Autor

Proyecto desarrollado para EVA 2 — Programación Web  
Instituto Santo Tomás, sede Puerto Montt, Tomás Alexis Quintana Ramos.
