-- 
-- -----------------------------------------------
--  DROP TRIGGERS
-- -----------------------------------------------
-- 
drop trigger if exists 
	ut_tr_new_usuario , 
	ut_tr_new_tesis , 
	ut_tr_update_tesis , 
	ut_tr_new_rol ,  
	ut_tr_new_page ; 
-- 
-- -----------------------------------------------
--  DROP FUNCTIONS
-- -----------------------------------------------
-- 
-- 
-- -----------------------------------------------
--  DROP PROCEDURES
-- -----------------------------------------------
-- 
drop procedure if exists sp_ut_crear_usuario;
-- 
-- -----------------------------------------------
--  DROP VIEWS
-- -----------------------------------------------
-- 
drop view if exists 
	ut_v_rol , 
	ut_v_revision , 
	ut_v_asignacion , 
	ut_v_usuarios ;
-- 
-- -----------------------------------------------
--  DROP TABLES
-- -----------------------------------------------
-- 
drop table if exists 
	departamento,
	municipio,
	ut_jornada,
	ut_horario,
	ut_pagina,
	usuario,
	rol,
	usuario_rol,
	ut_permiso,
	ut_perfil,
	ut_curso,
	ut_curso_tutor,
	ut_asignacion,
	ut_bitacora,
	ut_notificacion,
	ut_tesis,
	ut_revision;

-- 
-- -------------------------------------------------
-- CREATE TABLES
-- -------------------------------------------------
----------------------------------------------------
-- MODULO PERFILES
-- ------------------------------------------------- 
delimiter //
create table if not exists departamento (
	id_departamento integer unsigned auto_increment primary key,
	nombre varchar(50) not null
);
// 
delimiter ; 

delimiter //
create table if not exists municipio (
	id_municipio integer unsigned auto_increment primary key,
	id_departamento integer unsigned not null,
	municipio varchar(50) not null,
	constraint fk_municipio_departamento foreign key (id_departamento) references departamento (id_departamento) on
	delete restrict on
	update cascade
);
// 
delimiter ; 

delimiter //
create table if not exists ut_jornada (
	id_jornada integer unsigned auto_increment primary key,
	nombre varchar(45) not null
);
// 
delimiter ; 

delimiter //
create table if not exists ut_horario (
	id_horario integer unsigned auto_increment,
	id_jornada integer unsigned not null,
	hora_inicio time not null,
	hora_final time not null,
	constraint pk_horario primary key (id_horario, id_jornada),
	constraint fk_horario_jornada foreign key (id_jornada) references ut_jornada (id_jornada) on
	delete restrict on
	update cascade
);
// 
delimiter ; 

delimiter //
create table if not exists usuario (
	id_usuario integer unsigned auto_increment primary key,
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
	carnet integer unsigned unique null,
	cui varchar(20) unique null,
	constraint fk_usuario_municipio foreign key (id_municipio) references municipio(id_municipio)
);
// 
delimiter ; 

delimiter //
create table if not exists rol (
	id_rol integer unsigned auto_increment primary key,
	nombre varchar(45) not null,
	descripcion varchar(255) not null
);
// 
delimiter ; 

delimiter //
create table if not exists usuario_rol (
	id_usuario integer unsigned,
	id_rol integer unsigned,
	constraint pk_usuario_rol primary key (id_usuario, id_rol),
	constraint fk_usuario_rol_u foreign key (id_usuario) references usuario (id_usuario),
	constraint fk_usuario_rol_r foreign key (id_rol) references rol (id_rol)
);
// 
delimiter ; 

delimiter //
create table if not exists ut_perfil (
	id_usuario integer unsigned primary key,
	id_horario integer unsigned,
	id_jornada integer unsigned,
	constraint fk_perfil_usuario 
		foreign key (id_usuario) 
		references usuario (id_usuario) on
		delete restrict on
		update cascade,
	constraint fk_perfil_horario 
		foreign key (id_horario, id_jornada) 
		references ut_horario (id_horario, id_jornada) on
		delete restrict on
		update cascade
);
// 
delimiter ; 

