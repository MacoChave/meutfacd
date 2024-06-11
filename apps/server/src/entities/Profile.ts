import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { Schedule } from './Schedule';

@Entity('ut_perfil')
export class Profile extends BaseEntity {
	@PrimaryColumn()
	@OneToOne(() => User, (user: User) => user.profile)
	@JoinColumn({ name: 'id_usuario' })
	id_usuario: number;

	@ManyToOne(() => Schedule, (schedule: Schedule) => schedule.profiles)
	@JoinColumn([
		{ name: 'id_horario', referencedColumnName: 'id_horario' },
		{ name: 'id_jornada', referencedColumnName: 'id_jornada' },
	])
	schedule: Schedule;

	@Column()
	ocupacion: string;
}
