import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Departamento } from './Departmento';
import { Usuario } from './Usuario';

@Entity('municipio')
export class Municipio {
	@PrimaryGeneratedColumn()
	id_municipio: number;

	@ManyToOne(
		() => Departamento,
		(departamento: Departamento) => departamento.municipios
	)
	@JoinColumn({ name: 'id_departamento' })
	departamento: Departamento;

	@Column({ length: 50 })
	municipio: string;

	@OneToMany(() => Usuario, (usuario: Usuario) => usuario.municipio)
	usuarios: Usuario[];
}

// import {
// 	Column,
// 	Entity,
// 	JoinColumn,
// 	ManyToOne,
// 	OneToMany,
// 	PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Department } from './Department';
// import { User } from './User';

// @Entity('municipio', {})
// export class Municipality {
// 	@PrimaryGeneratedColumn()
// 	id_municipio: number;

// 	@Column()
// 	municipio: string;

// 	@ManyToOne(
// 		() => Department,
// 		(department: Department) => department.municipios,
// 		{}
// 	)
// 	@JoinColumn({ name: 'id_departamento' })
// 	id_departamento: Department;

// 	@OneToMany(() => User, (user: User) => user.id_municipio, {})
// 	users: User[];
// }
