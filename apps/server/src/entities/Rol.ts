import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './Usuario';
import { UTPagina } from './Pagina';

@Entity('rol')
export class Rol {
	@PrimaryGeneratedColumn()
	id_rol: number;

	@Column({ length: 45 })
	nombre: string;

	@Column({ length: 255 })
	descripcion: string;

	@ManyToMany(() => Usuario, (usuario: Usuario) => usuario.roles)
	usuarios: Usuario[];

	@ManyToMany(() => UTPagina)
	@JoinTable({
		name: 'ut_acceso_rol',
		joinColumns: [{ name: 'id_rol' }],
		inverseJoinColumns: [{ name: 'id_pagina' }],
	})
	paginas: UTPagina[];
}

// import {
// 	BaseEntity,
// 	Column,
// 	Entity,
// 	JoinTable,
// 	ManyToMany,
// 	OneToMany,
// 	PrimaryGeneratedColumn,
// } from 'typeorm';
// import { User } from './User';
// import { Page } from './Page';
// import { UserRol } from './UserRol';

// @Entity('rol')
// export class Rol extends BaseEntity {
// 	@PrimaryGeneratedColumn()
// 	id_rol: number;

// 	@Column()
// 	nombre: string;

// 	@Column()
// 	descripcion: string;

// 	@ManyToMany(() => User, (user: User) => user.roles)
// 	users: User[];

// 	@OneToMany(() => UserRol, (userRol: UserRol) => userRol.rol)
// 	userRoles: UserRol[];

// 	@ManyToMany(() => Page)
// 	@JoinTable({
// 		name: 'ut_acceso_rol',
// 		joinColumns: [{ name: 'id_rol' }],
// 		inverseJoinColumns: [{ name: 'id_pagina' }],
// 	})
// 	paginas: Page[];
// }
