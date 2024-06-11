import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from './Rol';
import { Permission } from './Permission';

@Entity('ut_pagina')
export class Page extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_pagina: number;

	@Column()
	nombre: string;

	@Column()
	descripcion: string;

	@Column()
	ruta: string;

	@Column()
	indice: number;

	@ManyToOne(() => Page, (page: Page) => page.childrens)
	@JoinColumn({ name: 'id_padre' })
	parent: Page;

	@OneToMany(() => Page, (page: Page) => page.parent)
	childrens: Page[];

	@OneToMany(() => Permission, (permission: Permission) => permission.page)
	permissions: Permission[];

	// @ManyToMany(() => Rol, (rol) => rol.paginas)
	// roles: Rol[];
}
