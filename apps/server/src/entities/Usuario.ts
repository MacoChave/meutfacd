import {
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
import { Municipio } from './Municipio';
import { UTPerfil } from './Perfil';
import { Rol } from './Rol';
import { UTCursoTutor } from './CursoTutor';

@Entity('usuario')
export class Usuario {
	@PrimaryGeneratedColumn()
	id_usuario: number;

	@Column({ length: 50 })
	nombre: string;

	@Column({ length: 75 })
	apellidos: string;

	@Column({ length: 1 })
	genero: string;

	@Column({ length: 100, unique: true })
	correo: string;

	@Column({ length: 200, select: false })
	pass: string;

	@Column({ length: 200 })
	direccion: string;

	@Column({ length: 11 })
	telefono: string;

	@Column({ type: 'date' })
	fecha_nac: Date;

	@Column({ length: 1, default: 'I' })
	estado: string;

	@Column({ length: 75, nullable: true })
	doc_cui: string;

	@Column({ length: 20, nullable: true })
	cui: string;

	@Column({ unique: true, nullable: true })
	carnet: number;

	@Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
	fecha_creacion: Date;

	@ManyToOne(() => Municipio, (municipio: Municipio) => municipio.usuarios)
	@JoinColumn({ name: 'id_municipio' })
	municipio: Municipio;

	@OneToOne(() => UTPerfil, (perfil: UTPerfil) => perfil.usuario)
	perfil: UTPerfil;

	@ManyToMany(() => Rol)
	@JoinTable({
		name: 'usuario_rol',
		joinColumns: [{ name: 'id_usuario' }],
		inverseJoinColumns: [{ name: 'id_rol' }],
	})
	roles: Rol[];

	@OneToMany(
		() => UTCursoTutor,
		(cursoTutor: UTCursoTutor) => cursoTutor.tutor
	)
	cursosTutor: UTCursoTutor[];
}

// import {
// 	BaseEntity,
// 	Column,
// 	Entity,
// 	JoinColumn,
// 	JoinTable,
// 	ManyToMany,
// 	ManyToOne,
// 	OneToMany,
// 	OneToOne,
// 	PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Course } from './Course';
// import { Municipality } from './Municipality';
// import { Profile } from './Profile';
// import { Rol } from './Rol';
// import { UserRol } from './UserRol';

// @Entity('usuario')
// export class User extends BaseEntity {
// 	@PrimaryGeneratedColumn()
// 	id_usuario: number;

// 	@Column({ type: 'varchar', length: 50 })
// 	nombre: string;

// 	@Column({ type: 'varchar', length: 75 })
// 	apellidos: string;

// 	@Column({ type: 'char', length: 1 })
// 	genero: string;

// 	@Column({ type: 'varchar', length: 100 })
// 	correo: string;

// 	@Column({ type: 'varchar', length: 200, select: false })
// 	pass: string;

// 	@Column({ type: 'varchar', length: 200 })
// 	direccion: string;

// 	// @Column({ type: 'varchar', length: 11 })
// 	// telefono: string;

// 	@Column({ type: 'date' })
// 	fecha_nac: string;

// 	@Column({ type: 'char', length: 1 })
// 	estado: string;

// 	@Column({ type: 'varchar', length: 75 })
// 	doc_cui: string;

// 	@Column()
// 	carnet: number;

// 	@Column({ type: 'varchar', length: 20 })
// 	cui: string;

// 	@ManyToOne(
// 		() => Municipality,
// 		(municipality: Municipality) => municipality.users
// 	)
// 	@JoinColumn({ name: 'id_municipio' })
// 	municipality: Municipality;

// 	@OneToMany(() => UserRol, (userRol: UserRol) => userRol.user)
// 	userRoles: UserRol[];

// 	@ManyToMany(() => Rol, (rol: Rol) => rol.users)
// 	@JoinTable({
// 		name: 'usuario_rol',
// 		joinColumns: [{ name: 'id_usuario' }],
// 		inverseJoinColumns: [{ name: 'id_rol' }],
// 	})
// 	roles: Rol[];

// 	@ManyToMany(() => Course, (course: Course) => course.users)
// 	@JoinTable({
// 		name: 'ut_curso_tutor',
// 		joinColumns: [{ name: 'id_tutor' }],
// 		inverseJoinColumns: [{ name: 'id_curso' }],
// 	})
// 	courses: Course[];

// 	@OneToOne(() => Profile, (profile: Profile) => profile.id_usuario)
// 	profile: Profile;
// }
