import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Municipality } from './Municipality';

@Entity('departamento')
export class Department {
	@PrimaryGeneratedColumn()
	id_departamento: number;

	@Column()
	nombre: string;

	@OneToMany(
		() => Municipality,
		(municipality: Municipality) => municipality.id_departamento,
		{}
	)
	municipios: Municipality[];
}
