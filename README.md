# 📖 Agenda de Contactos (CRUD Pedagógico Web & HTTP)

¡Bienvenido/a a la **Agenda de Contactos**! Este proyecto fue desarrollado desde cero con un **enfoque 100% pedagógico** para aprender y repasar los fundamentos del desarrollo web fullstack: el protocolo **HTTP**, marcado semántico **HTML5**, diseño responsivo con **CSS3 Vanilla**, programación asíncrona con **JavaScript Vanilla (Fetch API)** y desarrollo backend con **Python (Flask)** y **SQLite**.

---

## 🎯 ¿Qué se puede hacer en esta aplicación?

Desde la interfaz visual puedes realizar las operaciones principales de un sistema **CRUD** (Crear, Leer, Actualizar, Borrar):

1. ➕ **Agregar Contactos**: Registrar nuevos contactos indicando Nombre, Teléfono, Email y Categoría (Personal, Trabajo, Familia, Otro) con validación inmediata.
2. 📋 **Listar Contactos**: Visualizar la lista de contactos almacenados en la base de datos de manera limpia e interactiva.
3. 🔍 **Búsqueda en Tiempo Real**: Filtrar contactos instantáneamente al escribir en la barra de búsqueda por nombre, teléfono o email.
4. ✏️ **Editar Contactos**: Abrir una ventana modal emergente para modificar los datos de cualquier contacto sin recargar la página.
5. 🗑️ **Eliminar Contactos**: Borrar un contacto de la base de datos con un simple clic.
6. 🔔 **Notificaciones Visuales (Toasts)**: Recibir retroalimentación inmediata (mensajes de éxito o error) a través de avisos dinámicos en la pantalla (sin molestos `alert()` nativos).

---

## 📚 Estructura Didáctica del Proyecto

El código está organizado de forma limpia separando responsabilidades:

```text
repaso-contactos/
├── README.md               <-- Guía principal del proyecto (estás aquí)
├── app.py                  <-- Servidor Backend REST API en Flask
├── db.py                   <-- Conexión y gestión de la Base de Datos SQLite
├── schema.sql              <-- Estructura de la tabla SQL y datos de prueba
├── .gitignore              <-- Archivos ignorados por Git (.db, cache)
│
├── docs/                   <-- 📁 Guías teóricas y didácticas paso a paso
│   ├── fase1_explicacion.md  # HTML5 Semántico, Accesibilidad (a11y) y CSS3 (Variables, Grid, Flexbox)
│   ├── fase2_explicacion.md  # Base de datos SQLite, tipos de datos SQL y sqlite3.Row
│   ├── fase3_explicacion.md  # Arquitectura REST API, Verbos HTTP (GET, POST, PUT, DELETE) y JSON
│   ├── fase4_explicacion.md  # Programación asíncrona con Fetch API, DOM y Seguridad (XSS)
│   └── fase5_explicacion.md  # Inspección de tráfico en DevTools y Códigos de Estado HTTP
│
├── static/                 <-- 📁 Archivos estáticos del cliente
│   ├── css/
│   │   └── styles.css        # Estilos visuales, sistema de diseño, Modal y Toasts
│   └── js/
│       └── app.js            # Lógica frontend en JS Vanilla (Fetch API y manipulación del DOM)
│
└── templates/              <-- 📁 Plantillas HTML
    └── index.html            # Esqueleto semántico de la aplicación
```

---

## 🛠️ Requisitos Previos

Solo necesitas tener instalado en tu computadora:
- **Python 3.8** o superior (puedes verificarlo ejecutando `python3 --version` en tu terminal).
- **Git** (opcional, para clonar el repositorio).

---

## 🚀 Guía Paso a Paso: Cómo Clonar, Instalar y Ejecutar

Sigue estos sencillos pasos en tu terminal:

### Paso 1: Clonar el repositorio
Abre tu terminal y descarga el proyecto a tu computadora:
```bash
git clone https://github.com/tu-usuario/repaso-contacto.git
cd repaso-contacto
```

### Paso 2: Instalar Flask
Este proyecto no requiere frameworks pesados ni configuraciones complejas. Solo necesita **Flask**:
```bash
pip install flask
```

*(Opcional: Si prefieres usar un entorno virtual Python)*:
```bash
python3 -m venv venv
source venv/bin/activate  # En Linux/Mac
# venv\Scripts\activate   # En Windows
pip install flask
```

### Paso 3: Iniciar el servidor
Ejecuta el script principal de Python:
```bash
python3 app.py
```

En tu terminal verás un mensaje similar a este:
```text
Base de datos inicializada con éxito con el esquema y datos de prueba.
Iniciando Servidor Flask en http://127.0.0.1:5000 ...
 * Running on http://127.0.0.1:5000
```

### Paso 4: Abrir en el Navegador Web
¡Listo! Abre tu navegador web favorito (Chrome, Firefox, Edge, Brave, Safari) e ingresa a la siguiente dirección:
👉 **`http://127.0.0.1:5000`**

---

## 🎓 ¿Cómo usar este repositorio para estudiar?

Te recomendamos explorar el código siguiendo la secuencia de aprendizaje en la carpeta `docs/`:

1. Lee **`docs/fase1_explicacion.md`** y compara con `templates/index.html` y `static/css/styles.css`.
2. Lee **`docs/fase2_explicacion.md`** para entender la persistencia en `schema.sql` y `db.py`.
3. Lee **`docs/fase3_explicacion.md`** para analizar las rutas REST API en `app.py`.
4. Lee **`docs/fase4_explicacion.md`** para entender cómo `static/js/app.js` consume los endpoints con `fetch()`.
5. Lee **`docs/fase5_explicacion.md`** para aprender a abrir la pestaña **Network** (F12) de tu navegador e inspeccionar cada petición HTTP.

---

## 📄 Licencia

Proyecto libre de uso didáctico y educativo. ¡Siéntete libre de modificarlo, experimentar y agregarle nuevas funcionalidades! 💡
