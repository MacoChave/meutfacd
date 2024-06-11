import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Municipality } from './Municipality';
import { Rol } from './Rol';
import { UserRol } from './UserRol';
import { CourseTutor } from './CourseTutor';
import { Course } from './Course';
import { Profile } from './Profile';

@Entity('usuario')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_usuario: number;

	@Column({ type: 'varchar', length: 50 })
	nombre: string;

	@Column({ type: 'varchar', length: 75 })
	apellidos: string;

	@Column({ type: 'char', length: 1 })
	genero: string;

	@Column({ type: 'varchar', length: 100 })
	correo: string;

	@Column({ type: 'varchar', length: 200, select: false })
	pass: string;

	@Column({ type: 'varchar', length: 200 })
	direccion: string;

	// @Column({ type: 'varchar', length: 11 })
	// telefono: string;

	@Column({ type: 'date' })
	fecha_nac: string;

	@Column({ type: 'char', length: 1 })
	estado: string;

	@Column({ type: 'varchar', length: 75 })
	doc_cui: string;

	@Column()
	carnet: number;

	@Column({ type: 'varchar', length: 20 })
	cui: string;

	@ManyToOne(
		() => Municipality,
		(municipality: Municipality) => municipality.users
	)
	@JoinColumn({ name: 'id_municipio' })
	id_municipio: Municipality;

	@OneToMany(() => UserRol, (userRol: UserRol) => userRol.user)
	userRoles: UserRol[];

	@ManyToMany(() => Rol, (rol: Rol) => rol.users)
	@JoinTable({
		name: 'usuario_rol',
		joinColumns: [{ name: 'id_usuario' }],
		inverseJoinColumns: [{ name: 'id_rol' }],
	})
	roles: Rol[];

	@ManyToMany(() => Course, (course: Course) => course.users)
	@JoinTable({
		name: 'ut_curso_tutor',
		joinColumns: [{ name: 'id_tutor' }],
		inverseJoinColumns: [{ name: 'id_curso' }],
	})
	courses: Course[];

	@OneToOne(() => Profile, (profile: Profile) => profile.id_usuario)
	profile: Profile;
}
