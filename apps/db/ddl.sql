-- 
-- -----------------------------------------------
--  CREATE DATABASE
-- -----------------------------------------------
--  
create database if not exists dev_meutdb
character set utf8mb4 
collate utf8mb4_0900_ai_ci;

use dev_meutdb;

-- 
-- -------------------------------------------------
-- CREATE TABLES
-- -------------------------------------------------
-- 
-- -------------------------------------------------
-- PERFIL MODULE
-- -------------------------------------------------
create table if not exists departamento (
	id_departamento integer unsigned auto_increment primary key,
	nombre varchar(50) not null
);

create table if not exists municipio (
	id_municipio integer unsigned auto_increment primary key,
	id_departamento integer unsigned not null,
	municipio varchar(50) not null,
	constraint fk_municipio_departamento foreign key (id_departamento) references departamento (id_departamento) on
	delete restrict on
	update cascade
);

create table if not exists ut_jornada (
	id_jornada integer unsigned auto_increment primary key ,
	nombre varchar(45) not null
);

create table if not exists ut_horario (
	id_horario integer unsigned auto_increment not null,
	id_jornada integer unsigned not null,
	hora_inicio time not null,
	hora_final time not null,
	constraint pk_horario primary key (id_horario, id_jornada),
	constraint fk_horario_jornada foreign key (id_jornada) references ut_jornada (id_jornada) on
	delete restrict on
	update cascade
);

create table if not exists usuario (
	id_usuario integer unsigned auto_increment primary key,
	nombre varchar(50) not null,
	apellidos varchar(75) not null,
	genero char(1) not null,
	correo varchar(100) not null,
	pass varchar(200) not null,
	direccion varchar(200) not null,
	fecha_nac date not null,
	estado char(1) not null, -- [A]ACTIVO | [I]INACTIVO
	fecha_creacion datetime not null default now(),
	id_municipio integer unsigned not null,
	doc_cui varchar(75) null,
	carnet integer unsigned unique null,
	cui varchar(20) unique null,
	constraint fk_usuario_municipio foreign key (id_municipio) references municipio(id_municipio)
);

create table if not exists rol (
	id_rol integer unsigned auto_increment primary key,
	nombre varchar(45) not null,
	descripcion varchar(255) not null
);

create table if not exists usuario_rol (
	id_usuario integer unsigned,
	id_rol integer unsigned,
	constraint pk_usuario_rol primary key (id_usuario, id_rol),
	constraint fk_usuario_rol_u foreign key (id_usuario) references usuario (id_usuario),
	constraint fk_usuario_rol_r foreign key (id_rol) references rol (id_rol)
);

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

create table if not exists ut_pagina (
	id_pagina integer unsigned auto_increment primary key ,
	nombre varchar(50) not null,
	descripcion varchar(128) not null,
	indice integer not null,
	ruta varchar(128) not null
);

