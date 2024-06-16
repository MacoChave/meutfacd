import { DepartamentoModel } from './departamento.model';

export interface MunicipioModel {
	id_municipio?: number;
	id_departamento: number;
	municipio: string;
	departamentos?: DepartamentoModel[];
}
