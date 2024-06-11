import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

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
}
