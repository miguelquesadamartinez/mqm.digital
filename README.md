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
├── index.html          # Web completa en español (todo el texto escrito en el HTML)
├── en.html             # Web completa en inglés
├── pt.html             # Web completa en portugués
├── app.js              # Solo menú móvil, mostrar página según #hash, cambio de idioma y cookies
├── styles.css          # Estilos responsive
├── cvs/                # PDFs descargables por idioma
├── sitemap.xml         # Sitemap con variantes de idioma
└── robots.txt
```

### Contenido e idiomas

Web "a la antigua": **todo el texto está escrito directamente en el HTML**, organizado en divs. No hay `data.json` ni renderizado por JavaScript, así que cualquier cambio de texto se ve tal cual en el diff.

- Un archivo por idioma: `index.html` (ES), `en.html`, `pt.html`. Al cambiar un texto, cámbialo en los tres.
- Dentro de cada archivo, cada página es un `<div class="page" id="page-xxx">` con un comentario grande delante:
  - `page-about` → Carta de presentación (`#about`)
  - `page-experience` → Experiencia (`#experience`)
  - `page-aboutme` → Sobre mí (`#aboutme`)
  - `page-drone` → Dron (`#drone`, y `#drone-architecture`, `#drone-status`... bajan a esa tarjeta)
- Las banderas son enlaces a `index.html` / `en.html` / `pt.html` y conservan el `#hash` actual.

### Routing

`app.js` muestra solo el `div.page` que corresponde al `#hash` (por defecto `#about`) y oculta el resto. Sin JavaScript se ven todas las páginas seguidas.

## 🚀 Desarrollo

### Instalación

**Requisitos:**

- Servidor HTTP estático (Python, Node.js, o Docker)
- Cuenta en Netlify (opcional, para despliegue con formulario de contacto)

```bash
# Clonar el repositorio
git clone https://github.com/miguelquesadamartinez/mqm.digital.git
cd mqm.digital

# Configurar variables de entorno (solo si usas el formulario de contacto)
cp .env.example .env
# Edita .env y añade tu WEB3FORMS_ACCESS_KEY
```

### Opción 1: Docker (Recomendado)

**Usando Docker Compose:**

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reconstruir después de cambios
docker-compose up -d --build
```

La aplicación estará disponible en: **http://localhost:8080**

**Usando Docker directamente:**

```bash
# Construir la imagen
docker build -t mqm-digital .

# Ejecutar el contenedor
docker run -d -p 8080:80 --name mqm-portfolio mqm-digital

# Ver logs
docker logs -f mqm-portfolio

# Detener y eliminar
docker stop mqm-portfolio
docker rm mqm-portfolio
```

### Opción 2: Servidor local

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Netlify Dev (si usas las funciones serverless)
npm install -g netlify-cli
netlify dev
```

Accede a: `http://localhost:8000/` (o el puerto que uses)

**Configuración de variables de entorno:**

