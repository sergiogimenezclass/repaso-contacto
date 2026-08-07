# Fase 5: Guía Didáctica - Repaso HTTP Avanzado, Inspección en DevTools y Manejo de Errores

Este documento concluye el proyecto **Agenda de Contactos (CRUD)** integrando un repaso profundo sobre el protocolo **HTTP**, las mejores prácticas de validación y cómo inspeccionar el tráfico de red en el navegador.

---

## 1. 🔍 Inspección del Protocolo HTTP con Developer Tools (Network Tab)

Al interactuar con la aplicación web, el navegador (en la pestaña **Network** / **Red** de F12) muestra el intercambio de mensajes entre el Frontend y Backend.

### Anatomía de una Transacción HTTP en la Agenda:

#### A. Solicitud de Creación (`POST /api/contactos`)
```http
POST /api/contactos HTTP/1.1
Host: 127.0.0.1:5000
Content-Type: application/json
Accept: application/json, */*

{
  "nombre": "Elena Rostova",
  "telefono": "+54 9 11 3344-5566",
  "email": "elena@ejemplo.com",
  "categoria": "Trabajo"
}
```

#### B. Respuesta del Servidor Flask
```http
HTTP/1.1 201 CREATED
Content-Type: application/json
Content-Length: 142

{
  "id": 4,
  "nombre": "Elena Rostova",
  "telefono": "+54 9 11 3344-5566",
  "email": "elena@ejemplo.com",
  "categoria": "Trabajo",
  "creado_en": "2026-08-07 22:35:00"
}
```

---

## 2. 🚦 Resumen Didáctico de Códigos de Estado HTTP (Status Codes)

En la REST API de esta aplicación utilizamos y gestionamos los siguientes códigos de estado:

### 2xx - Éxito (Success)
- **`200 OK`**: Respuesta estándar para solicitudes `GET`, `PUT` y `DELETE` procesadas correctamente.
- **`201 Created`**: Retornado en solicitudes `POST` confirmando que un nuevo recurso fue guardado en la base de datos.

### 4xx - Errores del Cliente (Client Errors)
- **`400 Bad Request`**: El cliente envió datos incompletos o en formato erróneo (por ejemplo, omitir un campo obligatorio).
- **`404 Not Found`**: El identificador `id` solicitado en la URL no existe en SQLite.

### 5xx - Errores del Servidor (Server Errors)
- **`500 Internal Server Error`**: Ocurre un fallo insospechado o excepción en el código Python de Flask.

---

## 3. 🎨 Notificaciones y UI de Usuario (Regla Cumplida)

Para ofrecer una experiencia de usuario (UX) moderna e interactiva:
- **Cero llamadas a `alert()` o `prompt()`**: Toda interacción es canalizada visualmente mediante componentes dinámicos en pantalla.
- **Notificaciones Toast**: Mensajes no bloqueantes que informan el éxito (`201`, `200`) o error (`400`, `404`) de la solicitud HTTP.
- **Ventana Modal**: Un formulario flotante que permite editar contactos sin abandonar ni recargar la página.

---

## 🎯 Conclusión del Plan de Proyecto
Con las **5 Fases completadas**, el proyecto cubre el ciclo de vida completo del desarrollo web:
1. **Fase 1A**: Estructura semántica accesible con **HTML5**.
2. **Fase 1B**: Diseño moderno y componentes de UI con **CSS3 Vanilla**.
3. **Fase 2**: Persistencia de datos relacionales en **SQLite**.
4. **Fase 3**: Servidor de backend y arquitectura **REST API en Python + Flask**.
5. **Fase 4**: Comunicación asíncrona client-side mediante **JS Vanilla & Fetch API**.
6. **Fase 5**: Integración final, manejo de errores HTTP y documentación didáctica.
