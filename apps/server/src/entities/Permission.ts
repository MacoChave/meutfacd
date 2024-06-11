import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';
import { Page } from './Page';
import { Rol } from './Rol';
import { User } from './User';
import { UserRol } from './UserRol';

@Entity('ut_permiso')
export class Permission extends BaseEntity {
	@PrimaryColumn()
	id_usuario: number;

	@PrimaryColumn()
	id_rol: number;

	@PrimaryColumn()
	id_pagina: number;

	@Column()
	permiso: number;

	@ManyToOne(() => UserRol, (userRol: UserRol) => userRol.permissions)
	@JoinColumn([
		{ name: 'id_usuario', referencedColumnName: 'id_usuario' },
		{ name: 'id_rol', referencedColumnName: 'id_rol' },
	])
	userRol: UserRol;

	@ManyToOne(() => Page, (page: Page) => page.permissions)
	@JoinColumn({ name: 'id_pagina' })
	page: Page;
}
