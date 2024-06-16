import { AccesoRolModel } from './acceso_rol.model';
import UsuarioModel from './user.model';

export interface RolModel {
	id_rol?: number;
	nombre: string;
	descripcion: string;
	usuarios?: UsuarioModel[];
	accesos?: AccesoRolModel[];
}