delimiter //
create table if not exists ut_pagina (
	id_pagina integer unsigned auto_increment primary key,
	nombre varchar(50) not null,
	descripcion varchar(128) not null,
	indice integer not null,
	ruta varchar(128) not null
);
// 
delimiter ; 

delimiter //
create table if not exists ut_permiso (
	id_rol integer unsigned,
	id_pagina integer unsigned,
	permiso integer,
	constraint fk_permiso_rol 
		foreign key (id_rol)
		references rol (id_rol) on 
		delete restrict on 
		update cascade,
	constraint fk_permiso_pagina 
		foreign key (id_pagina)
		references ut_pagina (id_pagina) on 
		delete restrict on 
		update cascade
);
// 
delimiter ; 

----------------------------------------------------
-- MODULO CURSO
-- ------------------------------------------------- 
delimiter //
create table if not exists ut_curso (
	id_curso integer unsigned auto_increment primary key,
	nombre varchar(128) not null
);
// 
delimiter ; 

delimiter //
create table if not exists ut_curso_tutor (
	id_curso_tutor integer unsigned auto_increment primary key,
	fecha date not null default (curdate()),
	salon varchar(128) not null default '', 
	id_curso integer unsigned not null,
	id_tutor integer unsigned not null,
	id_horario integer unsigned not null,
	id_jornada integer unsigned not null,
	constraint fk_curso_tutor_curso foreign key (id_curso) references ut_curso(id_curso) on
	delete restrict on
	update cascade,
		constraint fk_curso_tutor_tutor foreign key (id_tutor) references usuario(id_usuario) on
	delete restrict on
	update cascade,
		constraint fk_curso_tutor_horario foreign key (id_horario, id_jornada) references ut_horario(id_horario, id_jornada) on
	delete restrict on
	update cascade
);
// 
delimiter ; 

delimiter //
create table if not exists ut_asignacion (
	id_estudiante integer unsigned not null,
	id_curso_tutor integer unsigned not null,
	es_aprobado boolean not null default false,
	ruta_certificado varchar(255),
	constraint fk_asignacion_estudiante foreign key (id_estudiante) references usuario(id_usuario) on
	delete restrict on
	update cascade,
		constraint fk_asignacion_curso_tutor foreign key (id_curso_tutor) references ut_curso_tutor (id_curso_tutor) on
	delete restrict on
	update cascade
);
// 
delimiter ; 

----------------------------------------------------
-- MODULO BITACORA
-- ------------------------------------------------- 
delimiter //
create table if not exists ut_bitacora (
	fecha datetime not null default now(),
	detalle varchar(255) not null,
	id_usuario integer unsigned not null,
	usuario varchar(50) not null
);
// 
delimiter ; 

----------------------------------------------------
-- MODULO NOTIFICACION
-- ------------------------------------------------- 
delimiter //
create table if not exists ut_notificacion (
	id_notificacion integer unsigned auto_increment primary key,
	mensaje varchar(255) not null,
	fecha datetime not null default now(),
	activo tinyint(1) not null default 1,
	id_emisor integer unsigned not null,
	id_receptor integer unsigned not null,
	constraint fk_notificacion_emisor foreign key (id_emisor) references usuario (id_usuario) on
	delete restrict on
	update cascade,
		constraint fk_notificacion_receptor foreign key (id_receptor) references usuario (id_usuario) on
	delete restrict on
	update cascade
);
// 
delimiter ; 

----------------------------------------------------
-- MODULO TESIS
-- ------------------------------------------------- 
delimiter //
create table if not exists ut_tesis (
	id_tesis integer unsigned auto_increment primary key,
	titulo varchar(255) not null,
	ruta_perfil varchar(255) not null,
	ruta_tesis varchar(255) null,
	ruta_asesor varchar(255) null,
	fecha_creacion datetime not null default now(),
	fecha_modificacion datetime not null default now(),
	id_estudiante integer unsigned not null,
		constraint fk_tesis_estudiante foreign key (id_estudiante) references usuario(id_usuario) on
	delete restrict on
	update cascade
);
// 
delimiter ; 

