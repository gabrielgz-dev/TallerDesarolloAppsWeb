# Portafolio Personal – Gabriel Garcia

Portafolio web personal desarrollado como parte del Taller de Desarrollo de Apps Web. Presenta información sobre mí, mis habilidades, proyectos destacados y un formulario de contacto funcional.

---

## 📸 Vista previa

> *Captura del sitio – agregar imagen después del despliegue.*

---

## ✨ Características

- **HTML semántico** – uso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` y `<footer>`.
- **Formulario de contacto** con validación nativa (`required`, `minlength`) y tipos correctos (`email`, `tel`).
- **Accesibilidad** – todos los `<img>` tienen `alt` descriptivo, un único `<h1>`, roles ARIA y `aria-label`.
- **CSS con variables** – paleta de colores, tipografía y espaciados definidos en `:root`.
- **Flexbox** – barra de navegación responsiva.
- **CSS Grid** – galería de proyectos con `repeat(auto-fit, minmax(..., 1fr))`.
- **Diseño mobile-first** – dos puntos de quiebre (640 px y 1024 px) sin desplazamiento horizontal en celular.
- **Modo oscuro** – automático con `prefers-color-scheme` *y* botón manual que persiste en `localStorage`.
- **Estados `:hover` y `:focus-visible`** con transiciones suaves en todos los elementos interactivos.
- **Animaciones**: scroll-reveal en tarjetas, barras de habilidades animadas, foto de perfil con hover.

---

## 🗂 Estructura del proyecto

```
taller1/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Hoja de estilos (mobile-first + variables CSS)
├── js/
│   └── main.js         # Lógica: modo oscuro, menú, formulario, animaciones
├── img/                # Imágenes locales (profile.jpg, project-*.png)
└── README.md
```

---

## 🛠 Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura y accesibilidad |
| CSS3 (Custom Properties, Flexbox, Grid) | Diseño y layout |
| JavaScript (ES6+) | Interactividad y validación |
| Google Fonts (Inter + Space Grotesk) | Tipografía |
| Git + GitHub | Control de versiones y publicación |

---

## 🚀 Cómo ejecutar localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/gabrielgz-dev/TallerDesarolloAppsWeb.git
   ```
2. Abre `index.html` en cualquier navegador moderno.  
   *(No requiere servidor ni dependencias.)*

---

## 📋 Requisitos cumplidos

### Parte A – HTML semántico
- [x] `header`, `nav`, `main`, `section`, `article`, `footer` (sin maquetación solo con `div`)
- [x] Secciones: presentación, sobre mí, habilidades, proyectos (4 tarjetas) y contacto
- [x] Formulario con `label` asociado, `type="email"`, `type="tel"`, `required` y `minlength`
- [x] `alt` descriptivo en todas las imágenes y un solo `<h1>`

### Parte B – CSS
- [x] Hoja de estilos externa con variables `:root` para colores, tipografía y espaciados
- [x] Flexbox en la barra de navegación
- [x] Grid con `repeat(auto-fit, minmax(..., 1fr))` en la galería de proyectos
- [x] Mobile-first con media queries en 640 px y 1024 px
- [x] `:hover` y `:focus-visible` con transiciones suaves
- [x] Modo oscuro con `prefers-color-scheme` + botón `data-theme`

### Parte C – Git
- [x] Repositorio público en GitHub
- [x] Al menos 6 commits con mensajes descriptivos
- [x] `README.md` con descripción, captura y tecnologías

---

## 👨‍💻 Autor

**Gabriel Garcia** · [@gabrielgz-dev](https://github.com/gabrielgz-dev)
