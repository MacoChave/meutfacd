import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './Department';
import { User } from './User';

@Entity('municipio', {})
export class Municipality {
	@PrimaryGeneratedColumn()
	id_municipio: number;

	@Column()
	municipio: string;

	@ManyToOne(
		() => Department,
		(department: Department) => department.municipios,
		{}
	)
	@JoinColumn({ name: 'id_departamento' })
	id_departamento: Department;

	@OneToMany(() => User, (user: User) => user.id_municipio, {})
	users: User[];
}
