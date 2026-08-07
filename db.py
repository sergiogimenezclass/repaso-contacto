import sqlite3
import os

DB_NAME = "contactos.db"
SCHEMA_FILE = "schema.sql"

def get_db_connection():
    """
    Establece y retorna una conexion a la base de datos SQLite.
    Configura row_factory para obtener resultados como diccionarios.
    """
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """
    Inicializa la base de datos ejecutando el script SQL schema.sql.
    """
    if not os.path.exists(SCHEMA_FILE):
        print(f"Error: No se encontro el archivo '{SCHEMA_FILE}'.")
        return False

    with open(SCHEMA_FILE, "r", encoding="utf-8") as f:
        schema_sql = f.read()

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.executescript(schema_sql)
        conn.commit()
        conn.close()
        print("Base de datos inicializada con éxito con el esquema y datos de prueba.")
        return True
    except sqlite3.Error as e:
        print(f"Error al inicializar la base de datos: {e}")
        return False

if __name__ == "__main__":
    init_db()
