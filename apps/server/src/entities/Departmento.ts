import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Municipio } from './Municipio';

@Entity('departamento')
export class Departamento {
	@PrimaryGeneratedColumn()
	id_departamento: number;

	@Column()
	nombre: string;

	@OneToMany(
		() => Municipio,
		(municipio: Municipio) => municipio.departamento
	)
	municipios: Municipio[];
}

// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Municipality } from './Municipality';

// @Entity('departamento')
// export class Department {
// 	@PrimaryGeneratedColumn()
// 	id_departamento: number;

// 	@Column()
// 	nombre: string;

// 	@OneToMany(
// 		() => Municipality,
// 		(municipality: Municipality) => municipality.id_departamento,
// 		{}
// 	)
// 	municipios: Municipality[];
// }
