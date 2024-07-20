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
import { UTCursoTutor } from './CursoTutor';
import { UTMessage } from './Message';
import { Municipio } from './Municipio';
import { UTNotificacion } from './Notificacion';
import { UTPerfil } from './Perfil';
import { Rol } from './Rol';
import { UTRevision } from './Revision';
import { UTTesis } from './Tesis';

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

	@OneToMany(() => UTMessage, (message: UTMessage) => message.autor)
	messages: UTMessage[];

	@OneToMany(
		() => UTNotificacion,
		(notificacion: UTNotificacion) => notificacion.emisor
	)
	notificacionesEnviadas: UTNotificacion[];

	@OneToMany(
		() => UTNotificacion,
		(notificacion: UTNotificacion) => notificacion.receptor
	)
	notificacionesRecibidas: UTNotificacion[];

	@OneToMany(
		() => UTCursoTutor,
		(cursoTutor: UTCursoTutor) => cursoTutor.tutor
	)
	cursoTutores: UTCursoTutor[];

	@OneToMany(() => UTRevision, (revision: UTRevision) => revision.tutor)
	revisions: UTRevision[];

	@OneToMany(() => UTTesis, (tesis: UTTesis) => tesis.estudiante)
	tesis: UTTesis[];
}
