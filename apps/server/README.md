- [Servidor de tipo API REST](#servidor-de-tipo-api-rest)
  - [Instalación](#instalación)
  - [Compilación](#compilación)
    - [Compilación con docker](#compilación-con-docker)
    - [Compilación sin docker](#compilación-sin-docker)
  - [Ejecución](#ejecución)
    - [Ejecución con docker](#ejecución-con-docker)
    - [Ejecución sin docker](#ejecución-sin-docker)
  - [Endpoints disponibles](#endpoints-disponibles)

# Servidor de tipo API REST

## Instalación

Instalarlo a través de docker compose, las instrucciones están en el README de la raíz del proyecto.

## Compilación 

Para compilar el proyecto, pueden crear una imagen docker (recomendado) o ejecutarlo directamente en el equipo en producción.

### Compilación con docker

Para compilar el proyecto con docker, ejecutar el siguiente comando:

```bash
# USER: Nombre del usuario de docker hub
# PROJECT: Nombre del proyecto
# VERSION: Versión del proyecto; puede ser por versiones como: 1.0.0, por fecha de cambio como: 2023.09 o por tipo de versión como: latest, stable, etc.
docker build -t USER/PROJECT:VERSION .
```

Luego, para subir la imagen a docker hub, ejecutar el siguiente comando:

```bash
# USER: Nombre del usuario de docker hub
# PROJECT: Nombre del proyecto
# VERSION: Versión del proyecto; puede ser por versiones como: 1.0.0, por fecha de cambio como: 2023.09 o por tipo de versión como: latest, stable, etc.
docker push USER/PROJECT:VERSION
```

### Compilación sin docker

Para compilar el proyecto sin docker, ejecutar el siguiente comando:

```bash
# Instalar las dependencias
npm install

# Generar compilados para producción en la carpeta dist
npm run build
```

## Ejecución

Para ejecutar el proyecto, pueden crear un contenedor docker (recomendado) o ejecutarlo directamente en el equipo en producción.

### Ejecución con docker

Para ejecutar con docker, seguir las instrucciones del README de la raíz del proyecto.

### Ejecución sin docker

Para ejecutar el proyecto sin docker, ejecutar el siguiente comando:

```bash
# Ejecutar el proyecto en modo desarrollo
npm run dev

# Ejecutar el proyecto en modo producción
npm run start
```

## Endpoints disponibles

Para revisar todos los endpoints disponibles en el servidor de tipo API REST, revisar el archivo [ENDPOINTS.md](./ENDPOINTS.md).
