import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from './Rol';

@Entity('ut_pagina')
export class Pagina extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_pagina: number;
	@Column()
	nombre: string;
	@Column()
	descripcion: string;
	@Column()
	ruta: string;
	@Column()
	id_padre: number;
	@Column()
	indice: number;
	@ManyToMany(() => Rol, (rol) => rol.paginas)
	roles: Rol[];
}
