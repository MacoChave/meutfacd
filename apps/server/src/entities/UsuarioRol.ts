import { Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { Usuario } from './Usuario';
import { Rol } from './Rol';

@Entity('usuario_rol')
export class UsuarioRol {
	@PrimaryColumn()
	id_rol: number;

	@PrimaryColumn()
	id_usuario: number;

	@ManyToMany(() => Usuario, (usuario: Usuario) => usuario.roles)
	@JoinColumn({ name: 'id_usuario' })
	usuarios: Usuario[];

	@ManyToMany(() => Rol, (rol: Rol) => rol.usuarios)
	@JoinColumn({ name: 'id_rol' })
	roles: Rol[];
}

// import {
// 	BaseEntity,
// 	Entity,
// 	JoinColumn,
// 	ManyToOne,
// 	OneToMany,
// 	PrimaryColumn,
// } from 'typeorm';
// import { User } from './User';
// import { Rol } from './Rol';
// import { Permission } from './Permission';

// @Entity('usuario_rol')
// export class UserRol extends BaseEntity {
// 	@PrimaryColumn()
// 	id_usuario: number;

// 	@PrimaryColumn()
// 	id_rol: number;

// 	@ManyToOne(() => User, (user: User) => user.roles)
// 	@JoinColumn({ name: 'id_usuario' })
// 	user: User;

// 	@ManyToOne(() => Rol, (rol: Rol) => rol.users)
// 	@JoinColumn({ name: 'id_rol' })
// 	rol: Rol;

// 	@OneToMany(() => Permission, (permission: Permission) => permission.userRol)
// 	permissions: Permission[];
// }