El formulario de contacto requiere una access key de [Web3Forms](https://web3forms.com/). Por seguridad, esta clave NO está en el código:

1. Regístrate en [web3forms.com](https://web3forms.com/) y obtén tu access key
2. En Netlify: Settings → Environment variables → Add variable:
   - Key: `WEB3FORMS_ACCESS_KEY`
   - Value: `tu_access_key_aqui`

Para desarrollo local: crea un archivo `.env` basado en `.env.example`

Accede a: `http://localhost:8000/`

### Añadir contenido nuevo

Edita directamente el HTML de los tres idiomas (`index.html`, `en.html`, `pt.html`):

1. **Experiencia**: copia un `<li>` de la página `page-experience` (cada empresa lleva un comentario con su nombre y periodo)
2. **Educación / Habilidades / Idiomas**: en `page-aboutme`
3. **Dron**: en `page-drone`, cada tarjeta es un `<section class="card" id="drone-...">`
4. **Nueva página**: añade un `<div class="page" id="page-nombre">` y un enlace `<a href="#nombre">` en el `<nav>`

Escapa `&`, `<` y `>` en el texto (`&amp;`, `&lt;`, `&gt;`).

### Cache busting

Al actualizar `styles.css` o `app.js`, incrementa su `?version=` en los tres HTML.

## 🚀 Deployment

### Despliegue automático con GitHub Workflows a AWS

El sitio se despliega automáticamente a **AWS S3 + CloudFront** usando GitHub Actions cada vez que se hace push a la rama `main`. El proceso es completamente automatizado e incluye sincronización de archivos, invalidación de caché y notificación por email.

**Flujo de trabajo:**

1. **Trigger automático**: El workflow se ejecuta al hacer push a `main`
2. **Sincronización S3**: Los archivos se suben al bucket S3 con sincronización incremental
3. **Invalidación de caché**: CloudFront actualiza su caché para reflejar los cambios inmediatamente
4. **Notificación**: Se envía un email confirmando el deployment exitoso
5. **Live**: El sitio se actualiza en [mqm.digital](https://mqm.digital)

### Configuración paso a paso

#### 1. **Configurar AWS S3 + CloudFront**

**Crear bucket S3:**

1. Accede a la [consola de AWS S3](https://s3.console.aws.amazon.com/)
2. Crea un bucket con el nombre de tu dominio (ej: `mqm.digital`)
3. Configura el bucket para hosting estático:
   - Properties → Static website hosting → Enable
   - Index document: `index.html`
   - Error document: `index.html` (para SPA routing)
4. Configura la política del bucket para acceso público (o acceso vía CloudFront)

**Crear distribución CloudFront:**

1. Accede a [CloudFront](https://console.aws.amazon.com/cloudfront/)
2. Crea una nueva distribución:
   - Origin domain: Tu bucket S3
   - Origin access: Origin access control (OAC) recomendado
   - Default root object: `index.html`
   - Custom error responses: 403 y 404 → `/index.html` (para SPA)
3. Configura tu dominio personalizado (si aplica)
4. Guarda el **Distribution ID** (lo necesitarás para los secrets)

**Crear usuario IAM con permisos:**

1. Ve a IAM → Users → Create user
2. Nombre: `github-actions-deploy` (o similar)
3. Adjunta las siguientes políticas:
   - Política personalizada para S3:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:GetObject",
           "s3:DeleteObject",
           "s3:ListBucket"
         ],
         "Resource": ["arn:aws:s3:::mqm.digital", "arn:aws:s3:::mqm.digital/*"]
       }
     ]
   }
   ```

   - Política para CloudFront:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "cloudfront:CreateInvalidation",
           "cloudfront:GetInvalidation",
           "cloudfront:ListInvalidations"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

4. Crea las credenciales de acceso (Access Key):
   - Security credentials → Create access key
   - Guarda el **Access Key ID** y **Secret Access Key**

#### 2. **Configurar Secrets en GitHub**

En tu repositorio de GitHub: **Settings → Secrets and variables → Actions → New repository secret**

Añade los siguientes secrets:

| Secret Name                  | Descripción                             | Dónde obtenerlo                    |
| ---------------------------- | --------------------------------------- | ---------------------------------- |
| `AWS_ACCESS_KEY_ID`          | Access Key ID del usuario IAM           | Credenciales IAM creadas en paso 1 |
| `AWS_SECRET_ACCESS_KEY`      | Secret Access Key del usuario IAM       | Credenciales IAM creadas en paso 1 |
| `CLOUDFRONT_DISTRIBUTION_ID` | ID de la distribución CloudFront        | CloudFront → Distributions → ID    |
| `SMTP_SERVER`                | Servidor SMTP para notificaciones email | Gmail: `smtp.gmail.com`            |
| `SMTP_PORT`                  | Puerto SMTP                             | Gmail: `587`                       |
| `SMTP_USERNAME`              | Usuario email para SMTP                 | Tu email completo                  |
| `SMTP_PASSWORD`              | Contraseña de aplicación SMTP           | Gmail: App password generada       |

**Nota para Gmail:** Si usas Gmail, necesitas crear una [contraseña de aplicación](https://myaccount.google.com/apppasswords) en lugar de usar tu contraseña normal.

#### 3. **Estructura del Workflow**

El workflow está en `.github/workflows/deploy.yml` y contiene tres pasos principales:

```yaml
name: Deploy Static Website to S3 + CloudFront

on:
  push:
    branches: ["main"]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      # 1. Sincronizar archivos con S3
      - name: Sync files to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: mqm.digital
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-2
          SOURCE_DIR: "./"

      # 2. Invalidar caché de CloudFront
      - name: Invalidate CloudFront cache
        uses: chetan/invalidate-cloudfront-action@v2
        env:
          DISTRIBUTION: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
          PATHS: "/*"
          AWS_REGION: us-east-2
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

      # 3. Enviar notificación por email
      - name: Send email notification
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: ${{ secrets.SMTP_SERVER }}
          server_port: ${{ secrets.SMTP_PORT }}
          username: ${{ secrets.SMTP_USERNAME }}
          password: ${{ secrets.SMTP_PASSWORD }}
          subject: "Deploy completado en mqm.digital"
          to: "miguel.quesada.martinez.1975@gmail.com"
          from: "Miguel Quesada Martinez <miguel.quesada.martinez.1975@gmail.com>"
```

**Detalles de cada paso:**

1. **Sync files to S3**: Sincroniza todos los archivos del proyecto al bucket S3
   - `--delete`: Elimina archivos en S3 que ya no existen en el repo
   - Sube solo archivos modificados (incremental)

2. **Invalidate CloudFront cache**: Limpia el caché de CloudFront
   - `PATHS: "/*"`: Invalida todos los archivos
   - Asegura que los usuarios vean los cambios inmediatamente
   - Tiempo de propagación: 1-3 minutos típicamente

3. **Send email notification**: Envía confirmación del deployment
   - Incluye información del commit y estado del job
   - Facilita seguimiento de deployments

#### 4. **Realizar el primer deploy**

Una vez configurados todos los secrets:

```bash
# Asegúrate de estar en la rama main
git checkout main

# Haz un cambio o crea un commit vacío para probar
git commit --allow-empty -m "Test deployment workflow"

# Push a main para activar el workflow
git push origin main
```

#### 5. **Monitorear el deployment**

1. Ve a tu repositorio en GitHub
2. Navega a la pestaña **Actions**
3. Verás el workflow "Deploy Static Website to S3 + CloudFront" ejecutándose
4. Haz clic en el workflow para ver los logs detallados de cada paso
5. Recibirás un email cuando el deployment complete

### Verificación del deployment

**Verificar en AWS:**

- **S3**: Comprueba que los archivos se actualizaron en el bucket
- **CloudFront**: Verifica que la invalidación se completó en "Invalidations"

**Verificar el sitio:**

1. Accede a [mqm.digital](https://mqm.digital)
2. Abre las herramientas de desarrollador (F12)
3. Verifica que los cambios están reflejados
4. Si necesitas, haz un hard refresh: `Ctrl+Shift+R` (o `Cmd+Shift+R` en Mac)

**Tiempo típico de deployment completo:** 2-4 minutos

- Sincronización S3: 30-60 segundos
- Invalidación CloudFront: 1-3 minutos
- Total: ~2-4 minutos desde push hasta sitio actualizado

### Costos de AWS

**Estimación mensual para sitio personal:**

- **S3**: ~$0.023/GB almacenado + $0.09/GB transferido (primeros 100GB free tier)
- **CloudFront**: Primeros 1TB/mes transferidos gratis (free tier 12 meses)
- **Invalidaciones CloudFront**: Primeras 1,000/mes gratis, luego $0.005 por path

**Para un sitio como mqm.digital**: < $1/mes después del free tier

### Despliegue manual de emergencia (opcional)

Si necesitas hacer un deployment manual sin usar GitHub Actions:

```bash
# Instalar AWS CLI
pip install awscli

# Configurar credenciales
aws configure

# Sincronizar con S3
aws s3 sync ./ s3://mqm.digital --delete

# Invalidar caché de CloudFront
aws cloudfront create-invalidation \
  --distribution-id E1234EXAMPLE \
  --paths "/*"
```

### Troubleshooting

**Problema: El workflow falla en "Sync files to S3"**

- ✅ Verifica que `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY` sean correctos
- ✅ Confirma que el usuario IAM tiene permisos en el bucket
- ✅ Verifica que el nombre del bucket coincida con `AWS_S3_BUCKET`

**Problema: Cambios no se ven en el sitio**

- ✅ Espera 2-3 minutos para que la invalidación de CloudFront se propague
- ✅ Verifica en CloudFront → Invalidations que se completó
- ✅ Haz hard refresh en tu navegador: `Ctrl+Shift+R`

**Problema: Falla la notificación por email**

- ✅ Verifica que los secrets SMTP sean correctos
- ✅ Si usas Gmail, asegúrate de usar una contraseña de aplicación
- ✅ Este paso es opcional: el deployment funciona aunque falle el email

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

1. Añadir `<div class="page" id="page-nombre">` en `index.html`, `en.html` y `pt.html`
2. Añadir `<a href="#nombre">` en el `<nav>` de los tres archivos
3. (Opcional) `data-title="..."` en el div para cambiar el título de la pestaña en esa página

## 📊 SEO

- **Meta tags**: Estáticos en el `<head>` de cada idioma
- **JSON-LD**: Schema.org Person escrito en el `<head>` de cada idioma
- **Canonical + hreflang**: `/`, `/en.html`, `/pt.html`
- **Sitemap**: `sitemap.xml` incluye todas las variantes de idioma
- **Open Graph**: Meta tags para redes sociales

## 📱 Responsive

- **Mobile-first**: CSS con flexbox y media queries
- **Menú hamburguesa**: `.menu-toggle` + `.menu-overlay` con clase `.open`
- **Breakpoints**: Cambios adaptativos en `styles.css`

### Variables de entorno requeridas

```bash
WEB3FORMS_ACCESS_KEY=your_access_key_from_web3forms
```

## 📝 Licencia

Este proyecto está bajo licencia MIT.

## 👤 Autor

**Miguel Quesada Martínez**

- Website: [mqm.digital](https://mqm.digital)
- GitHub: [@miguelquesadamartinez](https://github.com/miguelquesadamartinez)
- LinkedIn: [miguelquesadamartinez](https://www.linkedin.com/in/miguelquesadamartinez)
- Email: miguel.quesada.martinez.1975@gmail.com

---

⭐ Si te ha gustado este proyecto, considera darle una estrella en GitHub
