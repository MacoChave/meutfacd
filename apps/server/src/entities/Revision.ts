import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './Usuario';
import { UTCursoTutor } from './CursoTutor';
import { UTTesis } from './Tesis';

@Entity({ name: 'ut_revision' })
export class UTRevision {
	@PrimaryGeneratedColumn()
	id_revision: number;

	@CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	fecha: Date;

	@Column({ type: 'varchar', length: 255, nullable: true })
	titulo: string;

	@Column({ type: 'varchar', length: 500, nullable: true })
	detalle: string;

	@Column({ type: 'varchar', length: 100, nullable: true })
	ruta_certificado: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	ruta_dictamen: string;

	@Column({ type: 'int', unsigned: true, nullable: true })
	id_curso_tutor: number | null;

	@Column({ type: 'int', unsigned: true, nullable: true })
	id_tutor: number | null;

	@Column({ type: 'int', unsigned: true, nullable: true })
	id_tesis: number | null;

	@Column({ type: 'char', length: 1, default: 'E' })
	estado: string;

	@Column({ type: 'smallint', default: 1 })
	estacion: number;

	@Column({ type: 'varchar', length: 100, nullable: true })
	sala: string;

	@ManyToOne(
		() => UTCursoTutor,
		(cursoTutor: UTCursoTutor) => cursoTutor.revisions
	)
	@JoinColumn({ name: 'id_curso_tutor' })
	cursoTutor: UTCursoTutor;

	@ManyToOne(() => UTTesis, (tesis: UTTesis) => tesis.revisions)
	@JoinColumn({ name: 'id_tesis' })
	tesis: UTTesis;

	@ManyToOne(() => Usuario, (usuario: Usuario) => usuario.revisions)
	@JoinColumn({ name: 'id_tutor' })
	tutor: Usuario;
}
