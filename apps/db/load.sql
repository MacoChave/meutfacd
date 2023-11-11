-- 
-- ----------------------------------------
-- SELECT DATABASE
-- ----------------------------------------
-- 
use dev_meutdb;

-- 
-- ----------------------------------------
-- BULK INSERT
-- ----------------------------------------
-- 
-- ----------------------------------------
-- ROLES INSERT
-- ----------------------------------------
insert into rol 
	(nombre, descripcion) 
values 
	('Super', 'Usuario con todos los permisos operativos desbloqueados'),
	('Administrador', 'Personal encargado de gestionar el sistema'),
	('Secretaria', 'Personal de reportes y asistencias operativas'),
	('Docente punto de tesis', 'Usuario evaluador de punto de tesis'),
	('Docente curso 1', 'Usuario evaluador del curso 1'),
	('Docente curso 2', 'Usuario evaluador del curso 2'),
	('Docente comisión y estilo', 'Usuario evaluador de comisión y estilo'),
	('Encargado punto de tesis', 'Usuario encargado de punto de tesis'),
	('Encargado curso 1', 'Usuario encargado de curso 1'),
	('Encargado curso 2', 'Usuario encargado de curso 2'),
	('Encargado comisión y estilo', 'Usuario encargado de comisión y estilo'),
	('Encargado previos internos', 'Usuario encargado de previos internos'),
	('Estudiante', 'Usuario estudiante de pregrado');

-- ----------------------------------------
-- PAGES INSERT
-- ----------------------------------------
insert into ut_pagina 
	(nombre, descripcion, indice, ruta) 
values 
	('Punto de tesis', '', 1, 'punto-tesis'),
	('Progreso', '', 2, 'progreso'),
	('Curso I', '', 3, 'curso-introduccion'),
	('Asesor de tesis', '', 4, 'tutor-estudiante'),
	('Curso II', '', 5,'curso-elaboracion'),
	('Cambio de tema', '', 6, 'dictamen'),
	('Comisión y estilo', '', 7, 'tesis'),
	('Previos internos', '', 8, 'previos-internos'),
	('Impresión', '', 9, 'finalizacion'),
	('Resumen', '', 1, 'resumen'),
	('Bitácora', '', 2, 'por-estacion'),
	('Usuarios', '', 1, 'usuario'),
	('Páginas', '', 2, 'paginas'),
	('Cursos', '', 3, 'cursos'),
	('Horarios', '', 4, 'horarios'),
	('Aplicación', '', 5, 'aplicacion'),
	('Problemas', '', 6, 'problemas');

-- ----------------------------------------
-- PERMISSIONS INSERT
-- ----------------------------------------
insert into ut_permiso 
    (id_pagina, id_rol, permiso)
