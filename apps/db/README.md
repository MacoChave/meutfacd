# Base de datos MySQL

## Instalación

Instalarlo a través de docker compose, las instrucciones están en el README de la raíz del proyecto.

## Datos iniciales

Para cargar los datos iniciales, ejecutar el siguiente comando:

```bash
docker-compose exec db bash -c "mysql -u USER -pPASSWORD < /docker-entrypoint-initdb.d/01-init.sql"
```

## Acceso

Para acceder a la base de datos, ejecutar el siguiente comando:

```bash
docker-compose exec db bash -c "mysql -u USER -pPASSWORD"
```

## Backup

Para hacer un backup de la base de datos, ejecutar el siguiente comando:

```bash
docker-compose exec db bash -c "mysqldump -u USER -pPASSWORD DATABASE > /docker-entrypoint-initdb.d/backup.sql"
```

## Restore

Para restaurar un backup de la base de datos, ejecutar el siguiente comando:

```bash
docker-compose exec db bash -c "mysql -u USER -pPASSWORD DATABASE < /docker-entrypoint-initdb.d/backup.sql"
```