delimiter //
create table if not exists ut_revision (
	id_revision integer unsigned auto_increment primary key,
	fecha datetime not null default now(),
	detalle varchar(255) not null,
	ruta_dictamen varchar(255) not null,
	id_tutor integer unsigned not null,
	id_tesis integer unsigned not null,
	estado char(1) not null default 'E',
	estacion smallint not null default 1,
	constraint fk_revision_tutor foreign key (id_tutor) references usuario(id_usuario) on
	delete restrict on
	update cascade,
		constraint fk_revision_tesis foreign key (id_tesis) references ut_tesis(id_tesis) on
	delete restrict on
	update cascade
);
-- 
-- -------------------------------------------------
-- TRIGGERS
-- -------------------------------------------------
-- 
-- -------------------------------------------------
-- NEW USUARIO
-- -------------------------------------------------
delimiter //
create trigger if not exists ut_tr_new_usuario
after insert on usuario
for each row
begin
	insert into ut_perfil (id_usuario) values (new.id_usuario);
end;
//
delimiter ;
-- -------------------------------------------------
-- NEW TESIS
-- -------------------------------------------------
delimiter //
create trigger if not exists ut_tr_new_tesis
after insert on ut_tesis
for each row
begin
	insert into ut_revision (id_tesis) 
	values (new.id_tesis);
end;
//
delimiter ;
-- -------------------------------------------------
-- NEW ROL
-- -------------------------------------------------
delimiter //
create trigger if not exists ut_tr_new_rol 
after insert on rol 
for each row
begin
	declare pagina_id int;
	declare done int default false;
	declare rolCursor cursor for select up.id_pagina from ut_pagina up ;
	declare continue handler for not found set done = true;

	open rolCursor;
	read_loop: loop
		fetch rolCursor into pagina_id;
		if done then 
			leave read_loop;
		end if;
		
		insert into ut_permiso 
		(id_rol, id_pagina, permiso) 
		values (new.id_rol, pagina_id, 0);
	end loop;
	close rolCursor;
end;
//
delimiter ;
-- -------------------------------------------------
-- NEW PAGE
-- -------------------------------------------------
delimiter //
create trigger if not exists ut_tr_new_page 
after insert on ut_pagina 
for each row
begin
	declare rol_id int;
	declare done int default false;
	declare rolCursor cursor for select r.id_rol from rol r ;
	declare continue handler for not found set done = true;

	open rolCursor;
	read_loop: loop
		fetch rolCursor into rol_id;
		if done then 
			leave read_loop;
		end if;
		
		insert into ut_permiso 
		(id_rol, id_pagina, permiso) 
		values (rol_id, new.id_pagina, 0);
	end loop;
	close rolCursor;
end;
//
delimiter ;
-- -------------------------------------------------
-- UPDATE TESIS
-- -------------------------------------------------
delimiter //
create trigger if not exists ut_tr_update_tesis
after update on ut_tesis
for each row
begin
	update ut_revision 
	set estado = 'E' 
	where id_tesis = new.id_tesis 
	and estado = 'P'; 
