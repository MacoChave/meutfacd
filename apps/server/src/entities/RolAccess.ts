import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ut_acceso_rol')
export class RolAccess extends BaseEntity {
	@PrimaryColumn()
	id_rol: number;
	@PrimaryColumn()
	id_pagina: number;
	@Column()
	activo: number;
}
