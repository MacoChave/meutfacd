import Profesor from '../models/profesor';
import Rol from '../models/rol';
import Usuario from '../models/usuario';
import { encriptarPassword } from '../utils/token';

export const cargarRolesTutor = () => {
	return Rol.bulkCreate(
		[
			{
				nombre: 'Administrador',
				descripcion: 'Personal encargado de administrar el sistema',
			},
			{
				nombre: 'Analitica',
				descripcion: 'Personal de soporte y soporte',
			},
			{
				nombre: 'Encargado',
				descripcion: 'Tutor encargado de una estación',
			},
			{
				nombre: 'Evaluador',
				descripcion: 'Tutor dedicado a evaluar a los estudiantes',
			},
		],
		{
			ignoreDuplicates: true,
		}
	);
};

export const crearUsuarioAdministrador = async () => {
	const adminPass = await encriptarPassword(
		process.env.ADMIN_PASSWORD || 'Admin123.'
	);

	const adminUser = await Usuario.findOrCreate({
		where: {
			correo: 'admin@derecho.cloud',
		},
		defaults: {
			nombre: 'Administrador',
			apellido: 'Derecho',
			genero: '-',
			correo: 'admin@derecho.cloud',
			pass: adminPass,
			carnet: '000000000',
			cui: '0000000000000',
			direccion: 'Guatemala',
			fecha_nac: '2023-01-01',
			estado: 1,
			telefono: '00000000',
		},
	});

	const adminRol = await Rol.findOne({
		where: {
			nombre: 'Administrador',
		},
		attributes: ['id_rol'],
	});

	await Profesor.findOrCreate({
		where: {
			id_tutor: adminUser[0].getDataValue('id_usuario'),
		},
		defaults: {
			id_tutor: adminUser[0].getDataValue('id_usuario'),
			id_rol: adminRol?.getDataValue('id_rol') || 1,
		},
	});
};
