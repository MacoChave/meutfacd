import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Pagina } from './Pagina';

@Entity('rol')
export class Rol extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_rol: number;
	@Column()
	nombre: string;
	@Column()
	descripcion: string;
	@ManyToMany(() => Pagina)
	@JoinTable({
		name: 'ut_acceso_rol',
		joinColumns: [{ name: 'id_rol' }],
		inverseJoinColumns: [{ name: 'id_pagina' }],
	})
	paginas: Pagina[];
}
