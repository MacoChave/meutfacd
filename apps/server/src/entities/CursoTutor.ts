import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './Usuario';
import { UTCurso } from './Curso';
import { UTHorario } from './Horario';

@Entity('ut_curso_tutor')
export class UTCursoTutor {
	@PrimaryGeneratedColumn()
	id_curso_tutor: number;

	@Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
	fecha: Date;

	@Column({ type: 'varchar', length: 128 })
	salon: string;

	@Column({ type: 'bool', default: true })
	activo: boolean;

	@Column({ type: 'json', nullable: true })
	dias: any;

	id_horario: number;

	id_jornada: number;

	@ManyToOne(() => UTCurso, (curso: UTCurso) => curso.cursoTutores)
	@JoinColumn({ name: 'id_curso' })
	curso: UTCurso;

	@ManyToOne(() => Usuario, (usuario: Usuario) => usuario.cursosTutor)
	@JoinColumn({ name: 'id_tutor' })
	tutor: Usuario;

	@ManyToOne(() => UTHorario)
	@JoinColumn([
		{ name: 'id_horario', referencedColumnName: 'id_horario' },
		{ name: 'id_jornada', referencedColumnName: 'id_jornada' },
	])
	horario: UTHorario;
}
