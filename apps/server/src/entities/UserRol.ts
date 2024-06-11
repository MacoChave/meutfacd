import {
	BaseEntity,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { Rol } from './Rol';
import { Permission } from './Permission';

@Entity('usuario_rol')
export class UserRol extends BaseEntity {
	@PrimaryColumn()
	id_usuario: number;

	@PrimaryColumn()
	id_rol: number;

	@ManyToOne(() => User, (user: User) => user.roles)
	@JoinColumn({ name: 'id_usuario' })
	user: User;

	@ManyToOne(() => Rol, (rol: Rol) => rol.users)
	@JoinColumn({ name: 'id_rol' })
	rol: Rol;

	@OneToMany(() => Permission, (permission: Permission) => permission.userRol)
	permissions: Permission[];
}
