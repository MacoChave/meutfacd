import Rol from '../models/rol';

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

// import promisePool from '../config/db';

// export interface ISQLParametros {
// 	tabla: string | string[];
// 	datos: Object;
// 	condicion?: Object;
// 	orden?: String[];
// 	direccion?: String[];
// }

// const separarClaveValor = (datos: Object) => {
// 	let columnas = Object.keys(datos);
// 	let valores = Object.values(datos);
// 	return { columnas, valores };
// };

// export const insertar = async ({ tabla, datos }: ISQLParametros) => {
// 	let _datos = separarClaveValor(datos);
// 	let sql = `INSERT INTO ${tabla}
// 	(${_datos.columnas.join(', ')})
// 	VALUES (${_datos.valores.map((v, index) => `$${index}`).join(', ')})`;
// 	return await promisePool.query(sql, _datos.valores);
// };

// // TODO: Paginar resultados

// export const seleccionar = async ({
// 	tabla,
// 	datos,
// 	condicion,
// 	orden,
// 	direccion,
// }: ISQLParametros) => {};

// export const seleccionarJoin = ({
// 	tabla,
// 	datos,
// 	condicion,
// 	orden,
// 	direccion,
// }: ISQLParametros) => {};

// export const actualizar = ({ tabla, datos, condicion }: ISQLParametros) => {};

// export const eliminar = ({ tabla, datos, condicion }: ISQLParametros) => {};
