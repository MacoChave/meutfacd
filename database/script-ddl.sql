-- 
-- -----------------------------------------------
--  CREATE DATABASE AND UER FOR MYSQL DATABASE
-- -----------------------------------------------
-- 
-- create database meutfacd
-- 	default character set utf8
-- 	default collate utf8_general_ci;
-- 
-- -----------------------------------------------
--  DROP TABLES
-- -----------------------------------------------
-- 
drop table revision;
drop table estado_revision;
drop table dictamen;
drop table tesis;
drop table estado_tesis;
drop table notificacion;
drop table estado_notificacion;
drop table bitacora;
drop table asignacion;
drop table curso_tutor;
drop table curso;
drop table perfil_tutor;
drop table rol;
drop table perfil_estudiante;
drop table usuario;
drop table horario;
drop table jornada;
-- 
-- -----------------------------------------------
--  JORNADA
-- -----------------------------------------------
-- 
create table jornada (
	id_jornada int auto_increment primary key,
	nombre varchar(45) not null
);
create table horario (
	id_horario int auto_increment primary key,
	hora_inicio time not null,
	hora_final time not null,
	id_jornada int not null,
	constraint fk_horario_jornada foreign key (id_jornada) references jornada (id_jornada) on
	delete restrict on
	update cascade
);
--
-- -------------------------------------------------
-- PERFILES
-- -------------------------------------------------
--
create table departameto (
	id_departamento integer unsigned auto_increment primary key,
	nombre varchar(50) unique not null
);
create table municipio (
	id_municipio integer unsigned auto_increment primary key,
	id_departamento integer unsigned not null,
	municipio varchar(50) not null,
	constraint fk_municipio_depto foreign key (id_departamento) references departameto (id_departamento)
);
create table usuario (
	id_usuario int unsigned auto_increment primary key,
	nombre varchar(50) not null,
	apellidos varchar(75) not null,
	genero char(1) not null,
	correo varchar(100) not null,
	pass varchar(200) not null,
	direccion varchar(200) not null,
	fecha_nac date not null,
	estado char(1) not null,
	fecha_creacion datetime not null default now(),
	id_municipio integer unsigned not null,
	doc_cui varchar(75) null,
	carnet int unsigned unique null,
	cui varchar(20) unique null,
);
create table rol (
	id_rol int unsigned auto_increment primary key,
	nombre varchar(45) not null,
	descripcion varchar(255) not null
);
create table usuario_rol (
	id_usuario integer unsigned,
	id_rol integer unsigned,
	constraint pk_usuario_rol primary key (id_usuario, id_rol),
	constraint fk_usuario_rol_u foreign key (id_usuario) references usuario (id_usuario),
	constraint fk_usuario_rol_r foreign key (id_rol) references rol (id_rol)
);
create table perfil_estudiante (
	id_estudiante int auto_increment primary key,
	id_horario int not null not null,
	id_jornada int not null not null,
	constraint fk_estudiante_usuario foreign key (id_estudiante) references usuario (id_usuario) on
	delete restrict on
	update cascade,
		constraint fk_estudiante_horario foreign key (id_horario, id_jornada) references horario (id_horario, id_jornada) on
	delete restrict on
	update cascade
);
create table perfil_tutor (
	id_tutor int auto_increment primary key,
	no_colegiado int not null,
	id_rol int not null,
	constraint fk_tutor_usuario foreign key (id_tutor) references usuario (id_usuario) on
	delete restrict on
	update cascade,
		constraint fk_tutor_rol foreign key (id_rol) references rol(id_rol) on
	delete restrict on
	update cascade
);
--
-- -------------------------------------------------
-- CURSO
-- -------------------------------------------------
--
create table curso (
	id_curso int auto_increment primary key,
	nombre varchar(128) not null
);
create table curso_tutor (
	id_curso_tutor int auto_increment primary key,
	fecha datetime not null default now(),
	id_curso int not null,
	id_tutor int not null,
	id_horario int not null,
	id_jornada int not null,
	constraint fk_curso_tutor_curso foreign key (id_curso) references curso(id_curso) on
	delete restrict on
	update cascade,
		constraint fk_curso_tutor_tutor foreign key (id_tutor) references perfil_tutor(id_tutor) on
	delete restrict on
	update cascade,
		constraint fk_curso_tutor_horario foreign key (id_horario, id_jornada) references horario(id_horario, id_jornada) on
	delete restrict on
	update cascade
);
create table asignacion (
	id_estudiante int not null,
	id_curso_tutor int not null,
	nota int,
	ruta_certificado varchar(255),
	constraint fk_asignacion_estudiante foreign key (id_estudiante) references perfil_estudiante(id_estudiante) on
	delete restrict on
	update cascade,
		constraint fk_asignacion_curso_tutor foreign key (id_curso_tutor) references curso_tutor (id_curso_tutor) on
	delete restrict on
	update cascade
);
--
-- -------------------------------------------------
-- BITACORA
-- -------------------------------------------------
--
create table bitacora (
	id_bitacora int auto_increment primary key,
	fecha datetime not null default now(),
	detalle varchar(255) not null
);
--
-- -------------------------------------------------
-- MENSAJERIA
-- -------------------------------------------------
--
create table estado_notificacion (
	id_estado int auto_increment primary key,
	estado varchar(45) not null
);
create table notificacion (
	id_notificacion int auto_increment primary key,
	mensaje varchar(255) not null,
	fecha datetime not null default now(),
	id_estado int not null,
	id_emisor int not null,
	id_receptor int not null,
	constraint fk_notificacion_emisor foreign key (id_emisor) references usuario (id_usuario) on
	delete restrict on
	update cascade,
		constraint fk_notificacion_receptor foreign key (id_receptor) references usuario (id_usuario) on
	delete restrict on
	update cascade,
		constraint fk_notificacion_estado foreign key (id_estado) references estado_notificacion(id_estado) on
	delete restrict on
	update cascade
);
--
-- -------------------------------------------------
-- TESIS
-- -------------------------------------------------
--
create table estado_tesis (
	id_estado int auto_increment primary key,
	estado varchar(45) not null
);
create table tesis (
	id_tesis int auto_increment primary key,
	titulo varchar(255) not null,
	ruta_perfil varchar(255) not null,
	ruta_tesis varchar(255) null,
	fecha_creacion datetime not null default now(),
	fecha_modificacion datetime not null default now(),
	id_estado int not null,
	id_estudiante int not null,
	constraint fk_tesis_estado foreign key (id_estado) references estado_tesis(id_estado) on
	delete restrict on
	update cascade,
		constraint fk_tesis_estudiante foreign key (id_estudiante) references perfil_estudiante(id_estudiante) on
	delete restrict on
	update cascade
);
create table dictamen (
	id_dictamen int auto_increment primary key,
	fecha datetime not null default now(),
	ruta_dictamen varchar(255) not null,
	id_tutor int not null,
	id_tesis int not null,
	constraint fk_dictamen_tutor foreign key (id_tutor) references perfil_tutor(id_tutor) on
	delete restrict on
	update cascade,
		constraint fk_dictamen_tesis foreign key (id_tesis) references tesis(id_tesis) on
	delete restrict on
	update cascade
);
create table estado_revision (
	id_estado int auto_increment primary key,
	estado varchar(45) not null
);
create table revision (
	id_revision int auto_increment primary key,
	fecha datetime not null default now(),
	detalle varchar(255) not null,
	id_tutor int not null,
	id_tesis int not null,
	id_estado_revision int not null,
	constraint fk_revision_tutor foreign key (id_tutor) references perfil_tutor(id_tutor) on
	delete restrict on
	update cascade,
		constraint fk_revision_tesis foreign key (id_tesis) references tesis(id_tesis) on
	delete restrict on
	update cascade,
		constraint fk_revision_estado foreign key (id_estado_revision) references estado_revision(id_estado) on
	delete restrict on
	update cascade
);