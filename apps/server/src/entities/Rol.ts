import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Page } from './Page';
import { UserRol } from './UserRol';
import { User } from './User';

@Entity('rol')
export class Rol extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_rol: number;

	@Column()
	nombre: string;

	@Column()
	descripcion: string;

	@ManyToMany(() => User, (user: User) => user.roles)
	users: User[];

	// @ManyToMany(() => Page)
	// @JoinTable({
	// 	name: 'ut_acceso_rol',
	// 	joinColumns: [{ name: 'id_rol' }],
	// 	inverseJoinColumns: [{ name: 'id_pagina' }],
	// })
	// paginas: Page[];
}
