-- Script de Creacion e Inicializacion de Base de Datos SQLite
-- Proyecto: Agenda de Contactos

-- 1. Creacion de la tabla contactos si no existe
CREATE TABLE IF NOT EXISTS contactos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    email TEXT,
    categoria TEXT DEFAULT 'Personal',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Insercion de datos de prueba (Seeders)
INSERT INTO contactos (nombre, telefono, email, categoria) VALUES 
('Carlos Mendoza', '+54 9 11 4567-8901', 'carlos.mendoza@email.com', 'Trabajo'),
('Ana Laura Gómez', '+54 9 11 9876-5432', 'ana.gomez@email.com', 'Familia'),
('Martín Silva', '+54 9 11 2233-4455', 'martin.silva@email.com', 'Personal');
