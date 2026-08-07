from flask import Flask, request, jsonify, send_from_directory
import sqlite3
from db import get_db_connection, init_db

app = Flask(__name__, static_folder='.', static_url_path='')

# Asegurar que la BD exista al iniciar el servidor
init_db()

# ==========================================================================
# Rutas para servir Archivos Estáticos (Frontend HTML/CSS/JS)
# ==========================================================================
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# ==========================================================================
# Endpoints REST API (/api/contactos)
# ==========================================================================

# 1. GET /api/contactos - Obtener todos los contactos
@app.route('/api/contactos', methods=['GET'])
def get_contactos():
    conn = get_db_connection()
    cursor = conn.cursor()
    contactos_rows = cursor.execute('SELECT * FROM contactos ORDER BY creado_en DESC').fetchall()
    conn.close()
    
    # Convertir cada sqlite3.Row a un diccionario de Python
    contactos = [dict(row) for row in contactos_rows]
    return jsonify(contactos), 200

# 2. GET /api/contactos/<int:id> - Obtener un contacto por ID
@app.route('/api/contactos/<int:id>', methods=['GET'])
def get_contacto(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    row = cursor.execute('SELECT * FROM contactos WHERE id = ?', (id,)).fetchone()
    conn.close()

    if row is None:
        return jsonify({'error': 'Contacto no encontrado', 'status': 404}), 404

    return jsonify(dict(row)), 200

# 3. POST /api/contactos - Crear un nuevo contacto
@app.route('/api/contactos', methods=['POST'])
def create_contacto():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'El cuerpo de la petición debe ser JSON', 'status': 400}), 400

    nombre = data.get('nombre', '').strip()
    telefono = data.get('telefono', '').strip()
    email = data.get('email', '').strip()
    categoria = data.get('categoria', 'Personal').strip() or 'Personal'

    # Validacion de campos obligatorios
    if not nombre or not telefono:
        return jsonify({
            'error': 'Campos obligatorios faltantes: nombre y telefono son requeridos',
            'status': 400
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO contactos (nombre, telefono, email, categoria) VALUES (?, ?, ?, ?)',
        (nombre, telefono, email, categoria)
    )
    nuevo_id = cursor.lastrowid
    conn.commit()

    # Obtener el registro recien creado
    nuevo_contacto = cursor.execute('SELECT * FROM contactos WHERE id = ?', (nuevo_id,)).fetchone()
    conn.close()

    return jsonify(dict(nuevo_contacto)), 201

# 4. PUT /api/contactos/<int:id> - Actualizar un contacto existente
@app.route('/api/contactos/<int:id>', methods=['PUT'])
def update_contacto(id):
    data = request.get_json()

    if not data:
        return jsonify({'error': 'El cuerpo de la petición debe ser JSON', 'status': 400}), 400

    nombre = data.get('nombre', '').strip()
    telefono = data.get('telefono', '').strip()
    email = data.get('email', '').strip()
    categoria = data.get('categoria', 'Personal').strip() or 'Personal'

    if not nombre or not telefono:
        return jsonify({
            'error': 'Campos obligatorios faltantes: nombre y telefono son requeridos',
            'status': 400
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Verificar si el contacto existe
    existente = cursor.execute('SELECT * FROM contactos WHERE id = ?', (id,)).fetchone()
    if existente is None:
        conn.close()
        return jsonify({'error': 'Contacto no encontrado para actualizar', 'status': 404}), 404

    cursor.execute(
        'UPDATE contactos SET nombre = ?, telefono = ?, email = ?, categoria = ? WHERE id = ?',
        (nombre, telefono, email, categoria, id)
    )
    conn.commit()

    contacto_actualizado = cursor.execute('SELECT * FROM contactos WHERE id = ?', (id,)).fetchone()
    conn.close()

    return jsonify(dict(contacto_actualizado)), 200

# 5. DELETE /api/contactos/<int:id> - Eliminar un contacto
@app.route('/api/contactos/<int:id>', methods=['DELETE'])
def delete_contacto(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    existente = cursor.execute('SELECT * FROM contactos WHERE id = ?', (id,)).fetchone()
    if existente is None:
        conn.close()
        return jsonify({'error': 'Contacto no encontrado para eliminar', 'status': 404}), 404

    cursor.execute('DELETE FROM contactos WHERE id = ?', (id,))
    conn.commit()
    conn.close()

    return jsonify({'mensaje': f'Contacto con ID {id} eliminado correctamente', 'status': 200}), 200

if __name__ == '__main__':
    print("Iniciando Servidor Flask en http://127.0.0.1:5000 ...")
    app.run(debug=True, port=5000)
