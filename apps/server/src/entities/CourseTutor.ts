import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Course } from './Course';
import { Schedule } from './Schedule';

@Entity('ut_curso_tutor')
export class CourseTutor extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_curso_tutor: number;

	@Column()
	id_curso: number;

	@Column()
	id_tutor: number;

	@ManyToOne(() => Schedule, (schedule: Schedule) => schedule.courseTutors)
	@JoinColumn([
		{ name: 'id_horario', referencedColumnName: 'id_horario' },
		{ name: 'id_jornada', referencedColumnName: 'id_jornada' },
	])
	schedule: Schedule;

	@Column({ type: 'date' })
	fecha: string;

	@Column({ type: 'varchar', length: 128 })
	salon: string;

	@Column({ type: 'tinyint' })
	activo: number;

	@Column({ type: 'json' })
	dias: string;

	@ManyToOne(() => User, (user: User) => user.courses)
	@JoinColumn({ name: 'id_tutor' })
	tutor: User;

	@ManyToOne(() => Course, (course: Course) => course.users)
	@JoinColumn({ name: 'id_curso' })
	course: Course;
}
