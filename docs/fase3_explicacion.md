# Fase 3: Guía Didáctica - Backend REST API con Python y Flask

Este documento explica la construcción del servidor web backend en **Flask**, los principios de las arquitecturas **REST API**, y cómo se mapean las operaciones CRUD con los **verbos y códigos de estado HTTP**.

---

## 1. 🌐 ¿Qué es una REST API y cómo funciona en HTTP?

Una **API REST** (*Representational State Transfer*) es un estilo de arquitectura de software que permite la comunicación entre cliente (Frontend) y servidor (Backend) utilizando el protocolo **HTTP**.

### Componentes de una Solicitud HTTP REST:
1. **Método / Verbo HTTP**: Define la acción a realizar sobre el recurso.
2. **Endpoint (URL)**: La ruta que identifica al recurso (ej. `/api/contactos`).
3. **Headers (Cabeceras)**: Metadatos de la petición. Ej: `Content-Type: application/json`.
4. **Body (Cuerpo)**: Payload con los datos en formato JSON (en solicitudes `POST` y `PUT`).

---

## 2. 🔀 Mapeo de Endpoints, Verbos HTTP y Códigos de Respuesta

En la aplicación `app.py`, implementamos los siguientes endpoints para el recurso **`contactos`**:

| Verbo HTTP | Endpoint | Acción CRUD | Código HTTP Exitoso | Códigos de Error |
| :--- | :--- | :--- | :--- | :--- |
| **`GET`** | `/api/contactos` | Read (Obtener todos) | `200 OK` | `500 Internal Error` |
| **`GET`** | `/api/contactos/<id>` | Read (Obtener uno) | `200 OK` | `404 Not Found` |
| **`POST`** | `/api/contactos` | Create (Crear nuevo) | `201 Created` | `400 Bad Request` |
| **`PUT`** | `/api/contactos/<id>` | Update (Modificar) | `200 OK` | `400 Bad Request` / `404 Not Found` |
| **`DELETE`**| `/api/contactos/<id>` | Delete (Eliminar) | `200 OK` | `404 Not Found` |

---

## 3. 🧠 Conceptos Teóricos Repasados en `app.py`

### A. Serialización a JSON (`jsonify`)
Los datos almacenados en SQLite se leen en Python como objetos `sqlite3.Row`. Para enviarlos a través de HTTP, se convierten a diccionarios (`dict(row)`) y Flask los serializa a cadenas JSON mediante `jsonify()`, agregando automáticamente la cabecera HTTP `Content-Type: application/json`.

### B. Significado de los Códigos de Estado HTTP Utilizados:
- **`200 OK`**: La solicitud fue exitosa y se retorna el recurso o mensaje correspondiente.
- **`201 Created`**: La solicitud `POST` creó exitosamente un nuevo recurso en la base de datos.
- **`400 Bad Request`**: El cliente envió datos inválidos o faltantes (por ejemplo, omitir el nombre o teléfono obligatorios).
- **`404 Not Found`**: El recurso con el ID solicitado no existe en la base de datos.

### C. Captura de Payload JSON (`request.get_json()`)
En las rutas `POST` y `PUT`, Flask extrae el cuerpo en JSON enviado por el cliente para procesarlo y realizar las validaciones correspondientes antes de ejecutar la consulta SQL.

---

## 🚀 Resumen del Aprendizaje
Con la **Fase 3** completada:
- Servidor `app.py` en Flask listo con todas las operaciones CRUD.
- Endpoints probados y validados con los estándares de códigos de respuesta HTTP.
- Listo para ser consumido desde el cliente con **JS Vanilla & Fetch API (Fase 4)**.
