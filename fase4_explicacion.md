# Fase 4: Guía Didáctica - Integración Frontend-Backend con JavaScript Vanilla & Fetch API

Este documento aborda la comunicación asíncrona mediante la **Fetch API**, la **manipulación del DOM** basada en eventos y la delegación de eventos (*Event Delegation*).

---

## 1. 📡 La Fetch API y el Asincronismo (`async` / `await`)

La **Fetch API** es una interfaz nativa del navegador para realizar peticiones HTTP asíncronas sin necesidad de librerías externas (como Axios o jQuery).

### Petición `GET` (Lectura):
```javascript
async function loadContacts() {
    const response = await fetch('/api/contactos');
    const contactsList = await response.json();
    renderContacts(contactsList);
}
```
- `fetch('/api/contactos')` realiza un request HTTP GET.
- `response.ok` (booleano) verifica si el código de estado HTTP está entre `200` y `299`.
- `response.json()` parsea el cuerpo del mensaje de formato JSON a un objeto/array de JavaScript.

### Petición `POST` y `PUT` (Escritura y Modificación):
```javascript
const response = await fetch('/api/contactos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' // Indica al servidor que el cuerpo es JSON
    },
    body: JSON.stringify(contactData) // Convierte el objeto JS a texto JSON
});
```

---

## 2. ⚡ Delegación de Eventos (*Event Delegation*)

En lugar de agregar un *event listener* a cada botón de cada fila individual de la tabla (lo cual consume mucha memoria si hay cientos de filas y requiere volver a escuchar eventos al re-renderizar), escuchamos el evento `click` en el contenedor padre (`<tbody>`):

```javascript
contactsTableBody.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.btn-edit');
    const deleteBtn = e.target.closest('.btn-delete');

    if (editBtn) {
        // Manejar edicion leyendo dataset.id
    }
    if (deleteBtn) {
        // Manejar eliminacion
    }
});
```
- **`e.target.closest(selector)`**: Busca el ancestro más cercano que coincida con la clase del botón, permitiendo clicks incluso en los íconos internos.
- **Atributos `data-*` (`dataset`)**: Permiten adjuntar el `id` del contacto directamente en el marcado HTML para recuperarlo en el script.

---

## 3. 🛡️ Seguridad Web: Prevención de XSS (Cross-Site Scripting)

Al insertar datos dinámicos provenientes de un usuario en el HTML mediante `innerHTML`, existe el riesgo de inyección de código script malicioso (XSS).

Para prevenirlo, implementamos la función helper `escapeHTML()`:
```javascript
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
```
Esta función transforma caracteres especiales HTML en entidades seguras antes de insertarlos en el DOM.

---

## 🚀 Resumen del Aprendizaje
Con la **Fase 4** completada:
- El cliente `app.js` gestiona el estado de la UI y realiza peticiones `fetch()` a la REST API de Flask.
- Se implementó un filtro de búsqueda reactivo en tiempo real.
- Las notificaciones tipo Toast informan al usuario del resultado de cada operación HTTP.
