# Módulo de Estaciones de la Unidad de Tesis de la Facultad de Ciencias Jurídicas y Sociales

## Descripción

Este módulo es parte de la Unidad de Tesis de la Facultad de Ciencias Jurídicas y Sociales de la Universidad de Concepción. Este módulo se encarga de la gestión de las estaciones de trabajo de la Unidad de Tesis.

## Requisitos

-   Node.js 20
-   pnpm
-   Docker
-   Docker Compose
-   MySQL

## Base de Datos

### Creación de la Base de Datos

Para crear la base de datos, se debe ejecutar el script `ddl.sql` que se encuentra en la carpeta `db` del proyecto. Este script crea la base de datos, tablas, triggers, procedimientos almacenados y vistas necesarias para el funcionamiento del módulo.

### Configuración de la Base de Datos

Para configurar la base de datos, se debe crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

-   MYSQL_DATABASE: Nombre de la base de datos. (Si se desea, se puede cambiar el nombre de la base de datos en el script `ddl.sql` y hacer que coincida con este nombre).
-   MYSQL_USER: Usuario de la aplicación para realizar operaciones en la base de datos.
-   MYSQL_PASSWORD: Contraseña del usuario de la aplicación para realizar operaciones en la base de datos.
-   MYSQL_ROOT_PASSWORD: Contraseña del usuario root de la base de datos.

## Instalación

## Backend

## Frontend
