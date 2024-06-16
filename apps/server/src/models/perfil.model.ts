import { HorarioModel } from './horario.model';
import UsuarioModel from './user.model';

export interface PerfilModel {
	id_usuario?: number;
	id_horario?: number;
	id_jornada?: number;
	ocupacion: string;
	usuarios?: UsuarioModel[];
	horario?: HorarioModel;
}
