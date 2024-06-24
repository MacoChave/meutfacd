import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UTHorario } from './Horario';

@Entity('ut_jornada')
export class UTJornada {
	@PrimaryGeneratedColumn()
	id_jornada: number;

	@Column({ type: 'varchar', length: 45 })
	nombre: string;

	@OneToMany(() => UTHorario, (horario: UTHorario) => horario.jornada)
	horarios: UTHorario[];
}

// import {
// 	BaseEntity,
// 	Column,
// 	Entity,
// 	OneToMany,
// 	PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Schedule } from './Schedule';

// @Entity('ut_jornada')
// export class Period extends BaseEntity {
// 	@PrimaryGeneratedColumn()
// 	id_jornada: number;

// 	@Column({ type: 'varchar', length: 45 })
// 	nombre: string;

// 	@OneToMany(() => Schedule, (schedule: Schedule) => schedule.id_jornada)
// 	schedules: Schedule[];
// }
