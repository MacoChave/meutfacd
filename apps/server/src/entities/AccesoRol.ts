import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Rol } from './Rol';
import { UTPagina } from './Pagina';

@Entity('ut_acceso_rol')
export class UTAccesoRol {
	@PrimaryColumn()
	id_rol: number;

	@PrimaryColumn()
	id_pagina: number;

	@Column({ type: 'tinyint', default: 0 })
	activo: number;

	@ManyToOne(() => Rol, (rol: Rol) => rol.paginas)
	@JoinColumn({ name: 'id_rol' })
	rol: Rol;

	@ManyToOne(() => UTPagina, (pagina: UTPagina) => pagina.roles)
	@JoinColumn({ name: 'id_pagina' })
	pagina: UTPagina;
}

// import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

// @Entity('ut_acceso_rol')
// export class AccessRol extends BaseEntity {
// 	@PrimaryColumn()
// 	id_rol: number;

// 	@PrimaryColumn()
// 	id_pagina: number;

// 	@Column({ type: 'tinyint' })
// 	activo: number;
// }
