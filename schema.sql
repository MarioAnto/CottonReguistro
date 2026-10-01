-- Estructura de la Base de Datos para el Gestor de Registros
-- Compatible con SQLite

CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    folio TEXT NOT NULL,
    fecha TEXT NOT NULL,
    ubicacion TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo iniciales
INSERT INTO registros (nombre, folio, fecha, ubicacion) VALUES 
('Juan Pérez López', 'FOL-2026-001', '2026-10-01T08:30', 'Guasave, Sinaloa (Oficina Principal)'),
('María Hernández García', 'FOL-2026-002', '2026-10-01T09:15', 'Guasave, Sinaloa (Centro)');
