# Configuración de AWS Lambda para el formulario de contacto

## Pasos para implementar:

### 1. Crear la función Lambda

1. Ve a la consola de AWS Lambda: https://console.aws.amazon.com/lambda
2. Haz clic en **Create function**
3. Selecciona **Author from scratch**
4. Configuración:
   - **Function name:** `mqm-digital-contact-form`
   - **Runtime:** Node.js 18.x (o superior)
   - **Architecture:** x86_64
   - **Permissions:** Usar rol existente o crear uno nuevo con permisos básicos
5. Haz clic en **Create function**

### 2. Subir el código

1. En la función Lambda creada, ve a la pestaña **Code**
2. Copia el contenido de `submit-form.js` en el editor
3. Haz clic en **Deploy**

### 3. Configurar variables de entorno

1. Ve a la pestaña **Configuration** → **Environment variables**
2. Haz clic en **Edit**
3. Añade:
   - **Key:** `WEB3FORMS_ACCESS_KEY`
   - **Value:** Tu nueva access key de Web3Forms (obtenida en https://web3forms.com/)
4. Haz clic en **Save**

### 4. Crear API Gateway

1. Ve a la consola de API Gateway: https://console.aws.amazon.com/apigateway
2. Haz clic en **Create API**
3. Selecciona **HTTP API** → **Build**
4. Configuración:
   - **Integrations:** Selecciona tu función Lambda `mqm-digital-contact-form`
   - **API name:** `mqm-digital-api`
5. Configura las rutas:
   - **Method:** POST
   - **Resource path:** `/submit-form`
6. Configura CORS:
   - **Access-Control-Allow-Origin:** `https://mqm.digital` (tu dominio real)
   - **Access-Control-Allow-Headers:** `Content-Type`
   - **Access-Control-Allow-Methods:** `POST, OPTIONS`
7. Haz clic en **Create**

### 5. Obtener la URL del endpoint

Después de crear el API Gateway, verás una **Invoke URL** como:

```
https://abc123xyz.execute-api.us-east-1.amazonaws.com
```

Tu endpoint completo será:

```
https://abc123xyz.execute-api.us-east-1.amazonaws.com/submit-form
```

### 6. Actualizar app.js

Reemplaza la URL en la función `handleContactFormSubmit`:

```javascript
const response = await fetch("https://TU-API-GATEWAY-URL/submit-form", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});
```

### 7. Desplegar en S3

Sube los archivos actualizados a tu bucket de S3 y invalida la caché de CloudFront.

## Costos estimados

- **Lambda:** Capa gratuita incluye 1M de invocaciones/mes
- **API Gateway:** Capa gratuita incluye 1M de llamadas/mes los primeros 12 meses
- **Después:** ~$3.50 por millón de requests

Para un sitio personal con formulario de contacto, probablemente siempre estarás en la capa gratuita.

## Seguridad adicional (opcional)

### Usar AWS Secrets Manager

Para mayor seguridad, puedes guardar la access_key en Secrets Manager:

1. Ve a AWS Secrets Manager
2. Crea un nuevo secreto con la access_key
3. Modifica la función Lambda para recuperar el secreto
4. Añade permisos IAM a Lambda para leer Secrets Manager

### Limitar rate limiting

Configura throttling en API Gateway para prevenir abuso:

- Settings → Throttling → Rate: 10 requests/segundo
- Burst: 20 requests
