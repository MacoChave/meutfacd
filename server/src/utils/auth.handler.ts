import Usuario from '../models/usuario';

export const buscarUsuario = (criterio: any) => {
	return Usuario.findOne({
		where: criterio,
	});
};