create table if not exists ut_permiso (
	id_rol integer unsigned,
	id_pagina integer unsigned,
	permiso integer,
	constraint pk_ut_permiso 
		primary key (id_rol, id_pagina),
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

-- -------------------------------------------------
-- COURSE MODULE
-- ------------------------------------------------- 
create table if not exists ut_curso (
	id_curso integer unsigned auto_increment primary key ,
	nombre varchar(128) not null
);

create table if not exists ut_curso_tutor (
	id_curso_tutor integer unsigned auto_increment primary key ,
	fecha date not null default (curdate()),
	salon varchar(128) not null default '', 
	id_curso integer unsigned not null,
	id_tutor integer unsigned not null,
	id_horario integer unsigned not null,
	id_jornada integer unsigned not null,
	activo bool default 1,
	dias json, 
	constraint fk_curso_tutor_curso foreign key (id_curso) 
		references ut_curso(id_curso) 
		on delete restrict 
		on update cascade,
	constraint fk_curso_tutor_tutor foreign key (id_tutor) 
		references usuario(id_usuario) 
		on delete restrict 
		on update cascade,
	constraint fk_curso_tutor_horario foreign key (id_horario, id_jornada) 
		references ut_horario(id_horario, id_jornada) 
		on delete restrict 
		on update cascade
);

-- 
-- create table if not exists ut_asignacion (
-- 	id_estudiante integer unsigned not null,
-- 	id_curso_tutor integer unsigned not null,
-- 	estado char(1) not null default 'E',
-- 	ruta_certificado varchar(255),
-- 	constraint pk_asignacion primary key(id_estudiante, id_curso_tutor), 
-- 	constraint fk_asignacion_estudiante foreign key (id_estudiante) references usuario(id_usuario) on
-- 	delete restrict on
-- 	update cascade,
-- 		constraint fk_asignacion_curso_tutor foreign key (id_curso_tutor) references ut_curso_tutor (id_curso_tutor) on
-- 	delete restrict on
-- 	update cascade
-- );

-- -------------------------------------------------
-- LOG MODULE
-- ------------------------------------------------- 
-- create table if not exists ut_bitacora (
-- 	fecha datetime not null default now(),
-- 	detalle varchar(255) not null,
-- 	id_usuario integer unsigned not null,
-- 	usuario varchar(50) not null
-- );

-- -------------------------------------------------
-- COMMUNICATION MODULE
-- ------------------------------------------------- 
create table if not exists ut_notificacion (
	id_notificacion integer unsigned auto_increment primary key ,
	mensaje varchar(255) not null,
	fecha datetime not null default now(),
	activo tinyint(1) not null default 1,
	id_emisor integer unsigned not null,
	id_receptor integer unsigned not null,
	constraint fk_notificacion_emisor foreign key (id_emisor) 
		references usuario (id_usuario) 
		on delete restrict 
		on update cascade,
	constraint fk_notificacion_receptor foreign key (id_receptor) 
		references usuario (id_usuario) 
		on delete restrict 
		on update cascade
);

create table if not exists ut_chat (
	id_chat integer unsigned auto_increment primary key ,
	miembros json , 
	fecha_creacion datetime default now() , 
	fecha_modificacion datetime default now() 
) ; 

create table if not exists ut_message (
	id_message integer unsigned auto_increment primary key ,
	id_chat integer unsigned, 
	autor integer , 
	texto varchar(255) , 
	estado char(1) default 'E' , 
	fecha_envio datetime default now(),
	constraint fk_message_chat 
		foreign key (id_chat)
		references ut_chat(id_chat) 
		on delete restrict 
		on update cascade   
) ; 

-- -------------------------------------------------
-- THESIS MODULE
-- ------------------------------------------------- 
create table if not exists ut_tesis (
	id_tesis integer unsigned auto_increment primary key ,
	titulo varchar(255) not null,
	ruta_perfil varchar(255) not null,
	ruta_tesis varchar(255) null,
	ruta_asesor varchar(255) null,
	fecha_creacion datetime not null default now(),
	fecha_modificacion datetime not null default now(),
	id_estudiante integer unsigned not null,
	constraint fk_tesis_estudiante foreign key (id_estudiante) 
		references usuario(id_usuario) 
		on delete restrict 
		on update cascade
);

create table if not exists ut_revision (
	id_revision integer unsigned auto_increment primary key ,
	fecha datetime not null default now(),
	detalle varchar(500) ,
	ruta_certificado varchar(100) , 
	ruta_dictamen varchar(255) ,
	id_curso_tutor integer unsigned , 
	id_tutor integer unsigned ,
	id_tesis integer unsigned ,
	estado char(1) not null default 'E',
	estacion smallint not null default 1,
	sala varchar(100),
	constraint fk_revision_tutor foreign key (id_tutor) 
		references usuario(id_usuario) 
		on delete restrict 
		on update cascade,
	constraint fk_revision_tesis foreign key (id_tesis) 
		references ut_tesis(id_tesis) 
		on delete restrict 
		on update cascade , 
	constraint fk_revision_curso foreign key (id_curso_tutor) 
		references ut_curso_tutor (id_curso_tutor) 
		on delete restrict 
		on update cascade 
);

-- 
-- -------------------------------------------------
-- TRIGGERS
-- -------------------------------------------------
-- 
-- -------------------------------------------------
-- NEW USUARIO
-- -------------------------------------------------
create trigger if not exists ut_tr_new_usuario
after insert on usuario
for each row
begin
	insert into ut_perfil (id_usuario) 
	values (new.id_usuario);
end;

-- -------------------------------------------------
-- NEW TESIS
-- -------------------------------------------------
create trigger if not exists ut_tr_new_tesis
after insert on ut_tesis
for each row
begin
	insert into ut_revision (id_tesis) 
	values (new.id_tesis);
end;

-- -------------------------------------------------
-- UPDATE TESIS
-- -------------------------------------------------
-- create trigger if not exists ut_tr_update_tesis 
-- after update on ut_tesis 
-- for each row 
-- begin
--	declare v_estado char(1) ; 

--	select ur.estado 
--	into v_estado 
--	from ut_revision ur 
--	where ur.id_tesis = old.id_tesis
--	and ur.estacion <> 4
--	order by ur.fecha desc 
--	limit 1 ;  

--	if (v_estado = 'P' 
--		or v_estado = 'R') 
--		and old.titulo <> new.titulo 
--	then
--		insert into ut_revision ( 
--			fecha , id_tesis , 
--			id_curso_tutor , id_tutor , 
--			estado , estacion ) 
--			select 
--				now() as fecha , ur.id_tesis , 
--				ur.id_curso_tutor , ur.id_tutor , 
--				'V' as estado , ur.estacion 
--			from ut_revision ur 
--			where ur.id_tesis = old.id_tesis 
--			order by ur.fecha desc 
--			limit 1 ; 
--	end if ; 
-- end ; 

-- -------------------------------------------------
-- NEW ROL
-- -------------------------------------------------
create trigger if not exists ut_tr_new_rol 
after insert on rol 
for each row
begin
	declare pagina_id int;
	declare done int default false;
	declare pageCursor cursor for select up.id_pagina from ut_pagina up ;
	declare continue handler for not found set done = true;

	open pageCursor;
	read_loop: loop
		fetch pageCursor into pagina_id;
		if done then 
			leave read_loop;
		end if;
		
		insert into ut_permiso 
		(id_rol, id_pagina, permiso) 
		values (new.id_rol, pagina_id, 0);
	end loop;
	close pageCursor;
end;

-- -------------------------------------------------
-- NEW PAGE
-- -------------------------------------------------
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

-- -------------------------------------------------
-- UPDATE REVISION
-- -------------------------------------------------
create trigger if not exists ut_tr_update_revision
after update on ut_revision
for each row
begin
	declare v_horario int;
	declare v_estudiante int;

	select id_estudiante
	into v_estudiante
	from ut_tesis ut 
	where ut.id_tesis = new.id_tesis;
	
	select up.id_horario 
	into v_horario
	from ut_perfil up 
	where up.id_usuario = v_estudiante;

	if new.estado = 'A' and v_horario is null then 
		insert into ut_notificacion 
		(mensaje, id_receptor, id_emisor)
		values ('Selecciona un horario para ser asignado al siguiente curso', v_estudiante, old.id_tutor);
	end if;
end;

-- 
-- -------------------------------------------------
-- PROCEDURES
-- -- -------------------------------------------------
-- 
-- -- -------------------------------------------------
-- CREAR USUARIO
-- ----------------------------------------------------
create procedure if not exists ut_sp_crear_usuario (
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
	in p_rol int unsigned,
	out error_code int, 
	out error_message varchar(255)
)
this_proc:begin
	declare v_count_user int ; 
	declare v_new_user int unsigned ; 

	set error_code = 0;
	set error_message = '';
	
	select count(*) into v_count_user
	from usuario u 
	where u.correo = p_correo ; 
	
	if v_count_user > 0 then 
		set error_code = -1;
		set error_message = 'El correo ya está registrado';
		leave this_proc;
	end if; 

	insert ignore into usuario 
		(nombre, apellidos, genero, correo, pass, direccion, fecha_nac, id_municipio, carnet, cui)
	values 
		(p_nombre, p_apellido, p_genero, p_correo, p_pass, p_direccion, p_fecha_nac, p_municipio, p_carnet, p_cui) ; 
	
	set v_new_user = last_insert_id() ; 
	
	if v_new_user = 0 then 
		set error_code = -1;
		set error_message = 'No se pudo crear el usuario';
		leave this_proc;
	end if; 

	insert ignore into usuario_rol (id_usuario, id_rol)
	values (v_new_user, p_rol) ; 
end ; 

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
drop view if exists ut_v_usuarios ; 
create view ut_v_usuarios as 
select 
	u.id_usuario , u.fecha_nac ,
	u.genero , u.direccion , u.id_municipio , 
	u.nombre , u.apellidos , 
	u.correo , u.estado , 
	u.carnet , u.cui, u.pass , 
	up.id_horario , up.id_jornada , 
	group_concat(r.nombre separator ',') roles 
from usuario u 
left join usuario_rol ur using (id_usuario) 
left join rol r using (id_rol) 
left join ut_perfil up 
using (id_usuario)
group by 
	u.id_usuario ;

-- -------------------------------------------------
-- ROL
-- -------------------------------------------------
drop view if exists ut_v_rol ; 
create view ut_v_rol as 
select
	ur.id_usuario , u.nombre u_nombre , u.correo ,  
	ur.id_rol , r.nombre r_nombre 
from usuario_rol ur 
inner join usuario u 
	using (id_usuario)
inner join rol r 
	using (id_rol);

-- -------------------------------------------------
-- REVISION
-- -------------------------------------------------
drop view if exists ut_v_revision ; 
create view ut_v_revision as 
select 
	ur.id_revision , 
	ur.estado , ur.detalle , 
	ur.estacion , ur.ruta_dictamen , 
	ur.fecha , ur.id_tutor ,
	ur.ruta_certificado ,
	ur.sala , 
	ud.nombre tutor , 
	ut.id_tesis , 
	ut.titulo , ut.ruta_perfil , 
	ut.ruta_tesis, ut.ruta_asesor , 
	ut.fecha_creacion , ut.fecha_modificacion , 
	u.id_usuario , u.nombre , 
	up.id_horario , up.id_jornada , 
	uct.fecha fecha_curso , 
	uct.salon , 
	uct.dias 
from ut_revision ur 
left join ut_tesis ut 
	on ur.id_tesis = ut.id_tesis 
inner join usuario u
	on ut.id_estudiante = u.id_usuario 
left join usuario ud 
	on ur.id_tutor = ud.id_usuario 
left join ut_perfil up 
	on u.id_usuario = up.id_usuario 
left join ut_curso_tutor uct 
	on ur.id_curso_tutor = uct.id_curso_tutor ;

-- -------------------------------------------------
-- CURSOS
-- -------------------------------------------------
create view ut_v_cursos as 
select 
	* 
from ut_curso uc 
right join ut_curso_tutor uct 
using (id_curso);

-- -------------------------------------------------
-- CURSOS
-- -------------------------------------------------
drop view if exists ut_v_cursotutor ; 
create view ut_v_cursotutor as 
select 
	uct.id_curso_tutor , 
	uct.fecha , 
	uct.salon ,
	uct.id_tutor , 
	concat(u.nombre, ' ', u.apellidos) docente , 
	uct.id_curso , 
	uc.nombre n_curso , 
	uct.id_jornada , 
	uj.nombre n_jornada , 
	uct.id_horario , 
	uh.hora_inicio 
from ut_curso_tutor uct 
inner join ut_curso uc 
	on uct.id_curso = uc.id_curso 
inner join usuario u 
	on uct.id_tutor = u.id_usuario 
inner join ut_horario uh 
	on uct.id_horario = uh.id_horario 
inner join ut_jornada uj 
	on uct.id_jornada = uj.id_jornada ; 

-- -------------------------------------------------
-- ASIGNACION
-- -------------------------------------------------
-- drop view if exists ut_v_asignacion ; 
-- create view ut_v_asignacion as 
-- select
-- 	uct.id_curso_tutor , 
-- 	uct.salon , 
-- 	uct.dias , 
-- 	uct.id_tutor , 
-- 	uh.hora_inicio , 
-- 	uh.hora_final , 
-- 	uj.nombre as jornada , 
-- 	ua.id_estudiante , 
-- 	ua.estado , 
-- 	ua.ruta_certificado, 
-- 	tt.nombre as tutor 
-- from ut_curso_tutor uct 
-- inner join ut_asignacion ua 
-- 	on uct.id_curso_tutor = ua.id_curso_tutor 
-- inner join usuario tt 
-- 	on uct.id_tutor = tt.id_usuario 
-- inner join ut_horario uh 
-- 	on uct.id_horario = uh.id_horario 
-- 	and uct.id_jornada = uh.id_jornada 
-- inner join ut_jornada uj 
-- 	on uh.id_jornada = uj.id_jornada ; 

-- -------------------------------------------------
-- NOTIFICACION
-- -------------------------------------------------
create view ut_v_notification as 
select 
	un.* , 
	uem.nombre emisor , uem.correo correo_emisor , 
	coalesce(ure.nombre, 'Sistema') receptor
from ut_notificacion un 
left join usuario uem 
	on un.id_emisor = uem.id_usuario 
inner join usuario ure 
	on un.id_receptor = ure.id_usuario ;

-- -------------------------------------------------
-- NOTIFICACION
-- -------------------------------------------------
create view ut_v_chat as 
select
	uc.id_chat , 
	uc.miembros , 
	u1.nombre n1 ,  
	u2.nombre n2 , 
	uc.fecha_creacion , 
	uc.fecha_modificacion 
from ut_chat uc 
inner join usuario u1 
	on json_extract(uc.miembros, '$[0]') = u1.id_usuario   
inner join usuario u2 
	on json_extract(uc.miembros, '$[1]') = u2.id_usuario ; 

-- -------------------------------------------------
-- RESUMEN
-- -------------------------------------------------
create view ut_v_resumen as 
select 
	ur.estacion , 
	count(case when ur.estado = 'N' then 1 else null end) N ,
	count(case when ur.estado = 'E' then 1 else null end) E ,
	count(case when ur.estado = 'V' then 1 else null end) V ,
	count(case when ur.estado = 'R' then 1 else null end) R ,
	count(case when ur.estado = 'P' then 1 else null end) P ,
	count(case when ur.estado = 'A' then 1 else null end) A 
from ut_revision ur 
group by ur.estacion ; 