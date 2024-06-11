import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Period } from './Period';
import { CourseTutor } from './CourseTutor';
import { Profile } from './Profile';

@Entity('ut_horario')
export class Schedule extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_horario: number;

	@PrimaryColumn()
	id_jornada: Period;

	@Column({ type: 'time' })
	hora_inicio: string;

	@Column({ type: 'time' })
	hora_final: string;

	@ManyToOne(() => Period, (period: Period) => period.schedules)
	@JoinColumn({ name: 'id_jornada' })
	period: Period;

	@OneToMany(
		() => CourseTutor,
		(courseTutor: CourseTutor) => courseTutor.schedule
	)
	courseTutors: CourseTutor[];

	@OneToMany(() => Profile, (profile: Profile) => profile.schedule)
	profiles: Profile[];
}