end;
//
delimiter ;
-- 
-- -------------------------------------------------
-- PROCEDURES
-- -- -------------------------------------------------
-- 
-- -- -------------------------------------------------
-- CREAR USUARIO
-- ----------------------------------------------------
drop procedure if exists sp_ut_crear_usuario;
delimiter //
create procedure if not exists sp_ut_crear_usuario (
	in p_nombre varchar(50),
	in p_apellido varchar(75),
	in p_genero char(1),
	in p_correo varchar(100),
	in p_pass varchar(200),
	in p_direccion varchar(200),
	in p_fecha_nac date,
	in p_municipio int unsigned,
	in p_carnet int unsigned,
	in p_cui varchar(20),
	in p_rol int unsigned
)
begin
	declare exist_user int ; 
	declare v_id_usuario int unsigned ; 
	
	select count(*) into exist_user
	from usuario u 
	where
		u.nombre = p_nombre and 
		u.correo = p_correo ; 
	
	if (exist_user > 0) then 
		signal sqlstate '45000'
			set message_text = 'Ya existe un usuario con ese correo';
	end if ; 

	insert ignore into usuario 
		(nombre, apellidos, genero, correo, pass, direccion, fecha_nac, id_municipio, carnet, cui)
	values 
		(p_nombre, p_apellido, p_genero, p_correo, p_pass, p_direccion, p_fecha_nac, p_municipio, p_carnet, p_cui) ; 
	
	select max(id_usuario)
	into v_id_usuario
	from usuario u ; 

	insert ignore into usuario_rol (id_usuario, id_rol)
	values (v_id_usuario, p_rol) ; 
end ;
//
delimiter ;
-- 
-- -------------------------------------------------
-- FUNCIONES
-- -------------------------------------------------
-- 
-- 
-- -------------------------------------------------
-- VISTAS
-- -------------------------------------------------
-- 
-- -------------------------------------------------
-- USUARIOS
-- -------------------------------------------------
delimiter //
drop view if exists ut_v_usuarios;
create view ut_v_usuarios as 
select 
	u.id_usuario , u.fecha_nac ,
	u.genero , u.direccion , u.id_municipio , 
	u.nombre , u.apellidos , 
	u.correo , u.estado , 
	u.carnet , u.cui ,
	r.id_rol , r.nombre as rol, 
	u.pass 
from usuario_rol ur 
inner join usuario u on ur.id_usuario = u.id_usuario 
inner join rol r on ur.id_rol = r.id_rol ;
//
delimiter ;

-- -------------------------------------------------
-- ROL
-- -------------------------------------------------
delimiter //
drop view if exists ut_v_rol;
create view ut_v_rol as 
select
	ur.id_usuario , u.nombre u_nombre , u.correo ,  
	ur.id_rol , r.nombre r_nombre 
from usuario_rol ur 
inner join usuario u 
	using (id_usuario)
inner join rol r 
	using (id_rol);
//
delimiter ;

-- -------------------------------------------------
-- REVISION
-- -------------------------------------------------
delimiter //
drop view if exists ut_v_revision;
create view ut_v_revision as 
select 
	ur.id_revision ,
	ut.titulo ,
	ut.ruta_perfil ,
	ut.ruta_tesis ,
	ut.ruta_asesor ,
	ur.ruta_dictamen ,
	ut.fecha_creacion ,
	ut.fecha_modificacion ,
	ur.fecha as fecha_revision ,
	ut.id_estudiante , 
	ur.id_tutor ,
	ur.detalle ,
	ur.estado , 
	ur.estacion 
from ut_revision ur 
inner join ut_tesis ut using(id_tesis) ;
//
delimiter ;

-- -------------------------------------------------
-- ASIGNACION
-- -------------------------------------------------
delimiter //
drop view if exists ut_v_asignacion;
create view ut_v_asignacion as 
select
	uct.id_curso_tutor , 
	uct.salon , 
	uh.hora_inicio , 
	uh.hora_final , 
	uj.nombre as uj_nombre , 
	ua.id_estudiante , 
	ua.es_aprobado , 
	ua.ruta_certificado, 
	tt.nombre as u_nombre 
from ut_curso_tutor uct 
inner join ut_asignacion ua 
	on uct.id_curso_tutor = ua.id_curso_tutor 
inner join usuario tt 
	on uct.id_tutor = tt.id_usuario 
inner join ut_horario uh 
	on uct.id_horario = uh.id_horario 
	and uct.id_jornada = uh.id_jornada 
inner join ut_jornada uj 
	on uh.id_jornada = uj.id_jornada ;
//
delimiter ;