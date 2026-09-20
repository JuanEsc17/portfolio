# Portfolio Web Neo-brutalism con TypeScript y React ⚡

Portfolio web interactivo y ultra-rápido diseñado con el estilo estético **Neo-brutalism**, desarrollado en **React**, **TypeScript**, **Vite** y **Tailwind CSS**.

---

## 🎨 Características Visuales y de Diseño

- **Neo-brutalism Auténtico**:
  - Bordes negros sólidos de alto contraste (`2px` y `3px`).
  - Sombras duras planas sin desenfoque (`box-shadow: 4px 4px 0px 0px #000`).
  - Efectos táctiles y feedback activo al interactuar y hacer clic.
- **Paleta de Colores Fiel a la Referencia**:
  - `Neo-Lime` (`#C4F135`): Utilizado en el badge de marca, botones principales y sección de certificaciones.
  - `Neo-Pink` (`#FF708F`): Bloque de foto de cabecera, etiquetas y controles de carrusel.
  - `Neo-Purple` (`#735BF2`): Bloque de skills, tarjeta de terminal de código y sección de llamado a la acción.
  - `Fondos Técnicos con Cuadrícula`: Cuadrícula cuadriculada en el Hero y en el banner inferior.
- **Tipografías Grotescas y Monospace**:
  - Fuentes Space Grotesk para títulos de gran impacto y Space Mono para etiquetas técnicas, métricas y código.

---

## 🚀 Cómo Iniciar el Proyecto

### 1. Iniciar en modo desarrollo
```bash
npm run dev
```
Abre en tu navegador la URL que te indicará la consola (por defecto: `http://localhost:5173`).

### 2. Compilar para Producción
```bash
npm run build
```
Generará la carpeta optimizada `/dist` lista para desplegar en Vercel, Netlify, Cloudflare Pages o GitHub Pages.

---

## 🛠️ Cómo Personalizar tus Datos

Todos los textos, proyectos, experiencia laboral, enlaces a redes sociales y datos personales están centralizados y fuertemente tipados en:

📁 `src/data/portfolioData.ts`

Puedes modificar:
- Tu nombre y marca (`brand: "JUAN DEV"`)
- Tu título profesional y resumen bio
- Tu fotografía de perfil (`avatarUrl`)
- Tus enlaces a GitHub, LinkedIn, Twitter/X y correo
- Tus proyectos destacados (con títulos, descripciones, tags y enlaces)
- Tus certificaciones obtenidas
- Tu historial de experiencia laboral
- El snippet de código que aparece sobre la foto

---

## 📂 Estructura del Código

```text
portfolio/
├── src/
│   ├── components/
│   │   ├── modals/
│   │   │   ├── ContactModal.tsx    # Modal emergente para formulario de contacto
│   │   │   ├── ProjectModal.tsx    # Modal de detalles extendidos de proyectos
│   │   │   └── ResumeModal.tsx     # Visor y descargador de CV
│   │   ├── CallToAction.tsx        # Banner violeta con cuadrícula y sticker estrellado
│   │   ├── Certifications.tsx      # Contenedor verde lima con tarjetas Cert 1, 2, 3
│   │   ├── ExperienceSection.tsx   # Timeline de trayectoria con bloque coral
│   │   ├── FeaturedProjects.tsx    # Carrusel interactivo e ilustración estilo Weatherly (24°C)
│   │   ├── Footer.tsx              # Pie de página neo-brutalista
│   │   ├── HeroSection.tsx         # Portada con avatar apilado y terminal de código
│   │   ├── Navbar.tsx              # Barra de navegación con logo </> y botón de contacto
│   │   ├── SkillsBar.tsx           # Franja de habilidades con iconos SVG precisos
│   │   └── SocialIcons.tsx         # Iconos vectoriales para redes sociales
│   ├── data/
│   │   └── portfolioData.ts        # Datos centralizados en español
│   ├── types/
│   │   └── portfolio.ts            # Interfaces TypeScript
│   ├── App.tsx                     # Ensamblado del portfolio
│   ├── index.css                   # Utilidades neo-brutalistas y patrones de cuadrícula
│   └── main.tsx                    # Montaje de la aplicación React
├── tailwind.config.js              # Configuración de paleta y sombras neo-brutalistas
├── tsconfig.json                   # Tipado estricto TypeScript
└── vite.config.ts                  # Bundler Vite
```