values 
    (uuid_to_bin('a0a71833-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a71833-787e-11ee-a624-0a0027000004'),4,1),
    (uuid_to_bin('a0a71833-787e-11ee-a624-0a0027000004'),8,1),
    (uuid_to_bin('a0a71833-787e-11ee-a624-0a0027000004'),13,1),
    (uuid_to_bin('a0a77d40-787e-11ee-a624-0a0027000004'),13,1),
    (uuid_to_bin('a0a77e42-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a77e42-787e-11ee-a624-0a0027000004'),5,1),
    (uuid_to_bin('a0a77e42-787e-11ee-a624-0a0027000004'),9,1),
    (uuid_to_bin('a0a77e42-787e-11ee-a624-0a0027000004'),13,1),
    (uuid_to_bin('a0a77ea6-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a77ea6-787e-11ee-a624-0a0027000004'),10,1),
    (uuid_to_bin('a0a77eff-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a77eff-787e-11ee-a624-0a0027000004'),6,1),
    (uuid_to_bin('a0a77eff-787e-11ee-a624-0a0027000004'),10,1),
    (uuid_to_bin('a0a77eff-787e-11ee-a624-0a0027000004'),13,1),
    (uuid_to_bin('a0a77f54-787e-11ee-a624-0a0027000004'),13,1),
    (uuid_to_bin('a0a77fac-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a77fac-787e-11ee-a624-0a0027000004'),7,1),
    (uuid_to_bin('a0a77fac-787e-11ee-a624-0a0027000004'),11,1),
    (uuid_to_bin('a0a77fac-787e-11ee-a624-0a0027000004'),13,1),
    (uuid_to_bin('a0a78017-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a78017-787e-11ee-a624-0a0027000004'),4,1),
    (uuid_to_bin('a0a78017-787e-11ee-a624-0a0027000004'),12,1),
    (uuid_to_bin('a0a78017-787e-11ee-a624-0a0027000004'),13,1),
    (uuid_to_bin('a0a78072-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a78072-787e-11ee-a624-0a0027000004'),3,1),
    (uuid_to_bin('a0a78072-787e-11ee-a624-0a0027000004'),13,1),
    (uuid_to_bin('a0a780d2-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a780d2-787e-11ee-a624-0a0027000004'),2,1),
    (uuid_to_bin('a0a780d2-787e-11ee-a624-0a0027000004'),3,1),
    (uuid_to_bin('a0a78127-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a78127-787e-11ee-a624-0a0027000004'),2,1),
    (uuid_to_bin('a0a78127-787e-11ee-a624-0a0027000004'),3,1),
    (uuid_to_bin('a0a7817a-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a7817a-787e-11ee-a624-0a0027000004'),2,1),
    (uuid_to_bin('a0a781ca-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a781ca-787e-11ee-a624-0a0027000004'),2,1),
    (uuid_to_bin('a0a78218-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a78218-787e-11ee-a624-0a0027000004'),2,1),
    (uuid_to_bin('a0a78218-787e-11ee-a624-0a0027000004'),3,1),
    (uuid_to_bin('a0a7828f-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a7828f-787e-11ee-a624-0a0027000004'),2,1),
    (uuid_to_bin('a0a7828f-787e-11ee-a624-0a0027000004'),3,1),
    (uuid_to_bin('a0a782df-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a782df-787e-11ee-a624-0a0027000004'),2,1),
    (uuid_to_bin('a0a78333-787e-11ee-a624-0a0027000004'),1,1),
    (uuid_to_bin('a0a78333-787e-11ee-a624-0a0027000004'),2,1),
    (uuid_to_bin('a0a78333-787e-11ee-a624-0a0027000004'),3,1);

-- ----------------------------------------
-- COURSES INSERT
-- ----------------------------------------
insert into ut_curso 
	(nombre)
values 
	('Inducción a la planeación científica'),
	('Elaboración y presentación de tesis');
-- ----------------------------------------
-- SCHEDULES INSERT
-- ----------------------------------------
insert into ut_jornada 
	(nombre)
values 
	('Matutina'),
	('Vespertina'),
	('Fin de semana'),
	('Nocturna');
-- ----------------------------------------
-- PERIODS INSERT
-- ----------------------------------------
insert into ut_horario 
	(id_horario, id_jornada , hora_inicio , hora_final) 
values 
	(uuid_to_bin(uuid()), uuid_to_bin('ae99cdf9-7ad6-11ee-8a29-0a0027000005'), '13:00', '13:50'),
	(uuid_to_bin(uuid()), uuid_to_bin('ae99cdf9-7ad6-11ee-8a29-0a0027000005'), '14:00', '14:50'),
	(uuid_to_bin(uuid()), uuid_to_bin('ae99cdf9-7ad6-11ee-8a29-0a0027000005'), '15:00', '15:50'),
	(uuid_to_bin(uuid()), uuid_to_bin('ae99cec9-7ad6-11ee-8a29-0a0027000005'), '17:00', '17:50'),
	(uuid_to_bin(uuid()), uuid_to_bin('ae99cec9-7ad6-11ee-8a29-0a0027000005'), '18:00', '18:50'),
	(uuid_to_bin(uuid()), uuid_to_bin('ae99cec9-7ad6-11ee-8a29-0a0027000005'), '19:00', '19:50');
