# Fase 1: Guía Didáctica - Estructura HTML5 y Sistema de Estilos CSS3

Este documento forma parte del material educativo del proyecto **Agenda de Contactos (CRUD)**. Explica los fundamentos de la estructura semántica en HTML5 y las técnicas de maquetación/estilizado en CSS3 Vanilla utilizadas en la **Fase 1**.

---

## 1. 🧱 HTML5 Semántico y Accesibilidad (Fase 1A)

### ¿Qué es el HTML Semántico?
El HTML semántico consiste en utilizar etiquetas HTML que describen el **significado y propósito del contenido**, en lugar de utilizar simples contenedores genéricos como `<div>` o `<span>`.

### Beneficios del marcado semántico:
1. **Accesibilidad (a11y)**: Permite a los lectores de pantalla (Screen Readers) y tecnologías asistivas navegar estructuradamente por la página.
2. **SEO**: Los motores de búsqueda comprenden la jerarquía de la información e indexan mejor el contenido.
3. **Mantenibilidad**: Facilita la lectura del código por parte de otros desarrolladores.

### Estructura y Etiquetas Utlizadas:

- **`<header>`**: Contenedor de la cabecera principal con el título h1 y la descripción de la aplicación.
- **`<main>`**: Define el contenido central y único del documento.
- **`<section>`**: Agrupa bloques funcionales específicos (formulario de registro y listado de contactos), asociados a un título descriptivo mediante `aria-labelledby`.
- **`<form>`**: Delimita los controles de captura de datos (`<input>`, `<select>`, `<button>`).
  - `type="tel"` / `type="email"`: Indican al navegador el tipo de dato esperado, habilitando teclados optimizados en dispositivos móviles.
  - `required`: Atributo de validación nativa en HTML5.
  - `autocomplete`: Ayuda a los navegadores a autorrellenar campos estándar (`name`, `tel`, `email`).
- **`<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`**: Estructura estándar para datos tabulares (lista de contactos). Los encabezados `<th>` utilizan `scope="col"` para indicar que aplican a las columnas.
- **Atributos WAI-ARIA**:
  - `aria-hidden="true"` / `aria-modal="true"` / `role="dialog"`: Definen el comportamiento accesible del Modal de edición.
  - `aria-live="polite"` / `aria-atomic="true"`: Definen la zona dinámica donde aparecerán las notificaciones emergentes (Toast Notifications) para que sean anunciadas por lectores de pantalla sin interrumpir al usuario.
  - `class="visually-hidden"`: Permite ocultar elementos visualmente pero mantenerlos accesibles para lectores de pantalla.

---

## 2. 🎨 Estilos CSS3 Vanilla y Componentes de UI (Fase 1B)

En esta fase se construyó el sistema de diseño completo sin librerías externas ni frameworks como Tailwind/Bootstrap.

### Conceptos Clave Implementados:

#### A. Variables CSS (`:root`)
Permiten centralizar los tokens del sistema de diseño (colores, sombras, bordes, tiempos de transición):
```css
:root {
    --bg-main: #0f172a;
    --primary: #6366f1;
    --text-primary: #f8fafc;
    --radius-md: 10px;
}
```
*Ventaja*: Modificar la paleta de colores o adaptar a un modo claro/oscuro requiere únicamente cambiar las variables en `:root`.

#### B. Layouts Modernos: CSS Grid y Flexbox
- **CSS Grid** (`grid-template-columns: 320px 1fr;`): Utilizado en el contenedor principal `<main>` para alinear lateralmente el formulario (columna fija de 320px) y el listado de contactos (columna flexible `1fr`).
- **Flexbox**: Utilizado en cabeceras, grupos de formulario, modales y botones para alinear y distribuir elementos en una sola dimensión.
- **Responsive Design**: Se aplicó una media query (`@media (max-width: 850px)`) para colapsar la grilla en una sola columna en pantallas móviles/tablets.

#### C. Componentes de UI Nativos (Regla: No `alert()` / No `prompt()`)
Para cumplir con las mejores prácticas de experiencia de usuario (UX):
1. **Modal de Edición (`.modal-backdrop`, `.modal-card`)**:
   - Capa superpuesta con efecto de desenfoque de fondo (`backdrop-filter: blur(4px)`).
   - Animación fluida de entrada mediante `@keyframes modalSlideIn`.
2. **Notificaciones Toast (`.toast-container`, `.toast`)**:
   - Posicionamiento fijo en la esquina inferior derecha (`position: fixed`).
   - Diferenciación visual de estados por borde lateral (Éxito en verde `--success`, Error en rojo `--danger`).

---

## 🚀 Resumen del Aprendizaje
Con la **Fase 1 (1A y 1B)** completada, contamos con un frontend accesible, semántico, atractivo y listo para conectarse con la lógica de negocio y la base de datos en las siguientes fases.
