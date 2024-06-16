import { JornadaModel } from './jornada.model';

export interface HorarioModel {
	id_horario?: number;
	id_jornada?: number;
	hora_inicio: string;
	hora_fin: string;
	jornada?: JornadaModel;
}
