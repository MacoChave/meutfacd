import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Period } from './Period';

@Entity('ut_horario')
export class Schedule extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_horario: number;

	@ManyToOne(() => Period, (period: Period) => period.id_jornada)
	@JoinColumn({ name: 'id_jornada' })
	@PrimaryColumn()
	id_jornada: Period;

	@Column()
	hora_inicio: string;

	@Column()
	hora_final: string;
}
