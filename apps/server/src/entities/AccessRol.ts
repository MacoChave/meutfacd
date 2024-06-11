import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ut_acceso_rol')
export class AccessRol extends BaseEntity {
	@PrimaryColumn()
	id_rol: number;

	@PrimaryColumn()
	id_pagina: number;

	@Column({ type: 'tinyint' })
	activo: number;
}
