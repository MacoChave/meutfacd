import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './Department';

@Entity('municipio')
export class Municipality {
	@PrimaryGeneratedColumn()
	id_municipio: number;
	@Column()
	municipio: string;
	@ManyToOne(() => Department, (department) => department.municipios)
	id_departamento: Department;
}
