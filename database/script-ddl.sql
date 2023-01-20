-- 
-- -----------------------------------------------
--  DROP TABLES
-- -----------------------------------------------
-- 
drop table if exists revision;
drop table if exists estado_revision;
drop table if exists dictamen;
drop table if exists tesis;
drop table if exists estado_tesis;
drop table if exists notificacion;
drop table if exists estado_notificacion;
drop table if exists bitacora;
drop table if exists asignacion;
drop table if exists curso_tutor;
drop table if exists curso;
drop table if exists perfil_tutor;
drop table if exists rol;
drop table if exists perfil_estudiante;
drop table if exists usuario;
drop table if exists horario;
drop table if exists jornada;

-- 
-- -----------------------------------------------
--  JORNADA
-- -----------------------------------------------
-- 
create table if not exists jornada (
	id_jornada int generated always as identity,
	nombre varchar(45) not null,
	primary key (id_jornada)
);

create table if not exists horario (
	id_horario int generated always as identity,
	hora_inicio time not null,
	hora_final time not null,
	id_jornada int not null,
	primary key (id_horario, id_jornada),
	constraint fk_horario_jornada
        foreign key (id_jornada) 
		references jornada (id_jornada)
		on delete restrict
		on update cascade
);

--
-- -------------------------------------------------
-- PERFILES
-- -------------------------------------------------
--
create table if not exists usuario (
	id_usuario int generated always as identity,
	nombre varchar(50) not null,
	apellido varchar(75) not null,
	genero char(1) not null,
	correo varchar(100) not null,
	pass varchar(200) not null,
	carnet int,
	cui varchar(20) not null,
	direccion varchar(200) not null,
	fecha_nac date not null,
	estado char(1) not null,
	telefono varchar(25),
	primary key (id_usuario)
);
create table if not exists perfil_estudiante (
	id_estudiante int generated always as identity,
	id_horario int not null not null,
	id_jornada int not null not null,
	primary key (id_estudiante),
	constraint fk_estudiante_usuario
		foreign key (id_estudiante)
		references usuario (id_usuario)
		on delete restrict
		on update cascade,
	constraint fk_estudiante_horario
        foreign key (id_horario, id_jornada)
		references horario (id_horario, id_jornada)
		on delete restrict
		on update cascade
);
create table if not exists rol (
	id_rol int generated always as identity,
	nombre varchar(45) not null,
	descripcion varchar(255) not null,
	primary key (id_rol)
);
create table if not exists perfil_tutor (
	id_tutor int generated always as identity,
	no_colegiado int not null,
	id_rol int not null,
	primary key (id_tutor),
	constraint fk_tutor_usuario
		foreign key (id_tutor)
		references usuario (id_usuario)
		on delete restrict
		on update cascade,
	constraint fk_tutor_rol
        foreign key (id_rol)
		references rol(id_rol)
		on delete restrict
		on update cascade
);

--
-- -------------------------------------------------
-- CURSO
-- -------------------------------------------------
--
create table if not exists curso (
	id_curso int generated always as identity,
	nombre varchar(128) not null,
	primary key (id_curso)
);
create table if not exists curso_tutor (
	id_curso_tutor int generated always as identity,
	fecha timestamp not null default now(),
	id_curso int not null,
	id_tutor int not null,
	id_horario int not null,
	id_jornada int not null,
	primary key (id_curso_tutor),
	constraint fk_curso_tutor_curso
        foreign key (id_curso)
		references curso(id_curso)
		on delete restrict
		on update cascade,
	constraint fk_curso_tutor_tutor
        foreign key (id_tutor)
		references perfil_tutor(id_tutor)
		on delete restrict
		on update cascade,
	constraint fk_curso_tutor_horario
        foreign key (id_horario, id_jornada)
		references horario(id_horario, id_jornada)
		on delete restrict
		on update cascade
);
create table if not exists asignacion (
	id_estudiante int not null,
	id_curso_tutor int not null,
	nota int,
	ruta_certificado varchar(255),
	primary key (id_estudiante, id_curso_tutor),
	constraint fk_asignacion_estudiante
        foreign key (id_estudiante)
		references perfil_estudiante(id_estudiante)
		on delete restrict
		on update cascade,
	constraint fk_asignacion_curso_tutor
        foreign key (id_curso_tutor)
		references curso_tutor (id_curso_tutor)
		on delete restrict
		on update cascade
);

