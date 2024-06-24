import { HorarioModel } from './horario.model';

export interface JornadaModel {
	id_jornada?: number;
	nombre: string;
	horarios?: HorarioModel[];
}
