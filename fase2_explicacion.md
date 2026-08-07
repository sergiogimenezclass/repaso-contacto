# Fase 2: Guía Didáctica - Base de Datos SQLite y Persistencia de Datos

Este documento detalla el diseño de la base de datos de la **Agenda de Contactos**, los scripts SQL utilizados y la integración con Python mediante el módulo estándar `sqlite3`.

---

## 1. 🗄️ Esquema de la Base de Datos (SQLite)

SQLite es un motor de base de datos relacional ligero, basado en archivos de disco, que no requiere un proceso de servidor separado.

### Estructura de la Tabla `contactos`:

```sql
CREATE TABLE IF NOT EXISTS contactos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    email TEXT,
    categoria TEXT DEFAULT 'Personal',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Explicación de los campos y tipos de datos:
- **`id` (`INTEGER PRIMARY KEY AUTOINCREMENT`)**: Identificador único de cada contacto. SQLite asigna automáticamenet un entero incremental a cada nuevo registro.
- **`nombre` (`TEXT NOT NULL`)**: Almacena el nombre completo. La cláusula `NOT NULL` garantiza que no se puedan guardar registros sin nombre.
- **`telefono` (`TEXT NOT NULL`)**: Cadena de texto para el número de teléfono. Se prefiere `TEXT` sobre tipos numéricos para preservar formatos con prefijos (`+`), espacios o guiones.
- **`email` (`TEXT`)**: Campo opcional para almacenar la dirección de correo.
- **`categoria` (`TEXT DEFAULT 'Personal'`)**: Agrupa los contactos ('Personal', 'Trabajo', 'Familia', 'Otro'). Si no se especifica, toma 'Personal' por defecto.
- **`creado_en` (`TIMESTAMP DEFAULT CURRENT_TIMESTAMP`)**: Marca de tiempo generada automáticamente por SQLite al insertar el registro.

---

## 2. 🐍 Módulo Python de Conexión (`db.py`)

Python incluye de forma nativa el módulo `sqlite3` para interactuar con bases de datos SQLite.

### Conceptos clave en `db.py`:

1. **Conexión (`sqlite3.connect()`)**: Abre la conexión con el archivo local `contactos.db`. Si el archivo no existe, SQLite lo crea automáticamente.
2. **`row_factory = sqlite3.Row`**:
   Configuración fundamental para APIs REST. Transforma las tuplas de resultado en objetos tipo diccionario donde podemos acceder a las columnas por clave (ej: `row['nombre']`), facilitando la posterior serialización a formato **JSON**.
3. **Cursor y Transacciones (`executescript` / `commit`)**:
   - `cursor.executescript()` permite ejecutar bloques SQL compuestos por múltiples sentencias (DDL y DML).
   - `conn.commit()` confirma y guarda permanentemente las modificaciones en el archivo `.db`.

---

## 🚀 Resumen del Aprendizaje
Con la **Fase 2** completada:
- La estructura relacional está definida y probada en `schema.sql`.
- El script de inicialización `db.py` crea la base de datos `contactos.db` con registros de prueba (*seeders*).
- Todo está listo para conectar estos métodos con las rutas HTTP en **Flask (Fase 3)**.
