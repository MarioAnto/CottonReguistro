# SQLite Web Vault – Gestor de Registros

Aplicación web de una sola página para capturar y consultar registros (nombre, folio, fecha y ubicación) usando **SQLite compilado a WebAssembly** ([sql.js](https://github.com/sql-js/sql.js)). Corre 100 % en el navegador: no necesita servidor ni backend.

## Características

- Alta, búsqueda y eliminación de registros.
- Folio autogenerado y ubicación por GPS del navegador.
- Base de datos persistida en el `localStorage` del navegador.
- Exportar e importar la base de datos como archivo `.sqlite`.
- Diseño responsivo (Tailwind CSS), apto para teléfono.

## Estructura

```
.
├── index.html   # Aplicación completa (HTML + CSS + JS)
├── schema.sql   # Estructura de la tabla y datos de ejemplo (SQLite)
├── LICENSE
└── README.md
```

## Uso local

Abre `index.html` en tu navegador. Requiere conexión a internet la primera vez, porque Tailwind, Font Awesome, Google Fonts y sql.js se cargan desde CDN.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub.
2. Ve a **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Guarda; en unos minutos estará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Privacidad de los datos

Los registros **no se envían a ningún servidor**: viven en el `localStorage` del navegador de cada persona que usa la página. Eso implica que:

- Cada dispositivo/navegador tiene su propia base de datos.
- Borrar los datos del sitio elimina los registros; usa **Descargar .sqlite** para respaldar.
- No subas a este repositorio archivos `.sqlite` con datos reales (ya están en `.gitignore`).

## Esquema

```sql
CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    folio TEXT NOT NULL,
    fecha TEXT NOT NULL,
    ubicacion TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Licencia

[MIT](LICENSE)
