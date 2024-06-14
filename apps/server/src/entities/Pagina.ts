import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from './Rol';

@Entity('ut_pagina')
export class UTPagina {
	@PrimaryGeneratedColumn()
	id_pagina: number;

	@Column({ length: 50 })
	nombre: string;

	@Column({ length: 128, default: '' })
	descripcion: string;

	@Column({ length: 50 })
	ruta: string;

	@Column()
	indice: number;

	@ManyToOne(() => UTPagina)
	@JoinColumn({ name: 'id_padre' })
	padre: UTPagina;

	@ManyToMany(() => Rol)
	@JoinTable({
		name: 'ut_acceso_rol',
		joinColumns: [{ name: 'id_pagina' }],
		inverseJoinColumns: [{ name: 'id_rol' }],
	})
	roles: Rol[];
}

// import {
// 	BaseEntity,
// 	Column,
// 	Entity,
// 	JoinColumn,
// 	ManyToMany,
// 	ManyToOne,
// 	OneToMany,
// 	PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Rol } from './Rol';
// import { Permission } from './Permission';

// @Entity('ut_pagina')
// export class Page extends BaseEntity {
// 	@PrimaryGeneratedColumn()
// 	id_pagina: number;

// 	@Column()
// 	nombre: string;

// 	@Column()
// 	descripcion: string;

// 	@Column()
// 	ruta: string;

// 	@Column()
// 	indice: number;

// 	@ManyToOne(() => Page, (page: Page) => page.childrens)
// 	@JoinColumn({ name: 'id_padre' })
// 	parent: Page;

// 	@OneToMany(() => Page, (page: Page) => page.parent)
// 	childrens: Page[];

// 	@OneToMany(() => Permission, (permission: Permission) => permission.page)
// 	permissions: Permission[];

// 	// @ManyToMany(() => Rol, (rol) => rol.paginas)
// 	// roles: Rol[];
// }
