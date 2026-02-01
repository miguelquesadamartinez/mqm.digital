# Usa nginx alpine para una imagen ligera
FROM nginx:alpine

# Copia la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia todos los archivos de la aplicación al directorio de nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# nginx se inicia automáticamente con la imagen base
CMD ["nginx", "-g", "daemon off;"]