--
-- -------------------------------------------------
-- BITACORA
-- -------------------------------------------------
--
create table if not exists bitacora (
	id_bitacora int generated always as identity,
	fecha timestamp not null default now(),
	detalle varchar(255) not null,
	primary key (id_bitacora)
);

--
-- -------------------------------------------------
-- MENSAJERIA
-- -------------------------------------------------
--
create table if not exists estado_notificacion (
	id_estado int generated always as identity,
	estado varchar(45) not null,
	primary key (id_estado)
);
create table if not exists notificacion (
	id_notificacion int generated always as identity,
	mensaje varchar(255) not null,
	fecha timestamp not null default now(),
	id_estado int not null,
	id_emisor int not null,
	id_receptor int not null,
	primary key (id_notificacion),
	constraint fk_notificacion_emisor
		foreign key (id_emisor)
		references usuario (id_usuario)
		on delete restrict
		on update cascade,
	constraint fk_notificacion_receptor
		foreign key (id_receptor)
		references usuario (id_usuario)
		on delete restrict
		on update cascade,
	constraint fk_notificacion_estado 
		foreign key (id_estado)
		references estado_notificacion(id_estado)
		on delete restrict
		on update cascade
);
--
-- -------------------------------------------------
-- TESIS
-- -------------------------------------------------
--
create table if not exists estado_tesis (
    id_estado int generated always as identity,
    estado varchar(45) not null,
    primary key (id_estado)
);
create table if not exists tesis (
    id_tesis int generated always as identity,
    titulo varchar(255) not null,
    ruta_perfil varchar(255) not null,
    ruta_tesis varchar(255) null,
    fecha_creacion timestamp not null default now(),
    fecha_modificacion timestamp not null default now(),
    id_estado int not null,
    id_estudiante int not null,
    primary key (id_tesis),
    constraint fk_tesis_estado
        foreign key (id_estado)
        references estado_tesis(id_estado)
        on delete restrict
		on update cascade,
    constraint fk_tesis_estudiante
        foreign key (id_estudiante)
        references perfil_estudiante(id_estudiante)
        on delete restrict
		on update cascade
);
create table if not exists dictamen (
    id_dictamen int generated always as identity,
    fecha timestamp not null default now(),
    ruta_dictamen varchar(255) not null,
    id_tutor int not null,
    id_tesis int not null,
    primary key (id_dictamen),
    constraint fk_dictamen_tutor
        foreign key (id_tutor)
        references perfil_tutor(id_tutor)
        on delete restrict
		on update cascade,
    constraint fk_dictamen_tesis
        foreign key (id_tesis)
        references tesis(id_tesis)
        on delete restrict
		on update cascade
);
create table if not exists estado_revision (
    id_estado int generated always as identity,
    estado varchar(45) not null,
    primary key (id_estado)
);
create table if not exists revision (
    id_revision int generated always as identity,
    fecha timestamp not null default now(),
    detalle varchar(255) not null,
    id_tutor int not null,
    id_tesis int not null,
    id_estado_revision int not null,
    primary key (id_revision),
    constraint fk_revision_tutor
        foreign key (id_tutor)
        references perfil_tutor(id_tutor)
        on delete restrict
		on update cascade,
    constraint fk_revision_tesis
        foreign key (id_tesis)
        references tesis(id_tesis)
        on delete restrict
		on update cascade,
    constraint fk_revision_estado
        foreign key (id_estado_revision)
        references estado_revision(id_estado)
        on delete restrict
		on update cascade
);