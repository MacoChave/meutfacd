import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UTCursoTutor } from './CursoTutor';

@Entity('ut_curso')
export class UTCurso {
	@PrimaryGeneratedColumn()
	id_curso: number;

	@Column({ type: 'varchar', length: 128 })
	nombre: string;

	@OneToMany(
		() => UTCursoTutor,
		(cursoTutor: UTCursoTutor) => cursoTutor.curso
	)
	cursoTutores: UTCursoTutor[];
}
