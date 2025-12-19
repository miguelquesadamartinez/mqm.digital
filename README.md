# mqm.digital

Portfolio personal multilingüe de Miguel Quesada Martínez — Ingeniero de Software / Backend - Frontend

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fmqm.digital)](https://mqm.digital)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌐 Descripción

Sitio web de currículum vitae y portfolio personal con soporte multilingüe completo para **Español**, **English** y **Português**.

Desarrollado como SPA (Single Page Application) vanilla JavaScript sin frameworks ni herramientas de build, enfocado en rendimiento, accesibilidad y SEO.

**🔗 URL:** [https://mqm.digital](https://mqm.digital)

## ✨ Características

- 🌍 **Multilingüe**: Soporte completo para ES/EN/PT con detección automática
- 📱 **Responsive**: Diseño mobile-first con menú hamburguesa
- ⚡ **Zero build**: HTML/CSS/JS vanilla, sin dependencias ni compilación
- 🎨 **UI moderna**: Cards, chips para tecnologías, glassmorphism
- ♿ **Accesible**: Atributos ARIA, navegación por teclado, semántica HTML5
- 🔍 **SEO optimizado**: Meta tags dinámicos, JSON-LD, sitemap, hreflang
- 💾 **Persistencia**: Idioma guardado en localStorage
- 📄 **CV descargable**: PDFs específicos por idioma en `/cvs/`

## 🏗️ Arquitectura

### Estructura de archivos

```
mqm.digital/
├── index.html          # Versión raíz (español)
├── app.js              # Lógica SPA, routing, i18n (~695 líneas)
├── data.json           # Datos del CV + traducciones
├── styles.css          # Estilos responsive
├── cvs/                # PDFs descargables por idioma
├── sitemap.xml         # Sitemap con variantes de idioma
└── robots.txt
```

### Sistema de internacionalización (i18n)

**Tres capas de traducción:**

1. **UI en `app.js`**: Objeto `translations` con labels de navegación, botones
2. **Datos en `data.json`**: Base en español + overrides en `data.i18n.en` y `data.i18n.pt`
3. **HTML estático**: Atributos `data-i18n` para elementos persistentes

**Helpers de traducción:**

- `t(key)`: Traduce strings de UI (ej: `t("nav.about")`)
- `L(key)`: Obtiene campo localizado con fallback a español
- `localizedEntry(arrayName, index)`: Obtiene entrada de array traducida

### Routing

**Hash-based SPA:** `#about`, `#experience`, `#education`, `#skills`, `#contact`

Cada ruta renderiza:

```javascript
renderHeader()  // Avatar + nombre/título
+ sección específica
+ patchSectionWithCV()  // Botón de descarga de CV
```

### Detección de idioma

Orden de precedencia:

1. `window.INIT_LANG` (establecido en entry points `/es/`, `/en/`, `/pt/`)
2. Segmento de ruta URL
3. localStorage `lang`
4. Idioma del navegador
5. Default: `"es"`

## 🚀 Desarrollo

### Instalación

**Requisitos:**

- Node.js (para desarrollo local)
- Cuenta en Netlify (para despliegue con formulario de contacto)

```bash
# Clonar el repositorio
git clone https://github.com/miguelquesadamartinez/mqm.digital.git
cd mqm.digital

# Configurar variables de entorno
cp .env.example .env
# Edita .env y añade tu WEB3FORMS_ACCESS_KEY

# Instalar Netlify CLI (opcional, para desarrollo local)
npm install -g netlify-cli

# Ejecutar en desarrollo con Netlify Dev
netlify dev

# O usar cualquier servidor HTTP estático
python -m http.server 8000
# O
npx http-server
```

**Configuración de variables de entorno:**

El formulario de contacto requiere una access key de [Web3Forms](https://web3forms.com/). Por seguridad, esta clave NO está en el código:

1. Regístrate en [web3forms.com](https://web3forms.com/) y obtén tu access key
2. En Netlify: Settings → Environment variables → Add variable:
   - Key: `WEB3FORMS_ACCESS_KEY`
   - Value: `tu_access_key_aqui`

Para desarrollo local: crea un archivo `.env` basado en `.env.example`

Accede a: `http://localhost:8000/es/`

### Estructura de datos

**`data.json`** contiene los datos base en español y overrides por idioma:

```json
{
  "name": "Miguel Quesada Martínez",
  "title": "Ingeniero de Software...",
  "experience": [...],
  "i18n": {
    "en": {
      "title": "Software Engineer...",
      "experience": [...]
    },
    "pt": { ... }
  }
}
```

### Añadir contenido nuevo

1. **Experiencia/Educación**: Añadir a array base en `data.json`, luego agregar traducciones en `data.i18n.en` y `data.i18n.pt`
2. **Habilidades**: Añadir a `data.skills` y traducir en `data.i18n.en.skills` y `data.i18n.pt.skills`
3. **Labels de UI**: Añadir a objeto `translations` en `app.js` con los tres idiomas

### Cache busting

Al actualizar archivos estáticos, incrementa el parámetro de versión:

- CSS: `styles.css?version=1.0` en HTML
- JSON: `data.json?version=1.6` en fetch de `app.js`

### Seguridad

⚠️ **Siempre usar `escapeHtml()`** para texto de usuario y prevenir XSS

✅ **Usar `renderInlineBold()`** para texto con formato `**negrita**` (escapa automáticamente)

## 🎨 Personalización

### Colores (CSS variables en `styles.css`)

```css
:root {
  --bg: #f4f8ff;
  --card: #f8fbff;
  --accent: #0d6efd;
  --muted: #5e6b76;
}
```

### Añadir nueva sección

1. Añadir caso en `renderRoute()` en `app.js`
2. Crear función `renderNuevaSeccion()`
3. Añadir traducciones en objeto `translations`
4. Añadir link en nav de `index.html` y entry points

## 📊 SEO

- **Meta tags dinámicos**: Actualizados por `updateMetaForRoute()` en cada cambio de ruta/idioma
- **JSON-LD**: Schema.org Person injected desde `data.json`
- **Canonical + hreflang**: Links gestionados dinámicamente para `/es/`, `/en/`, `/pt/`
- **Sitemap**: `sitemap.xml` incluye todas las variantes de idioma
- **Open Graph**: Meta tags para redes sociales

## 📱 Responsive

- **Mobile-first**: CSS con flexbox y media queries
- **Menú hamburguesa**: `.menu-toggle` + `.menu-overlay` con clase `.open`
- **Breakpoints**: Cambios adaptativos en `styles.css`

## 🌐 Despliegue

### Netlify (Recomendado)

El formulario de contacto usa Netlify Functions para mantener las claves API seguras.

1. **Conecta tu repositorio** en [netlify.com](https://netlify.com)
2. **Configura variables de entorno**:
   - Ve a Site settings → Environment variables
   - Añade: `WEB3FORMS_ACCESS_KEY` con tu clave de Web3Forms
3. **Deploy automático**: Netlify detectará automáticamente la función en `/netlify/functions/`

### Otras plataformas

Si despliegas en GitHub Pages, Vercel u otro hosting estático:

- El formulario de contacto **no funcionará** sin backend
- Opciones:
  1. Usar Netlify Functions (recomendado)
  2. Implementar un backend propio
  3. Usar un servicio alternativo de formularios con CORS habilitado

### Variables de entorno requeridas

```bash
WEB3FORMS_ACCESS_KEY=your_access_key_from_web3forms
```

## 📝 Licencia

Este proyecto está bajo licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👤 Autor

**Miguel Quesada Martínez**

- Website: [mqm.digital](https://mqm.digital)
- GitHub: [@miguelquesadamartinez](https://github.com/miguelquesadamartinez)
- LinkedIn: [miguelquesadamartinez](https://www.linkedin.com/in/miguelquesadamartinez)
- Email: miguel.quesada.martinez.1975@gmail.com

---

⭐ Si te ha gustado este proyecto, considera darle una estrella en GitHub
