import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Municipality } from './Municipality';
import { Rol } from './Rol';

@Entity('usuario')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_usuario: number;

	@Column()
	nombre: string;

	@Column()
	apellidos: string;

	@Column()
	genero: string;

	@Column()
	correo: string;

	@Column({ select: false })
	pass: string;

	@Column()
	direccion: string;

	// @Column()
	// telefono: string;

	@Column()
	fecha_nac: string;

	@Column()
	estado: string;

	@Column()
	doc_cui: string;

	@Column()
	carnet: number;

	@Column()
	cui: number;

	@ManyToOne(
		() => Municipality,
		(municipality: Municipality) => municipality.users
	)
	@JoinColumn({ name: 'id_municipio' })
	id_municipio: Municipality;

	@ManyToMany(() => Rol, (rol: Rol) => rol.users)
	@JoinTable({
		name: 'usuario_rol',
		joinColumns: [{ name: 'id_usuario' }],
		inverseJoinColumns: [{ name: 'id_rol' }],
	})
	roles: Rol[];
}
